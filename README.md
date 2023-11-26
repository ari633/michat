### Date of submission
26 November 2023

### Live preview
```
https://testvouch-406013.et.r.appspot.com/
```

# How to run the application
to running this application is using Docker, I assume you have Docker on your local machine

running using docker compose
```
docker compose up
```

after successfully running the application by using `docker compose`, there are 3 ports to be exposed which is 3100, 9090, and 27017.

- 3100 is for the Frontend Application
- 9090 is for the Backend Application
- 27017 is for the mongodb

to view the application you can open `http://127.0.0.1:3100/` through your browser. to see the health check of the backend open `http://127.0.0.1:9090/`

### Time spent
- 1 hour to read documentaion of socket.io documentaion
- 1 hour to read the documentation of Mongodb
- 2 hours to develop frontend and backend

### Assumptions
This is an simple application chat with limited design and functionality.
for the design i just follow the design guidlines, for the technical side that not mention in the guidelines i was use persistent session.
persistent session is a generated unique ID to identify a user as the same person when the user closes the browser and comes back again to connect to the socket.

### Shortcuts
for the real-worl application for better development should use design system, design system is a collection of reusable components.

### Plan to production
- to make this application more reliable, scalable and available for 1000 user smoothly we can implement multiple nodes approach
![image](https://socket.io/images/multiple-nodes-no-sticky-dark.png)
- Deploy server and client separately

### Security approach
- use HTTPS to encrypt data transmitted between clients and the server.
- validate and sanitize all input data/incoming data to prevent XSS (Cross site scription), and other vulnerabilities.
- enable CORS, to allow which domain can access the socket server

