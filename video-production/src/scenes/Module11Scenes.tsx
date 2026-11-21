import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module11Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const modelNode = spring({ frame: frame - 100, fps, config: { damping: 14 } });
  const toolsNode = spring({ frame: frame - 260, fps, config: { damping: 14 } });
  const harnessNode = spring({ frame: frame - 420, fps, config: { damping: 14 } });

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
          PART B • MODULE 11
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Tools and the <span style={{ color: THEME.colors.coral }}>Harness</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The thinker in a locked room: turning thoughts into actions safely
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Model */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '28px 24px',
            boxShadow: THEME.shadows.card,
            textAlign: 'center',
            transform: `scale(${modelNode})`,
            opacity: modelNode,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 6px 0' }}>
            The Model
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0 }}>
            The Brain. Reasons, predicts next tokens, and devises plans.
          </p>
        </div>

        {/* Tools */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px 24px',
            boxShadow: THEME.shadows.card,
            textAlign: 'center',
            transform: `scale(${toolsNode})`,
            opacity: toolsNode,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🛠️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 6px 0' }}>
            The Tools
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0 }}>
            The Hands. Inspect files, write code, run commands, and call APIs.
          </p>
        </div>

        {/* Harness */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px 24px',
            boxShadow: THEME.shadows.card,
            textAlign: 'center',
            transform: `scale(${harnessNode})`,
            opacity: harnessNode,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏢</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 6px 0' }}>
            The Harness
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0 }}>
            The Workshop. Provides tools, coordinates the loop, and enforces safety rules.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module11Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const t1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const t2 = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const t3 = spring({ frame: frame - 300, fps, config: { damping: 14 } });
  const t4 = spring({ frame: frame - 420, fps, config: { damping: 14 } });

  const tools = [
    { name: 'View / Read', icon: '👁️', desc: 'Inspects file contents, line ranges, and directory trees without editing.', val: t1 },
    { name: 'Edit / Write', icon: '✏️', desc: 'Applies surgical line replacements or authors new documents on disk.', val: t2 },
    { name: 'Glob & Grep', icon: '🔍', desc: 'Discovers files matching wildcards and searches regex code patterns.', val: t3 },
    { name: 'Bash / Shell', icon: '⚡', desc: 'Executes terminal commands: compiler builds, test suites & git operations.', val: t4 },
  ];

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
          Core Built-In Tools in Claude Code
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          How Claude interacts with your local filesystem and operating system
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, width: 1040 }}>
        {tools.map((tool, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: THEME.shadows.card,
              transform: `scale(${tool.val})`,
              opacity: tool.val,
            }}
          >
            <div style={{ fontSize: 36 }}>{tool.icon}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
                {tool.name}
              </div>
              <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted, lineHeight: 1.4 }}>
                {tool.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module11Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const calloutSpring = spring({ frame: frame - 260, fps, config: { damping: 14 } });

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
          Direct Shell Bypass with the Exclamation Mark
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Run instant Windows terminal commands with zero AI token cost
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Terminal Demo */}
        <div
          style={{
            flex: 1.2,
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
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}># Direct Shell Command (Prefix with !)</div>
          <div style={{ color: '#f8fafc', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> <span style={{ color: '#fb923c' }}>!git status</span>
          </div>
          <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
            On branch main<br />
            Your branch is up to date with 'origin/main'.<br />
            nothing to commit, working tree clean
          </div>
        </div>

        {/* Benefits Card */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${calloutSpring})`,
            opacity: calloutSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'flex-start', marginBottom: 10 }}>
            DEVELOPER SHORTCUT
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Instant Local Execution
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Bypasses the LLM entirely. Check Git branches, inspect local files, or test environment status without consuming tokens or altering context.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module11Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const mcpSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
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
          Extensibility with Model Context Protocol (MCP)
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Connect Claude to databases, cloud platforms, and internal microservices
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* MCP Connectors */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${mcpSpring})`,
            opacity: mcpSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}># Inspect Active MCP Connectors</div>
          <div style={{ color: '#f8fafc', fontSize: 16, marginBottom: 16 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> <span style={{ color: '#a78bfa' }}>/mcp</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}># Add Enterprise Postgres Connector</div>
          <div style={{ color: '#f8fafc', fontSize: 15 }}>
            <span style={{ color: '#38bdf8' }}>PS&gt;</span> claude mcp add postgres
          </div>
        </div>

        {/* Master Formula Recap */}
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
            THE HARNESS FORMULA
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Model Thinks • Tools Act • Harness Governs
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            The model provides cognition. Tools provide hands. The harness sets boundaries and enforces permissions. You stay in command.
          </p>
        </div>
      </div>
    </div>
  );
};
