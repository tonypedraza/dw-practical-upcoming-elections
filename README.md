# Notes

This is my submission of the DW application project. I only added one dependency (node-fetch) to complete the project because I couldn't see how to fetch from the TurboVote API in the search endpoint otherwise. I didn't add any other dependencies because I was unsure whether that was acceptable or not.

# routes/index.js
I added two functions to index.js

## getUrl
This generates the TurboVote API url using the state and city variables passed in. As noted in the code, I would generally put this function in a helpers directory but kept it here for ease of reviewing.

## POST search
This is the search endpoint that the form in the html submits to. It gets the form data and generates a TurboVote url with it. It then contacts the TurboVote API and re-renders the index endpoint with the new data, error or otherwise.

# views/index.hbs

I added a div to show the results of the search form submission. I wanted to keep it on the same page so a user can easily enter a new search. There's a lot of weird conditionals and iteration with handlebars, something that would be a lot cleaner in React or another front-end framework. I also couldn't figure out how to register handlebars helpers, which I would've used to add functions to alter the data. Again, something easily done with React.

# Things I would change
I would add testing with a new testing client. I'm not familiar with tap. I was past the couple of hours reserved for this when I got to that part.

I would implement React to make the data manipulation in the front-end better.

Thanks!!
