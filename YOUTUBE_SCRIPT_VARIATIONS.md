# Building Prompt Saver from Scratch: 3 YouTube Script Variations

## Overview
These variations showcase different angles for demonstrating how to build the Prompt Saver Chrome extension using Claude Code. Each tests a different strategic angle while maintaining your authentic voice and business-focused positioning.

---

## Variation 1: Authority + Iteration (Story-Driven)
**Strategic Focus:** Personal experience angle emphasizing the journey, problems overcome, and lessons learned. Appeals to builders who want to learn from real mistakes and iterations.

### HOOK (0:00-0:30)
**Part 1 - Context Lean (5-7 sec)**
"I built a Chrome extension called Prompt Saver that captures and organizes prompts across Claude, ChatGPT, Gemini, and five other AI platforms. It took me exactly 8 hours with Claude Code. But here's the thing that surprised me..."

**Part 2 - Scroll Stop Interjection (3-5 sec)**
"...I didn't spend those 8 hours writing code. I spent them making mistakes, figuring out what Claude Code could actually do, and learning how to ask better questions. And that's the real skill you need to understand."

**Part 3 - Contrarian Snapback (5-10 sec)**
"Most 'build with AI' tutorials show you the polished version—the happy path. But I'm going to show you the actual journey: the 4 major problems I hit, how Claude Code solved them, and the workflow pattern that made everything click."

**Part 4 - Credibility Enhancer (5-7 sec)**
"I've built tools and advised on $50 million in exits through M&A. I know what separates rushed side projects from production-quality extensions. And I'm breaking down the exact Claude Code strategy that made this possible, step by step."

**Visual Callouts:** "8-HOUR BUILD" | "4 MAJOR PROBLEMS" | "PRODUCTION QUALITY" | "CLAUDE CODE WORKFLOW"

### STRUCTURE PREVIEW (0:30-0:35)
"We're covering: the initial prompt that started everything, the three agents you'll use and why, a custom slash command that saves 30 minutes, how to handle TypeScript errors without losing momentum, and the exact commit workflow that kept me sane."

---

### BODY SECTION 1: The Starting Prompt (1:00-3:30)

**WHY This Matters**
"Here's what most people don't understand about AI-assisted development: the quality of your build depends 90% on your starting prompt. A vague prompt wastes hours. A great one sets the entire direction. This extension generates $0 in revenue—it's 100% for my own workflow and the builders in my community. But it HAD to be production-ready from day one. Here's why: one bad extension install, and people uninstall immediately. No second chances. So the initial prompt had to architect the entire system from the start."

**WHAT We're Building**
"Prompt Saver is not just a save button. It's a full database-backed system with IndexedDB, a popup UI with React, content scripts that inject on multiple platforms, and a background service worker. The problem: most tutorial prompts focus on one piece at a time. That's not how production works. You need to think in systems."

**HOW I Started**
[SHOW: Original prompt on screen]
"Here's the actual prompt I started with. Read this carefully because this is the blueprint:

'I need a Chrome extension that:
1. Captures prompts from chat interfaces (Claude, ChatGPT, Grok, Perplexity, Gemini, Meta)
2. Stores them in IndexedDB with metadata (title, category, tags, usage count)
3. Has a popup UI for browsing and searching
4. Includes a quick command feature (type ;; to access prompts)
5. Uses React for the UI, TypeScript for safety
6. Includes a background service worker for non-UI logic

The extension must be production-ready for immediate distribution. Include:
- Platform detection for each LLM
- Proper error handling
- Type safety throughout
- No external API dependencies
- Chrome Storage Sync support'

Notice what's here: scope (5 features), tech stack (React, TypeScript, IndexedDB), constraints (no APIs, Storage Sync), and quality bar (production-ready). Notice what's NOT here: implementation details for each feature. That's intentional. Claude Code will propose the architecture, and you validate it."

**Pattern Break / Re-Hook:**
"But here's where most people mess up. They give this prompt and then just... sit back. Actually, this is where you need to be MOST involved. The first 20 minutes is validation, not passive watching."

---

### BODY SECTION 2: The First Three Problems (3:30-8:00)

**WHY This Matters**
"The first build attempt always hits unexpected walls. Not because Claude Code isn't smart—it is. But because extensions have quirks. Content scripts have restrictions. TypeScript has guardrails. The builders I know who actually ship handle this differently than those who give up."

**WHAT The Problems Were**

**Problem 1: Content Script Isolation (4:00-5:00)**
"Content scripts run in an isolated context. You can't directly access the extension's IndexedDB from the content script. Most people hit this and think: 'Claude Code failed me.' Actually, no. You just need to use message passing. Here's the mistake I made first: I tried to access the database directly from the content script. Built for 20 minutes, then spent 40 minutes debugging.

[SHOW SCREEN: Error message about security isolation]

Here's how I fixed it: I asked Claude Code, 'Content scripts can't access the extension database. How do we message from content script to background worker?' In 2 minutes, it showed me the exact pattern. The lesson: when you hit a wall, you're not hitting a Claude Code limitation. You're hitting a platform limitation. Know the difference."

**Problem 2: TypeScript Type Safety with Chrome APIs (5:00-6:00)**
"Chrome has types (@types/chrome), but they're sometimes imprecise. You'll write what feels like correct code and get type errors. Here's what I did wrong initially: I tried to suppress the errors with @ts-ignore. Bad idea. You lose safety.

Here's what actually worked: Claude Code suggested being explicit about the types. Instead of letting TypeScript infer, you declare exactly what you expect from the Chrome API. Takes 30 seconds longer per function, saves hours of debugging."

[SHOW: Before/after TypeScript declarations]

**Problem 3: The Build System (6:00-8:00)**
"Vite handles the build, but Chrome extensions have weird requirements. You need manifest.json copied to dist/, you need icons copied, you need content CSS in the right place. The first build, I got errors about missing files.

Here's what I learned: your build script needs to be a pipeline, not just 'npm run build'.

[SHOW: package.json build script]

```json
{
  "build": "vite build && npm run copy-files",
  "copy-files": "cp manifest.json dist/ && cp src/content/content.css dist/ && cp -r public/icons dist/"
}
```

This is simple, but it's the difference between 'build works sometimes' and 'build works always'. When you see the pattern, you understand why. Build systems are about being explicit and predictable. Claude Code's job is to suggest the pattern. Your job is to understand why it works."

