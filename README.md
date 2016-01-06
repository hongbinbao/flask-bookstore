## BookStore App - Python Flask


<img src="https://github.com/nguymin4/aspnet-bookstore/blob/master/docs/img/ss1.jpg" height="375px" />
<img src="https://github.com/nguymin4/aspnet-bookstore/blob/master/docs/img/ss3.jpg" height="375px" />
<br/>

### Back-end:
- Python Flask
- MongoDB

#### Heroku deployment
- Build front-end at local machine
- Recommend to create new branch to add folders and ignore folders
- Setup 3 environment variables for MongoDB:
`Mongo_Host`, `Mongo_Username`, `Mongo_Password`


### Front-end:
- AngularJS
- Testing with Jasmine, Karma
- Modules bundler: webpack
- Sass/SCSS

```
# Install dependencies for bower and npm
npm install
bower install

# to compile scss to css
gulp sass

# to pack javascript modules
gulp webpack

# both task above + uglify js
gulp build

# start browser-sync as proxy
# watch files to compile sass, pack javascript
gulp dev
```
