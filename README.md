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

This project is designed exclusively for Webflow integration. It generates two main outputs that are used within your Webflow project:

- **JavaScript**: Bundled into `dist/app.bundle.js` from source files in `js/` - loaded by Webflow via Local Code toggle
- **CSS**: Compiled from SCSS files in `scss/` to CSS files in `css/` - loaded by Webflow via Local Code toggle

**Important**: These generated files are meant to be used within your Webflow project, not as a standalone website. The build process creates the assets that Webflow will load and execute.

### Development Mode with Webflow Integration

#### Using Go Live with Webflow Local Code Toggle

This is the primary development workflow for working with Webflow. The build process generates the files that Webflow will load, allowing you to develop locally while viewing your changes on the actual Webflow site:

1. **Start the build process**:
   ```bash
   npm start
   # or
   npm run dev:all
   ```
   This will:
   - Compile SCSS files from `scss/` to CSS files in `css/`
   - Bundle JavaScript files from `js/` into `dist/app.bundle.js`
   - Watch for changes and automatically rebuild

2. **Start Live Server (Go Live)**:
   - Click the "Go Live" button on the bottom status bar in VS Code/Cursor
   - Or right-click on `index.html` and select "Open with Live Server"
   - This will start a local server (usually at `http://127.0.0.1:5500` or `http://localhost:5500`)
   - **Note the port number** - you'll need this for the Webflow configuration

3. **Configure Webflow Header Component**:
   - In your Webflow project, locate the **CSS/JS Header Component** (or custom code component) where you normally add custom code
   - Find the **"Local Code"** toggle/switch in the component settings
   - **Enable the Local Code toggle**
   - When enabled, Webflow will load the generated files (`dist/app.bundle.js` and CSS files) from your local development server instead of remote files
   - The component will automatically detect your local server running on the port (e.g., `http://localhost:5500`)
   - This allows you to test your custom JavaScript and CSS directly within the Webflow site

4. **How it works with Webflow**:
   - When the **Local Code toggle is enabled** in Webflow, the header component will:
     - Load CSS from: `http://localhost:[PORT]/css/style.css` (compiled from SCSS) - this CSS enhances your Webflow site styling
     - Load JavaScript from: `http://localhost:[PORT]/dist/app.bundle.js` (bundled from JS source files) - this JavaScript adds custom functionality to your Webflow site
   - The JavaScript bundle (`dist/app.bundle.js`) initializes components that interact with Webflow's DOM elements
   - The CSS files override or extend Webflow's default styles
   - This allows you to see your local changes in real-time on the Webflow site
   - Changes to SCSS files in `scss/` automatically compile to `css/` and are reflected when you refresh the Webflow page
   - Changes to JavaScript files in `js/` automatically bundle into `dist/app.bundle.js` and are reflected when you refresh the Webflow page

5. **Development workflow**:
   - Keep `npm start` running in your terminal to continuously build `dist/app.bundle.js` and compile CSS
   - Keep Go Live active (the port should be visible in the status bar)
   - Enable the Local Code toggle in Webflow
   - Make changes to your SCSS files in `scss/` or JavaScript files in `js/`
   - The build process automatically generates updated `dist/app.bundle.js` and CSS files
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
- JavaScript changes in `js/` automatically bundle into `dist/app.bundle.js` but require a page refresh to see updates
- SCSS changes in `scss/` automatically compile to `css/` but may require a refresh to see updates

### Build Commands

**SCSS Compilation (with watch)**
```bash
npm run sass
```
Compiles SCSS files from `scss/` to CSS files in `css/`

**JavaScript Bundling (with watch)**
```bash
npm run dev
```
Bundles JavaScript files from `js/` into `dist/app.bundle.js`

**Production Build**
```bash
npm run build
```
Creates optimized production builds of both CSS and JavaScript for deployment

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

The project uses SCSS source files that are compiled to CSS:

- **Variables**: Global variables in `scss/variables.scss` → `css/variables.css`
- **Forms**: Form-specific styles in `scss/forms.scss` → `css/forms.css`
- **Accordion Tabs**: Tab component styles in `scss/accordion-tabs.scss` → `css/accordion-tabs.css`
- **Underbelly Helpers**: Utility styles in `scss/underbelly-helpers.scss` → `css/underbelly-helpers.css`
- **Main Styles**: Core styles in `scss/style.scss` → `css/style.css`

### SCSS Compilation

SCSS files in `scss/` are automatically compiled to CSS files in `css/` when you run the development server. These compiled CSS files are what get loaded by Webflow when the Local Code toggle is enabled.

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
   This creates optimized production builds:
   - Minified CSS files in `css/`
   - Optimized JavaScript bundle in `dist/app.bundle.js`

2. **Deploy the generated files**:
   - Upload the `css/` directory (all compiled CSS files from SCSS)
   - Upload `dist/app.bundle.js` (bundled JavaScript)
   - These are the only files needed for production - the source files (`scss/` and `js/`) are not required

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
- **Build Output**: Always check that `dist/app.bundle.js` and CSS files in `css/` are being generated correctly
- **Port Configuration**: Make sure your Live Server port matches the Webflow component configuration
- **Local Code Toggle**: Remember to enable/disable the toggle in Webflow when switching between local and remote development
- **Refresh Strategy**: Changes to source files (`js/` and `scss/`) automatically build, but require a page refresh to see updates

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