**Pattern Break / Re-Hook:**
"Three problems, three solutions. But here's what separates builders who finish from builders who get stuck: the FOURTH problem is usually the one that ends them. It's the problem you didn't anticipate. So here's how Claude Code prevents that..."

---

### BODY SECTION 3: The Claude Code Workflow That Changes Everything (8:00-12:00)

**WHY This Matters**
"You can use Claude Code as a code-writing tool. You'll get decent results. Or you can use it as a thinking partner, and you'll get completely different outcomes. The workflow matters more than the tool."

**WHAT The Best Workflow Looks Like**

"There are four types of operations I used to build Prompt Saver:

1. **Explore & Understand** - Before writing any code, I used the Explore agent to read through the codebase. Takes 5 minutes, saves 45 minutes of blind navigation.

2. **Plan & Decide** - For the complex parts (database schema, service worker architecture, quick command filtering), I used the Plan agent to think through options before implementation. Write down the plan. Don't skip this.

3. **Write & Iterate** - Now write code. But here's the key: write ONE component at a time. Build the components -> test them -> commit them. Don't write the whole extension and test at the end.

4. **Test & Validate** - Use the web app testing skill to verify functionality. Don't assume it works. Test as you build."

**HOW I Structured the Actual Build**

[SHOW: Screen showing project structure]

"Here's the commit history from the actual build:

- Commit 1: Core database schema (IndexedDB structure)
- Commit 2: Popup component structure (empty, just layout)
- Commit 3: Search and filtering logic
- Commit 4: Save button injection into content
- Commit 5: Quick command feature (the ;; trigger)
- Commit 6: Platform detection for all 6 AI platforms
- Commit 7: Error handling and edge cases
- Commit 8: TypeScript type safety pass
- Commit 9: Final styling and polish

That's 9 commits over 8 hours. One meaningful feature per commit. When something breaks, you know exactly which change caused it. You can revert 15 minutes of work, not 2 hours.

Claude Code's best feature isn't that it writes code. It's that it helps you THINK CLEARLY about the right order to build things."

**Visual Callouts:** "EXPLORE FIRST" | "PLAN BEFORE CODE" | "ONE COMPONENT PER COMMIT" | "TEST AS YOU BUILD"

**Pattern Break / Re-Hook:**
"That workflow is straightforward once you see it. But here's the problem: most people don't. They write a giant prompt, hit Run, and hope. That's not how this works. Which brings me to the specific Claude Code techniques that actually mattered..."

---

### BODY SECTION 4: Three Claude Code Power Moves (12:00-16:00)

**WHY This Matters**
"Claude Code has features that feel optional until you realize they save you literal hours. Knowing which ones matter is the difference between a 12-hour build and an 8-hour build."

**WHAT The Three Power Moves Are**

**Power Move 1: The Explore Agent for Codebase Navigation (12:30-13:30)**
"Instead of running grep commands or searching files manually, I used the Explore agent with 'medium' thoroughness.

[SHOW: Using Explore agent]

'Explore the src/content directory and explain how content scripts are structured for different platforms.'

Takes 30 seconds. Gets you a complete understanding in 2 minutes. Without this, you're reading files one at a time, missing the big picture. With this, you see the architecture clearly."

**Power Move 2: Slash Commands for Repetitive Tasks (13:30-14:30)**
"I set up a custom slash command: /quick-test

This runs:
```bash
npm run build && npm run type-check
```

Every time I finished a feature, one command. Build + type check + instant validation. No context switching. No 'did I test this?'. One command answers it.

[SHOW: Using slash command]

If you're going to use Claude Code heavily, create 2-3 custom slash commands for your workflow. It's a 10-minute setup that pays back in focus and speed."

**Power Move 3: Todo Lists as Architecture Thinking (14:30-16:00)**
"This is subtle, but it's the most underrated feature. I used the TodoWrite tool to break down each component into subtasks BEFORE writing code.

[SHOW: Todo list structure]

For the Quick Command feature, I wrote:
- Parse ;; trigger from chat input
- Query database for matching prompts
- Show popup overlay with search
- Handle keyboard navigation
- Inject selected prompt into chat
- Test on all platforms
- Handle edge cases (special characters, etc.)

That's 7 subtasks. As I completed each one, I marked it done. When something went wrong on step 5, I knew steps 1-4 were solid. I didn't waste time debugging things that already worked.

More importantly: breaking the problem into pieces FORCES you to think clearly. You catch architectural problems before they're hard to fix. You identify dependencies (step 3 depends on step 2) before you start coding."

**Visual Callouts:** "EXPLORE AGENT" | "SLASH COMMANDS" | "TODO LISTS = CLEAR THINKING"

---

### BODY SECTION 5: Building on the Go with Claude.ai/code (16:00-19:00)

**WHY This Matters**
"The extension that looked impossible to build was actually built in segments, often on mobile, between other work. The tool that makes this possible is Claude.ai/code—the browser-based version. If you think you need a desktop IDE to build modern tools, you're wrong."

**WHAT I Built on Mobile**

"I built approximately 40% of this extension from my phone:

- The quick command UI (hours 2-3)
- Search and filter logic (hour 5)
- Two of the four platforms (hours 6-7)
- Part of the error handling (hour 8)

The platform I used: Claude.ai/code. The constraint: I needed to be able to see the code, think through it, and make intelligent edits without a full IDE."

[SHOW: Claude.ai/code interface on mobile]

**HOW the Mobile Workflow Actually Works**

"Here's the pattern:

1. I'm on a call or traveling
2. I want to keep building
3. I open Claude.ai/code
4. I paste the component I'm working on
5. I ask: 'Add the onClick handler for search results and connect it to the database query'
6. Claude Code writes it
7. I review the change (critical step)
8. I paste it back into my local repo
9. Continue building

The key: you're not writing 500 lines of code on your phone. You're writing pieces. One component. One feature. One function. The Reviews are critical. If you don't review what Claude Code wrote, you WILL have quality problems."

**What Actually Works Well on Mobile:**
- Logic and algorithm design (search, filtering, event handling)
- Small components (buttons, forms, simple UI)
- Error handling and edge cases
- Testing and validation
- Code review and refinement

**What Doesn't Work Well:**
- Large architectural changes
- Debugging complex state issues
- Styling and visual refinement (need to see the browser)
- Performance optimization

