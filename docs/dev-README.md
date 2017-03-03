# Open

![Open logo](http://res.cloudinary.com/liuffy/image/upload/c_scale,q_100,w_128/v1487453773/open_cursive_d0zsgn.png)

### Purpose 

Open is a Google Chrome Extension made with React and Redux that makes it easy for users to check if an establishment is open without navigating to any websites such as Yelp or Google Maps.


## Background

While websites such as Yelp provide a wealth of information about different businesses such as reviews, menus, and contact information, it is often case that a user is on the go and *simply wants to know if a place is open or not.* 

**Open** extracts this valuable piece of information, saving users the energy of having to parse all the information presented on a page. 

In addition, Open saves the user from typing in their location by using geolocation API to determine where they are.

### Functionality and MVP

With this extension, users will be able to:

- [ ] Check if a business is open without navigating to any external sites (clicking the icon in their extensions bar will open up a popup)
  - [ ] If a business is closed, it will inform the user of the hours for the next day. (If the business is still closed the next day, they can continue clicking the "Next" button for the subsequent days.)
- [ ] Find the matching location closest to their location. 
  - [ ] If the user wants to see the hours of all franchises of a chain in a city, they can opt out of the 'Closest to me' option and have it list up to five locations located in the city inputted by the user.  
- [ ] Easily navigating back to the search screen so they can perform additional searches. 


### Wireframes

![wireframe1](http://res.cloudinary.com/liuffy/image/upload/q_100/v1487531198/open_wireframe1_j3gufp.png)

Open allows the user to quickly find the matching business that is closest to them by using the geolocation API to determine the user's location, and then comparing that data to the data provided by the Yelp API. 


## Technologies & Technical Challenges 

### Technologies

This extension will be implemented using standard Chrome extension technology: **Javascript, HTML, and CSS**. In addition, it uses **React/Redux** to handle state.

Submitting an query via the form on the popup sends an AJAX request to the Yelp API for businesses that are close to the user's location OR located in the city inputted by the user. Returning to the search screen and submitting another input sends a new request for that query. 

There will be several React components used to build this extension: 

- `SearchForm`: will be the input form for submitting queries
- `SingleResult`: will display the result, based on the user's location (Option 1) as automatically calculated through using the geolocation API.
- `ResultList`: will display the results, based on the city inputted by the user (Option2)
  - `ResultList` will contain an unordered list of `ResultIndexItem`s for each of the results if the user wants to check for all of the franchises in a city. 

There will also be an HTML file to display the content:

- `popup.html` - page shown when the extension button is clicked. Styled by various CSS files.

### Technical Challenges

* The search mechanism will need to be accurate, otherwise the app could present misleading information. 
* Holiday hours for a business are often drastically different from its regular business hours. Will need to incorporate a calendar that adds a warning if the current day is a national holiday.
* Will try to add link to displayed address that opens up a tab to a Google Maps displaying the location of the business. 

## Implementation Timeline

**Day 1: Learning, Tutorialing**
* Learn the essential infrastructure of a Chrome Extension by following the [tutorial provided by Google Chrome.](https://developer.chrome.com/extensions/getstarted). Build a test extension in a separate folder. 
* Do some research on purpose and structure of a `manifest.json` file. 
* Then, start building the infrastructure for personal extension. By the end of the day, the project folder will will have:

- [X] A completed `package.json`
- [X] A completed `manifest.json`
- [?] Script for Google Analytics 

**Day 2: Basic UI, Geolocation API, Yelp API**
* Add main entry point of the extension. 
* Flesh out basic UI.
* Research geolocation API and Yelp API.

By the end of the day, the project folder will have:
- [X] `popup.html` - main entry point of the app as defined in the manifest file.
- [X] `popup.js` - use javascript file by the [the Chromium Authors](http://the-chromium-authors.software.informer.com/)
- [X] `webpack.config.js` - webpack bundling file
- [X] `package.json` - contains dependencies (i.e. babel-core, react, redux, etc.)

**Day 3: Redux Cycles - Part 1**
* Create utils for API calls, action creators, reducers, redux store.
- [X] `yelp_api_utils.js` - handle queries for Yelp API
  - [X] Test API calls in Dev Tools 
- [X] `yelp_actions.js` - action creators 
- [X] `result_reducer.js` - process action.data
- [X] `root_reducer.js` - gathers child reducers' results into single state object
- [X] `store.js` - holds the whole state tree of the app

**Day 4: Redux Cycles - Part 2 (Rendering!)**
* Create components for extension.
- [ ] `root.jsx` - Figure out routing 
- [ ] `SearchForm`: will be the input form for submitting queries
- [ ] `ResultList`: (index) will display all results 
  - [ ] contains an unordered list of `ResultIndexItem`s for each of the results
- [ ] `ResultShow`: provides additional information about the business (i.e. address/#)

**Day 6: CSS Styling, demo page for chrome extension** 

By the end of the day:
- [ ] Have components/HTML styled nicely using CSS.
- [X] Create icon for extension
- [ ] Set up github page for the extension.
- [ ] Mock up wireframes for how the demo page will look 
- [ ] Grab nice looking screenshots from the chrome extension
- [ ] Make a few gifs that shows off the key features of the chrome extension

**Day 7: Deploying and distribution**
- [ ] Compress extension folder into a .zip file. 
- [ ] Add new item on the developer dashboard.
- [ ] Share link to Google Chrome extension and demo page on Facebook, Tumblr, and Reddit. 


### Plan for getting users and reviews

- Will share link to Google Chrome extension in: 
- [ ] Facebook groups such as:
  - [ ] **Techy Wendy** (Tech-focused group for Wellesley College alumni) 
  - [ ] **Community** (large Facebook group for Wellesley College alumni) 
  - [ ] **Wellesley By the Bay** (Facebook group for Wellesley alumni living in the bay area) 
- [ ] Reddit forums such as:
  - [ ] **/r/chrome_extensions/**
  - [ ] **/r/webdev/**
  - [ ] **/r/IMadeThis/**
  - [ ] **/r/chrome/**

## Bonus Features :sparkles:

- [ ] Save favorites: Add panel that shows results for saved locations. :sparkling_heart:
- [ ] Options menu: Allow users to customize their experience by being able to choose aspects such as:
  - [ ] Whether to display time in 24-hour format or 12-hour format
  - [ ] Number of results shown for each query.

