nodejs-angular-mongo
====================

* Clone stock test app from Git into a folder. e.g. D:\stock-test-app.


* Now we have to install mongo for this application to Run. So go to mongo website using this link http://www.mongodb.org/downloads and download .msi or .zip package.
Now extract this zip file to a folder e.g. D:\mongosetup. We have setup mongodb path and initialize mongo server on our machine. So to accomplish this perform following operations.

* Open command prompt and cd to D:\mongosetup path

* Now write mongod –dbpath D:\stock-test-app\data. (We already clone our app in this folder). It’ll initialize mongo server for us.

* Now we have to install node.js so go to node.js website using URL http://nodejs.org/ and download and intall node.js on your machine. Now perform following operations to run stock test app.

-	Open command prompt and cd to our cloned stock test app. For us our path is D:\stock-test-app.
-  Then execute "npm install" command.
-	Now in same command prompt write command ''node server.js''. If everything goes well our application will start listening on port 3000 and you will see following screen.

Now we can browse application by typing http://localhost:3000 in browser.
============================================================================
