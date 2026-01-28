# EstateGuru

A modern web application built with vanilla JavaScript, featuring modular architecture, smooth animations, and responsive design.

## 🚀 Features

- **Modular JavaScript Architecture**: Self-initializing classes with clean separation of concerns
- **Modern Build System**: ESBuild for fast bundling and development
- **SCSS Styling**: Organized stylesheets with variables and mixins
- **Smooth Animations**: GSAP integration for high-performance animations
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Component-Based**: Reusable components like VideoBox, VideoCarousel, VideoFAQ, and more

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Live Server** (VS Code/Cursor extension) for local development with live reload

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/underbelly/estateguru.git
   cd estateguru-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install development tools**:
   - **VS Code/Cursor extensions**: Live Server for local development with live reload

## 🏃‍♂️ Getting Started

### Development Mode with Webflow Integration

#### Using Go Live with Webflow Local Code Toggle

This setup allows you to develop locally while viewing your changes on the actual Webflow site:

1. **Start the build process**:
   ```bash
   npm start
   # or
   npm run dev:all
   ```
   This will:
   - Watch and compile SCSS files to CSS
   - Bundle and watch JavaScript files

2. **Start Live Server (Go Live)**:
   - Click the "Go Live" button on the bottom status bar in VS Code/Cursor
   - Or right-click on `index.html` and select "Open with Live Server"
   - This will start a local server (usually at `http://127.0.0.1:5500` or `http://localhost:5500`)
   - **Note the port number** - you'll need this for the Webflow configuration

3. **Configure Webflow Header Component**:
   - In your Webflow project, locate the **CSS/JS Header Component** (or custom code component)
   - Find the **"Local Code"** toggle/switch in the component settings
   - **Enable the Local Code toggle**
   - When enabled, this tells Webflow to load CSS and JavaScript files from your local development server instead of the remote files
   - The component will automatically detect your local server running on the port (e.g., `http://localhost:5500`)

4. **How it works**:
   - When the **Local Code toggle is enabled** in Webflow, the header component will:
     - Load CSS from: `http://localhost:[PORT]/css/style.css`
     - Load JavaScript from: `http://localhost:[PORT]/dist/app.bundle.js`
   - This allows you to see your local changes in real-time on the Webflow site
   - Changes to SCSS files will automatically compile and be reflected when you refresh
   - Changes to JavaScript files will automatically bundle and be reflected when you refresh

5. **Development workflow**:
   - Keep `npm start` running in your terminal
   - Keep Go Live active (the port should be visible in the status bar)
   - Enable the Local Code toggle in Webflow
   - Make changes to your SCSS or JavaScript files
   - Refresh the Webflow page to see your changes

**Benefits of this approach**:
- ✅ See changes directly on the Webflow site
- ✅ No need for CSS injection extensions
- ✅ Test with actual Webflow interactions and components
- ✅ Real-time development feedback
- ✅ Works with Webflow's responsive design mode

**Note**: 
- Make sure your local server port matches what Webflow expects (check the port in the Go Live status bar)
- If you change ports, you may need to update the Webflow component configuration
- JavaScript changes require a page refresh to see updates
- SCSS changes compile automatically but may require a refresh to see updates

### Traditional Development (Without Webflow)

If you're developing standalone without Webflow integration:

```bash
npm start
# or
npm run dev:all
```

This command will:
- Watch and compile SCSS files to CSS
- Bundle and watch JavaScript files

**Note**: To see changes:
- **CSS changes**: Refresh the page to reload styles
- **JavaScript changes**: Refresh the page to reload scripts

### Individual Commands

**SCSS Compilation (with watch)**
```bash
npm run sass
```

**JavaScript Bundling (with watch)**
```bash
npm run dev
```

**Production Build**
```bash
npm run build
```

## 📁 Project Structure

```
estateguru-js/
├── css/                    # Compiled CSS files
│   ├── style.css
│   ├── forms.css
│   ├── variables.css
│   ├── accordion-tabs.css
│   └── underbelly-helpers.css
├── scss/                   # Source SCSS files
│   ├── style.scss
│   ├── forms.scss
│   ├── variables.scss
│   ├── accordion-tabs.scss
│   └── underbelly-helpers.scss
├── js/                     # JavaScript source files
│   ├── app.js             # Main entry point
│   ├── annotations.js     # Annotation utilities
│   ├── classes/           # Modular class files
│   │   ├── VideoBox.js
│   │   ├── VideoCarousel.js
│   │   └── VideoFAQ.js
│   └── modules/
│       └── ClassManager.js
├── dist/                   # Built JavaScript bundle
│   └── app.bundle.js
├── index.html             # Main HTML file
├── webflow-loader.js      # Webflow integration loader
└── package.json           # Dependencies and scripts
```

