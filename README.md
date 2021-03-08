# js-hf

## Description

This project is my semester homework for the class called Serverside JavaScript.

My application is an online movie rental platform, where users are able to register and rent movies.
Users choose movies from a list. When a movie is rented, the number of available copies of that movie
is decremented by one. Only movies with at least one available copy may be rented.

Admin users are able to add and delete movies, normal users are able to delete their profile.

## Homework #2

### Changes based on the feedback about Homework #1

- Added **Delete profile** option
- Added **Modify** button to `movie.html` to satisfy Update and Delete of CRUD
- Added **New** button to `movies.html` to satisfy Create of CRUD
- Added Password reset functionality to login page (and corresponding `password-reset.html`)
- Admin rights will be indicated in the database with a flag
    - The **Modify** button on `movie.html` will only be visible for admins
    - The **New** button on `movies.html` will only be visible for admins
    - The `movie-modify.html` page will only be accessible by admins

### Notes

- No logic is implemented yet, the pages can be accessed through buttons and links.
- The `movie.html` is filled with data for now, but it will be a template later, when logic is added as well
- The same can be said about `movie-modify.html`. This page will be empty on pressing the **New** button on `movies.html`

## Homework #3

### Views

- `index.html`: profile and list rented movies, modify button, delete profile button)
- `login.html`: login form, login button, forgot password button, go to registration button)
- `register.html`: register form, register button, go to login button
- `movie.html`: table of movie details, rent movie button, modify movie button
- `movies.html`: table of movies, new movie button
- `movie-modify`: form with movie details on modify, empty form on new movie, update button, delete button
- `password-reset.html`: form for resetting password, reset button

### Middlewares

middlewares/auth/
- `auth.js`
- `checkAdmin.js`
- `checkPassword.js`

middlewares/user/
- `getUser.js`
- `getUsers.js`
- `getUserMovies.js`
- `saveUser.js`
- `deleteUser.js`
- `resetUserPassword.js`

middlewares/movie/
- `getMovie.js`
- `getMovies.js`
- `saveMovie.js`
- `deleteMovie.js`

middlewares/generic
- `render.js`

### Endpoints

GET / --------------------------> render profile if authenticated, else redirect to /login
- `authMW`
- `getUserMW`
- `getUserMoviesMW`
- `renderMW(index.html)`

GET /user/:userid/delete -------------> delete user and redirect to /login
- `deleteUserMW`

GET /movie ---------------------------> render movies list
- `authMW`
- `getMoviesMW`
- `renderMW(movies.html)`

GET, POST /movie/new -----------------> render movie modification with empty form, or save new movie and redirec to /movies
- `authMW`
- `checkAdminMW`
- `saveMovieMW`
- `renderMW(movie-modify.html)`

GET /movie/:movieid ------------------> render movie information
- `authMW`
- `getMovieMW`
- `renderMW(movie.html)`

GET, POST /movie/:movieid/modify -----> render movie modification with movie information filled, or save updated movie and redirect to /movies
- `authMW`
- `checkAdminMW`
- `getMovieMW`
- `saveMovieMW`
- `renderMW(movie-modify.html)`

GET /movie/:movieid/delete -----------> delete movie and redirect to /movie
- `authMW`
- `checkAdminMW`
- `getMovieMW`
- `deleteMovieMW`

GET /login ---------------------------> render login form
- `renderMW(login.html)`

POST /login --------------------------> check user password and redirect to /, else warn about wrong password and reload /login
- `checkPasswordMW`

GET /register ------------------------> render register form
- `renderMW(register.html)`

POST /register -----------------------> save new user, login user and redirect to /
- `saveUserMW`
- `getUsersMW`

GET, POST /password-reset ------------> render password reset form or get user by any identifier, set new password, show it and redirect to login
- `getUser`
- `resetUserPassword`
- `renderMW(password-reset.html)`
