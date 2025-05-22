# Farzana Akter Faria - Personal Portfolio Website

A modern, responsive one-page personal portfolio website for Farzana Akter Faria, a chemistry educator and academic mentor from Bangladesh. The website showcases her education, experience, skills, and contact information with a sophisticated theme system.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multiple Color Themes**: Choose from various professionally designed color schemes:
  - Emerald Gold (default)
  - Burgundy Gold
  - Purple Accent
  - Midnight Orange
  - Vivid Turquoise
- **Dynamic SVG Colors**: Interactive SVG elements adapt to the selected color theme
- **Dark/Light Mode**: Toggle between dark and light themes with persistent user preference
- **Bilingual Support**: Switch between English and Bangla languages with persistent user preference
- **Smooth Scrolling**: Navigate easily between sections with animated transitions
- **Animations**: Smooth fade-in and interactive element animations
- **Contact Form**: Get in touch directly through the website
- **Embedded Map**: Location embedded with Google Maps
- **Modern UI**: Clean and professional design with custom SVG graphics
- **Social Media Links**: Integrated social media icons in footer
- **Back to Top Button**: Easy navigation to the top of the page

## Technical Overview

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with flexbox, grid, and CSS variables
- **JavaScript**: Vanilla JS for all interactive features (no dependencies)
- **Theming System**: CSS variables for easy color scheme customization
- **Dynamic SVG Adaptation**: JavaScript-driven SVG color updates based on theme
- **Responsive**: Mobile-first approach with media queries
- **Custom SVGs**: Vector graphics for logos and illustrations
- **Local Storage**: Saves user preferences for language, theme, and color scheme

## Sections

1. **Header**: Name, navigation, language toggle, theme toggles
2. **Hero**: Interactive SVG animation that adapts to the current theme
3. **Academic Focus Areas**: Subject specializations with visual representations
4. **About**: Personal introduction and professional summary
5. **Education**: Academic qualifications and achievements
6. **Experience**: Teaching experience timeline
7. **Skills**: Teaching, scientific, and soft skills organized by category
8. **Teaching Philosophy**: Educational approach and methodologies
9. **Testimonials**: Feedback from students, parents, and colleagues
10. **Resources**: Educational resources (coming soon)
11. **Contact**: Contact information, form, and embedded map
12. **Footer**: Logo, social links, and copyright information

## File Structure

```
root/
├── index.html           # Main HTML file
├── css/
│   ├── style.css            # Main stylesheet
│   ├── emerald-gold-theme.css   # Default theme
│   ├── burgundy-gold-theme.css  # Burgundy theme
│   ├── purple-accent-theme.css  # Purple theme
│   ├── midnight-orange-theme.css # Midnight theme
│   ├── turquoise-coral-theme.css # Turquoise theme
│   └── svg-styles.css       # SVG animation styles
├── img/
│   ├── logo.svg              # Main logo (adapts to theme)
│   ├── logo-white.svg        # White version for footer
│   ├── favicon.svg           # Favicon that matches the theme
│   └── testimonials/         # Testimonial images
└── js/
    ├── main.js               # Main JavaScript functionality
    ├── theme-elements.js     # Dynamic theme adaptation
    └── background-animations.js # Background animation effects
```

## Theme System

The website uses a sophisticated theming system with these components:

1. **CSS Variable-Based Themes**: Each theme file defines a set of CSS variables for consistent styling
2. **Theme Selector**: UI element allowing users to switch between color schemes
3. **Dynamic SVG Adaptation**: JavaScript that updates SVG element colors based on the current theme
4. **Persistent Preferences**: Saves the user's theme preference in localStorage
5. **Dark Mode Integration**: Each theme has both light and dark mode variants

The themes are designed to maintain visual harmony while providing distinct visual identities:

- **Emerald Gold**: Professional green with gold accents
- **Burgundy Gold**: Rich burgundy with elegant gold accents
- **Purple Accent**: Vibrant purple with soft pink highlights
- **Midnight Orange**: Deep blue with energetic orange accents
- **Vivid Turquoise**: Bright turquoise with coral accents

## Setup & Deployment

### Local Setup
1. Clone the repository
2. No build tools required - simply open `index.html` in a web browser

### GitHub Pages Deployment
1. Create a GitHub repository for the website
2. Add a `.gitignore` file to exclude the `node_modules` directory:
   ```
   node_modules/
   .DS_Store
   ```
3. Push your code to the repository
4. Go to repository Settings > Pages
5. Select your main branch as the source
6. Your site will be published at `https://yourusername.github.io/repository-name/`

### Other Hosting Providers
- Simply upload all files except `node_modules` to your web hosting provider

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

To customize the themes:
1. Edit the theme CSS files in the `css/` directory
2. Update the `js/theme-elements.js` file to adjust dynamic color adaptation
3. All themes use CSS variables, making site-wide color updates simple

## Maintenance

To update content:
1. Edit the `index.html` file for text changes
2. For structural changes, maintain the existing HTML structure
3. For style changes, modify the CSS files in the `css/` directory
4. Test all changes on multiple devices and with different themes before deploying

## Credits

- Font Awesome for icons
- Google Fonts for typography (Poppins)
- Google Maps for embedded map
- Created with ❤️ by Rabius Sani 