## 🧩 Modular Architecture

This project uses a centralized ClassManager approach for component initialization:

### Adding New Components

1. **Create a new class file** in `js/classes/`:
   ```javascript
   // js/classes/MyComponent.js
   export default class MyComponent {
       static selector = '.my-component'; // Define the CSS selector
       
       constructor(element, options = {}) {
           this.element = element;
           this.options = options;
           this.init();
       }

       init() {
           // Initialize your component
       }
   }
   ```

2. **Add to ClassManager** (`js/modules/ClassManager.js`):
   ```javascript
   // Import the new class at the top
   import MyComponent from '../classes/MyComponent.js';

   // Add to the global classes object
   window.AppClasses = { VideoBox, VideoCarousel, VideoFAQ, MyComponent };

   // Add initialization in the initializeClasses function
   document.querySelectorAll(MyComponent.selector).forEach((element, index) => {
       new MyComponent(element, { index });
   });
   ```

### Available Components

- **VideoBox**: Video player component (`#video-box`)
- **VideoCarousel**: Video carousel component (`.video-carousel`)
- **VideoFAQ**: Video FAQ accordion component (`.video-faq`)

## 🎨 Styling

The project uses SCSS with a modular approach:

- **Variables**: Global variables in `scss/variables.scss`
- **Forms**: Form-specific styles in `scss/forms.scss`
- **Accordion Tabs**: Tab component styles in `scss/accordion-tabs.scss`
- **Underbelly Helpers**: Utility styles in `scss/underbelly-helpers.scss`
- **Main Styles**: Core styles in `scss/style.scss`

### SCSS Compilation

SCSS files are automatically compiled to CSS when you run the development server. The compiled CSS files are placed in the `css/` directory.

## 📦 Dependencies

### Production Dependencies
- **GSAP**: High-performance animation library

### Development Dependencies
- **ESBuild**: Fast JavaScript bundler
- **Sass**: CSS preprocessor
- **Concurrently**: Run multiple npm scripts simultaneously

## 🔧 Configuration

### Build Configuration

The project uses ESBuild for bundling. Configuration is in `package.json`:

- **Development**: `--watch` mode with source maps
- **Production**: Minified output with optimized bundle
- **Format**: IIFE (Immediately Invoked Function Expression) for browser compatibility

### Browser Support

- Modern browsers with ES6+ support
- Mobile and desktop responsive design
- Touch support for mobile devices

## 🚀 Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Upload files** to your web server:
   - `css/` directory (all compiled CSS files)
   - `dist/app.bundle.js`
   - Any additional assets

## 🐛 Troubleshooting

### Common Issues

1. **SCSS not compiling**: Ensure you're running `npm run sass` or `npm start`
2. **JavaScript not updating**: Check that the build process is running with `npm run dev`
3. **Live Server not working**: Make sure the Live Server extension is installed and the "Go Live" button is active
4. **Local code not loading in Webflow**: 
   - Verify Go Live is running and note the port number
   - Check that the Local Code toggle is enabled in the Webflow header component
   - Ensure the port in Webflow matches your Live Server port
   - Check browser console for any CORS or loading errors

### Development Tips

- Use browser developer tools to debug JavaScript modules
- Access registered classes via `window.AppClasses` in the console
- Check the console for any build errors
- Ensure all file paths are correct
- **Port Configuration**: Make sure your Live Server port matches the Webflow component configuration
- **Local Code Toggle**: Remember to enable/disable the toggle in Webflow when switching between local and remote development
- **Refresh Strategy**: JavaScript changes require a page refresh; SCSS changes compile automatically but may need a refresh

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with SCSS and JS watchers |
| `npm run dev:all` | Same as start - runs both SCSS and JS watchers |
| `npm run sass` | Compile SCSS to CSS with watch mode |
| `npm run dev` | Bundle JavaScript with watch mode |
| `npm run build` | Create production build |
| `npm run build-esm` | Create ES module build |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

For more detailed information about the modular JavaScript structure, see [js/README.md](js/README.md).