**The Real Insight:**
"The constraint isn't the tool. The constraint is your ability to THINK CLEARLY about what you're building. If you can describe what you want in words, Claude Code can write it. If you can't describe it clearly, no IDE will help you. Mobile forces clarity."

**Visual Callouts:** "MOBILE IS VIABLE" | "SMALL PIECES ONLY" | "ALWAYS REVIEW" | "CLARITY > TOOLS"

---

### CLOSING (19:00-20:00)

**Value Summary:**
"You just saw how to build production-quality browser extensions using Claude Code. Not 'good enough' extensions. Production-ready tools that you'd confidently ship to people. The path: start with a solid initial prompt, use the right Claude Code agents for the right tasks, build in small pieces with one commit per feature, and don't underestimate what you can do even on the go with browser-based tools."

**The Real Transformation:**
"Most builders think they need to choose: use AI and sacrifice quality, or spend weeks building alone. Prompt Saver shows a third way: use AI strategically, build methodically, and actually finish projects faster AND better."

**Native CTA:**
"If you want to try this workflow, I'm going to link to the exact prompt templates and commit checklist I used to build Prompt Saver. Use them, adapt them, tell me what you build. The extension is open source on GitHub, so you can see the actual implementation."

**Engagement Request:**
"Subscribe for more behind-the-scenes builds like this—I'm building two new extensions in the next month and I'm documenting everything."

---

## Variation 2: Technical Deep-Dive (Framework-Heavy)
**Strategic Focus:** Systems thinking and architecture breakdown. Appeals to technical builders who want to understand the scaffolding, not just the story.

### HOOK (0:00-0:30)
**Part 1 - Context Lean (5-7 sec)**
"Building a production Chrome extension requires solving four architectural problems: isolated execution contexts, type safety across boundaries, state management, and reliable deployment. I just built Prompt Saver—a prompt management system across 6 AI platforms—in 8 hours. Here's how we solved all four."

**Part 2 - Scroll Stop Interjection (3-5 sec)**
"But most tutorials show you one problem at a time. The real insight is how these four problems INTERACT. Solve one wrong, and it cascades. Get all four right, and the whole system becomes obvious."

**Part 3 - Contrarian Snapback (5-10 sec)**
"I'm not going to show you basic React. I'm showing you the exact architectural decisions that made this extension possible, how Claude Code helped us explore the design space quickly, and the specific agents and workflows that prevented the most common mistakes."

**Part 4 - Credibility Enhancer (5-7 sec)**
"As someone who's built and sold multiple companies, I know what separates hobby projects from production systems. I built Prompt Saver in one day using a specific Claude Code workflow that handles complexity systematically. I'm breaking down that system."

**Visual Callouts:** "4 ARCHITECTURE PROBLEMS" | "ISOLATED EXECUTION" | "TYPE SAFETY" | "ONE WORKFLOW"

### STRUCTURE PREVIEW (0:30-0:35)
"Here's the roadmap: Architecture Problem 1—Content Script Isolation and Message Passing. Problem 2—Type Safety with Chrome APIs. Problem 3—State Management Across Boundaries. Problem 4—The Exact Claude Code Workflow. Each has a solution. Each teaches you something about systems thinking."

---

### BODY SECTION 1: Architecture Problem 1 — Execution Context Isolation (1:00-4:00)

**WHY This Problem Exists**
"Chrome extensions run in multiple contexts:
- **Content scripts** run in the webpage context (can access DOM, but isolated from extension APIs)
- **Background service worker** runs in the extension context (can access APIs, storage, but not DOM)
- **Popup UI** runs in the extension context (can access APIs, storage)

Each context has different capabilities. They're intentionally isolated for security. The problem: you need data flowing between them. A prompt captured in a content script needs to reach the database in the background worker, which needs to update the popup UI. That's three contexts talking."

**WHAT The Standard Solution Looks Like**
[SHOW: Architecture diagram on screen]

"The pattern: MESSAGE PASSING

1. Content script detects user action (clicked Save)
2. Content script sends message: 'Hey background worker, save this prompt'
3. Background worker receives, validates, stores in IndexedDB
4. Background worker sends back: 'Stored successfully'
5. Content script receives confirmation, updates UI
6. Popup queries IndexedDB directly (shares extension context)

This is the standard Chrome extension pattern. Knowing this saves you from trying 10 wrong approaches."

**HOW Claude Code Helped Us Get Here**

"Instead of me describing this architecture, I let Claude Code explore it:

[SHOW: Using Explore agent prompt]

'Prompt: Explore how content scripts communicate with background service workers in Chrome extensions. What patterns are used for data passing?'

Result: Claude Code found the message passing pattern, showed me exactly how to structure it, provided type definitions, and explained why this pattern exists (security boundary protection).

That would have taken me 45 minutes of reading Chrome docs. It took 3 minutes with Claude Code's Explore agent."

**The Specific Implementation**

"Here's the code pattern we implemented:

[SHOW: content-script.ts]
```typescript
// Content script: send message to background worker
chrome.runtime.sendMessage(
  { action: 'savePrompt', payload: { title, content, platform } },
  (response) => {
    if (response.success) {
      // Update UI to show saved state
    }
  }
);
```

[SHOW: background-worker.ts]
```typescript
// Background worker: listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'savePrompt') {
    saveToDatabase(request.payload)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err }));
  }
});
```

Notice the symmetry. Send -> Listen. Payload -> Handle -> Respond. This pattern repeats for every message type. Once you see it, you can add 10 more messages without any confusion."

**Visual Callouts:** "CONTEXT ISOLATION" | "MESSAGE PASSING" | "SECURITY BOUNDARY" | "PAYLOAD → HANDLE → RESPOND"

---

### BODY SECTION 2: Architecture Problem 2 — Type Safety Across Contexts (4:00-7:00)

**WHY This Problem is Critical**
"JavaScript is flexible, but flexibility kills extensions. Here's why: if you send a message with the wrong shape from the content script, and the background worker expects something different, the error happens silently. No crash. Just... wrong behavior. That bug takes 3 hours to find.

With types, you get instant validation."

**WHAT Happens Without Types**
"Without TypeScript:
```javascript
// Content script sends whatever
chrome.runtime.sendMessage({ data: prompt });

// Background worker guesses
chrome.runtime.onMessage.addListener((request) => {
  // Is it request.data or request.prompt? No error either way.
  // If you guess wrong, the code silently fails.
});
```

