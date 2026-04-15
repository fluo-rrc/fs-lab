# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Lab 5.2; New Feature

### **What change you want(ed) to make in your application**

I wanted to upgrade the way the React application handles fetching and storing data from the backend. Initially, the app relied on standard React hooks like useState and useEffect to manually trigger network requests. My goal was to refactor this manual fetching process to use a dedicated server-state management tool, which automatically handles caching, background updates, and loading states without writing messy boilerplate code.

### **What tool or tools you've made use of to make this change**

To implement this feature, I integrated TanStack Query (formerly known as React Query) into the frontend React application. This involved installing the @tanstack/react-query npm package, wrapping the application root in a QueryClientProvider to manage the cache globally, and replacing my custom fetch logic with the useQuery hook. This hook takes a unique query key and an asynchronous fetching function, handling the entire lifecycle of the data request.

### **How this change affects the user experience**

This change significantly improves the user experience by making the application feel much faster and more responsive. Because TanStack Query caches the data, users won't see a loading spinner every time they navigate away from the employee list and come back. The data loads instantly from the cache while the library silently checks the server for updates in the background, ensuring they always have fresh data without disruptive loading screens.

### **How this change affects your understanding, or conceptualization, of the app**

Implementing this feature fundamentally shifted how I think about state management in React. I learned that there is a strict difference between "client state" (like whether a modal is open or a dropdown is toggled) and "server state" (data that lives in a database and is fetched via an API). Treating server state as a cache rather than local component state makes the code cleaner and the application architecture much more robust.
