---
name: ppt-generator
description: Professional PowerPoint presentation generator with modern design templates, charts, animations, and visual effects. Create stunning presentations with gradient backgrounds, data visualizations, icon systems, and corporate branding. Use when user needs professional PPT, presentation slides, visual reports, or data-driven slideshows.
metadata:
  openclaw:
    emoji: 🎨
compatibility:
  tools:
    - exec
---

# PPT Generator Pro 🎨

Professional PowerPoint presentation generator with modern design templates.

## Features

- 10+ Design Templates (Business, Creative, Minimal, Tech, Gradient)
- Data Visualization (Charts, Progress bars, Statistics)
- Visual Elements (Icons, Shapes, Gradients, Shadows)
- Animation Support (Transitions, Entrance effects)
- Corporate Branding (Colors, Fonts, Logos)
- Smart Layouts (Title, Content, Two-column, Image+Text)

## Design Templates

### Template 1: Gradient Modern
- Gradient backgrounds (Purple-Pink-Blue)
- Floating shapes and circles
- Rainbow accent bars
- Best for: Creative presentations, product launches

### Template 2: Corporate Business
- Navy blue + Gold professional
- Clean lines and borders
- Structured layouts
- Best for: Business reports, corporate meetings

### Template 3: Minimal Clean
- White backgrounds
- Subtle shadows
- Typography-focused
- Best for: Educational content, minimalist style

### Template 4: Tech Neon
- Dark backgrounds
- Neon accents (Cyan, Magenta, Lime)
- Circuit patterns
- Best for: Tech presentations, developer talks

### Template 5: Vibrant Colorful
- Multi-color sections
- Bold typography
- Playful elements
- Best for: Marketing, creative pitches

## Usage

```python
# Generate professional PPT
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Choose template
template = "gradient_modern"  # or "corporate", "minimal", "tech", "vibrant"

# Add slides with smart layouts
add_title_slide(title, subtitle, speaker, date)
add_section_slide(number, title, color)
add_content_slide(title, bullets, accent_color)
add_chart_slide(title, chart_type, data)
add_image_slide(title, image_path, caption)
```

## Visual Elements Library

### Icons
- 📊 Charts and data
- 🎯 Goals and targets
- ✨ Features and highlights
- 💡 Ideas and innovation
- 🚀 Growth and progress
- 🔒 Security and safety

### Shapes
- Circles, rectangles, rounded corners
- Arrows, connectors, flow diagrams
- Progress bars, timelines
- Callout boxes, badges

### Color Palettes

**Vibrant:**
- Primary: #9333EA (Purple)
- Secondary: #EC4899 (Pink)
- Accent: #22D3EE (Cyan)
- Highlight: #FACC15 (Yellow)

**Corporate:**
- Primary: #1E3A8A (Navy)
- Secondary: #FBBF24 (Gold)
- Accent: #60A5FA (Light Blue)
- Text: #FFFFFF (White)

**Tech:**
- Background: #0F172A (Dark)
- Neon Blue: #00D9FF
- Neon Pink: #FF00FF
- Neon Green: #39FF14

## Advanced Features

### Smart Charts
```python
# Create pie chart for skill distribution
pie_data = [
    ("Testing", 93, RGBColor(147, 51, 234)),
    ("Non-Testing", 119, RGBColor(236, 72, 153))
]
add_pie_chart_slide("Skills Distribution", pie_data)

# Create bar chart for statistics
bar_data = [
    ("Efficiency", 85),
    ("Quality", 92),
    ("Cost Reduction", 78)
]
add_bar_chart_slide("Performance Metrics", bar_data)
```

### Progress Indicators
```python
# Add circular progress indicator
add_progress_circle(percentage=75, label="Complete")

# Add horizontal progress bar
add_progress_bar(current=93, total=212, label="Skills Installed")
```

### Image Handling
```python
# Add image with overlay
add_image_with_overlay(image_path, title, description)

# Create image grid
add_image_grid([image1, image2, image3, image4], titles)
```

## Best Practices

1. **Color Consistency**: Use max 3-4 colors per presentation
2. **Font Hierarchy**: Title 40-60pt, Body 20-28pt
3. **White Space**: Don't overcrowd slides
4. **Visual Balance**: Mix text, charts, and images
5. **Animation**: Use subtle transitions, avoid over-animation

## Output

Generates `.pptx` file compatible with:
- Microsoft PowerPoint 2016+
- Google Slides
- Apple Keynote
- LibreOffice Impress

## Example Commands

"Generate a professional PPT about [topic] with vibrant colors"
"Create a corporate presentation with charts and data"
"Make a tech-themed slideshow with dark background"
"Design a minimal clean presentation for education"
