# Getting Started with this project

This is an small part of our whole web apps built using create react app and uses react-router for navigation. After finishing the development we build it running `yarn build`. Then, we blend our build code with dot net code. Our aim is to transfer as much feature as possible to Reactjs from previous legacy javascript.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

It will run the test we've written. Currently we don't have any working test available. But, Soon we will add some test

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Our app is ready to be deployed or blended with our backend framework!

### `yarn storybook`

We are building our UI component and testing its feature with storybook. This is a great way to showcase the feature of our micro component. We make sure that our component is working the way we want before using it to actual project. This makes us confident about our component we build.

Read More about storybook [here]('https://storybook.js.org/docs/react/writing-docs/docs-page')

### `yarn lint`

Find code violation in the entire CRA project. This is to make sure our code looks similar no matter who wrote it. It enforce us to follow some rule. Upon running it will find error and warning throughout the project. We enabled cache for faster linting.

NB: If you change the rule in `eslintrc.js` please delete the cache from the root directory of this project and request everyone to do the same.

### `yarn prettier-format`

Run it to format the code througout the project. You won't be using it often. When you have unformatted code in multiple file, you can run this command to format all the code.

For formating single file, you can turn on the 'format on save' and 'format on paste' for you specific code editor. Search on google for your code editor how to do it. There could also be shortcut for formatting a file. For vscode use `Shift + Alt + f`

### `yarn build:storybook`

If you want to host your storybook example as a website on the internet, run this command. After successful building, you can deploy the build file to a nodejs server of your choice

### `yarn build:tailwind`

It will minify and create compiled production build of the class name it sees in the project

### `yarn prepare`

This is for husky to auto configure and work on CI/CD pipeline. Right now we don't use it much.

### `yarn lint:fix`

Running this command automatically fix some fo the linting error end warning automatically

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