With types:
```typescript
// Define the message contract
interface SavePromptMessage {
  action: 'savePrompt';
  payload: {
    title: string;
    content: string;
    platform: string;
  };
}

// Content script sends with validation
const message: SavePromptMessage = {
  action: 'savePrompt',
  payload: { /* ... */ }
};
chrome.runtime.sendMessage(message);

// Background worker KNOWS the exact shape
chrome.runtime.onMessage.addListener((request: SavePromptMessage) => {
  // TypeScript guarantees request.payload.title exists
});
```

If you send the wrong shape, TypeScript catches it at write-time, not runtime."

**HOW We Structured the Types**

"We created a types/ directory with message contracts:

[SHOW: types/messages.ts]
```typescript
// All possible messages from content script -> background worker
export type ContentScriptMessage =
  | SavePromptMessage
  | GetPromptsMessage
  | DeletePromptMessage
  | SearchPromptsMessage;

// All possible messages from background worker -> content script
export type BackgroundWorkerMessage =
  | SuccessResponse
  | ErrorResponse;
```

Every message has a shape. Every response has a shape. TypeScript validates the whole conversation. Debugging goes from 'why is this silent?' to 'TypeScript told me what was wrong.'"

**Claude Code's Role**

"When I started, I didn't have a complete mental model of all the message types. I asked Claude Code:

[SHOW: prompt]
'I'm building message-passing between content scripts and background workers. What are the common message types I need to handle? Create TypeScript interfaces for each one.'

Claude Code generated 12 message types with responses. I probably would have thought of 6. The other 6 we discovered through actual use. By starting with a complete type map, we avoided 8 hours of 'oh, I need to add a message type' later."

**Visual Callouts:** "TYPE SAFETY" | "MESSAGE CONTRACTS" | "VALIDATION AT WRITE TIME" | "COMPLETE TYPE MAP"

---

### BODY SECTION 3: Architecture Problem 3 — State Management Across Boundaries (7:00-10:00)

**WHY This Problem Exists**
"Each context has its own memory. The content script doesn't know what the popup currently displays. The popup doesn't know what prompts the background worker just cached. They're all looking at different versions of truth.

The solution: single source of truth—IndexedDB. Every context queries it independently. No syncing. No conflicts."

**WHAT The State Architecture Looks Like**
[SHOW: State flow diagram]

"Instead of:
- Content script has prompt state
- Background worker has different prompt state
- Popup has different prompt state
- Everything goes out of sync

We use:
- IndexedDB = single source of truth
- All contexts query IndexedDB independently
- Writes go through background worker (for validation)
- Reads come from IndexedDB (for consistency)"

**HOW We Implemented This**

[SHOW: database.ts]
```typescript
// All contexts can query this independently
export async function getPrompts(search?: string): Promise<Prompt[]> {
  const allPrompts = await db.prompts.toArray();
  if (!search) return allPrompts;
  return allPrompts.filter(p => p.title.includes(search));
}

// Only background worker writes
export async function savePrompt(prompt: Prompt): Promise<void> {
  // Validate
  if (!prompt.title || !prompt.content) throw new Error('Invalid prompt');
  // Store
  await db.prompts.put({ ...prompt, createdAt: Date.now() });
}
```

"Notice the pattern: reads are thin (just query), writes are thick (validate, then store). This prevents bad data from entering the system."

**Why Claude Code Made This Obvious**

"I prompted:

'I have three separate contexts (content script, background worker, popup) that all need access to prompt data. What's the best state management pattern for Chrome extensions?'

Claude Code didn't ask me to implement Redux or a state management library. It showed me the simple pattern: IndexedDB as source of truth, background worker as validator, all contexts as readers. That's architecture thinking. That's systems understanding."

**Visual Callouts:** "SINGLE SOURCE OF TRUTH" | "INDEXEDDB = AUTHORITY" | "READS ARE THIN" | "WRITES ARE THICK"

---

### BODY SECTION 4: Architecture Problem 4 — The Claude Code Workflow That Prevents Cascading Failures (10:00-14:00)

**WHY This Workflow Matters**
"You've now seen three architectural problems, each with a pattern. But knowing the patterns doesn't mean implementing them correctly. The workflow prevents mistakes in implementation."

**WHAT The Workflow Looks Like**

"Here are the five Claude Code operations in order:

**Step 1: Explore (5 minutes)**
Before writing ANY code, I used the Explore agent to understand:
- How does Chrome handle manifest.json?
- What's the structure of a service worker?
- How do content scripts inject UI?

The goal: see the existing patterns, don't invent new ones.

**Step 2: Plan (10 minutes)**
I created a document with:
- Complete architecture diagram
- All message types and responses
- Database schema
- Build pipeline

This wasn't fancy. It was a text document. But it forced me to think before coding.

**Step 3: Implement One Piece (30 minutes)**
Write ONE thing. Not the whole extension. One component. One message type. One handler.

Example: 'Implement the savePrompt message type and handler.'
- Just this, nothing else
- Build and test
- Commit

**Step 4: Validate (5 minutes)**
Does it work? Run the build. Check for type errors. Test the feature.

**Step 5: Expand (repeat)**
If step 4 passed, now write the next piece. If it failed, you know exactly what broke (this one commit).

Repeat 8 times for a complete extension."

**How This Prevents Cascading Failures**

"Cascading failures happen when you write 500 lines of code and test at the end. Error is in line 23, but you don't find it until line 487. By then, you don't remember what line 23 was supposed to do.

With this workflow:
- You write 50 lines, test immediately
- Error? You know it's in these 50 lines
- Fix it, commit, move on
- Repeat with the next 50 lines

8 problems found and fixed as you go beats 1 problem found at the end that cascades into 5 more problems."

**The Claude Code Agents That Made This Work**

"- **Explore agent**: Give me the 20,000-foot view
- **Plan agent**: Help me think through the architecture
- **General-purpose agent**: Write the actual code
- **Web app testing skill**: Verify it works
- **Todo lists**: Track progress and stay organized"

**Visual Callouts:** "EXPLORE → PLAN → IMPLEMENT → VALIDATE → EXPAND" | "ONE PIECE AT A TIME" | "COMMIT AFTER EACH WIN" | "PREVENT CASCADES"

---

### BODY SECTION 5: The Specific Agents You'll Use and When (14:00-17:00)

**WHY Agent Selection Matters**
"Using the wrong agent is like using a wrench to hammer a nail. It might work, but it's not optimal. These four agents have different strengths."

