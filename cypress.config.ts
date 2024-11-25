import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
      // bundler: "webpack",
    },
    // Possible specPattern values that may help file to work
    // specPattern: "cypress/component/*/.cy.jsx",
  },

  e2e: {
    // baseUrl: 'https://devdemand.onrender.com/',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
