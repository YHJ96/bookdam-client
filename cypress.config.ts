import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    viewportWidth: 1200,
    viewportHeight: 1000,
    scrollBehavior: 'center',
  },
  env: {},
});
