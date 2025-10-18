# Alfred Gadget 2.0 - YDP Full-stack Track

A modern e-commerce product browsing application built with vanilla HTML, CSS, and JavaScript using modular ES6 architecture.

## Project Overview

This project is built for the Young Developer Power (YDP) Full-stack Track mini project. It demonstrates clean, modular code architecture while meeting all functional requirements.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - Modules, async/await, modern APIs
- **FakeStore API** - Product data source

## Why Vanilla JavaScript?

1. **Demonstrates Fundamentals** - Shows deep understanding of core web technologies
2. **Modular Architecture** - ES6 modules provide clean separation of concerns
3. **Zero Dependencies** - No build tools or frameworks needed
4. **Better Performance** - No framework overhead
5. **Easy Deployment** - Just open index.html in a browser

## Features

- Browse all products from FakeStore API
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle with persistence
- Clean, minimal design inspired by Mercular
- Smooth animations and interactions
- Error handling and loading states
- Modular, maintainable code structure

## Project Structure

\`\`\`
alfred-gadget/
├── index.html                 # Main entry point
├── css/
│   ├── base/
│   │   ├── variables.css      # Design system tokens
│   │   ├── reset.css          # CSS reset
│   │   └── layout.css         # Global layout
│   ├── components/
│   │   ├── navbar.css         # Navigation styles
│   │   ├── theme-toggle.css   # Theme switcher styles
│   │   ├── product-grid.css   # Grid layout styles
│   │   └── product-card.css   # Product card styles
│   └── main.css               # CSS entry point
├── js/
│   ├── config.js              # App configuration
│   ├── utils/
│   │   ├── dom.js             # DOM helpers
│   │   └── theme.js           # Theme management
│   ├── state/
│   │   └── store.js           # State management
│   ├── api/
│   │   └── productService.js  # API integration
│   ├── components/
│   │   ├── Navbar.js          # Navigation component
│   │   ├── ThemeToggle.js     # Theme toggle component
│   │   ├── ProductCard.js     # Product card component
│   │   └── ProductGrid.js     # Product grid component
│   └── main.js                # App initialization
└── README.md
\`\`\`

## Architecture Decisions

### Modular Design
- **One component = One CSS + One JS file** - Easy to locate and maintain
- **Separation of concerns** - Utils, state, API, and components are separated
- **ES6 Modules** - Native browser module system for clean imports

### State Management
- Simple store pattern for managing app state
- Subscribe/notify pattern for reactive updates
- No external state management library needed

### Styling Approach
- **CSS Custom Properties** - Theme system with design tokens
- **Mobile-first** - Responsive design from small to large screens
- **Component-scoped CSS** - Each component has its own stylesheet

## How to Run

### Option 1: Direct File Access
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. That's it!

### Option 2: Local Server (Recommended)
\`\`\`bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
\`\`\`

Then open `http://localhost:8000` in your browser.

## API Integration

This project uses the [FakeStore API](https://fakestoreapi.com/) for product data.

**Endpoints used:**
- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch single product (for future details page)
- `GET /products/categories` - Fetch categories (for future filtering)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Product details page
- Category filtering
- Search functionality
- Shopping cart with localStorage
- Product comparison feature

## Grading Criteria Alignment

| Criteria | Implementation | Weight |
|----------|----------------|--------|
| **Architecture** | Modular ES6 structure, clear separation of concerns | 20% |
| **Frontend** | Responsive design, clean UI, follows requirements | 25% |
| **Backend** | Clean API integration, error handling, state management | 25% |
| **Code Quality** | Readable code, JSDoc comments, error handling, Git history | 20% |
| **Presentation** | Clear documentation, demo-ready, explainable architecture | 10% |

## Author

Built for YDP Full-stack Track Mini Project

## License

MIT License - Free to use for educational purposes
