# js-hf

## Description

This project is my semester homework for the class called Serverside JavaScript.

My application is an online movie rental platform, where users are able to register and rent movies.
Users choose movies from a list. When a movie is rented, the number of available copies of that movie
is decremented by one. Only movies with at least one available copy may be rented.

Admin users are able to add and delete movies, normal users are able to delete their profile.

## Homework #2

### Changes based on the feedback about Homework #1

- Added "Delete profile" option
- Added "Modify" button to `movie.html` to satisfy Update and Delete of CRUD
- Added "New" button to `movies.html` to satisfy Create of CRUD
- Added Password reset functionality to login page (and corresponding `password-reset.html`)
- Admin rights will be indicated in the database with a flag