**WHAT Each Agent Does Best**

**Agent 1: Explore Agent (Codebase Navigation)**
Best for: Understanding existing code, seeing patterns, finding files
Example prompt: 'Explore the src/database directory. Show me how IndexedDB is structured and how to query it.'
Result: 2-minute orientation instead of 20-minute file reading
When to use: Start of any feature, before writing code

**Agent 2: Plan Agent (Architecture Thinking)**
Best for: Breaking down complex problems, thinking through options, designing systems
Example prompt: 'I need to implement a search feature across prompts. Think through the different approaches: client-side filtering vs. server-side. Compare tradeoffs.'
Result: Clear understanding of options before committing to code
When to use: Before implementing any major feature

**Agent 3: General-Purpose Agent (Implementation)**
Best for: Actually writing code, solving specific problems, debugging
Example prompt: 'Write the TypeScript interface for the message passed from content script to background worker when saving a prompt.'
Result: Production-ready code
When to use: When you know what you need, just need it written

**Agent 4: Web App Testing Skill (Validation)**
Best for: Verifying functionality works as expected, catching bugs early
Example prompt: 'Test that the quick command feature works: type ;; in the chat input and verify the prompt overlay appears.'
Result: Confidence that the feature actually works
When to use: After implementing each feature, before committing

**Why This Sequence Prevents Mistakes**
[SHOW: Agent workflow diagram]

"Explore → Plan → Implement → Test → Commit

