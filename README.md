# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### To deploy to be hosted in github
npm run deploy

The following are needed to deploy react to be hosted in github - all in package.json

```text
 "homepage": "http://raymondfang2.github.io/rental",
 
   "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    
   "devDependencies": {
    "gh-pages": "^3.2.3"
  }   
```

