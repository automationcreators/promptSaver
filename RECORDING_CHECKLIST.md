# Recording Checklist & Technical Setup Guide

## Part 1: Pre-Recording Setup (Do This Once)

### Equipment & Software Requirements

**Essential:**
- [ ] Mac/PC with quiet room (or noise-canceling headphones)
- [ ] Microphone (USB or built-in, external microphone strongly recommended)
- [ ] Screen recording software (ScreenFlow for Mac, OBS for Windows/cross-platform)
- [ ] Video editing software (DaVinci Resolve free, Premiere Pro, Final Cut)
- [ ] Thumbnail design tool (Canva Pro, Photoshop, or Figma)

**Recommended:**
- [ ] External monitor (for more screen real estate)
- [ ] Webcam for talking head shots (1080p minimum)
- [ ] USB hub to reduce cable clutter
- [ ] Pop filter for microphone
- [ ] Desk lamp for even lighting

### Workspace Setup

**Visual Setup:**
- [ ] Clean, uncluttered desk in background
- [ ] Neutral background (or professional-looking wall)
- [ ] Proper lighting:
  - [ ] Key light at 45° angle (to one side)
  - [ ] Fill light or white reflector opposite
  - [ ] No backlighting (avoid sitting in front of window)
- [ ] Camera at eye level (not looking up or down)
- [ ] Distance: 2-3 feet from camera

