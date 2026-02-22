# React Assessment

This assessment app uses React working in Vite with an Expressjs server and a json data file to simulate a backend.
The goal of the assessment is to create a simple form to add bank accounts and display them on the home page.

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install` or `yarn install`.
3. Start the app using `npm run dev` or `yarn dev`.

# Features and Implementation

The app will be available at `http://localhost:3000`, the Express Stub Server is run via a Vite plugin to launch seamlessly without needing to be started separately.

Minimal styling has been added to make the app more visually appealing, but the focus of the assessment is on functionality and code structure.

React Router is used for navigation between the home page and the add account page, and React Context is used to manage the state of the accounts across the app.

The server uses express-validator to validate since server functionality was not really part of the test, but the front end app has custom validation logic rather than using a library like zod
