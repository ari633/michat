### Live preview
```
https://mychat-416114.et.r.appspot.com/
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