**Audio Setup:**
- [ ] Microphone positioned 6-12 inches from mouth
- [ ] Pop filter attached to microphone
- [ ] Microphone arm/stand (don't hold it)
- [ ] All fans/AC turned off during recording
- [ ] Phone on silent (in another room ideally)
- [ ] Slack/notifications silenced

**Computer Setup:**
- [ ] Close all unnecessary applications
- [ ] Close email and messaging apps
- [ ] Disable notifications
- [ ] Set display to 1920x1080 resolution (fullscreen, not scaled)
- [ ] Set font size to 14pt+ in editors (readable on video)
- [ ] Open only the files/apps you need to show
- [ ] Have multiple browser tabs ready (but only open the ones you need)
- [ ] Set system to Do Not Disturb mode

### Software Configuration

**ScreenFlow (Mac) Settings:**
- [ ] Open ScreenFlow
- [ ] Go to Preferences
- [ ] Audio Input: Select your microphone
- [ ] Audio Output: Mute (don't record system sound)
- [ ] Video Quality: High (720p minimum, 1080p preferred)
- [ ] Frame Rate: 30fps (60fps if available for smooth scrolling)

**OBS (Windows/Cross-platform) Settings:**
- [ ] Open OBS
- [ ] Create new Scene for "Screen + Mic"
- [ ] Add Source: Display Capture (select primary monitor)
- [ ] Add Source: Audio Input Capture (select your microphone)
- [ ] Settings > Audio > Set your microphone as Mic/Aux
- [ ] Test audio levels (-6dB peaks is ideal)
- [ ] Settings > Stream > Set bitrate to 5-8 Mbps

**Code Editor Configuration:**
- [ ] Theme: Dark (less eye strain)
- [ ] Font: Monospace (Courier, Monaco, Consolas)
- [ ] Font size: 14-16pt
- [ ] Line numbers: Enabled
- [ ] Minimap: Disabled (takes up space)

---

## Part 2: Pre-Recording Checklist (Do This Before Each Recording)

### Room Preparation (5 minutes)

- [ ] Close door (minimize background noise)
- [ ] Turn off AC/heating
- [ ] Close windows (traffic noise)
- [ ] Turn off lights in other rooms (if visible in background)
- [ ] Silence phone (in another room)
- [ ] Tell family/housemates you're recording (no interruptions)
- [ ] Close all browser tabs except those you need
- [ ] Quit Slack, email, Messages, Discord

### Computer Preparation (5 minutes)

- [ ] Restart computer (clears memory, fresh start)
- [ ] Run Activity Monitor: quit unnecessary apps
- [ ] Disable Spotlight search (causes brief freezes)
- [ ] Disable Time Machine (can cause disk activity)
- [ ] Set system to Do Not Disturb
- [ ] Mute volume (so notifications don't play)

**Terminal commands (Mac):**
```bash
# Disable Spotlight indexing during recording
sudo mdutil -a -i off

# Kill Dropbox (reduces disk activity)
killall Dropbox

# (Re-enable after recording with: sudo mdutil -a -i on)
```

### Lighting Check (2 minutes)

- [ ] Turn on all lights
- [ ] Look in camera preview
- [ ] Check for shadows on face
- [ ] Check for glare on screen
- [ ] Adjust lights as needed
- [ ] Do a test recording (10 seconds)
- [ ] Watch test: Is face visible? Readable screen?

### Audio Check (3 minutes)

- [ ] Open your recording software
- [ ] Do a 30-second test recording
- [ ] Listen to playback:
  - [ ] Can you hear yourself clearly?
  - [ ] No background noise?
  - [ ] Audio levels not peaking (clipping)?
  - [ ] No low hum (electrical interference)?
- [ ] If audio is bad, troubleshoot:
  - [ ] Try different microphone position
  - [ ] Check for ground loop (unplug nearby devices)
  - [ ] Try different USB port

### Screen Setup (5 minutes)

**For code/technical content:**
- [ ] Open your editor with example code
- [ ] Zoom to 125% (text readable on video)
- [ ] Open one file at a time (don't show multiple tabs)
- [ ] Test recording: Can viewers read the code?
- [ ] Adjust zoom if needed

**For desktop/UI content:**
- [ ] Arrange windows as you want to show
- [ ] Zoom into the main window (125% or more)
- [ ] Test recording: Is everything readable?
- [ ] Close unnecessary toolbars/sidebars

### Script Preparation (5 minutes)

- [ ] Have script visible on another monitor (or printed)
- [ ] Read through script once (get comfortable)
- [ ] Mark 2-3 pauses with [PAUSE] in script
- [ ] Note sections that might be hard to remember (highlight)
- [ ] Practice difficult pronunciations
- [ ] Have water nearby (dry throat happens)

### Final Checklist Before Recording (2 minutes)

- [ ] Door closed
- [ ] Phone on silent
- [ ] Notifications disabled
- [ ] Microphone positioned correctly
- [ ] Camera at eye level
- [ ] Lighting looks good
- [ ] Audio test passed
- [ ] Computer screen set up
- [ ] Script visible and ready
- [ ] Recording software open and tested
- [ ] Take a deep breath

---

## Part 3: During Recording

### Pacing & Delivery Tips

**The Golden Rules:**
1. **Pause often** - Don't talk continuously. Pause between sentences. Pauses feel long to you but look natural on camera.
2. **Speak clearly** - Imagine talking to one person across a table, not a crowd.
3. **Vary pace** - Slow down for complex parts. Faster for obvious stuff.
4. **Emphasize naturally** - Don't exaggerate, but use tone to show importance.
5. **Recover gracefully** - If you mess up, pause 3 seconds, then re-record that section.

### Multi-Take Strategy

**Record in sections:**
- Don't record the entire 16-20 minutes in one take
- Record 2-3 minutes at a time
- Take a 2-minute break between takes
- This prevents:
  - Vocal fatigue
  - Losing focus
  - Giant redo if something goes wrong
  - Your energy getting flat

**Example Recording Session for 16-minute video:**
- Intro (2 min) - Record 2 times, keep best
- Section 1 (3 min) - Record 2 times
- Section 2 (3 min) - Record 2 times
- Section 3 (3 min) - Record 2 times
- Section 4 (2 min) - Record 2 times
- Section 5 (2 min) - Record 2 times
- Outro (1 min) - Record 3 times (outro is important)

**Total time:** 5-6 hours of recording for a 16-minute video (this is normal)

### Screen Recording Best Practices

**When to record your screen:**
- Scroll slowly (not at normal speed)
- Pause after each major action (give viewer time to absorb)
- Use cursor highlighting tool to point at things
- Zoom in on code/important text
- Leave each screen visible for 3-5 seconds before moving to next

**When showing code:**
- Point to each line or function you're explaining
- Let the code stay visible (don't scroll away too quickly)
- Highlight important variables or keywords
- Use your cursor as a pointer

**When showing multiple windows:**
- Only show one window at a time
- Transition clearly (full-screen to full-screen, not side-by-side usually)
- Close windows you're done with (clean up)

### If You Mess Up Mid-Take

**Option 1: Stop and restart**
- If it's early in the take (first 30 seconds), just start over
- Delete the bad recording
- Do another take

**Option 2: Pause and continue**
- If you mess up words mid-sentence, pause
- Wait 3 seconds of silence
- Start the sentence over
- In editing, you can cut out the bad version and keep the good one
- The 3-second silence helps in editing

**Option 3: Note it and fix in post**
- If the mistake isn't too bad, keep recording
- Note timestamp in a document: "0:45 - flubbed 'authentication', fix in edit"
- In editing, you can:
  - Zoom in on code (distract from flub)
  - Add B-roll
  - Use text overlay
  - Re-record just that word

---

## Part 4: Recording Session Template

### Before You Hit Record

Print this checklist and check off as you go:

```
RECORDING SESSION: [Video Title]
Date: _______________
Target Length: _____ minutes
Script Location: _______________

PRE-RECORDING CHECKS:
  [ ] Room is quiet
  [ ] Phone silenced
  [ ] Notifications off
  [ ] Microphone positioned
  [ ] Lighting checked
  [ ] Audio test passed
  [ ] Screen set up
  [ ] Script ready
  [ ] Comfortable and ready

SECTIONS TO RECORD:
  [ ] Section 1 (takes: ____)
  [ ] Section 2 (takes: ____)
  [ ] Section 3 (takes: ____)
  [ ] Section 4 (takes: ____)
  [ ] Section 5 (takes: ____)
  [ ] Section 6 (takes: ____)
  [ ] Outro (takes: ____)

NOTES/ISSUES:
- _______________
- _______________
- _______________

BEST TAKES:
- Section 1: Take __
- Section 2: Take __
- ...
```

### After You Finish Recording

- [ ] Stop recording
- [ ] Listen to full recording (skip through, don't listen in real-time)
- [ ] Note any issues: "Audio peaked at 5:30" or "Code wasn't clear at 12:00"
- [ ] Save recording file with naming convention: `VIDEO-1-MISTAKES-TAKE-1.mp4`
- [ ] Back up recording to external drive immediately
- [ ] Great job! You're done recording. Now comes editing.

---

## Part 5: Editing Checklist

### Post-Production Workflow

This is where the magic happens. A great recording can be made better; a mediocre recording can become great.

### Audio Editing (15-30 minutes)

**In your editor (Adobe Audition, Audacity, or your DAW):**

- [ ] Import voiceover recording
- [ ] Trim silence from beginning and end
- [ ] Normalize levels (-3dB peaks is ideal)
- [ ] Apply noise reduction:
  - [ ] Select 1-2 seconds of pure silence/background noise
  - [ ] Use noise reduction on full audio (10-20% reduction)
  - [ ] Adjust until background is gone but voice sounds natural
- [ ] Check for clicks/pops:
  - [ ] Listen for sudden sharp sounds
  - [ ] Remove with De-esser tool if needed
- [ ] Add audio effects (subtle):
  - [ ] Gentle EQ to warm up voice (add 200Hz)
  - [ ] Slight compression (1.5:1 ratio, -15dB threshold)
- [ ] Export as WAV or MP3 (16-bit, 48kHz for video)

### Video Editing (2-4 hours)

**In your editor (Premiere Pro, DaVinci Resolve, Final Cut):**

**Step 1: Create Timeline**
- [ ] Import your video file (screen recording)
- [ ] Import your audio file (cleaned voice-over)
- [ ] Sync audio to video:
  - [ ] Rough sync (line them up roughly)
  - [ ] Fine sync (find a moment where you point at something, sync that)
- [ ] Verify sync throughout video (spot check at 5-minute intervals)

**Step 2: Edit Video**
- [ ] Watch through full video
- [ ] Remove dead air (silence longer than 2 seconds)
- [ ] Speed up boring sections:
  - [ ] Normal: talking
  - [ ] 1.25x: scrolling, moving between screens
  - [ ] 1.5x: waiting for something to load
- [ ] Add transitions (subtle 200-300ms):
  - [ ] Between major sections
  - [ ] When screen changes dramatically
- [ ] Don't overuse transitions (no fancy ones, keep it professional)

**Step 3: Add Graphics**
- [ ] Create title card:
  - [ ] First 3 seconds
  - [ ] White text on solid color background
  - [ ] Video title + your name
- [ ] Add lower-thirds:
  - [ ] When you appear on camera
  - [ ] Your name + "Building Tools with Claude Code"
  - [ ] 0.5-second fade in/out
- [ ] Add text overlays (visual callouts):
  - [ ] At key moments (provided in script document)
  - [ ] White or bright yellow text
  - [ ] Black outline for readability
  - [ ] 16-18pt font minimum
  - [ ] 2-3 seconds on screen
- [ ] Add end screen:
  - [ ] Last 10-20 seconds
  - [ ] Subscribe button (YouTube native)
  - [ ] Next video thumbnail (YouTube native)
  - [ ] "Watch next video" text

**Step 4: Add Music**
- [ ] Import intro music (0:00-0:05, fade out)
- [ ] Import background music for screen sections:
  - [ ] Royalty-free from YouTube Audio Library, Epidemic Sound, or Artlist
  - [ ] Non-intrusive (10-20% volume)
  - [ ] Matches video vibe (professional, not distracting)
- [ ] Import outro music (last 5-10 seconds)
- [ ] Adjust music volume:
  - [ ] Voiceover should always be louder
  - [ ] Music should be 15-25% volume
  - [ ] Use keyframes to fade in/out smoothly

**Step 5: Color Grading (5-10 minutes)**
- [ ] Apply LUT (Look-Up Table) for consistency:
  - [ ] Most video editors have presets (try "Natural" or "Cool")
- [ ] Adjust:
  - [ ] Brightness (+5-10% for screen recordings, which are often dim)
  - [ ] Contrast (+5-10%)
  - [ ] Saturation (leave neutral, or -5% for calming effect)
  - [ ] Temperature (slight blue for cool, slight orange for warm)
- [ ] Watch on different monitors to verify (looks good on multiple screens)

**Step 6: Export**
- [ ] Select export settings:
  - [ ] Format: H.264 MP4
  - [ ] Resolution: 1920x1080 (1080p)
  - [ ] Frame rate: 30fps
  - [ ] Bitrate: 8-10 Mbps (high quality)
  - [ ] Audio: 128-256 kbps, stereo
- [ ] Name file: `VIDEO-1-MISTAKES-FINAL.mp4`
- [ ] Export (takes 10-30 minutes depending on length and computer)
- [ ] Once complete, back up immediately

### Caption/Subtitle Generation (20-30 minutes)

- [ ] Use YouTube's auto-caption feature:
  - [ ] Upload video to YouTube (unlisted)
  - [ ] Wait for auto-captions to generate (5-10 minutes)
  - [ ] Download caption file (SRT format)
- [ ] In your text editor, review and fix captions:
  - [ ] Fix any misspellings
  - [ ] Fix technical terms (Claude, TypeScript, etc.)
  - [ ] Ensure line breaks make sense (don't cut words awkwardly)
- [ ] Re-upload caption file to YouTube
- [ ] Preview and verify captions match video

### Final Review Checklist (20 minutes)

**Watch your video at 1.5x speed** (simulates how some viewers might watch):

- [ ] Audio is clear and level throughout
- [ ] No background noise
- [ ] Voiceover doesn't clip/peak
- [ ] Video transitions are smooth
- [ ] Text overlays are readable
- [ ] Graphics look professional
- [ ] Music isn't too loud
- [ ] Captions are accurate
- [ ] No awkward silences longer than 2 seconds
- [ ] Pacing feels good (not too slow, not rushed)
- [ ] Outro is clear and CTAs are obvious
- [ ] No sensitive information visible

**If something isn't perfect:**
- Decide if it's worth re-doing or if it's "good enough"
- General rule: If it distracts you, re-do it. If you wouldn't notice without looking for it, leave it.

---

## Part 6: Publishing Checklist

### Before Upload

- [ ] Final video file is backed up (at least 2 locations)
- [ ] Thumbnail is created and saved (1280x720px)
- [ ] Title is finalized (check SEO keywords)
- [ ] Description is written (with all links)
- [ ] Tags are ready (10-15 relevant tags)
- [ ] Category selected (Science & Technology)
- [ ] Playlist selected (if part of series)

### YouTube Upload Steps

- [ ] Go to YouTube Studio
- [ ] Click "Create" → "Upload Video"
- [ ] Drag and drop video file (or select file)
- [ ] While uploading, fill in details:
  - [ ] Title
  - [ ] Description
  - [ ] Thumbnail (upload custom)
  - [ ] Visibility (unlisted for review first)
- [ ] Advanced settings:
  - [ ] Category: Science & Technology
  - [ ] Language: English
  - [ ] Captions: English
  - [ ] Content rating: None (video-safe)
  - [ ] Comments & ratings: Allow all
  - [ ] Playlist: Select if applicable
  - [ ] Tags: Add 10-15 relevant tags
- [ ] Save and review

### Pre-Publishing Review (15 minutes)

- [ ] Watch 30-second preview
- [ ] Check thumbnail looks good
- [ ] Check title displays correctly
- [ ] Check description shows correctly
- [ ] Check captions are on (and optional)
- [ ] Set publish date/time:
  - [ ] Monday morning (9 AM PT recommended)
  - [ ] Set to "Publish Later" if scheduling
- [ ] Final check: Everything correct?
- [ ] Click "Publish" (or "Schedule" if delayed)

### Post-Publishing

- [ ] Verify video is live and correct
- [ ] Update video with captions if not auto-captioned
- [ ] Share on social media (Twitter, LinkedIn, etc.)
- [ ] Email subscribers with link
- [ ] Post in communities (Discord, subreddits, forums)
- [ ] Create short clips from video
- [ ] Monitor comments (respond to early engagement)

---

## Part 7: Software-Specific Guides

### ScreenFlow (Mac) Complete Walkthrough

1. **Open ScreenFlow:** Applications → ScreenFlow
2. **Open Preferences:** ScreenFlow → Preferences
3. **Set Audio Input:** Select your external microphone
4. **Set Quality:** Choose "High" for 720p+ recording
5. **Close Preferences**
6. **Create New Recording:**
   - Click "File" → "New Recording"
   - Select screen to record (usually "Full Screen")
7. **Position the Recording Window:**
   - You'll see a window with red circle (record button)
   - Click the red circle to START recording
8. **During Recording:**
   - Red dot shows it's recording
   - Click red dot or press Space to stop
9. **After Recording:**
   - Video appears in ScreenFlow editor
   - You can trim, add effects, add audio
10. **Export:**
    - File → Export
    - Select format: MP4
    - Select resolution: 1920x1080
    - Select quality: High
    - Name your file
    - Click Export

### OBS Studio (Windows/Cross-Platform) Complete Walkthrough

1. **Download OBS:** obsproject.com
2. **Install and open OBS**
3. **Create a Scene:**
   - Right-click in "Scenes" panel
   - "New Scene"
   - Name: "Screen Recording"
4. **Add Screen Capture:**
   - In Sources panel, click "+"
   - Add "Display Capture"
   - Select your primary monitor
   - Click OK
5. **Add Microphone:**
   - In Sources panel, click "+"
   - Add "Audio Input Capture"
   - Select your microphone
   - Click OK
6. **Test Audio Levels:**
   - Speak into mic
   - Look at "Audio Mixer" on right
   - Green bars show audio level (-6dB peaks is ideal)
   - Adjust mic volume if too loud/soft
7. **Start Recording:**
   - Click "Start Recording" button (bottom right)
   - When done, click "Stop Recording"
8. **Find Your Video:**
   - File → Show Recordings Folder
   - Video is saved as .flv or .mp4
9. **Convert if Needed:**
   - File → Remux Recordings (converts .flv to .mp4)

---

## Part 8: Troubleshooting

### Common Issues & Solutions

**Audio is too quiet:**
- Move microphone closer (6 inches from mouth)
- Check microphone volume in System Preferences (should be 70-100%)
- In recording software, adjust input level
- Re-record at higher level

**Audio is peaking/clipping:**
- Move microphone farther away (12 inches)
- Reduce microphone volume in System Preferences (50-70%)
- In recording software, reduce input level (-6dB)
- Speak quieter and closer (not louder)

**Screen is blurry/unreadable:**
- Check resolution (should be 1920x1080 or higher)
- Increase font size to 14pt+
- Zoom text editor/IDE to 125-150%
- Try recording at 1280x720 to see if that helps (usually not)

**Background noise in audio:**
- Turn off AC/heating
- Close windows
- Record in a room with carpeting/soft furnishings (absorbs sound)
- Use noise gate: record 1-2 seconds of silence, apply noise reduction
- Use microphone with noise cancellation

**Video codec issues (won't play):**
- Install VLC media player (plays almost anything)
- Try converting video format:
  - Use HandBrake (free) to convert
  - Select "Fast 1080p30" preset
  - Click "Start" to convert
- Try different video editor (some are more compatible)

**Audio out of sync with video:**
- In editor, right-click audio file
- "Synchronize" or "Sync With Video"
- Or manually shift audio to match (drag it in timeline)
- Find a moment you can see yourself speaking, sync to that moment

**Computer too slow during recording:**
- Close ALL other applications
- Restart computer before recording
- Disable Spotlight indexing
- Disable Time Machine
- Close Finder windows
- Disconnect external drives (except recording location)

---

## Part 9: Recording Session Checklist (Final)

Print this before each recording session:

```
═══════════════════════════════════════════
RECORDING SESSION CHECKLIST
Video: ___________________
Date: ___________________
═══════════════════════════════════════════

ENVIRONMENT (10 min before)
  [ ] Door closed
  [ ] Phone in other room, silenced
  [ ] No windows open (noise)
  [ ] AC/heating off
  [ ] Tell family: Recording in progress

COMPUTER (5 min before)
  [ ] Quit Slack, email, Messages
  [ ] Do Not Disturb: ON
  [ ] Spotlight indexing: OFF
  [ ] All notifi cations: OFF
  [ ] Only essential apps open

AUDIO/LIGHTING (3 min before)
  [ ] Microphone at 6-12 inches
  [ ] Lighting check: face is visible
  [ ] Audio test: 30-second recording
  [ ] Playback: Can hear yourself clearly?

CAMERA (2 min before)
  [ ] If using webcam: at eye level
  [ ] If no webcam: that's fine too

COMPUTER DISPLAY (2 min before)
  [ ] Resolution: 1920x1080
  [ ] Font size: 14pt+
  [ ] Only needed windows/tabs open
  [ ] Zoom level: readable

SCRIPT/CONTENT (2 min before)
  [ ] Script visible
  [ ] Examples loaded
  [ ] Code files open
  [ ] Browser tabs ready

RECORDING SOFTWARE (1 min before)
  [ ] Software is open
  [ ] Microphone selected
  [ ] Resolution set
  [ ] Audio levels checked

FINAL MOMENT
  [ ] Take a breath
  [ ] Have water nearby
  [ ] Feeling ready?

═══════════════════════════════════════════
START RECORDING ▶️
═══════════════════════════════════════════
```

---

## Success Tips

1. **Your first take won't be perfect** - That's normal and expected
2. **Video talks down the internet** - Clear audio > perfect video
3. **Pauses are your friend** - More pauses makes better videos
4. **Mistakes are fixable** - Imperfect takes often become great videos
5. **Start recording early** - Gives you time to do multiple takes
6. **Watch your playback** - You'll see issues you can fix before editing
7. **Step away between takes** - Clears your head, next take is better
8. **You'll get faster** - Video 3 takes half the time of Video 1
9. **Ship it** - A "done" video is better than a "perfect" video stuck in editing
10. **You've got this** - You already built Prompt Saver, you can do this

---

## Quick Reference: Time Breakdown

For a 16-minute video:

| Task | Time | Notes |
|------|------|-------|
| Recording | 5-6 hours | Multiple takes, breaks between |
| Editing | 4-6 hours | Most time-intensive |
| Graphics/Effects | 1-2 hours | Titles, overlays, music |
| Captions | 0.5-1 hour | Review and correct |
| Publishing prep | 0.5 hour | Thumbnail, description, etc. |
| **TOTAL** | **11-16 hours** | Average for quality video |

That's about a full working day per video. Worth it for the content.

Good luck. You've got this.