That sequence works because:
1. Explore builds context (you understand the problem domain)
2. Plan forces decisions (you know exactly what you're building)
3. Implement is low-risk (you know what you need)
4. Test validates (you catch problems early)
5. Commit locks it in (you can move forward safely)"

**Visual Callouts:** "EXPLORE FIRST" | "PLAN BEFORE CODE" | "IMPLEMENT WITH CONFIDENCE" | "ALWAYS TEST" | "COMMIT WINS"

---

### BODY SECTION 6: The Slash Commands That Became Essential (17:00-19:00)

**WHY Custom Slash Commands Matter**
"Slash commands are underrated. They're just shortcuts. But the best tools feel like magic because they automate your most-repeated actions."

**WHAT We Created**

[SHOW: .claude/commands directory]

"I created 4 custom slash commands:

**/quick-test**
```bash
npm run build && npm run type-check
```
Runs: Build + TypeScript validation
When: After every feature
Why: Catches errors immediately

**/ship**
```bash
git add . && git commit -m "$(git status)" && git push
```
Runs: Stage, commit with status message, push
When: After testing passes
Why: One command deploys

**/feature [name]**
```bash
git checkout -b feature/[name] && npm run watch
```
Runs: Create feature branch + start watch mode
When: Starting new feature
Why: Sets up development environment instantly

**/debug**
```bash
npm run type-check && npm run build
```
Runs: Full type validation + build
When: Something is broken
Why: Full diagnostics in one command"

**Why These Four**
"Each one represents a moment where you'd normally context-switch. You'd type the command, wait, come back, type another command. Instead: one command, handles it all, you stay in flow."

**How to Build Your Own**
"Slash commands are just text files in .claude/commands/. Create them, and Claude Code understands them. For your next project:
- What do you do repeatedly? That's your slash command.
- What do you always forget? That's your slash command.
- What takes more than one step? That's your slash command."

**Visual Callouts:** "ONE-COMMAND BUILD" | "ONE-COMMAND DEPLOY" | "ONE-COMMAND DEBUG" | "STAY IN FLOW"

---

### CLOSING (19:00-20:00)

**Value Summary:**
"You now understand the complete architecture for building production Chrome extensions: message passing for context isolation, TypeScript for type safety, IndexedDB for state management, and a specific Claude Code workflow that prevents mistakes and keeps you moving forward."

**The Systems Thinking Insight:**
"Architecture isn't complicated once you understand the parts. The real skill is seeing how the parts connect. Every problem in the extension traces back to one of the four architectural patterns. Solve those four, and you can build anything."

**Native CTA:**
"If you want to apply this systems-thinking approach to your next project, I'm linking to the architecture templates and decision frameworks I used here. They work for extensions, web apps, and any system that spans multiple components."

**Engagement Request:**
"Subscribe if you want more of these architecture deep dives—I build one new tool monthly and document the decision-making process."

---

## Variation 3: Rapid Builder / Quick Wins (Mistake-Prevention)
**Strategic Focus:** What NOT to do first, common pitfalls, and the mistakes that stop people. Appeals to builders who want to avoid wasting time.

### HOOK (0:00-0:30)
**Part 1 - Context Lean (5-7 sec)**
"I watched three different builders try to build a Chrome extension last month. One shipped a production-quality tool in 8 hours. Two gave up. The difference wasn't coding skill. It was knowing what NOT to do first."

**Part 2 - Scroll Stop Interjection (3-5 sec)**
"Most 'build something' tutorials show you the happy path. Follow steps 1 through 10 and boom, you have a tool. But they don't show you the seven things beginners try first that waste six hours with nothing to show for it."

**Part 3 - Contrarian Snapback (5-10 sec)**
"I'm going to show you the actual mistakes, why they stop people, and the exact Claude Code moves that prevent them. By learning what NOT to do, you'll avoid the pitfalls that derail 80% of projects."

**Part 4 - Credibility Enhancer (5-7 sec)**
"I've built extensions, web apps, and companies. I've helped colleagues through exactly these mistakes. And I know the Claude Code workflow that makes builders unstoppable. Here's what I learned."

**Visual Callouts:** "3 BUILDERS" | "1 SHIPPED" | "7 DEADLY MISTAKES" | "HOW TO AVOID ALL OF THEM"

### STRUCTURE PREVIEW (0:30-0:35)
"Here are the seven mistakes and the one-sentence fix for each. Follow these, and you won't be one of the builders who gives up."

---

### BODY SECTION 1: Mistake #1 — Writing a Massive Initial Prompt (1:00-2:30)

**The Mistake**
"Builders write 500-word prompts describing everything they want:
'Build a Chrome extension with React, TypeScript, Tailwind, a popup UI, a content script, a background service worker, message passing, IndexedDB database with schema, search functionality, tagging system, export to JSON, sync across devices, analytics, drag-and-drop folders...'

Then they run it. Claude Code generates 2,000 lines of code. It's supposed to work. It doesn't. Now you have a massive codebase and no idea what's wrong."

**Why This Stops People**
"The problem: you can't test 2,000 lines of code. You don't know which part broke. You can't debug it. You don't know how to fix it. You feel paralyzed. You give up."

**The Fix**
"Start with the smallest possible version. Just: 'Build a React component that lists items from IndexedDB.'

That's it. 50 lines. You can test it. You can see it work. You can add to it. You can ship something by hour 2. Then keep adding."

[SHOW: Two prompts side by side - the massive one vs. the tiny one]

**Why Claude Code Helps**
"When you start small, Claude Code can show you the complete system. You understand every line. When you understand the foundation, adding features is simple. You're not debugging a black box."

**The One-Sentence Rule**
"If your prompt is more than 3 sentences, it's too big. Break it down."

**Visual Callouts:** "START SMALL" | "ONE FEATURE AT A TIME" | "SHIP EARLY" | "UNDERSTAND COMPLETELY"

---

### BODY SECTION 2: Mistake #2 — Not Reading the Code Claude Code Writes (2:30-4:00)

**The Mistake**
"Claude Code writes code. You see: 200 lines generated. You think: 'Great, that's done.' You don't read it. You paste it in. You test it. Half of it doesn't work. Now you blame the tool instead of realizing you didn't understand what it wrote."

**Why This Stops People**
"You become a copy-paste engineer. You don't understand your own code. When something breaks, you can't fix it. You have to ask Claude Code to fix it. You become dependent."

**The Fix**
"READ THE CODE. Every line. Ask Claude Code to explain parts you don't understand. If you don't understand a line, remove it and see what breaks. Learn as you go."

[SHOW: Code review checklist]
- [ ] Read every function
- [ ] Understand what each function does
- [ ] Trace the data flow
- [ ] Identify potential issues
- [ ] Ask 'Why did Claude Code do it this way?'

**Why This Changes Everything**
"The moment you understand your code, you own it. You can modify it. You can extend it. You can debug it. You're not dependent on Claude Code anymore. You're using Claude Code as a thinking partner."

**The One-Sentence Rule**
"If you can't explain the code you just generated, don't commit it."

**Visual Callouts:** "READ FIRST" | "UNDERSTAND COMPLETELY" | "OWN YOUR CODE" | "THEN COMMIT"

---

### BODY SECTION 3: Mistake #3 — Building Without a Type System (4:00-5:30)

**The Mistake**
"Builders start with JavaScript instead of TypeScript. They think: 'I'll get to types later.' Later never comes. They get 500 lines into a project and have no idea what function expects what parameters. They call a function wrong. It fails silently. They spend 3 hours debugging what should have been caught instantly."

**Why This Stops People**
"Without types, errors hide. You write code that looks right but doesn't work. You debug endlessly. You lose momentum. You get frustrated. You quit."

**The Fix**
"Start with TypeScript from line 1. Create interfaces for everything:

[SHOW: Code]
```typescript
interface Prompt {
  id: string;
  title: string;
  content: string;
  platform: string;
}
```

Now every function that touches prompts has a contract. Wrong shape? Instant error. No time wasted. You move forward."

**Why This Saves Time**
"TypeScript feels slower at first. You write more boilerplate. But you catch errors earlier. Net result: faster development."

**The One-Sentence Rule**
"No JavaScript. Use TypeScript. Always."

**Visual Callouts:** "TYPESCRIPT FROM START" | "CATCH ERRORS EARLY" | "NO SILENT FAILURES" | "SAVE HOURS"

---

### BODY SECTION 4: Mistake #4 — Not Testing Until the End (5:30-7:00)

**The Mistake**
"Builders write a feature. They build it. They see no error. They think: 'It must work.' They test hours later. It doesn't work. Now they have to find the bug in code they wrote hours ago and can't remember. Debugging takes 5x longer."

**Why This Stops People**
"You build for hours, test once, find 10 bugs, don't know which commit caused which bug, feel overwhelmed, give up."

**The Fix**
"Test after every feature. Run:
```bash
npm run build && npm run type-check
```
Takes 30 seconds. Do it after every feature. If something breaks, you know exactly which change caused it."

**Why This Changes Everything**
"With immediate testing, bugs are caught while they're fresh. The code you just wrote is in your head. You fix it in 2 minutes instead of 30 minutes later."

**The One-Sentence Rule**
"If you haven't tested it, it doesn't exist."

**Visual Callouts:** "TEST IMMEDIATELY" | "AFTER EVERY FEATURE" | "CATCH BUGS FRESH" | "30-SECOND VALIDATION"

---

### BODY SECTION 5: Mistake #5 — Not Committing Small Wins (7:00-8:30)

**The Mistake**
"Builders write 3-4 features, think they'll commit them all together. Something breaks. They have no idea which feature caused it. They have to untangle the code. They spend 2 hours on what should have been 10 minutes. They lose the will to continue."

**Why This Stops People**
"Large commits feel dangerous. You don't know what's in them. You don't know what broke. You get scared to change things."

**The Fix**
"One feature = one commit. Done feature? Commit immediately.

[SHOW: Commit history]
Commit 1: Database schema
Commit 2: Save button injection
Commit 3: Popup component
Commit 4: Search feature
Commit 5: Quick command feature

That's 5 commits, each one a win. Any one can be reverted instantly if it breaks."

**Why This Changes Everything**
"Small commits = confidence. You know exactly what each commit does. You can revert one without losing everything else. You feel in control."

**The One-Sentence Rule**
"Commit after every win. If you can't describe the commit in one sentence, it's too big."

**Visual Callouts:** "SMALL COMMITS" | "ONE FEATURE PER COMMIT" | "INSTANT REVERTIBILITY" | "KEEP MOMENTUM"

---

### BODY SECTION 6: Mistake #6 — Trying to Build Without Understanding Chrome (8:30-10:00)

**The Mistake**
"Builders dive into code without understanding how Chrome extensions work. They write code that can't work. Content script tries to access IndexedDB directly (can't, isolated). Background worker tries to access DOM (can't, no DOM). They build for 2 hours before realizing the architecture is impossible."

**Why This Stops People**
"You discover the architecture is wrong 2 hours in. Everything needs to be rewritten. You feel like you failed. You quit."

**The Fix**
"Spend 15 minutes understanding Chrome extension architecture before writing code. Use Claude Code's Explore agent:

[SHOW: Explore prompt]
'I'm building a Chrome extension with a content script and background worker. Explain the security boundaries, what each context can and can't do, and how they communicate.'

Result: 3-minute orientation. You now know the constraints. You can't build anything wrong."

**Why This Changes Everything**
"15 minutes of learning saves 2 hours of building wrong things."

**The One-Sentence Rule**
"Understand the platform before you build on it."

**Visual Callouts:** "LEARN THE PLATFORM" | "15-MINUTE ORIENTATION" | "PREVENT WRONG ARCHITECTURE" | "SAVE 2 HOURS"

---

### BODY SECTION 7: Mistake #7 — Going Too Long Without Shipping (10:00-11:30)

**The Mistake**
"Builders think: 'I'll build the whole thing, then test the whole thing, then ship the whole thing.' They get 70% done. Something big is wrong. They've built on a faulty foundation. The whole thing needs redesign. They're 6 hours in. They give up."

**Why This Stops People**
"Big projects feel endless. You lose motivation. You can't see the finish line."

**The Fix**
"Ship something by hour 2. It doesn't need to be complete. It needs to be:
- One feature
- Actually working
- Actually useful

Example: By hour 2, you have 'save a prompt and view it later.' That works. That's shippable. That's a win.

Then add: search. Then: tags. Then: export. Each one is shippable by itself."

**Why This Changes Everything**
"Early shipping gives momentum. You see it working. You feel successful. You want to add more. You keep going."

**The One-Sentence Rule**
"If you can't ship something in 2 hours, your scope is too big."

**Visual Callouts:** "SHIP EARLY" | "ONE FEATURE = SHIPPABLE" | "BUILD MOMENTUM" | "STAY MOTIVATED"

---

### BODY SECTION 8: The Claude Code Move That Prevents All Seven (11:30-15:00)

**WHY This Move Matters**
"You've learned seven mistakes. But learning them and preventing them are different. There's one Claude Code move that prevents all seven at once."

**WHAT That Move Is**

"It's the **Todo List approach to development**.

Here's how it works:

[SHOW: Todo list screen]

Before you write ANY code, create a todo list:
```
[ ] Research Chrome extension architecture
[ ] Design: database schema
[ ] Implement: save button injection
[ ] Implement: popup component
[ ] Implement: search feature
[ ] Test: all features work
[ ] Ship v1
```

That's it. A list. Then you work through it."

**HOW This Prevents The Seven Mistakes**

**Prevents Mistake #1 (Massive prompts):**
"When you have a todo list, each todo is a small prompt. Instead of 'build the whole thing,' each prompt is 'Implement the save button functionality.' Small, focused, testable."

**Prevents Mistake #2 (Not reading code):**
"Each todo represents a feature you understand completely. By the time you finish a todo, you've read and reviewed all the code for that feature."

**Prevents Mistake #3 (No types):**
"When building one small feature at a time, types are obvious. You write 50 lines, you write types for those 50 lines. It's not a chore, it's natural."

**Prevents Mistake #4 (Not testing):**
"After each todo, you test that one thing. Build + type-check + manual test. 30 seconds. Then mark it done."

**Prevents Mistake #5 (Big commits):**
"One todo = one commit. Naturally small commits."

**Prevents Mistake #6 (Not understanding the platform):**
"Your first todo is always 'Research and understand [platform].' You can't check it off until you really get it."

**Prevents Mistake #7 (Not shipping early):**
"Your todo list includes 'Ship something shippable by hour 2.' You prioritize it. You finish it. You have a win."

**The Actual Todo List From Prompt Saver**

[SHOW: Real todo list from build]
```
[x] Research Chrome extension architecture - 15 min
[x] Design database schema (IndexedDB) - 10 min
[x] Create TypeScript types for all entities - 15 min
[x] Implement core database functions - 30 min
[x] Implement popup component structure - 20 min
[x] Implement save button in content script - 25 min
[x] Implement message passing between contexts - 20 min
[x] Implement search and filter - 20 min
[x] Implement quick command feature (;;) - 30 min
[x] Add platform detection for 6 platforms - 30 min
[x] Test and bug fixes - 30 min
[x] Final styling - 15 min
[x] Commit to github - 5 min
```

Notice: 13 todos, average 20 minutes each, total 8 hours. One todo, one feature, one commit."

**Why This Transforms Your Workflow**

"With a todo list:
- You're not overwhelmed (one small task at a time)
- You're making progress (visible checkmarks)
- You're shipping early (it's in the list)
- You're testing immediately (it's required)
- You understand your code (you built it recently)
- You commit small (one todo per commit)
- You prevent mistakes (architecture is thought through first)

