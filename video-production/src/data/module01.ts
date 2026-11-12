import { SubtitleItem } from '../components/Subtitle';

export interface SceneMeta {
  id: string;
  sceneNumber: number;
  title: string;
  startFrame: number;
  durationInFrames: number;
  description: string;
}

export const MODULE_INFO = {
  id: 'module-01',
  track: 'Part A: AI Fundamentals',
  moduleNumber: 1,
  title: 'What Is AI?',
  description: "A beginner's guide to understanding what AI is, everyday narrow AI vs general-purpose assistants, the conceptual hierarchy, and mental models.",
  fps: 30,
  width: 1920,
  height: 1080,
  totalDurationInFrames: 5558,
  audioDurationSeconds: 185.234,
};

export const SCENES_TIMING: SceneMeta[] = [
  {
    "id": "scene-01",
    "sceneNumber": 1,
    "title": "Introduction",
    "startFrame": 0,
    "durationInFrames": 324,
    "description": "AI MASTERCLASS & Module 01: What Is AI?"
  },
  {
    "id": "scene-02",
    "sceneNumber": 2,
    "title": "What Is AI?",
    "startFrame": 324,
    "durationInFrames": 411,
    "description": "Defining Artificial Intelligence and Core Tasks"
  },
  {
    "id": "scene-03",
    "sceneNumber": 3,
    "title": "Everyday AI",
    "startFrame": 735,
    "durationInFrames": 525,
    "description": "AI Designed for Specific Everyday Tasks"
  },
  {
    "id": "scene-04",
    "sceneNumber": 4,
    "title": "General-Purpose AI",
    "startFrame": 1260,
    "durationInFrames": 426,
    "description": "The AI Assistant: Write, Summarize, Explain, Plan, Analyze"
  },
  {
    "id": "scene-05",
    "sceneNumber": 5,
    "title": "How Terms Fit Together",
    "startFrame": 1686,
    "durationInFrames": 900,
    "description": "AI -> Machine Learning -> Large Language Models"
  },
  {
    "id": "scene-06",
    "sceneNumber": 6,
    "title": "Why Is This Happening Now?",
    "startFrame": 2586,
    "durationInFrames": 456,
    "description": "Three Forces: Massive Text, Powerful Compute, Modern Architecture"
  },
  {
    "id": "scene-07",
    "sceneNumber": 7,
    "title": "The New Colleague Analogy",
    "startFrame": 3042,
    "durationInFrames": 642,
    "description": "A Useful Mental Model for Working with Claude"
  },
  {
    "id": "scene-08",
    "sceneNumber": 8,
    "title": "Common Myths",
    "startFrame": 3684,
    "durationInFrames": 1026,
    "description": "Debunking the Four Major AI Misconceptions"
  },
  {
    "id": "scene-09",
    "sceneNumber": 9,
    "title": "Hands-On Exercise",
    "startFrame": 4710,
    "durationInFrames": 848,
    "description": "Workplace Task Identification & Module Conclusion"
  }
];

