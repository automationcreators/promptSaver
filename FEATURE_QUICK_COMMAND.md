# Quick Command Feature (`;;`)

## Overview

The Quick Command feature replaces the previous `/` slash command with `;;` (double semicolon) and adds powerful direct name lookup functionality.

## Why `;;` instead of `/`?

### Problem with `/`
- **High conflict rate**: LLMs frequently use `/` in responses
- Used in file paths (`/home/user/file`)
- Used in commands (`/help`, `/clear`)
- Used in code examples
- Caused false triggers during normal chat

### Why `;;` is Better
- ✅ **Near-zero conflict**: Almost never appears in natural language
- ✅ **Easy to type**: Hit semicolon key twice
- ✅ **Memorable**: Distinctive and unique
- ✅ **Global keyboards**: Available on all keyboard layouts
- ✅ **No confusion**: Won't interfere with code or LLM responses

## Two Modes of Operation

### 1. Fast Mode: Direct Name Lookup

**Type:** `;;prompt-name`
**Result:** Instant prompt insertion

**Examples:**
```
;;code-review → Inserts "Code Review" prompt instantly
;;bug → Inserts "Bug Analysis" prompt (fuzzy match)
;;cod → Inserts "Code Review" prompt (partial match)
```

**Smart Matching Algorithm:**
1. **Normalize** query (lowercase, remove spaces/dashes/underscores)
2. **Exact match** first: `;;codereview` matches "Code Review"
3. **Starts-with match**: `;;cod` matches "Code Review"
4. **Minimum 3 characters** required for auto-insert
5. **Case insensitive**: `;;CODE` = `;;code`

**Examples of Smart Matching:**
| You Type | Matches |
|----------|---------|
| `;;codereview` | "Code Review" |
| `;;code-review` | "Code Review" |
| `;;Code_Review` | "Code Review" |
| `;;cod` | "Code Review" (first match) |
| `;;bug` | "Bug Analysis" |
| `;;writ` | "Writing Assistant" |

### 2. Browse Mode: Search All Prompts

**Type:** `;;` (alone, no name)
**Result:** Opens search overlay

**Features:**
- View all prompts
- Fuzzy search as you type
- Click to select
- Enter key selects first result
- Esc to close

**Overlay UI:**
```
┌──────────────────────────────────────┐
│  💡 Type ;;name for instant insert   │
│  🔍 Search prompts...                │
├──────────────────────────────────────┤
│  💻 Code Review                      │
│  ✍️ Writing Assistant                │
│  📊 Data Analysis                    │
└──────────────────────────────────────┘
```

## Implementation Details

### Files Modified

1. **`src/content/slashCommand.ts`**
   - Changed trigger from `/` to `;;`
   - Added `tryDirectLookup()` function
   - Implemented smart matching algorithm
   - Added Enter key handler
   - Updated variable names (slashCommand → command)

2. **`src/content/content.css`**
   - Added `.promptSaver-slash-hint` styles
   - Styled the tip message
   - Added code tag formatting

3. **Documentation**
   - Updated README.md
   - Updated USER_GUIDE.md
   - Updated QUICK_START.md

### Key Functions

#### `tryDirectLookup(query: string)`
```typescript
// Attempts to find and insert prompt by name
// 1. Fetches all prompts
// 2. Normalizes query and titles
// 3. Tries exact match
// 4. Falls back to starts-with match
// 5. Inserts if match found (3+ chars)
// 6. Shows search overlay if no match
```

#### `handleKeyDown(e: KeyboardEvent)`
```typescript
// Detects ";;" trigger
// Waits for second semicolon
// Opens overlay when complete
```

#### `selectFirstResult()`
```typescript
// Inserts first result when Enter pressed
// Enables keyboard-only workflow
```

## User Benefits

### Speed
- **10x faster** than browsing: `;;code-review` → instant
- **No clicking required**: Type and done
- **Muscle memory**: Learn your prompt names once

