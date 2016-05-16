Simple Twitter App
==================

###Requirements

**[How to install mongodb on ubuntu 16](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)**

**Node 4.4.x (Stable)**

###How-to-run

**Install with `npm install` in root and public folders (package.json folders)**

**Make sure you have gulp installed globally otherwise install with `npm install gulp -g`**

**Run gulp before starting with `gulp`** 

**Next you need to start the database and add an admin. Run `mongo` in your CLI then `use webapp2` to create the db and then `db.users.insert( { name:'admin', followers:[], following:[] } )` to create the admin user. This must be done again if you wish to add more users.**

**Start with `npm start` or `node app-backend.js`**

###Database document structure

Users don't have passwords for simplicity
```js
	users:{
		_id:ObjectID, (auto-generated)
		name:String,
		followers: [
			(userids)
			...
		],
		following: [
			(userids)
			...
		]
	}
```
One-to-squillions, ids to user from post
```js
	tweets:{
		_id:ObjectID, (auto-generated)
		user:ObjectID,
		text:String, 
		date:Date,
		likes:[
			(userids)
			...
		]
	}
```

###Testing

Not implemented yet but REST call database functions are separated inside the api for easier testing.
