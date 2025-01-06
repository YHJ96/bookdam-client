import { defineConfig } from 'cypress';

const dotenv = require('dotenv');

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    viewportWidth: 1200,
    viewportHeight: 1000,
    scrollBehavior: 'center',
    downloadsFolder: 'cypress/downloads',
    env: {
      ACCESS: process.env.ACCESS,
      SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
  },
});
