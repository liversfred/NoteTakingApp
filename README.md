# NoteTakingApp
Technical exam
By Frederick R. Manlusoc

# Setup
1. Download the source code or close the repository.
2. Navigate insize NoteTakingApp folder.
3. Copy .env.example file then rename to ".env"
4. Change the value of "SERVER_PORT" to the desired port if necessary.
6. Open terminal.
7. Run "npm install"
8. Start the server by executing "npm run start:server"
9. Verify that the server is running. "Server is listening on port {SERVER_PORT}" should appear.
10. You can hit the endpoints using postman.
    requestHeaders: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    ## Endpoints
    - POST /notes: Create a new note.
        requestBody: {
          "title": "Title A",
          "body": "This is a sample .ote."
        }
    - GET /notes: Retrieve all notes.
    - GET /notes/:id: Retrieve a specific note by ID.
    - PUT /notes/:id: Update a specific note.
        requestBody: {
          "id": 1,
          "title": "Title A",
          "body": "This is a sample .ote."
        }
    - DELETE /notes/:id: Delete a specific note.
   
11. Or you can use the simple webpage to test with the UI.
    - Navigate to NoteTakingApp->UI.
    - Open the webpage by clicking the file or by entering the path in the URL.
    ## NOTE: I did not put the "required" property on the input fields to enable the tester to test the back-end validation.


# App Details
  Code Editor: Visual Studio Code
  Run Time: Node JS
  Backend Framework: Express JS
  Database: json file
  UI: HTML, CSS, Bootstrap, SweatAlert2, JQuery, Ajax
  Development Tool: Nodemon
