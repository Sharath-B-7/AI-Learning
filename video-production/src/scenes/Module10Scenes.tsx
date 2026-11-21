import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module10Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 280, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          PART B • MODULE 10
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Understanding <span style={{ color: THEME.colors.coral }}>Skills</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The recipe card analogy: reusable, standardized procedures for complex workflows
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1080 }}>
        {/* Prompt */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card1})`,
            opacity: card1,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>⌨️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            One-Time Prompt
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Typed into the terminal for an ad-hoc question. Good for quick queries, but gets lost when the session ends.
          </p>
        </div>

        {/* Skill */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card2})`,
            opacity: card2,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Permanent Skill
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            A saved recipe card defining steps, input parameters, output templates, and edge-case rules for reliable execution.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module10Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const treeSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const fileSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Where Skills Live &amp; SKILL.md Anatomy
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Organized in .claude\skills with YAML frontmatter metadata
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1120 }}>
        {/* Directory tree */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${treeSpring})`,
            opacity: treeSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#38bdf8', fontSize: 13, marginBottom: 10 }}># Windows Directory Structure</div>
          <div style={{ color: '#f8fafc', fontSize: 14, lineHeight: 1.7 }}>
            my-project\<br />
            └── <span style={{ color: '#a78bfa' }}>.claude\</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;└── <span style={{ color: '#38bdf8' }}>skills\</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <span style={{ color: '#fb923c' }}>weekly-report\</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <span style={{ color: '#4ade80' }}>SKILL.md</span>
          </div>
        </div>

        {/* File anatomy */}
        <div
          style={{
            flex: 1.3,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${fileSpring})`,
            opacity: fileSpring,
          }}
        >
          <div style={{ background: '#0f172a', borderRadius: THEME.radius.md, padding: '16px', fontFamily: THEME.fonts.mono, fontSize: 12, lineHeight: 1.6, color: '#94a3b8' }}>
            <span style={{ color: '#64748b' }}>---</span><br />
            <span style={{ color: '#38bdf8' }}>name:</span> weekly-report<br />
            <span style={{ color: '#38bdf8' }}>description:</span> Summarizes metrics CSV into markdown<br />
            <span style={{ color: '#64748b' }}>---</span><br /><br />
            <span style={{ color: '#fb923c' }}># Weekly Report Workflow</span><br />
            1. Read input spreadsheet passed via @<br />
            2. Extract key accomplishments &amp; blockers<br />
            3. Output formatted executive summary
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module10Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const idleSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const activeSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Progressive Disclosure: Clean Context
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Skills stay feather-light until specifically invoked
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1100 }}>
        {/* Idle State */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${idleSpring})`,
            opacity: idleSpring,
          }}
        >
          <div style={{ background: THEME.colors.backgroundSubtle, color: THEME.colors.charcoalMuted, fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, display: 'inline-block', marginBottom: 12 }}>
            SESSION STARTUP (IDLE)
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Only Frontmatter Summary
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalBody, lineHeight: 1.5, margin: '0 0 14px 0' }}>
            Claude only reads the 1-line description (~30 tokens). Dozens of skills can sit in your repo without taking up valuable desk space.
          </p>
          <div style={{ background: '#ecfdf5', color: '#047857', padding: '8px 12px', borderRadius: THEME.radius.md, fontSize: 13, fontWeight: 700 }}>
            ⚡ 99% Token Surface Area Saved!
          </div>
        </div>

        {/* Active State */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${activeSpring})`,
            opacity: activeSpring,
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, display: 'inline-block', marginBottom: 12 }}>
            WHEN INVOKED (ACTIVE)
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Full Procedure Loaded On-Demand
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalBody, lineHeight: 1.5, margin: '0 0 14px 0' }}>
            The complete SKILL.md instructions, checklist, and edge cases are brought to the desk only while executing that specific job.
          </p>
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, padding: '8px 12px', borderRadius: THEME.radius.md, fontSize: 13, fontWeight: 700 }}>
            ✓ Full Context Clarity When Needed
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module10Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const recapSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Invoking Skills &amp; Team Institutional Standards
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Commit skills to Git to make your entire engineering team faster
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Terminal Execution */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${terminalSpring})`,
            opacity: terminalSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}># Invoking a Skill with Parameters</div>
          <div style={{ color: '#f8fafc', fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> Run the <span style={{ color: '#a78bfa' }}>weekly-report</span> skill on <span style={{ color: '#fb923c' }}>@data\metrics.csv</span>
          </div>
          <div style={{ marginTop: 14, color: '#64748b', fontSize: 13, fontFamily: THEME.fonts.sans, lineHeight: 1.4 }}>
            Claude detects the skill name, loads SKILL.md, and executes each phase predictably without manual step prompting.
          </div>
        </div>

        {/* Team Value */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${recapSpring})`,
            opacity: recapSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'flex-start', marginBottom: 10 }}>
            TEAM BENEFIT
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Permanent Institutional Assets
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Whenever you repeat instructions more than twice, author a skill. Version-controlled in Git, skills standardize best practices for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};
