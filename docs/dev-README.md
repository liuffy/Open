# Open

### Purpose 

Open is a Google Chrome Extension made with React and Redux that makes it easy for users to check if an establishment is open without navigating to any websites such as Yelp or Google Maps.


## Background

While websites such as Yelp provide a wealth of information about different businesses such as reviews, menus, and contact information, it is often case that a user is on the go and **simply wants to know if a place is open or not.** *Open* extracts this valuable piece of information, saving users the energy of having to parse all the information presented on a page. 

In addition, Open saves the user from typing in their location by using geolocation API to determine where they are.

### Functionality and MVP

With this extension, users will be able to:

- [ ] Check if a business is open without navigating to any external sites (clicking the icon in their extensions bar will open up a popup)
  - [ ] If a business is closed, it will inform the user of the hours for the next day. 
- [ ] Find the matching location closest to their location. 
  - [ ] If the user wants to see the hours of all franchises of a chain in a city, they can opt out of the 'Closest to me' option and have it list up to five matching locations.
- [ ] Easily navigating back to the search screen so they can perform additional searches. 


### Wireframes

Open allows the user to quickly find the matching business that is closest to them by using the geolocation API to determine the user's location, and then comparing that data to the data provided by the Yelp API. 


### Technologies & Technical Challenges 

This extension will be implemented using standard Chrome extension technology: **Javascript, HTML, and CSS**. In addition, it uses **React/Redux** to handle state.

Submitting an query via the form on the popup sends an AJAX request to the Yelp API for businesses that are close to the user's location OR located in the city inputted by the user. Returning to the search screen and submitting another input sends a new request for that query. 

There will be several React components used to build this extension: 

- `Search Form`: will be the input form for submitting queries
- `SingleResult`: will display the result, based on the user's location (Option 1) as automatically calculated through using the geolocation API.
- `ResultList`: will display the results, based on the city inputted by the user (Option2)
  -  `ResultList` will contain an unordered list of `ResultIndexItem`s

There will also be an HTML file to display the content:

- `popup.html` - page shown when the extension button is clicked. Styled by various CSS files.


## Implementation Timeline

**Day 1**: Get started on the infrastructure of the extension, following [this guide](https://developer.chrome.com/extensions/getstarted) from Chrome. Will also do some research on purpose and structure of a `manifest.json` file. By the end of the day, the project folder will will have:

- A completed `package.json`
- A completed `manifest.json`


**Day 2**: Work on identifying the colors used in the DOM by class and other attributes, and create and render a new DOM with different colors.  By the end of the day, we will have:

- The ability to identify all colors (Munyo)
- A new HTML file that gets rendered in place of the current DOM, using different colors (Ryan)

**Day 3**: Dedicate this day to correctly replacing colors with their grey scale or high-contrast equivalents.  By the end of the day:

- Implement an algorithm for replacing colors with grey scale tones (Ryan)
- At least understand (and hopefully implement) and algorithm for replacing colors with high-contrast equivalents (Munyo)
- Render a new DOM that contains each of these color equivalents (Ryan)

**Day 4**: Create the settings page and connect the settings to the color change logic.  If time, create high-contrast grey scale and low-contrast algorithms as well.  By the end of the day:

- Fully implemented settings changes that re-render a differently colored DOM (Ryan)
- A detailed README (Ryan)
- A polished Chrome store page, sent to our networks to begin marketing/downloads (Munyo)
- If time, implement the final two features: normal color to low contrast and normal to high-contrast grey scale (Both)

**Day 5**: Create demo page for chrome extension. By the end of the day:
- Set up github pages (Ryan)
- Mock up wireframes for how the demo page will look (Both)
- Grab nice looking screenshots from the chrome extension (Munyo)
- Make a few gifs that shows off the key features of the chrome extension (Munyo)

**Day 6**: Create demo page for chrome extension. By the end of the day:
- Set up github pages (Ryan)
- Mock up wireframes for how the demo page will look (Both)
- Grab nice looking screenshots from the chrome extension (Munyo)
- Make a few gifs that shows off the key features of the chrome extension (Munyo)

### Plan for getting users and reviews

- Will share link to Google Chrome extension in: 
- [ ] Facebook groups, requesting reviews. 
- [ ] Reddit forums such as:
  - [ ] **/r/chrome_extensions/**
  - [ ] **/r/webdev/**
  - [ ] **/r/IMadeThis/**
  - [ ] **/r/chrome/**

## Bonus Features :sparkles:

- [ ] Save favorites: Add panel that shows results for saved locations.
- [ ] Options menu: Allow users to customize their experience by being able to choose aspects such as:
  - [ ] Whether ti display time in 24-hour format or 12-hour format
  - [ ] Number of results shown for location - based searching 

