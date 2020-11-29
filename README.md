# categoryProductTask

How to run application :-

Go to application root :- cd appinessTask
run npm install
run npm start
It will create "appinessTask" db in mongo database.
if it's run sucess will console.
	Server started on 8443
i have created two table (category and product)
it has isdeleted column for soft delete.

In app.js .. Some data will be inserted by default.

I have attached postmen collection also for test api.

It has 3 api .

1) Get Category list : localhost:8443/category (Get)
2) Get Product List By Category Id : localhost:8443/category/(categoryId) (Get)
3) Delete Category and their Product By Category Id : localhost:8443/category/(categoryId) (Delete)

