# hiwi
A web application which allows a person to create a community of likeminded people.


Please follow the following steps to run the application:
1. Navigate to the project folder, and run the `npm install` command in both the "backend" and "frontend" folder to install project dependencies.
2. Use the MongoDB cloud atlas to create a new project. The connection link should be saved in a ".env" file in a variable named `MONGO_URL`.
3. To start the backend server, navigate to the "backend" folder and run the `npm start` command to start the server using nodemon. 
4. Call the "http:localhost:8001/script/insert-data" router (with Postman or similar application) to populate the database with dummy data.
5. To run the frontend client, navigate to the "frontend" folder and run the `npm start` ccommand to run the application. 
