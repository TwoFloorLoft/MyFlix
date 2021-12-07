Objective
Using React, build the client-side for an application called MyFlix based on its existing server-side code (REST API and database).

Guidelines

Who — The users of your Movie Paradise application. They will be movie enthusiasts who enjoy reading information about different movies.
What - A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side developed in this Achievement will support the existing server-side by facilitating user requests and rendering the response from the server-side via a number of different interface views.
When- MP users will be able to use it whenever they want to read information about different movies or update their user information—for instance, their list of “Favorite Movies.”
Essential Views and Features:
Login view

Allows users to log in with a username and password

Registration view

Allows new users to register (username, password, email, birthday)

Main view

Returns a list of ALL movies to the user
Sorting and filtering
Ability to select a movie for more details

Single Movie view

Returns data (image, title, release year, description, genre, director, actors) about a single movie to the user.
Allows users to add a movie to their list of favorites
Allow users to move to director and genre view

Director view

Returns data about a director's name, bio and birth year.

Genre view

Returns data about a genre, with a name and description.

Profile view

Allows users to update their user info (username, password, email, date of birth)
Allows existing users to deregister

Technical Features:
It is a single-page application (SPA)
It uses state routing to navigate between views and share
It gives users the option to filter movies
It initially uses Parcel as its build tool
React Redux is written using the React library and React Redux
It uses React Bootstrap as a UI library for styling and responsiveness
It contains a mix of class components and function components

Dependencies:

React
react-bootstrap
react-dom
react-redux
react-router-dom
Redux
Axios
prop-types
redux-devtools-extension
