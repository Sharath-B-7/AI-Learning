/**
 * Claude Learning Hub — Intelligent Document-Grounded Chatbot Widget
 * Integrates with FastAPI backend (http://127.0.0.1:8000)
 * Fully compatible with Material for MkDocs instant navigation (document$)
 */

(function () {
  'use strict';

  const BACKEND_BASE = 'http://127.0.0.1:8000';
  const STORAGE_KEY_HISTORY = 'ai_masterclass_chat_history_v1';
  const STORAGE_KEY_STATE = 'tavi_chat_open_v1';

  // State
  let isOpen = false;
  let isGenerating = false;
  let backendStatus = 'checking'; // 'online' | 'offline' | 'checking'
  let messages = [];
  let pollTimer = null;
  let themeObserver = null;

  // DOM Elements cache
  let dom = {
    widget: null,
    toggleBtn: null,
    panel: null,
    statusDot: null,
    statusText: null,
    messagesContainer: null,
    input: null,
    sendBtn: null,
    typingIndicator: null
  };

  // Helper: Get canonical site root URL reliably across instant navigation
  function getSiteRoot() {
    const logoLink = document.querySelector('a.md-header__button.md-logo') ||
                     document.querySelector('a.md-logo');
    if (logoLink && logoLink.href) {
      return logoLink.href.replace(/\/?$/, '/');
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      try {
        const u = new URL(canonical.href);
        return u.origin + '/';
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin + '/';
    }
    return '/';
  }

  // Safe HTML Escaping
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Safe Lightweight Markdown Formatter (runs strictly on escaped HTML)
  function formatMarkdown(escapedText) {
    if (!escapedText) return '';

    // Code spans: `code`
    let formatted = escapedText.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

    // Bold: **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Bullet points: lines starting with "- " or "* "
    const lines = formatted.split('\n');
    let inList = false;
    let listType = null;
    let resultLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const bulletMatch = line.match(/^(\s*)([-*])\s+(.+)$/);
      const numMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

      if (bulletMatch) {
        if (!inList || listType !== 'ul') {
          if (inList) resultLines.push(listType === 'ul' ? '</ul>' : '</ol>');
          resultLines.push('<ul class="chat-list">');
          inList = true;
          listType = 'ul';
        }
        resultLines.push(`<li>${bulletMatch[3]}</li>`);
      } else if (numMatch) {
        if (!inList || listType !== 'ol') {
          if (inList) resultLines.push(listType === 'ul' ? '</ul>' : '</ol>');
          resultLines.push('<ol class="chat-list">');
          inList = true;
          listType = 'ol';
        }
        resultLines.push(`<li>${numMatch[3]}</li>`);
      } else {
        if (inList) {
          resultLines.push(listType === 'ul' ? '</ul>' : '</ol>');
          inList = false;
          listType = null;
        }
        if (line.trim().length > 0) {
          resultLines.push(`<p class="chat-paragraph">${line}</p>`);
        }
      }
    }
    if (inList) {
      resultLines.push(listType === 'ul' ? '</ul>' : '</ol>');
    }

    return resultLines.join('');
  }

  // Reliable Source Link Resolver to existing MkDocs documentation pages
  function resolveSourceUrl(source) {
    if (!source || !source.module) return null;
    const root = getSiteRoot();
    const part = source.part || '';
    const mod = source.module || '';

    // Part A Mappings
    if (part.includes('Part A')) {
      if (mod.includes('Module 1')) return root + 'foundations/part-a/module-01-what-is-ai/';
      if (mod.includes('Module 2')) return root + 'foundations/part-a/module-02-what-is-an-llm/';
      if (mod.includes('Module 3')) return root + 'foundations/part-a/module-03-how-llms-work/';
      if (mod.includes('Module 4')) return root + 'foundations/part-a/module-04-strengths-limits-trust/';
      if (mod.includes('Module 5')) return root + 'foundations/part-a/module-05-meet-claude/';
      if (mod.includes('Glossary')) return root + 'foundations/part-a/glossary/';
      if (mod.includes('FAQ') || mod.includes('Commonly Asked')) return root + 'foundations/part-a/faq/';
      if (mod.includes('Checklist')) return root + 'foundations/part-a/learning-checklist/';
      if (mod.includes('Introduction')) return root + 'foundations/part-a/';
    }

    // Part B Mappings
    if (part.includes('Part B')) {
      if (mod.includes('Module 6')) return root + 'foundations/part-b/module-06-types-of-models/';
      if (mod.includes('Module 7')) return root + 'foundations/part-b/module-07-context/';
      if (mod.includes('Module 8')) return root + 'foundations/part-b/module-08-prompting/';
      if (mod.includes('Module 9')) return root + 'foundations/part-b/module-09-memory/';
      if (mod.includes('Module 10')) return root + 'foundations/part-b/module-10-skills/';
      if (mod.includes('Module 11')) return root + 'foundations/part-b/module-11-tools-and-harness/';
      if (mod.includes('Module 12')) return root + 'foundations/part-b/module-12-agents/';
      if (mod.includes('Module 13')) return root + 'foundations/part-b/module-13-permissions-and-safety/';
      if (mod.includes('Worked Example') || mod.includes('Putting It All Together')) return root + 'foundations/part-b/worked-example/';
      if (mod.includes('Glossary')) return root + 'foundations/part-b/glossary/';
      if (mod.includes('FAQ') || mod.includes('Commonly Asked')) return root + 'foundations/part-b/faq/';
      if (mod.includes('Checklist')) return root + 'foundations/part-b/learning-checklist/';
      if (mod.includes('Introduction')) return root + 'foundations/part-b/';
    }

    return null;
  }

  // Check Backend Health
  async function checkBackendHealth() {
    updateStatusUI('checking');
    try {
      const res = await fetch(`${BACKEND_BASE}/api/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3500)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'ok') {
          updateStatusUI('online');
          return true;
        }
      }
      updateStatusUI('offline');
      return false;
    } catch (e) {
      updateStatusUI('offline');
      return false;
    }
  }

  function updateStatusUI(status) {
    backendStatus = status;
    if (!dom.statusDot || !dom.statusText) return;

    dom.statusDot.className = 'chat-status-dot ' + status;
    if (status === 'online') {
      dom.statusText.textContent = 'Online';
      dom.statusText.title = 'TAVI Assistant backend ready';
    } else if (status === 'checking') {
      dom.statusText.textContent = 'Checking...';
      dom.statusText.title = 'Verifying local backend';
    } else {
      dom.statusText.textContent = 'Offline';
      dom.statusText.title = 'Backend unavailable at 127.0.0.1:8000';
    }
  }

  // Website Theme Detection & Dynamic Synchronization
  function getWebsiteTheme() {
    const bodyScheme = document.body ? document.body.getAttribute('data-md-color-scheme') : null;
    const htmlScheme = document.documentElement ? document.documentElement.getAttribute('data-md-color-scheme') : null;
    const scheme = bodyScheme || htmlScheme || 'default';
    return (scheme === 'slate' || scheme.includes('dark')) ? 'dark' : 'light';
  }

  function syncTheme() {
    if (!dom.widget) return;
    const theme = getWebsiteTheme();
    if (dom.widget.getAttribute('data-tavi-theme') !== theme) {
      dom.widget.setAttribute('data-tavi-theme', theme);
    }
  }

  function setupThemeObserver() {
    syncTheme();

    if (themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }

    themeObserver = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'data-md-color-scheme') {
          syncTheme();
          break;
        }
      }
    });

    if (document.body) {
      themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });
    }
    if (document.documentElement) {
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-md-color-scheme'] });
    }
  }

  // Build the Widget DOM
  function createWidgetDOM() {
    if (document.getElementById('ai-masterclass-chat-widget')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'ai-masterclass-chat-widget';
    wrapper.className = 'chat-widget-wrapper';
    wrapper.setAttribute('data-tavi-theme', getWebsiteTheme());

    wrapper.innerHTML = `
      <!-- Floating "Ask Tavi" Launcher -->
      <button id="chat-toggle-btn" class="chat-launcher-pill chat-floating-btn" aria-label="Ask Tavi" title="Ask Tavi">
        <span class="chat-launcher-icon">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Primary Radiant AI Intelligence Star (TAVI Guide) -->
            <path d="M10 1.5C10 6.194 6.194 10 1.5 10C6.194 10 10 13.806 10 18.5C10 13.806 13.806 10 18.5 10C13.806 10 10 6.194 10 1.5Z"/>
            <!-- Secondary Companion Spark (Learner / Discovery) -->
            <path d="M19.5 13.5C19.5 15.709 17.709 17.5 15.5 17.5C17.709 17.5 19.5 19.291 19.5 21.5C19.5 19.291 21.291 17.5 23.5 17.5C21.291 17.5 19.5 15.709 19.5 13.5Z"/>
          </svg>
        </span>
        <span class="chat-launcher-text">Ask Tavi</span>
      </button>

      <!-- Chat Panel -->
      <div id="chat-panel" class="chat-panel" role="region" aria-label="TAVI Chat Panel" style="display: none;">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-main">
            <div class="chat-header-title-row">
              <span class="chat-header-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                  <rect x="4" y="8" width="16" height="12" rx="4"></rect>
                  <circle cx="9" cy="13" r="1.25" fill="currentColor"></circle>
                  <circle cx="15" cy="13" r="1.25" fill="currentColor"></circle>
                </svg>
              </span>
              <span class="chat-header-title">TAVI</span>
              <span class="chat-header-badge">AI Assistant</span>
            </div>
            <div class="chat-header-sub">Official Claude Learning Hub Assistant</div>
          </div>
          <div class="chat-header-actions">
            <div class="chat-status-indicator" id="chat-status-pill">
              <span class="chat-status-dot checking" id="chat-status-dot"></span>
              <span class="chat-status-label" id="chat-status-text">Checking</span>
            </div>
            <button id="chat-reset-btn" class="chat-header-btn" title="New conversation" aria-label="Reset conversation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>
            <button id="chat-close-btn" class="chat-header-btn" title="Close" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="chat-messages" id="chat-messages-container" role="log" aria-live="polite">
          <!-- Populated dynamically -->
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <div class="chat-input-wrapper">
            <textarea
              id="chat-input-field"
              class="chat-input-field"
              placeholder="Ask Tavi anything..."
              rows="1"
              aria-label="Ask Tavi a question"
            ></textarea>
            <button id="chat-send-btn" class="chat-send-btn" aria-label="Send question" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    // Cache elements
    dom.widget = wrapper;
    dom.toggleBtn = document.getElementById('chat-toggle-btn');
    dom.panel = document.getElementById('chat-panel');
    dom.statusDot = document.getElementById('chat-status-dot');
    dom.statusText = document.getElementById('chat-status-text');
    dom.messagesContainer = document.getElementById('chat-messages-container');
    dom.input = document.getElementById('chat-input-field');
    dom.sendBtn = document.getElementById('chat-send-btn');

    // Attach Event Listeners
    dom.toggleBtn.addEventListener('click', toggleChat);
    document.getElementById('chat-close-btn').addEventListener('click', closeChat);
    document.getElementById('chat-reset-btn').addEventListener('click', resetChat);

    dom.sendBtn.addEventListener('click', handleUserSubmit);

    dom.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit();
      }
    });

    dom.input.addEventListener('input', function () {
      // Auto-grow textarea
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 110) + 'px';
      dom.sendBtn.disabled = isGenerating || this.value.trim().length === 0;
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    });

    // Load initial messages or show welcome
    loadSession();

    // Initial health check
    checkBackendHealth();
    pollTimer = setInterval(checkBackendHealth, 30000);

    // Initial theme observation
    setupThemeObserver();
  }

  // Open / Close Logic
  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    isOpen = true;
    dom.panel.style.display = 'flex';
    dom.toggleBtn.classList.add('chat-panel-open');
    dom.toggleBtn.classList.add('active');
    sessionStorage.setItem(STORAGE_KEY_STATE, 'open');

    // Check health immediately on open
    checkBackendHealth();

    // Auto-focus input on desktop
    if (window.innerWidth > 600) {
      setTimeout(() => dom.input.focus(), 150);
    }
    scrollToBottom();
  }

  function closeChat() {
    isOpen = false;
    dom.panel.style.display = 'none';
    dom.toggleBtn.classList.remove('chat-panel-open');
    dom.toggleBtn.classList.remove('active');
    sessionStorage.setItem(STORAGE_KEY_STATE, 'closed');
  }

  function resetChat() {
    if (isGenerating) return;
    messages = [];
    sessionStorage.removeItem(STORAGE_KEY_HISTORY);
    renderMessages();
    dom.input.value = '';
    dom.input.style.height = 'auto';
    dom.sendBtn.disabled = true;
    dom.input.focus();
  }

  function loadSession() {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) {
        messages = JSON.parse(saved);
      }
    } catch (e) {
      messages = [];
    }

    renderMessages();
  }

  function saveSession() {
    try {
      sessionStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(messages));
    } catch (e) {}
  }

  // Render Messages
  function renderMessages() {
    if (!dom.messagesContainer) return;
    dom.messagesContainer.innerHTML = '';

    if (messages.length === 0) {
      renderWelcomeScreen();
      return;
    }

    messages.forEach((msg) => {
      if (msg.role === 'user') {
        renderUserMessageDOM(msg.text);
      } else {
        renderAssistantMessageDOM(msg.text, msg.sources, msg.grounded, false);
      }
    });

    scrollToBottom();
  }

  function renderWelcomeScreen() {
    const welcome = document.createElement('div');
    welcome.className = 'chat-welcome-card';
    welcome.innerHTML = `
      <div class="welcome-header">
        <div class="welcome-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
            <rect x="4" y="8" width="16" height="12" rx="4"></rect>
            <circle cx="9" cy="13" r="1.25" fill="currentColor"></circle>
            <circle cx="15" cy="13" r="1.25" fill="currentColor"></circle>
          </svg>
        </div>
        <div class="welcome-content">
          <div class="welcome-title">Hi! I'm TAVI 👋</div>
          <div class="welcome-text">Your AI assistant. Ask me anything about AI, coding, technology, or general topics!</div>
        </div>
      </div>
    `;

    dom.messagesContainer.appendChild(welcome);
  }

  function renderUserMessageDOM(text) {
    const row = document.createElement('div');
    row.className = 'chat-message-row user';
    row.innerHTML = `<div class="chat-bubble user">${escapeHtml(text)}</div>`;
    dom.messagesContainer.appendChild(row);
  }

  function renderAssistantMessageDOM(text, sources, grounded, isRefusal) {
    const row = document.createElement('div');
    row.className = 'chat-message-row assistant';

    const isExplicitRefusal = isRefusal || (text && text.includes('not covered in Part A or Part B'));

    const sourcesHtml = '';

    const bubbleClass = isExplicitRefusal ? 'chat-bubble assistant refusal' : 'chat-bubble assistant';
    const escaped = escapeHtml(text);
    const bodyHtml = formatMarkdown(escaped);

    row.innerHTML = `
      <div class="${bubbleClass}">
        <div class="chat-text-body">${bodyHtml}</div>
        ${sourcesHtml}
      </div>
    `;

    dom.messagesContainer.appendChild(row);
    return row;
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const ind = document.createElement('div');
    ind.id = 'chat-typing-indicator';
    ind.className = 'chat-message-row assistant typing';
    ind.innerHTML = `
      <div class="chat-bubble assistant typing">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    dom.messagesContainer.appendChild(ind);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('chat-typing-indicator');
    if (ind) ind.remove();
  }

  function scrollToBottom() {
    if (dom.messagesContainer) {
      dom.messagesContainer.scrollTop = dom.messagesContainer.scrollHeight;
    }
  }

  // Handle User Message Submission
  async function handleUserSubmit() {
    if (isGenerating) return;
    const rawText = dom.input.value.trim();
    if (!rawText) return;

    // Clear welcome if first message
    if (messages.length === 0) {
      dom.messagesContainer.innerHTML = '';
    }

    // Add User Message
    messages.push({ role: 'user', text: rawText });
    renderUserMessageDOM(rawText);
    saveSession();

    dom.input.value = '';
    dom.input.style.height = 'auto';
    dom.sendBtn.disabled = true;
    isGenerating = true;
    if (dom.widget) dom.widget.setAttribute('data-generating', 'true');
    scrollToBottom();

    showTypingIndicator();

    // Stream from backend
    try {
      const response = await fetch(`${BACKEND_BASE}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          message: rawText,
          history: messages.slice(0, -1).map(m => ({
            role: m.role,
            content: m.text
          })),
          top_k: 3
        })
      });

      if (!response.ok) {
        removeTypingIndicator();
        let errMsg = `Backend returned HTTP ${response.status}.`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMsg = errData.detail;
          }
        } catch (_) {}
        const isQuota = response.status === 429 || /quota|rate\s*limit/i.test(errMsg);
        renderErrorMessage(errMsg, isQuota ? 'quota' : 'error');
        isGenerating = false;
        dom.sendBtn.disabled = false;
        return;
      }

      // Stream Reader setup
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulatedText = '';
      let activeRow = null;
      let textBodyEl = null;
      let returnedSources = [];
      let isGrounded = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep remainder

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;

          const jsonPayload = trimmed.slice(6);
          try {
            const event = JSON.parse(jsonPayload);

            if (event.type === 'token') {
              // First token received: remove typing indicator and mount bubble
              if (!activeRow) {
                removeTypingIndicator();
                activeRow = document.createElement('div');
                activeRow.className = 'chat-message-row assistant';
                activeRow.innerHTML = `
                  <div class="chat-bubble assistant">
                    <div class="chat-text-body"></div>
                  </div>
                `;
                dom.messagesContainer.appendChild(activeRow);
                textBodyEl = activeRow.querySelector('.chat-text-body');
              }

              accumulatedText += event.token;
              textBodyEl.innerHTML = formatMarkdown(escapeHtml(accumulatedText));
              scrollToBottom();

            } else if (event.type === 'sources') {
              returnedSources = event.sources || [];
              isGrounded = event.grounded !== false;

            } else if (event.type === 'error') {
              removeTypingIndicator();
              const errText = event.error || 'An error occurred during response generation.';
              const isQuota = /quota|rate\s*limit|429/i.test(errText);
              renderErrorMessage(errText, isQuota ? 'quota' : 'error');
              isGenerating = false;
              dom.sendBtn.disabled = false;
              return;

            } else if (event.type === 'done') {
              // Finalize message with sources and refusal styling if ungrounded
              removeTypingIndicator();
              if (activeRow) {
                const bubble = activeRow.querySelector('.chat-bubble');
                if (accumulatedText.includes('not covered in Part A or Part B')) {
                  bubble.classList.add('refusal');
                }



              }

              // Save to session history
              messages.push({
                role: 'assistant',
                text: accumulatedText,
                sources: returnedSources,
                grounded: isGrounded
              });
              saveSession();
              break;
            }
          } catch (err) {
            // malformed SSE line, ignore
          }
        }
      }

    } catch (err) {
      removeTypingIndicator();
      renderErrorMessage('Connection to TAVI backend failed. Please verify that FastAPI is running on port 8000.', 'connection');
      checkBackendHealth();
    } finally {
      isGenerating = false;
      if (dom.widget) dom.widget.setAttribute('data-generating', 'false');
      dom.sendBtn.disabled = dom.input.value.trim().length === 0;
      scrollToBottom();
    }
  }

  function renderErrorMessage(msg, errorType) {
    const isQuota = errorType === 'quota' || /quota|rate\s*limit|429/i.test(msg || '');
    const title = isQuota ? 'AI Quota / Rate Limit' : 'Connection Error';
    const iconSvg = isQuota
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    const row = document.createElement('div');
    row.className = 'chat-message-row assistant error' + (isQuota ? ' quota-error' : '');
    row.innerHTML = `
      <div class="chat-bubble assistant error${isQuota ? ' quota-error' : ''}">
        <div class="chat-error-title${isQuota ? ' quota-title' : ''}">
          ${iconSvg}
          <span>${escapeHtml(title)}</span>
        </div>
        <div class="chat-error-body">${escapeHtml(msg)}</div>
      </div>
    `;
    dom.messagesContainer.appendChild(row);
    scrollToBottom();
  }

  // Initialize on MkDocs Material instant navigation (document$) or DOMContentLoaded
  function initChatbot() {
    createWidgetDOM();
    syncTheme();
    setupThemeObserver();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      initChatbot();
    });
  } else {
    document.addEventListener('DOMContentLoaded', initChatbot);
  }

})();
