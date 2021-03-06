# Simple CMS built with Spring Boot and React
This is a simple and intuitive to use CMS built with Spring Boot / React.
A registered user can easily add posts and categories, edit and delete them.


## Demo
You can check out a live version of the application at <a href="http://cms.erikfakin.eu" target="_blank">Simple CMS</a>.
To login use the username `admin` and password `admin`.


## Features
- Admin user login
- JWT authentication/authorization
- automatically refreshes JWT
- Rich text editor for posts
- Featured images for posts
- Posts categories
- Pinned posts
- Search posts by keywords in title and content
- Simple and intuitive design


## Motivation
I made this project to explore basic Spring Boot CRUD operations and Spring Security. 
I wanted to keep the application as simple as possible while covering all the usual basic features present in a CMS solution.


## Challenges
The biggest challenge I encountered in this project was solving Spring Security authorization/authentication. 
I chose to go with a stateless approach using JWT tokens.


## Usage
To start the application you can run `npm run` for the frontend part and run the backend Spring Boot application.

To make a production build you can run `mvn clean install` for the backend and `npm run build` for the frontend.


## Features to add
- Images in posts content
- Better and safer way to store the token in the client
- Registration form
- Multiple user roles