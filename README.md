# Luca Business Simulation

## Setup Local Dev Environment

**Prerequisites:**

- sbt, yarn on your machine
- postgres running with databases named 'luca' and 'luca-test' (for postgres version see deployment/base/postgres)

To setup your local dev environment, navigate to the backend folder and start the backend with `sbt run`.

After that navigate to the frontend folder and run `yarn start:backoffice` or `yarn start:player` to start the
respective part of Luca locally.

You're good to go!
