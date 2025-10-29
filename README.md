# Multidomain Research Agent - V0.1 Prototype

A static prototype of the Multidomain Research Agent with a clean, responsive Bootstrap 5 interface.

## Layout

**Desktop (≥992px):**
- **Left Column:** Avatar panel (placeholder for v0.3 integration)
- **Center Column:** Chat + Results (narrow and centered)
- **Right Column:** Research Trace sidebar (accordion)

**Mobile (<992px):**
- Stacked layout: Chat → Results → Avatar → Trace

## Visual Design

- **Background:** Full-page linear gradient from #A0D6D4 to #71B3C9
- **Panels:** Translucent #00CED1 theme (rgba(0,206,209,0.20)) with subtle borders and shadows
- **Responsive:** Bootstrap 5 utilities for mobile-first design

## Setup

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required

## Features

### Implemented (V0.1)
- ✅ Three-column responsive layout with new structure
- ✅ Translucent panel theme
- ✅ Navbar with product name and v0.1 badge
- ✅ Chat interface with textarea and Send button
- ✅ Mic button (disabled) with tooltip "STT coming in v0.2"
- ✅ Results panel with streaming demo text
- ✅ Research Trace accordion with dynamic badges
- ✅ Avatar panel with canvas placeholder (v0.3 note)
- ✅ "View sources" link scrolls to Trace
- ✅ Accessibility features (skip link, ARIA labels, keyboard navigation)

### Coming in Future Versions
- **V0.2:** Speech-to-text (STT) functionality
- **V0.3:** Avatar integration with viseme-synchronized lip movements

## File Structure

```
.
├── index.html    # Main HTML structure with Bootstrap 5
├── styles.css    # Gradient background and translucent theme
├── script.js     # Streaming simulation and interactivity
└── README.md     # This file
```

## Usage

1. Enter a research question in the Chat panel
2. Click "Send" or press Enter
3. Watch the agent simulate research steps in the Trace panel
4. View streamed results with inline citations
5. Click "View sources" to scroll to the Trace accordion

## Accessibility

- Skip-to-content link for keyboard navigation
- ARIA labels and roles throughout
- Keyboard-accessible accordion
- Focus indicators on all interactive elements

## Notes

- This is a static frontend-only prototype
- No backend or API integration
- All agent behavior is simulated via JavaScript
- Avatar is a visual placeholder with integration note for v0.3

