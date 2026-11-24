/**
 * Claude Learning Hub — Video-First HTML5 Player & Empty State Handler
 * Compatible with Material for MkDocs instant navigation
 */

(function () {
  'use strict';

  // Helper: Get canonical site root URL reliably across instant navigation
  function getSiteRoot() {
    // 1. Logo link in header is rendered by MkDocs Jinja2 template pointing to site root
    const logoLink = document.querySelector('a.md-header__button.md-logo') ||
                     document.querySelector('a.md-logo');
    if (logoLink && logoLink.href) {
      return logoLink.href.replace(/\/?$/, '/');
    }
    // 2. Canonical link in head if present
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      try {
        const u = new URL(canonical.href);
        return u.origin + '/';
      } catch (e) {}
    }
    // 3. Fallback to origin root
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin + '/';
    }
    return '/';
  }

  // Helper: Resolve full path to local MP4 video
  function resolveVideoPath(filename) {
    if (!filename) return null;
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }
    if (filename.startsWith('/')) {
      return filename;
    }
    const root = getSiteRoot();
    return root + 'assets/videos/' + filename;
  }

  // Render the empty state placeholder
  function renderPlaceholder(wrapper, moduleId, moduleTitle, customMessage, isError) {
    const defaultMsg = 'Video will be available soon';
    const msg = customMessage || defaultMsg;
    const exampleName = moduleId + '.mp4';

    const errorClass = isError ? ' is-error' : '';
    const statusClass = isError ? 'video-status error' : 'video-status';

    wrapper.innerHTML = `
      <div class="video-container${errorClass}">
        <div class="video-placeholder">
          <div class="video-placeholder-frame">
            <div class="video-placeholder-icon">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="video-placeholder-meta">
              <span class="video-tag">Module Video</span>
              <h3 class="video-title">${moduleTitle}</h3>
              <p class="${statusClass}">${msg}</p>
              <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/${exampleName}</code></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render the HTML5 video player
  function renderVideoPlayer(wrapper, moduleId, moduleTitle, videoSrc, filename) {
    wrapper.innerHTML = `
      <div class="video-container has-video">
        <video controls playsinline preload="auto" src="${videoSrc}" class="module-video-element" aria-label="${moduleTitle}">
          <source src="${videoSrc}" type="video/mp4">
          <p class="video-fallback-msg">Your browser does not support HTML5 video playback.</p>
        </video>
        <button type="button" class="video-unmute-overlay-btn" aria-label="Unmute audio" style="display: none;">
          <span class="unmute-icon">🔇</span>
          <span class="unmute-text">Sound is Muted · Click to Unmute</span>
        </button>
        <div class="video-caption-bar">
          <div class="video-caption-left">
            <span class="video-caption-tag">Video Lesson</span>
            <span class="video-caption-title">${moduleTitle}</span>
            <span class="video-caption-file"><code>${filename}</code></span>
          </div>
          <div class="video-caption-right">
            <button type="button" class="video-audio-toggle-btn" aria-label="Audio status and control" title="Audio is active at 100%. Click to mute/unmute.">
              <span class="audio-icon">🔊</span>
              <span class="audio-label">Sound: 100%</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const videoEl = wrapper.querySelector('video');
    const sourceEl = wrapper.querySelector('source');
    const audioBtn = wrapper.querySelector('.video-audio-toggle-btn');
    const audioIcon = wrapper.querySelector('.audio-icon');
    const audioLabel = wrapper.querySelector('.audio-label');
    const unmuteOverlay = wrapper.querySelector('.video-unmute-overlay-btn');

    function updateAudioUI() {
      if (!videoEl) return;
      const isMuted = videoEl.muted || videoEl.volume === 0;

      if (audioBtn) {
        if (isMuted) {
          audioBtn.classList.add('is-muted');
          if (audioIcon) audioIcon.textContent = '🔇';
          if (audioLabel) audioLabel.textContent = 'Muted';
          audioBtn.setAttribute('title', 'Video is muted. Click to turn on sound.');
        } else {
          audioBtn.classList.remove('is-muted');
          const pct = Math.round((videoEl.volume || 1.0) * 100);
          if (audioIcon) audioIcon.textContent = '🔊';
          if (audioLabel) audioLabel.textContent = 'Sound: ' + pct + '%';
          audioBtn.setAttribute('title', 'Audio active at ' + pct + '%. Click to mute.');
        }
      }

      if (unmuteOverlay) {
        if (isMuted && !videoEl.paused) {
          unmuteOverlay.style.display = 'inline-flex';
        } else {
          unmuteOverlay.style.display = 'none';
        }
      }
    }

    function ensureAudible() {
      if (!videoEl) return;
      if (videoEl.muted) {
        videoEl.muted = false;
      }
      if (videoEl.volume === 0) {
        videoEl.volume = 1.0;
      }
      updateAudioUI();
    }

    if (audioBtn) {
      audioBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!videoEl) return;
        if (videoEl.muted || videoEl.volume === 0) {
          videoEl.muted = false;
          videoEl.volume = 1.0;
        } else {
          videoEl.muted = true;
        }
        updateAudioUI();
      });
    }

    if (unmuteOverlay) {
      unmuteOverlay.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        ensureAudible();
      });
    }

    function handleVideoError(evt) {
      console.warn('Claude Learning Hub: Failed to load video at ' + videoSrc, evt);
      renderPlaceholder(
        wrapper,
        moduleId,
        moduleTitle,
        'Video file not found or still uploading (' + filename + ')',
        true
      );
    }

    if (videoEl) {
      // Explicitly initialize volume to 100% and unmuted
      videoEl.muted = false;
      videoEl.defaultMuted = false;
      videoEl.volume = 1.0;

      // Ensure audible sound on user interactions
      videoEl.addEventListener('play', ensureAudible);
      videoEl.addEventListener('playing', ensureAudible);
      videoEl.addEventListener('volumechange', updateAudioUI);
      videoEl.addEventListener('loadedmetadata', function () {
        ensureAudible();
      });

      videoEl.addEventListener('error', handleVideoError);
      if (sourceEl) {
        sourceEl.addEventListener('error', handleVideoError);
      }
      try {
        videoEl.load();
      } catch (e) {
        console.warn('Claude Learning Hub: video load error', e);
      }
      updateAudioUI();
    }
  }

  // Initialize all module video containers on the page
  function initModuleVideoPlayers() {
    const wrappers = document.querySelectorAll('.module-video-wrapper');
    if (!wrappers || wrappers.length === 0) return;

    wrappers.forEach(wrapper => {
      const moduleId = wrapper.getAttribute('data-module');
      const moduleTitle = wrapper.getAttribute('data-video-title') || 'Module Video';

      // Check config source: attribute or global mapping
      const explicitVideo = wrapper.getAttribute('data-video');
      const mappedVideo = (window.AI_MASTERCLASS_VIDEOS && window.AI_MASTERCLASS_VIDEOS[moduleId]) || null;
      const videoFilename = explicitVideo || mappedVideo;

      if (videoFilename && typeof videoFilename === 'string' && videoFilename.trim().length > 0) {
        const videoSrc = resolveVideoPath(videoFilename.trim());
        renderVideoPlayer(wrapper, moduleId, moduleTitle, videoSrc, videoFilename.trim());
      } else {
        renderPlaceholder(wrapper, moduleId, moduleTitle, null, false);
      }
    });
  }

  // Hook into Material for MkDocs instant navigation and standard DOMContentLoaded
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      initModuleVideoPlayers();
    });
  } else {
    document.addEventListener('DOMContentLoaded', initModuleVideoPlayers);
  }
})();
