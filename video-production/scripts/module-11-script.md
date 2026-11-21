# Video Production Script: Module 11 – Tools and the Harness (MCP)

**Module Number:** Module 11
**Module Title:** Tools and the Harness (MCP)
**Top-Left Label:** `Part B • Module 11`
**Course Section:** Part B: AI Concepts for Working with Systems
**Audio Duration:** 2m 5.6s (125.62s)
**Total Frames (30fps):** 3768
**Word Count:** 268 words
**Narration Voice:** `en-US-ChristopherNeural` (Rate: `+0%` - Natural Part A Pace)
**Speaking Pace:** 128.0 WPM (Normalized to match Part A)

---

## Production Blueprint & Scene Breakdown

### Scene 1: Connecting to External Systems
- **Duration:** 972 frames (32.40s)

### Scene 2: Client-Host-Server & Transports
- **Duration:** 968 frames (32.27s)

### Scene 3: Adding Servers & Real-World Integrations
- **Duration:** 806 frames (26.87s)

### Scene 4: Security Boundaries & Read-Only Access
- **Duration:** 1022 frames (34.07s)

## Full Narration Script
[
  {
    "text": "Welcome to Module 11: Model Context Protocol, or MCP, in Claude Code.",
    "startMs": 100,
    "endMs": 6512,
    "durationMs": 6412
  },
  {
    "text": "The Model Context Protocol is an open standard that connects Claude Code to external data sources, developer tools, and enterprise services.",
    "startMs": 6462,
    "endMs": 15600,
    "durationMs": 9138
  },
  {
    "text": "Without MCP, Claude is confined strictly to your local workspace files.",
    "startMs": 15600,
    "endMs": 20975,
    "durationMs": 5375
  },
  {
    "text": "With MCP, Claude can query production databases, create Jira tickets, inspect GitHub repositories, and fetch real-time documentation without leaving your terminal.",
    "startMs": 20975,
    "endMs": 32412,
    "durationMs": 11438
  },
  {
    "text": "MCP operates on a clean client-host-server architecture.",
    "startMs": 32412,
    "endMs": 36862,
    "durationMs": 4450
  },
  {
    "text": "Claude Code acts as the MCP client, while MCP servers expose specialized tools, resources, and prompt templates that Claude can invoke dynamically.",
    "startMs": 36862,
    "endMs": 47450,
    "durationMs": 10588
  },
  {
    "text": "Connections run over local standard input and output streams for installed command-line utilities, or over secure HTTP and Server-Sent Events for remote cloud services.",
    "startMs": 47450,
    "endMs": 58600,
    "durationMs": 11150
  },
  {
    "text": "This modular architecture allows you to plug in tools without modifying your core codebase.",
    "startMs": 58600,
    "endMs": 64650,
    "durationMs": 6050
  },
  {
    "text": "On Windows, you can add MCP servers using the claude mcp add command or by editing your project settings dot json file.",
    "startMs": 64650,
    "endMs": 73450,
    "durationMs": 8800
  },
  {
    "text": "For example, you can connect a PostgreSQL server to inspect database schemas, a GitHub server to manage pull requests and issues, or a web search server to fetch the latest API documentation.",
    "startMs": 73450,
    "endMs": 86075,
    "durationMs": 12625
  },
  {
    "text": "Claude discovers the available tools automatically and calls them when relevant to your prompt.",
    "startMs": 86075,
    "endMs": 91538,
    "durationMs": 5462
  },
  {
    "text": "Because MCP servers grant access to external systems, security and authorization are critical.",
    "startMs": 91538,
    "endMs": 98650,
    "durationMs": 7112
  },
  {
    "text": "Always review the specific permissions requested by each server before installation.",
    "startMs": 98650,
    "endMs": 103975,
    "durationMs": 5325
  },
  {
    "text": "Configure sensitive connections in read-only mode whenever possible, especially when connecting to production databases.",
    "startMs": 103975,
    "endMs": 111238,
    "durationMs": 7262
  },
  {
    "text": "Never expose plain-text credentials or API secrets in configuration files.",
    "startMs": 111238,
    "endMs": 117012,
    "durationMs": 5775
  },
  {
    "text": "MCP transforms Claude Code into a fully integrated engineering hub that securely bridges your code with the modern developer ecosystem.",
    "startMs": 117012,
    "endMs": 125550,
    "durationMs": 8538
  }
]
