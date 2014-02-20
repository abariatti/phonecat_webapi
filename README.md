phonecat_webapi
===============

A simple angularjs application example based on Phonecat tutorial from angularjs.org (http://docs.angularjs.org/tutorial) The differences with the original is :

	- it adds a MongoDb persistence layer backed with an express.js Web API that supports CRUD operations
	- provide the ability to edit and save phones just clicking the properties
	- further improvements to come like drag and drop adding images, adding new phones, and more

To run it you need
------------------

- Node.js
- MongoDB running at localhost:27017 (default)

Start the application
---------------------

node web-server.js
go to localhost:3000/ to browse the application
go to localhost:3000/phones to reach the api

remarks
-------

- DB and data will be automatically populated to MongoDb the first time you start the application
- Go to localhost:3000 to see the app runing
- WEB Api is at localhost:3000/phones/:phoneid