This project was to answer the code challenge: https://github.com/stationfive/radio-buttons
Since the instruction didnt specify the rule of Radio Button Group, therefore, I treated
it as "Single Choice" (User can only select 1 answer in a group) Meanwhile, I also 
implement the Checkbox component which will be treated as "Multiple Choice". To make it 
more flexible and scalable(3 Button on top can let you switch the view with different rules)
, I separate the code structure into "View Component" and
"Controller Component". Moreover, I write a simple unit test using "enzyme" in App.test.tsx

## Code Structure
#### View Component
I use 2 Functional Components (Checkbox.tsx and RadioButtons.tsx ) to render the Buttons in Groups,
Use Hook function (UseState) to manage the selected state and a Callback function getSelected to 
pass the selected status in the current group to its parent component (Controller.tsx). It has its own
the ability to check "disable" status(function checkValid()) and it controlled by the props "invalidList".

#### Controller Component
I use a class component(Controller.tsx) to implement function to dynamic change the invalid list base on the selected status
 for each group and pass to 
its child component (Button Groups). I use 'immutability-helper', a useful library to Mutate a copy of data without changing the original source, to 
update the current selected and current invalid state.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

