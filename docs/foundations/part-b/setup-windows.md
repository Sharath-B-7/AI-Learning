# Set up Claude Code on Windows
<p class="hero-lead">System Prerequisites, Native Installation & Workspace Launch</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Introductory Setup</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> **Getting Started on Windows:**
> Claude Code is Anthropic's agentic command-line tool that brings AI assistance directly into your local terminal. Unlike traditional web chatbots, Claude Code operates on your computer: reading files, running terminal commands, and modifying code under your direct supervision.
>
> This guide walks you through setting up Claude Code natively on Windows 10 or Windows 11 using PowerShell. Follow these steps once, and you will be ready to work through Modules 6 to 13.

---

## 1. Windows System Requirements

Before installing, ensure your PC meets the official requirements:

- **Operating System:** Windows 10 (version 1809 or higher), Windows 11, or Windows Server 2019+.
- **Terminal Shell:** Standard Windows PowerShell (version 5.1+ or modern PowerShell 7+), Command Prompt (CMD), or Git Bash.
- **Account Tier:** An active Anthropic account with an authorized plan (Claude Pro, Team, Enterprise, or Anthropic Console (see [Part A, Module 5: Meet Claude](../part-a/module-05-meet-claude.md)) with API credits). The free web plan does not include CLI access.
- **Official Reference:** Consult the [Part B Overview](index.md#what-is-in-this-part) for system prerequisites and release notes.

---

## 2. Opening Windows PowerShell

You do **not** need Administrator privileges to install or run Claude Code. The default installation runs entirely within your personal Windows user profile.

1. Press `Win + S` to open Windows Search.
2. Type `PowerShell` and press `Enter` (or open **Windows Terminal**).
3. Your terminal prompt will display your user home directory:
   ```powershell
   PS C:\Users\Asha>
   ```

---

## 3. Installing Claude Code

Anthropic provides an official automated installer script for Windows that configures the standalone executable and sets up your user `PATH`.

In your PowerShell window, run:

```powershell
# Run the official Windows PowerShell installation script
irm https://claude.ai/install.ps1 | iex
```

### Understanding the Command
- **`irm`**: The PowerShell alias for `Invoke-RestMethod`. It securely downloads the official installer script from `https://claude.ai/install.ps1`.
- **`|` (Pipe)**: Sends the downloaded script directly into the execution engine.
- **`iex`**: The PowerShell alias for `Invoke-Expression`. It executes the installer in your user environment.
- **Expected Result:** The installer creates a dedicated installation directory (`%LOCALAPPDATA%\Programs\claude` or user binary directory), extracts the latest binary, and adds it to your user `PATH`.

---

## 4. Alternative Installation Methods

### A. Command Prompt (CMD)
If your organization prefers Command Prompt over PowerShell, use this single-line command:

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> [!TIP]
> **Troubleshooting Command Errors:** If CMD returns `'irm' is not recognized as an internal or external command`, you are typing a PowerShell command into Command Prompt. Use the `curl` command above in CMD, or switch to PowerShell.

### B. Windows Package Manager (winget)
For system administrators or users who manage software via `winget`:

```powershell
winget install Anthropic.ClaudeCode
```

> [!NOTE]
> **Auto-Update Distinction:** Standalone native installations (`install.ps1`) automatically update in the background when new versions are released. Installations through `winget` must be manually updated via `winget upgrade Anthropic.ClaudeCode`.

---

## 5. Git for Windows and Terminal Shells

While Claude Code runs natively on Windows PowerShell without extra dependencies, installing ****Git for Windows**** is highly recommended:

- **Without Git for Windows:** Claude Code runs shell commands through the [PowerShell tool in Module 11](module-11-tools-and-harness.md#tools-the-models-hands). This handles standard file navigation, directory listings, and basic commands.
- **With Git for Windows:** Claude Code automatically leverages **Git Bash** for its [Bash tool in Module 11](module-11-tools-and-harness.md#tools-the-models-hands). This provides seamless cross-platform shell compatibility, standard Unix utilities (`grep`, `find`, `sed`), and smoother script execution.

---

## 6. Verifying the Installation

After running the installer, **close your terminal window and open a new PowerShell window**. This refreshes your environment variables so Windows recognizes the new `claude` command.

Run the following verification commands:

```powershell
# 1. Check the installed version
claude --version

# 2. Run system and environment diagnostics
claude doctor
```

### What to Expect:
- **`claude --version`** prints the active version string (e.g., `claude 1.0.x`).
- **`claude doctor`** performs a comprehensive diagnostic scan: verifying executable integrity, checking network connectivity to Anthropic API endpoints, checking user directory permissions, and reporting update status.
- If Windows reports `'claude' is not recognized`, see the [FAQ: Troubleshooting](faq.md#3-windows-displays-an-error-claude-is-not-recognized-as-an-internal-or-external-command-how-do-i-fix-it) or restart your computer to ensure PATH changes take effect.

---

## 7. Starting Your First Session

### Step 1: Navigate to Your Project Directory
Always change directory (`cd`) into the specific folder you want Claude to inspect **before** starting the program. That directory becomes Claude's local workspace (its "desk", detailed in [Module 7](module-07-context.md)).

```powershell
PS C:\Users\Asha> cd C:\Work\WeeklyReports
PS C:\Work\WeeklyReports>
```

### Step 2: Launch Claude Code
Start the interactive session:

```powershell
PS C:\Work\WeeklyReports> claude
```

### Step 3: First-Time Authentication
On your very first launch, Claude Code opens your default web browser to the Anthropic authentication portal.
1. Sign in with your Anthropic account.
2. Authorize Claude Code CLI.
3. Return to PowerShell. You will see the interactive prompt:
   ```text
   >
   ```
You are now ready to issue plain-English instructions! For an overview of interactive features, explore the [Part B Overview](index.md#what-is-in-this-part) and [Module 8: Interactive Commands](module-08-prompting.md#try-it-in-claude-code-input-shortcuts-workflow-keys).

---

## 8. Starting, Resuming, and Leaving Sessions

Managing your sessions cleanly ensures that your workspace stays organized and your token usage remains efficient:

| Command | Where to Execute | What It Does & When to Use It | Expected Output |
| :--- | :--- | :--- | :--- |
| `claude` | PowerShell / CMD | Starts a fresh interactive session in the current folder. | Interactive prompt `>` ready for input. |
| `claude -c` | PowerShell / CMD | **Continue:** Resumes the most recent conversation in this folder. | Restores previous turn history and desk state. |
| `claude -r` | PowerShell / CMD | **Resume:** Displays a menu of earlier sessions to choose from. | Interactive list with session titles and timestamps. |
| `claude -p "..."` | PowerShell / CMD | **Headless Print:** Runs a single prompt non-interactively and exits. | Outputs answer to console; ideal for batch scripts. |
| `claude --model sonnet` | PowerShell / CMD | Launches Claude Code directly with a specified [model tier](module-06-types-of-models.md). | Starts session pinned to Sonnet. |
| `claude --permission-mode plan` | PowerShell / CMD | Starts session in read-only [Plan mode](module-12-agents.md) (no file changes). | Session starts with plan guardrails active. |
| `/exit` or `Ctrl + C` | Inside Claude Code (`>`) | Terminates the current interactive session cleanly. | Returns you to the Windows `PS C:\...>` prompt. |
| `claude update` | PowerShell / CMD | Manually checks for and applies software updates. | Prints confirmation of current or updated version. |

> [!TIP]
> **Sessions Reference:** For advanced session workflows, consult the [Module 9: Session Resumption](module-09-memory.md#continuing-past-conversations-vs-memory) and [Windows Command Cheat Sheet](index.md#windows-command-cheat-sheet).

---

## 9. Comprehensive Setup Command Reference

| Action | Exact Command Syntax | Execution Location | Expected Output / Result |
| :--- | :--- | :--- | :--- |
| **Install (PowerShell)** | `irm https://claude.ai/install.ps1 \| iex` | Windows PowerShell | Downloads and registers `claude.exe` in user PATH |
| **Install (CMD)** | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` | Command Prompt (CMD) | Installs via batch script and cleans up installer |
| **Install (winget)** | `winget install Anthropic.ClaudeCode` | PowerShell / CMD | Installs via Windows Package Manager repository |
| **Check Version** | `claude --version` | Fresh PowerShell | Prints active version (e.g., `claude 1.0.x`) |
| **Diagnostics** | `claude doctor` | Fresh PowerShell | Verifies dependencies, network, and token permissions |
| **Navigate Workspace** | `cd C:\Work\YourProject` | PowerShell | Changes current directory to project folder |
| **Start Interactive** | `claude` | PowerShell in project | Authenticates (first time) and shows `>` prompt |
| **Continue Last** | `claude -c` | PowerShell in project | Reopens most recent conversation history |
| **Resume Any** | `claude -r` | PowerShell in project | Shows numbered menu of past sessions to resume |
| **Headless Query** | `claude -p "summarize @tasks.csv"` | PowerShell / CMD | Generates output directly to terminal without chat |
| **Launch in Plan Mode** | `claude --permission-mode plan` | PowerShell | Launches with file write protections enforced |
| **Exit Session** | `/exit` | Inside Claude Code (`>`) | Closes session and returns to Windows prompt |
| **Update CLI** | `claude update` | PowerShell / CMD | Fetches and installs latest official release |

---

> [!IMPORTANT]
> **Golden Rule of Setup:** Always `cd` into your project directory before typing `claude`. That directory defines Claude's workspace, loads its project memory (`CLAUDE.md`), and enforces permission boundaries.

---

## Next Steps

Now that Claude Code is installed and verified on your Windows computer, proceed to **Module 6** to learn how to choose the right model tier for every task.

---

<div class="hero-actions">
  <a href="../" class="md-button">← Part B Overview</a>
  <a href="../module-06-types-of-models/" class="md-button md-button--primary">Next: Module 6 — Types of Models →</a>
</div>