export const SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-0",
    "startFrame": 0,
    "endFrame": 55,
    "text": "Welcome to AI Masterclass.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-1",
    "startFrame": 73,
    "endFrame": 179,
    "text": "In this module, we'll explore a simple but important question.",
    "highlightWords": []
  },
  {
    "id": "sub-2",
    "startFrame": 197,
    "endFrame": 252,
    "text": "What is artificial intelligence?",
    "highlightWords": [
      "artificial",
      "intelligence"
    ]
  },
  {
    "id": "sub-3",
    "startFrame": 276,
    "endFrame": 313,
    "text": "Let's start with the basics.",
    "highlightWords": []
  },
  {
    "id": "sub-4",
    "startFrame": 337,
    "endFrame": 449,
    "text": "Artificial intelligence, or AI, means computer programs",
    "highlightWords": [
      "AI",
      "Artificial",
      "intelligence"
    ]
  },
  {
    "id": "sub-5",
    "startFrame": 449,
    "endFrame": 551,
    "text": "that can perform tasks that normally require human thinking.",
    "highlightWords": []
  },
  {
    "id": "sub-6",
    "startFrame": 568,
    "endFrame": 640,
    "text": "These tasks include understanding language,",
    "highlightWords": [
      "language"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 656,
    "endFrame": 717,
    "text": "spotting patterns, and making suggestions.",
    "highlightWords": []
  },
  {
    "id": "sub-8",
    "startFrame": 739,
    "endFrame": 845,
    "text": "You may already use AI every day without even noticing it.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-9",
    "startFrame": 845,
    "endFrame": 900,
    "text": "Your email filters spam.",
    "highlightWords": [
      "spam"
    ]
  },
  {
    "id": "sub-10",
    "startFrame": 917,
    "endFrame": 994,
    "text": "Your phone suggests the next word as you type.",
    "highlightWords": []
  },
  {
    "id": "sub-11",
    "startFrame": 1009,
    "endFrame": 1066,
    "text": "Streaming apps recommend what to watch,",
    "highlightWords": []
  },
  {
    "id": "sub-12",
    "startFrame": 1073,
    "endFrame": 1133,
    "text": "and maps estimate your travel time.",
    "highlightWords": []
  },
  {
    "id": "sub-13",
    "startFrame": 1148,
    "endFrame": 1250,
    "text": "These are examples of AI designed for specific tasks.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 1268,
    "endFrame": 1346,
    "text": "The AI we explore in this course is different.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-15",
    "startFrame": 1364,
    "endFrame": 1417,
    "text": "It is a general purpose assistant.",
    "highlightWords": [
      "purpose",
      "general"
    ]
  },
  {
    "id": "sub-16",
    "startFrame": 1436,
    "endFrame": 1502,
    "text": "You communicate with it using normal language,",
    "highlightWords": [
      "language"
    ]
  },
  {
    "id": "sub-17",
    "startFrame": 1509,
    "endFrame": 1621,
    "text": "and it can help you write, summarize, explain, plan,",
    "highlightWords": [
      "plan",
      "summarize",
      "write",
      "explain"
    ]
  },
  {
    "id": "sub-18",
    "startFrame": 1627,
    "endFrame": 1670,
    "text": "and analyze information.",
    "highlightWords": [
      "analyze"
    ]
  },
  {
    "id": "sub-19",
    "startFrame": 1696,
    "endFrame": 1757,
    "text": "Let's understand three important terms.",
    "highlightWords": []
  },
  {
    "id": "sub-20",
    "startFrame": 1780,
    "endFrame": 1847,
    "text": "Artificial intelligence, machine learning,",
    "highlightWords": [
      "machine",
      "learning",
      "Artificial",
      "intelligence"
    ]
  },
  {
    "id": "sub-21",
    "startFrame": 1859,
    "endFrame": 1902,
    "text": "and large language models.",
    "highlightWords": [
      "models",
      "language"
    ]
  },
  {
    "id": "sub-22",
    "startFrame": 1928,
    "endFrame": 2051,
    "text": "AI is the big umbrella, computers performing smart tasks.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-23",
    "startFrame": 2069,
    "endFrame": 2136,
    "text": "Machine learning is a way of building AI",
    "highlightWords": [
      "AI",
      "learning",
      "Machine"
    ]
  },
  {
    "id": "sub-24",
    "startFrame": 2136,
    "endFrame": 2203,
    "text": "where computers learn from many examples",
    "highlightWords": []
  },
  {
    "id": "sub-25",
    "startFrame": 2203,
    "endFrame": 2276,
    "text": "instead of being given step-by-step rules.",
    "highlightWords": []
  },
  {
    "id": "sub-26",
    "startFrame": 2296,
    "endFrame": 2435,
    "text": "A large language model, or LLM, is a type of machine learning model",
    "highlightWords": [
      "LLM",
      "machine",
      "learning",
      "language"
    ]
  },
  {
    "id": "sub-27",
    "startFrame": 2435,
    "endFrame": 2512,
    "text": "built to understand and write human language.",
    "highlightWords": [
      "write",
      "language"
    ]
  },
  {
    "id": "sub-28",
    "startFrame": 2512,
    "endFrame": 2566,
    "text": "Claude is one example.",
    "highlightWords": [
      "Claude"
    ]
  },
  {
    "id": "sub-29",
    "startFrame": 2596,
    "endFrame": 2690,
    "text": "Three things came together to make modern AI possible.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-30",
    "startFrame": 2709,
    "endFrame": 2805,
    "text": "First, huge amounts of text became available for learning.",
    "highlightWords": [
      "learning"
    ]
  },
  {
    "id": "sub-31",
    "startFrame": 2822,
    "endFrame": 2905,
    "text": "Second, computers became much more powerful,",
    "highlightWords": []
  },
  {
    "id": "sub-32",
    "startFrame": 2918,
    "endFrame": 3023,
    "text": "and third, better ways of designing these systems were developed.",
    "highlightWords": []
  },
  {
    "id": "sub-33",
    "startFrame": 3047,
    "endFrame": 3143,
    "text": "Imagine a new colleague who has read an enormous amount,",
    "highlightWords": []
  },
  {
    "id": "sub-34",
    "startFrame": 3154,
    "endFrame": 3246,
    "text": "works instantly, and is happy to help with almost anything.",
    "highlightWords": []
  },
  {
    "id": "sub-35",
    "startFrame": 3261,
    "endFrame": 3334,
    "text": "But this colleague knows nothing about your company,",
    "highlightWords": []
  },
  {
    "id": "sub-36",
    "startFrame": 3334,
    "endFrame": 3394,
    "text": "your customers, or your project,",
    "highlightWords": []
  },
  {
    "id": "sub-37",
    "startFrame": 3403,
    "endFrame": 3460,
    "text": "until you provide that information.",
    "highlightWords": []
  },
  {
    "id": "sub-38",
    "startFrame": 3475,
    "endFrame": 3530,
    "text": "Sometimes they also make mistakes.",
    "highlightWords": []
  },
  {
    "id": "sub-39",
    "startFrame": 3553,
    "endFrame": 3626,
    "text": "Good results come from explaining things clearly",
    "highlightWords": []
  },
  {
    "id": "sub-40",
    "startFrame": 3626,
    "endFrame": 3667,
    "text": "and checking their work.",
    "highlightWords": []
  },
  {
    "id": "sub-41",
    "startFrame": 3692,
    "endFrame": 3743,
    "text": "Let's look at four common myths.",
    "highlightWords": [
      "myths"
    ]
  },
  {
    "id": "sub-42",
    "startFrame": 3767,
    "endFrame": 3834,
    "text": "First, AI thinks like a human.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-43",
    "startFrame": 3853,
    "endFrame": 3871,
    "text": "It doesn't.",
    "highlightWords": []
  },
  {
    "id": "sub-44",
    "startFrame": 3881,
    "endFrame": 3984,
    "text": "It works very differently, even if it's replies feel natural.",
    "highlightWords": []
  },
  {
    "id": "sub-45",
    "startFrame": 4006,
    "endFrame": 4078,
    "text": "Second, AI is just like Google.",
    "highlightWords": [
      "Google",
      "AI"
    ]
  },
  {
    "id": "sub-46",
    "startFrame": 4094,
    "endFrame": 4156,
    "text": "Google finds existing web pages.",
    "highlightWords": [
      "Google"
    ]
  },
  {
    "id": "sub-47",
    "startFrame": 4156,
    "endFrame": 4243,
    "text": "Claude generates a new answer each time.",
    "highlightWords": [
      "Claude"
    ]
  },
  {
    "id": "sub-48",
    "startFrame": 4265,
    "endFrame": 4330,
    "text": "Third, AI is always right.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-49",
    "startFrame": 4345,
    "endFrame": 4420,
    "text": "It can make mistakes and still sound confident.",
    "highlightWords": []
  },
  {
    "id": "sub-50",
    "startFrame": 4443,
    "endFrame": 4518,
    "text": "Fourth, AI learns from me instantly.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-51",
    "startFrame": 4534,
    "endFrame": 4596,
    "text": "It doesn't change itself during your chat.",
    "highlightWords": []
  },
  {
    "id": "sub-52",
    "startFrame": 4608,
    "endFrame": 4691,
    "text": "It uses the information available in your conversation.",
    "highlightWords": []
  },
  {
    "id": "sub-53",
    "startFrame": 4723,
    "endFrame": 4777,
    "text": "Now, think about your own work day.",
    "highlightWords": []
  },
  {
    "id": "sub-54",
    "startFrame": 4795,
    "endFrame": 4879,
    "text": "Identify three tasks where you spend time writing,",
    "highlightWords": []
  },
  {
    "id": "sub-55",
    "startFrame": 4895,
    "endFrame": 4949,
    "text": "reading, or organizing information.",
    "highlightWords": []
  },
  {
    "id": "sub-56",
    "startFrame": 4966,
    "endFrame": 5059,
    "text": "These are three places where AI could potentially help.",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-57",
    "startFrame": 5072,
    "endFrame": 5091,
    "text": "Write them down.",
    "highlightWords": [
      "Write"
    ]
  },
  {
    "id": "sub-58",
    "startFrame": 5101,
    "endFrame": 5153,
    "text": "We'll come back to them in a later module.",
    "highlightWords": []
  },
  {
    "id": "sub-59",
    "startFrame": 5172,
    "endFrame": 5222,
    "text": "That concludes Module 1.",
    "highlightWords": []
  },
  {
    "id": "sub-60",
    "startFrame": 5236,
    "endFrame": 5262,
    "text": "What is AI?",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-61",
    "startFrame": 5283,
    "endFrame": 5310,
    "text": "In the next module,",
    "highlightWords": []
  },
  {
    "id": "sub-62",
    "startFrame": 5317,
    "endFrame": 5375,
    "text": "we'll explore large language models",
    "highlightWords": [
      "models",
      "language"
    ]
  },
  {
    "id": "sub-63",
    "startFrame": 5375,
    "endFrame": 5428,
    "text": "and how they generate responses.",
    "highlightWords": []
  },
  {
    "id": "sub-64",
    "startFrame": 5452,
    "endFrame": 5487,
    "text": "AI Masterclass,",
    "highlightWords": [
      "AI"
    ]
  },
  {
    "id": "sub-65",
    "startFrame": 5508,
    "endFrame": 5545,
    "text": "Tactive AI Team.",
    "highlightWords": [
      "AI"
    ]
  }
];
