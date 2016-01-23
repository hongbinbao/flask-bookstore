## BookStore App - Python Flask


<img src="https://github.com/nguymin4/aspnet-bookstore/blob/master/docs/img/ss1.jpg" height="375px" />
<img src="https://github.com/nguymin4/aspnet-bookstore/blob/master/docs/img/ss3.jpg" height="375px" />
<br/>

### Back-end:
- Python Flask
- MongoDB ([Schema](#schema))

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

### <a name="schema"></a>Schema
*Note: This app uses modified version of schema and sample data belongs to MEAN course from [edx.org](https://www.edx.org)*

Sample database is in [aspnet-bookstore/docs/sample-data](https://github.com/nguymin4/aspnet-bookstore/tree/master/docs/sample-data)

```
mongoimport --db bookstore --collection abc --file abc.json
```

- `books` collection
```
{
	"_id" : ObjectId("5579b62cdb678e641a1c0298"),
	"name" : "Leadership and Self-Deception: Getting Out of the Box",
	"internal" : {
		"approximatePriceUSD" : 11.34
	},
	"category" : {
		"parent" : "Non-Fiction",
		"ancestors" : [
			"Books",
			"Non-Fiction"
		],
		"_id" : "Leadership"
	},
	"price" : {
		"amount" : 11.34,
		"currency" : "USD"
	},
	"pictures" : [
		"http://i.imgur.com/IRTxQet.png"
	]
}
```

- `categories` collection
```
{
	"_id" : "Classics",
	"parent" : "Classics",
	"ancestors" : [
		"Books",
		"Fiction",
		"Classics"
	]
}
```
