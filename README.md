# EstateGuru

A build system specifically designed for Webflow projects. This repository compiles SCSS to CSS and bundles JavaScript modules, generating the files needed to enhance Webflow sites with custom functionality. The generated `dist/app.bundle.js` and CSS files are intended to be used within Webflow projects via the Local Code toggle feature.

## 🚀 Features

- **Webflow-Focused Build System**: Generates JavaScript and CSS files specifically for use in Webflow projects
- **JavaScript Bundling**: ESBuild bundles JavaScript modules into `dist/app.bundle.js` for Webflow integration
- **SCSS Compilation**: Sass compiler generates CSS files from SCSS source files for Webflow styling
- **Webflow Local Code Integration**: Designed to work seamlessly with Webflow's Local Code toggle for live development
- **Modular Architecture**: Self-initializing classes that work within Webflow's DOM structure
- **Component-Based**: Reusable Webflow components like VideoBox, VideoCarousel, VideoFAQ, and more

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Live Server** (VS Code/Cursor extension) for local development with live reload
- **Stylus** (Chrome browser extension) for CSS injection

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
   - **Chrome extension**: Stylus for CSS injection and management

## 🏃‍♂️ Getting Started

### Development Mode

#### Option 1: Using Live Server (Recommended for Local Development)

1. **Start the build process**:
   ```bash
   npm start
   # or
   npm run dev:all
   ```

2. **Start Live Server**:
   - Click the "Go Live" button on the bottom status bar in VS Code/Cursor
   - Or right-click on `index.html` and select "Open with Live Server"
   - This will start a local server (usually at `http://127.0.0.1:5500`)

3. **For live CSS changes**, add this CSS injection code in the Stylus Chrome extension:
   ```css
   @-moz-document url-prefix("https://your-webflow-site") {
   @import url("http://127.0.0.1:5500/css/style.css");
   }
   ```

4. **Configure Webflow CSS/JS Component**:
   - In your Webflow project, go to the CSS/JS component settings
   - **Disable remote scripts** to prevent conflicts with local development
   - **Enable local scripts** to allow local file overrides
   - This allows your local CSS and JS files to override the remote ones during development
   
   ⚠️ **Important**: Do **NOT** enable both remote and local development toggles simultaneously. Enabling both will cause the `.js` and `.css` files to be loaded twice, which can lead to:
   - Duplicate script execution
   - CSS conflicts and styling issues
   - Performance degradation
   - Unexpected behavior
   
   Always use **either** remote **or** local, never both at the same time.

This setup provides:
- Real-time SCSS compilation
- JavaScript bundling with watch mode
- Live CSS injection for real-time styling updates
- Local file overrides for development testing

**Note**: To see changes:
- **CSS changes**: 
  - In Webflow editor: Click the preview button on and off to reload CSS styles
  - With Stylus extension: Enable/disable Stylus extension to reload styles
- **JavaScript changes**: Refresh the page to reload scripts

#### Option 2: Traditional Development

Start the development server for both JavaScript and SCSS:

```bash
npm start
# or
npm run dev:all
```

This command will:
- Watch and compile SCSS files to CSS
- Bundle and watch JavaScript files

**Note**: To see changes:
- **CSS changes**: 
  - In Webflow editor: Click the preview button on and off to reload CSS styles
  - With Stylus extension: Enable/disable Stylus extension to reload styles
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
│   └── style.css
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
   - `index.html`
   - `css/` directory
   - `dist/app.bundle.js`
   - Any additional assets

3. **Configure Webflow for Production**:
   - ⚠️ **Important**: Before pushing live, ensure that in your Webflow CSS/JS component settings:
     - **Enable remote scripts** (production files)
     - **Disable local scripts** (development mode)
   - This ensures your live site loads the production files from your server, not from your local development environment
   - Never enable both toggles simultaneously in production

## 🐛 Troubleshooting

### Common Issues

1. **SCSS not compiling**: Ensure you're running `npm run sass` or `npm start`
2. **JavaScript not updating**: Check that the build process is running with `npm run dev`
3. **Live Server not working**: Make sure the Live Server extension is installed and the "Go Live" button is active

### Development Tips

- Use browser developer tools to debug JavaScript modules
- Access registered modules via `window.modules` in the console
- Check the console for any build errors
- Ensure all file paths are correct in your HTML
- **Live Server URL**: Make sure your Live Server is running on `http://127.0.0.1:5500` for the local development setup
- **CSS Injection**: The `@-moz-document` rule in Stylus allows you to inject local CSS for styling updates
- **Stylus Extension**: Use the Stylus Chrome extension to inject CSS rules - enable/disable to reload styles
- **Manual Refresh**: Refresh the page to see JavaScript changes after they're compiled
- **Webflow Settings**: Configure the CSS/JS component to disable remote scripts and enable local scripts for development overrides

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
