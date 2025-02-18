# R3F + TypeScript + Vite

Collecting workspace informationHere's a comprehensive README.md for your R3F TypeScript starter template:

```markdown
# R3F TypeScript Starter Template

A minimal but feature-complete starter template for React Three Fiber projects using TypeScript and Vite.

## Features

- 🚀 [Vite](https://vitejs.dev/) for fast development and building
- 📦 [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Drei](https://github.com/pmndrs/drei) preconfigured
- 🎯 TypeScript support with strict mode enabled
- 🎮 Debug UI with [Leva](https://github.com/pmndrs/leva)
- 📊 Performance monitoring with [r3f-perf](https://github.com/utsuboco/r3f-perf)
- 🎨 GLSL shader support via [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl)
- 🖼️ Post-processing effects support
- 🔍 ESLint configured for React and TypeScript
- 📱 Responsive canvas setup

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/r3f-starter-ts.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── Experience.tsx    # Main scene component
├── main.tsx         # Entry point
├── index.css        # Global styles
└── types/
    └── global.d.ts  # Global type declarations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Support

The template includes type declarations for various asset formats:
- 3D Models: `.glb`, `.gltf`, `.fbx`, `.obj`, `.mtl`
- Textures: `.jpg`, `.jpeg`, `.png`, `.webp`, `.exr`, `.basis`, `.ktx2`
- Shaders: `.glsl`, `.vert`, `.frag`
- HDR: `.hdr`
- Audio: `.mp3`, `.wav`, `.ogg`

## Performance Optimization
- Performance monitoring tools included

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT

```

This README provides a good overview of your template's features while keeping it concise and informative. The structure highlights the key aspects that developers would want to know when deciding whether to use your template.

You can customize the repository URL, license, and other details as needed. You might also want to add sections for:

- Deployment instructions
- Advanced configuration options
- Common troubleshooting
- Examples/Screenshots

depending on how you plan to use and share this template.
This README provides a good overview of your template's features while keeping it concise and informative. The structure highlights the key aspects that developers would want to know when deciding whether to use your template.

You can customize the repository URL, license, and other details as needed. You might also want to add sections for:

- Deployment instructions
- Advanced configuration options
- Common troubleshooting
- Examples/Screenshots

depending on how you plan to use and share this template.
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
