import createHistory from 'history/createBrowserHistory';
const history = createHistory();
 


// Get the current location. 
const location = history.location
 
// Listen for changes to the current location. 
const unlisten = history.listen((location, action) => {
  // location is an object like window.location 
  console.log(action, location.pathname, location.state)
})

history.push('/home', { some: 'state' })

// To stop listening, call the function returned from listen().
unlisten()

// Each history object has the following properties:

// history.length - The number of entries in the history stack
// history.location - The current location (see below)
// history.action - The current navigation action (see below)