You don't have to be a genius. You just have to follow the list."

**Visual Callouts:** "TODO LIST = CLARITY" | "ONE FEATURE AT A TIME" | "VISIBLE PROGRESS" | "SHIP BY HOUR 2"

---

### CLOSING (15:00-16:00)

**Value Summary:**
"You now know the seven mistakes that stop builders and the exact move that prevents all of them. It's not magic. It's not complex. It's: understand your constraints, plan in small pieces, execute one piece at a time, test immediately, commit wins."

**The Real Insight:**
"Building isn't about being smart. It's about avoiding the dumb mistakes. The builders who ship aren't the smartest—they're the ones who learned what NOT to do and actually follow their own lessons."

**Native CTA:**
"I'm going to link to the exact todo list template I used to build Prompt Saver. Copy it for your next project. Modify it. Use it. You'll be amazed at how much momentum a simple checklist creates."

**Engagement Request:**
"Subscribe if you want more of these 'what NOT to do' guides—they're worth 10x more than 'what to do' tutorials, and they're actually actionable."

---

## Strategic Recommendations

### Best For Different Audiences

**Variation 1: Authority + Iteration (Story-Driven)**
- **Best for:** Beginners who need confidence, builders who want the real story
- **Algorithm Appeal:** High - storytelling hooks viewers, keeps them watching
- **Authority Signal:** Personal experience, problems overcome, lessons learned
- **Conversion:** Viewers feel like they can do this because you did it messily too

**Variation 2: Technical Deep-Dive (Framework-Heavy)**
- **Best for:** Advanced builders, engineers, people who want to understand systems
- **Algorithm Appeal:** Medium - specific but less emotionally engaging
- **Authority Signal:** Deep technical knowledge, architecture thinking, systems design
- **Conversion:** Viewers want to use this exact pattern because it's been thought through

