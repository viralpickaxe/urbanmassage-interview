# Urban Massage Interview Question
Solution to the Urban Massage Full Stack interview question ( I commited the .env for convinience fyi )


## Full Task

### Overview
We’re looking for you to create a basic RESTful API server to handle the character data we have provided and a SPA to display/interact with this server. There should also be accessible a list of favourite characters as defined by the user of your application.

### Back End
* Using Node and your choice of http framework create a basic RESTful API server (auth not required).
* Create four routes allowing CRUD operations for characters altering/reading the details in the file provided.
* Use environment variables to store configuration details where appropriate.

### Front End
* Using a SPA framework of your choice build the necessary interface to interact with the routes you’ve created above.
* Each character should have a 'Favourite' button which allows the user to save this character as a favourite. Displaying these favourites somehow and the ability to remove them again from the list (and from the character page) should be implemented but is up to you on how and where this is displayed. This can be persisted server side or kept in local storage/memory.
* The design and structure is completely of your choosing. Feel free to use a CSS framework too, the fancier you can make it look the better, however we don't expect it to be an award winning design just something that takes into account your ideas on usability.
* Loading states should be taken into account.
* Handling errors with correct messages when/if the API call fails would be appreciated.

### Notes
* It only needs to work in the latest version of whatever browser you use (i.e. Chrome / Firefox).
* Please include instructions on how to build and setup your project.
* Notes on how you would improve this application given more time would be great.

### Bonus points
These are by no means necessary but if you want to show off!
* You could look to implement features such as the search functionality.
* Exponential backoff in case of file / connection errors
* LRU Cache where appropriate.
* Implement a database of your choosing to store favourites and character data.


## Repository Info

### Repo Structure
- `source` - Main source code folder containing all `.ts` and `.tsx` files
    - `api` - Source unique to just the API
    - `frontend` - Source unique to just the frontend server
    - `app` - Source unique to just the SPA web app
    - `shared` - Source that is not unique to a particular part of the project
- `tests` - Root folder for all tests, follows same structure as source
- `resources` - Folder for all static resources, all served up by `frontend`
    - `build` - Contains built `webapp` bundle code and scss styles
    - `fonts` - Contains all font files for `frontend` and `webapp`
    - `images` - Static images for use in `frontend` and `webapp`
    - `styles` - Uncompiled scss styles


## Development Info

### Requirements
- NodeJS (v6.X.X)

### Running the code
1. Clone the Repo onto your local machine
2. Install the npm dependancies: `npm i`
3. Install the jspm dependancies: `jspm install`
4. Startup docker: `docker-compose up`
5. Build the code: `npm run clusterbomb` (watch: `npm run clusterbomb-watch`) (VSCode: `Cmd+Shift+B`)
6. Run the API: `node source/api/Main.js`
7. Run the Frontend: `node source/frontend/Main.js`

### Running the tests
1. Clone the Repo onto your local machine
2. Install the npm dependancies: `npm i`
3. Startup docker: `docker-compose up`
4. Build the code: `npm run clusterbomb`
5. Run the tests: `npm run tests`