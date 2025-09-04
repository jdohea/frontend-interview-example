# Image Assets

This directory contains image assets for the Jarvio dashboard.

## Placeholder Files

The following image files should be added here:

### Branding
- `jarvio-logo.svg` - Main Jarvio logo for header
- `jarvio-icon.png` - Favicon and small icon usage

### Icons
- `workflows-icon.svg` - Workflows section icon
- `tasks-icon.svg` - Tasks section icon  
- `data-icon.svg` - Data sources section icon
- `agent-icon.svg` - Agent section icon

### UI Elements
- `empty-state-illustration.svg` - Empty state graphics
- `error-illustration.svg` - Error state graphics
- `loading-spinner.svg` - Custom loading animations (optional)

### Sparkline Backgrounds
- `chart-bg-grid.svg` - Grid background for charts (optional)

## Usage

```tsx
// In React components
<img src="/img/jarvio-logo.svg" alt="Jarvio" />

// With Vite imports
import logo from '/img/jarvio-logo.svg';
<img src={logo} alt="Jarvio" />
```

## Specifications

- **Format**: SVG preferred for scalability, PNG for complex images
- **Size**: Optimize for web (< 100KB each)
- **Colors**: Follow the design system (use CSS variables when possible)
- **Accessibility**: Always include descriptive alt text

---

*Note: These are placeholder instructions. Actual images will be added by the interviewer.*
