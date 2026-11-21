import { SubtitleItem } from '../components/Subtitle';

export const MODULE_11_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 195,
    "text": "Welcome to Module 11: Model Context Protocol, or MCP, in Claude Code.",
    "highlightWords": [
      "Model",
      "Context",
      "Protocol",
      "MCP",
      "claude"
    ]
  },
  {
    "id": "sub-2",
    "startFrame": 194,
    "endFrame": 468,
    "text": "The Model Context Protocol is an open standard that connects Claude Code to external data sources, developer tools, and enterprise services.",
    "highlightWords": [
      "Model",
      "Context",
      "Protocol",
      "claude"
    ]
  },
  {
    "id": "sub-3",
    "startFrame": 468,
    "endFrame": 629,
    "text": "Without MCP, Claude is confined strictly to your local workspace files.",
    "highlightWords": [
      "MCP",
      "claude"
    ]
  },
  {
    "id": "sub-4",
    "startFrame": 629,
    "endFrame": 972,
    "text": "With MCP, Claude can query production databases, create Jira tickets, inspect GitHub repositories, and fetch real-time documentation without leaving your terminal.",
    "highlightWords": [
      "MCP",
      "GitHub",
      "claude"
    ]
  },
  {
    "id": "sub-5",
    "startFrame": 972,
    "endFrame": 1106,
    "text": "MCP operates on a clean client-host-server architecture.",
    "highlightWords": [
      "MCP",
      "client",
      "server"
    ]
  },
  {
    "id": "sub-6",
    "startFrame": 1106,
    "endFrame": 1424,
    "text": "Claude Code acts as the MCP client, while MCP servers expose specialized tools, resources, and prompt templates that Claude can invoke dynamically.",
    "highlightWords": [
      "MCP",
      "client",
      "server",
      "claude"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1424,
    "endFrame": 1758,
    "text": "Connections run over local standard input and output streams for installed command-line utilities, or over secure HTTP and Server-Sent Events for remote cloud services.",
    "highlightWords": [
      "server"
    ]
  },
  {
    "id": "sub-8",
    "startFrame": 1758,
    "endFrame": 1940,
    "text": "This modular architecture allows you to plug in tools without modifying your core codebase.",
    "highlightWords": []
  },
  {
    "id": "sub-9",
    "startFrame": 1940,
    "endFrame": 2204,
    "text": "On Windows, you can add MCP servers using the 'claude mcp add' command or by editing your project settings.json file.",
    "highlightWords": [
      "MCP",
      "server",
      "claude"
    ]
  },
  {
    "id": "sub-10",
    "startFrame": 2204,
    "endFrame": 2582,
    "text": "For example, you can connect a PostgreSQL server to inspect database schemas, a GitHub server to manage pull requests and issues, or a web search server to fetch the latest API documentation.",
    "highlightWords": [
      "server",
      "PostgreSQL",
      "GitHub"
    ]
  },
  {
    "id": "sub-11",
    "startFrame": 2582,
    "endFrame": 2746,
    "text": "Claude discovers the available tools automatically and calls them when relevant to your prompt.",
    "highlightWords": [
      "claude"
    ]
  },
  {
    "id": "sub-12",
    "startFrame": 2746,
    "endFrame": 2960,
    "text": "Because MCP servers grant access to external systems, security and authorization are critical.",
    "highlightWords": [
      "MCP",
      "server"
    ]
  },
  {
    "id": "sub-13",
    "startFrame": 2960,
    "endFrame": 3119,
    "text": "Always review the specific permissions requested by each server before installation.",
    "highlightWords": [
      "server"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 3119,
    "endFrame": 3337,
    "text": "Configure sensitive connections in read-only mode whenever possible, especially when connecting to production databases.",
    "highlightWords": []
  },
  {
    "id": "sub-15",
    "startFrame": 3337,
    "endFrame": 3510,
    "text": "Never expose plain-text credentials or API secrets in configuration files.",
    "highlightWords": []
  },
  {
    "id": "sub-16",
    "startFrame": 3510,
    "endFrame": 3766,
    "text": "MCP transforms Claude Code into a fully integrated engineering hub that securely bridges your code with the modern developer ecosystem.",
    "highlightWords": [
      "MCP",
      "claude"
    ]
  }
];