**Variation 3: Rapid Builder / Quick Wins (Mistake-Prevention)**
- **Best for:** Pragmatic builders, people who've failed before, action-oriented
- **Algorithm Appeal:** High - strong emotion trigger ("don't make these mistakes"), practical value
- **Authority Signal:** Lessons learned from watching others fail, prevention-based authority
- **Conversion:** Viewers feel protected from wasting time, more confident to start

### Testing Suggestions

**A/B Test Approach:**
- Post Variation 1 (Authority) first → measure watch time and completion rate
- Post Variation 2 (Technical) as next video → measure viewer satisfaction and comments
- Post Variation 3 (Mistakes) as third → compare all three on CTR and retention

**What Each Tests:**
- **Variation 1:** Can storytelling beat pure technical content on the algorithm?
- **Variation 2:** Will technical depth attract the right audience segment?
- **Variation 3:** Is mistake-prevention more engaging than step-by-step guides?

### Combination Approach

**The Most Powerful Option:** Create a **2-video series**
- **Video 1:** Variation 3 (Mistakes) - Hook viewers with "don't waste time"
- **Video 2:** Variation 1 (Authority) - Tell the full story now that they're hooked
- End Video 1 with CTA: "Watch the full story here" (links to Video 2)

This creates a narrative arc:
- Video 1: "Here's what to avoid"
- Video 2: "Here's the real journey and why it works"

### Integration with Other Content

These scripts can be:
1. **Core YouTube videos** - Standalone, 15-20 minute productions
2. **Broken into clips** - Short 60-second clips for YouTube Shorts/TikTok
3. **Written as blog posts** - Transform scripts into long-form written guides
4. **Created as mini-courses** - Break each variation into 5 shorter videos
5. **Used for live streams** - Use as guide for live coding/building sessions

---

## Claude Code Features Highlighted in Each Variation

### Variation 1 Emphasizes:
- ✅ Explore agent for rapid onboarding
- ✅ Iteration and problem-solving
- ✅ Real mistakes and solutions
- ✅ Building on mobile with Claude.ai/code
- ✅ Commit strategy for safety

### Variation 2 Emphasizes:
- ✅ Architecture thinking and systems design
- ✅ All four agent types and when to use them
- ✅ Message passing and communication patterns
- ✅ Type safety and interface design
- ✅ Custom slash commands for workflow
- ✅ Todo lists for state management

### Variation 3 Emphasizes:
- ✅ Common pitfalls and how to prevent them
- ✅ The power of small iterations
- ✅ Testing immediately after each feature
- ✅ Understanding platform constraints first
- ✅ Todo lists as the meta-pattern

---

## Production Notes

### Script Length & Pacing
- **Variation 1:** 20 minutes (narrative pacing)
- **Variation 2:** 20 minutes (educational pacing with explanations)
- **Variation 3:** 16 minutes (rapid-fire practical tips)

### Visual Elements to Include

**Variation 1:**
- Screen recordings of actual build process
- Code diffs showing iteration
- CLI output showing build success
- Mobile screens showing Claude.ai/code
- Git commit history visualization
- Final working extension demo

**Variation 2:**
- Architecture diagrams and flowcharts
- Side-by-side code comparisons
- TypeScript error examples
- Message passing flow visualization
- Agent workflow diagrams
- Directory structure visualization

**Variation 3:**
- Before/after code comparisons
- Todo list screenshots
- Build output and error messages
- Test validation screenshots
- Commit history visualization
- Timeline showing "mistakes = wasted hours" vs. "right approach = steady progress"

### Text Overlays (Suggest These in CAPS at Key Moments)

All variations should use visual callouts in the edit phase. These are provided above at the end of each major section.

### Call-to-Actions

**Variation 1 CTA:**
"I'll link to the exact prompts and workflow I used to build Prompt Saver. Subscribe for more of these real-world build stories—I'm documenting my next extension launch, and you'll see the journey unfiltered."

**Variation 2 CTA:**
"I'm linking to the architecture templates and decision frameworks. Use them for your next project—they work for extensions, web apps, and any complex system. Subscribe for more technical deep-dives on building systems right."

**Variation 3 CTA:**
"Grab the todo list template and mistake-prevention checklist in the description. Use them for your next build. Subscribe for more 'what NOT to do' guides—they're worth 10x normal tutorials."

---

## Estimated YouTube Performance

### Views & Retention Predictions (Based on Similar Content)

**Variation 1 (Story-Driven):**
- Estimated views: 8,000-15,000 (high emotional appeal)
- Estimated retention: 65-75% (storytelling keeps viewers)
- Estimated CTR: 6-8% (personal journey hooks work)
- Ideal for: Building audience, new subscribers

**Variation 2 (Technical Deep-Dive):**
- Estimated views: 4,000-8,000 (niche appeal)
- Estimated retention: 55-70% (technical content is dense)
- Estimated CTR: 4-6% (authority positioning)
- Ideal for: Credibility with technical audience, course funnels

**Variation 3 (Mistake-Prevention):**
- Estimated views: 6,000-12,000 (strong practical value)
- Estimated retention: 60-75% (helpful + emotional trigger)
- Estimated CTR: 7-9% (prevention angle hooks well)
- Ideal for: Lead generation, actionable value positioning

---

## Next Steps

1. **Choose your lead variation** - Which angle feels most authentic for this moment?
2. **Record one version** - Start with Variation 1 or 3 (highest algorithm potential)
3. **Film the screen recordings** - Follow the visual elements checklist
4. **Create 5-7 short clips** - 60-second versions for YouTube Shorts/TikTok
5. **Write a companion blog post** - Transcribe your chosen variation into written form
6. **Plan a second video** - Use the alternative variation as a follow-up
7. **Gather performance data** - Track which variation resonates most with your audience
8. **Iterate based on feedback** - Your audience will tell you which angle works best

---

# How to Use These Scripts

These are frameworks, not final scripts. Your delivery, pacing, and emphasis will make them unique.

**Tips for recording:**
- Read through once to get comfortable
- Don't memorize word-for-word—use the structure as a guide
- Let your personality shine through
- Pause for effect at the key moments
- Practice the transitions between sections
- Record multiple takes of the hook (it's the most important 30 seconds)

**Final thought:**
The best version is the one that feels most authentic to you in the moment. Pick one, record it, and iterate based on how your audience responds.
