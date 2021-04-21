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

- `index.html`: profile and list of rented movies, modify button, delete profile button
- `login.html`: login form, login button, forgot password button, go to registration button
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

#### GET /
- render profile if authenticated, else redirect to /login
1. `authMW`
2. `getUserMW`
3. `getUserMoviesMW`
4. `renderMW(index.html)`

#### POST /user/:userid/modify
- save modified user in db
1. `authMW`
2. `getUserMW`
3. `saveUserMW`

#### GET /user/:userid/delete
- delete user and redirect to /login
1. `authMW`
2. `getUserMW`
3. `deleteUserMW`

#### GET /movie
- render movies list
1. `authMW`
2. `getMoviesMW`
3. `renderMW(movies.html)`

#### GET, POST /movie/new
- render movie modification with empty form, or save new movie and redirect to /movie
1. `authMW`
2. `checkAdminMW`
3. `saveMovieMW`
4. `renderMW(movie-modify.html)`

#### GET /movie/:movieid
- render movie information
1. `authMW`
2. `getMovieMW`
3. `renderMW(movie.html)`

#### GET, POST /movie/:movieid/modify
- render movie modification with movie information filled, or save updated movie and redirect to /movie
1. `authMW`
2. `checkAdminMW`
3. `getMovieMW`
4. `saveMovieMW`
5. `renderMW(movie-modify.html)`

#### GET /movie/:movieid/delete
- delete movie and redirect to /movie
1. `authMW`
2. `checkAdminMW`
3. `getMovieMW`
4. `deleteMovieMW`

#### GET, POST /login
- render login form; or check user password and redirect to /, else warn about wrong password and reload /login
1. `checkPasswordMW`
2. `renderMW(login.html)`

#### GET, POST /register
- render register form or save new user, login user and redirect to /
1. `saveUserMW`
2. `renderMW(register.html)`

#### GET, POST /password-reset
- render password reset form or get user by any identifier, set new password, show it and redirect to login
1. `getUserMW`
2. `resetUserPasswordMW`
3. `renderMW(password-reset.html)`

## Homework #4

### Notes

- Additional endpoints created for rent and unrent
- Additional middleware created for redirecting

### New middlewares

middlewares/movie/
- `rentMovie.js`
- `unrentMovie.js`

middlewares/generic
- `redirect.js`

### New endpoints

#### GET /movie/:movieid/rent
- save movie to user, decrement available movie count and redirect to /movie
1. `authMW`
2. `getUserMW`
3. `getMovieMW`
4. `rentMovieMW`
5. `saveUserMW`
6. `saveMovieMW`

#### GET /movie/:movieid/unrent
- remove movie from user, increment available movie count and redirect to /movie
1. `authMW`
2. `getUserMW`
3. `getMovieMW`
4. `unrentMovieMW`
5. `saveUserMW`
6. `saveMovieMW`

## Homework #6

By default, every user is created as a regular user, by setting the `isadmin` flag to false at registration.

It is set server side, so no client interaction can fake it. To create an admin user, set the flag for the desired user to true in the database.

Movie creation, modification and removal can only be done by admin users.

The images to movies are stored on the disk, the database stores the location of the image only.
