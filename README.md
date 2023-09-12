# Luca Business Simulation

## Setup Local Dev Environment

**Prerequisites:**

- sbt, yarn on your machine
- PostgreSQL (version 13.2) running with databases named 'luca' and 'luca-test'

To setup your local dev environment, navigate to the backend folder and start the backend with `sbt run`.

After that navigate to the frontend folder and run `yarn start:backoffice` or `yarn start:player` to start the
respective part of Luca locally.

You're good to go!

# More Detailed Installation Instructions

## Installing Nod

nvm install 12

## Installing JDK

sudo apt-get update
sudo apt-get install openjdk-11-jdk

## Installing sbt

echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | sudo tee /etc/apt/sources.list.d/sbt.list
echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | sudo tee /etc/apt/sources.list.d/sbt_old.list
curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | sudo apt-key add
sudo apt-get update
sudo apt-get install sbt

## Run sbt

cd backend
(sbt run)
sbt universal:packageZipTarball
