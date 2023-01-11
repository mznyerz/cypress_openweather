const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 7000,
  video: false,
  e2e: {
    baseUrl: 'https://openweathermap.org',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiBaseURL: 'https://restful-booker.herokuapp.com',
  },
  
});