### Discoverability
- **Browse mode** still available: Just `;;`
- **See all prompts**: When you need to explore
- **Visual confirmation**: Search overlay shows matches

### Flexibility
- **Partial names work**: `;;cod` finds "Code Review"
- **Ignore formatting**: Spaces, dashes don't matter
- **Case insensitive**: Type however you want

## Usage Patterns

### Power Users
```
1. Memorize 5-10 most-used prompt names
2. Type ;;name directly
3. Never open the overlay
4. Maximum speed
```

### Casual Users
```
1. Type ;; to browse
2. Search and discover
3. Click to insert
4. Learn names over time
```

### Mixed Workflow
```
1. Known prompts: ;;code-review
2. Unknown prompts: ;; → search
3. Best of both worlds
```

## Examples in Context

### Scenario 1: Code Review
**User:** Working on code, needs review prompt
```
[Opens Claude]
User types: ;;code-review
→ Full code review prompt inserted instantly
User: [Pastes their code]
```

### Scenario 2: Exploring
**User:** Not sure what prompts are available
```
[Opens ChatGPT]
User types: ;;
→ Overlay opens with all prompts
User: [Browses, finds "Bug Analysis"]
User: [Clicks to insert]
```

### Scenario 3: Partial Match
**User:** Remembers prompt starts with "bug"
```
[Opens Gemini]
User types: ;;bug
→ "Bug Analysis" prompt inserted
User: [Describes the bug]
```

## Technical Considerations

### Performance
- Prompts cached after first load
- Normalized once per session
- O(n) search through prompts
- Fast enough even with 1000+ prompts

### Compatibility
- Works on all supported platforms
- No platform-specific code needed
- Consistent behavior everywhere

### Edge Cases Handled
- Query too short (< 3 chars): Shows search overlay
- No matches found: Shows search overlay
- Multiple matches: First match wins
- Overlay already open: Updates results

## Future Enhancements

### Planned Features
1. **Tab completion**: `;;cod` + Tab → `;;code-review`
2. **Recent prompts**: `;;` shows recently used first
3. **Aliases**: Custom shortcuts like `;;cr` → "Code Review"
4. **Keyboard navigation**: Arrow keys in overlay
5. **Preview on hover**: See full prompt before inserting

### Advanced Ideas
1. **Context aware**: Suggest prompts based on current page
2. **AI suggestions**: "Did you mean...?"
3. **Usage analytics**: Track most-used shortcuts
4. **Custom triggers**: Let users choose their own symbol

## Migration Guide

### For Existing Users

**Old Way:**
```
Type: /
Wait for overlay
Search for prompt
Click to insert
```

**New Way:**
```
Fast: ;;prompt-name → instant insert
Browse: ;; → search overlay
```

**What Changed:**
- Trigger: `/` → `;;`
- Behavior: Added direct name lookup
- Speed: Much faster for known prompts
- Flexibility: Works both ways

## FAQs

### Q: Do I have to memorize prompt names?
**A:** No! Just type `;;` to browse like before. Direct lookup is optional but faster.

### Q: What if I type the wrong name?
**A:** The search overlay shows partial matches, so you'll see suggestions.

### Q: Does it work with spaces in names?
**A:** Yes! `;;code review`, `;;code-review`, and `;;codereview` all work.

### Q: Can I still search prompts?
**A:** Yes! Type `;;` alone to open the search overlay.

### Q: What if two prompts start with the same letters?
**A:** First match wins. Use more characters to be specific.

### Q: Is `/` completely removed?
**A:** Yes, to avoid conflicts with LLM responses and code examples.

## Feedback

The `;;` trigger was chosen to minimize conflicts while remaining easy to type. If you have feedback or suggestions, please open an issue on GitHub!

---

**Version:** 1.1.0
**Feature Added:** 2024
**Status:** ✅ Implemented and Tested
