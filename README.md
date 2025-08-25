# Vue 3 Website

This is a Vue 3 project created using Vue CLI 5.0.9. The project is structured to provide a simple yet effective starting point for building a Vue application using pure JavaScript.

## Project Structure

```
vue3-website
├── src
│   ├── main.js          # Entry point of the application
│   ├── App.vue          # Main component of the application
│   ├── components
│   │   └── HelloWorld.vue # A sample component to display a welcome message
│   ├── router
│   │   └── index.js     # Vue Router configuration
│   └── assets
│       └── styles.css    # Global CSS styles
├── public
│   └── index.html       # HTML template for the application
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation and project description
```

## Installation

To get started with this project, clone the repository and install the dependencies using Yarn:

```bash
yarn install
```

## Running the Application

To run the application in development mode, use the following command:

```bash
yarn serve
```

This will start a local development server and open the application in your default web browser.

## Building for Production

To build the application for production, use the following command:

```bash
yarn build
```

This will create an optimized version of your application in the `dist` directory.

## License

This project is licensed under the MIT License.