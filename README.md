# Project-31
A Canteen Automation project targeted to mainly DAIICT Canteens :)

## [Here](https://github.com/HemangNakarani/Project-Canteen-Backend) is Backend Part of Project

# Technology Stack
- Java Spring Boot : Backend
- React.js : FrontEnd
- AWS Relational Database System : PostgreSQL
- AWS CodePipeline : CI-CD
- AWS ElasticBeanStalk : Deployment Backend
- Vercel : Deployment Frontend

# How to contribute ?
- Install the tools 
  - Visual Studio Code
  - IntelliJ IDEA
  - PostgreSQL/PgAdmin
  - Postman
  - NPM
  - Java JDK

# Run Following Commands
  ## If working in Frontend then do following, make sure node is installed in your machine
  ```
  git clone https://github.com/HemangNakarani/31-Project-Canteen-Frontend.git
  cd 31-Project-Canteen-Frontend
  git remote add upstream https://github.com/HemangNakarani/31-Project-Canteen-Frontend.git
  ```
  ```
  npm install 
  npm start
  ```
  ## If working in Backend then do following, make sure Java,JDK and Postgres is installed in your machine
  ```
  git clone https://github.com/HemangNakarani/Project-Canteen-Backend.git
  cd Project-Canteen-Backend
  git remote add upstream https://github.com/HemangNakarani/Project-Canteen-Backend.git
  ```
    - Set environment variables in your system environment mentioned in `src/main/resources/application.properties`
    - Run These 3 queries in pgAdmin
      ```
      INSERT INTO roles(name) VALUES('ROLE_USER');
      INSERT INTO roles(name) VALUES('ROLE_OWNER');
      INSERT INTO roles(name) VALUES('ROLE_ADMIN');
      ```
    - build your project in IntelliJ IDEA and Run it.

---
- Make Changes in project
- Now we need to send our changes to github, so run following
  - Create new branch for the first time only, otherwise skip this command
  ```
  git checkout -b dev-<YOUR NAME>
  ```
  - Now Add and Commit and push
  ```
  git add .
  git commit -m "<COMMIT MESSAGE>"
  git push -u origin <BRANCH NAME>
  ```
  - Go to Github, Open this project and Open Pull Request
  
# Some conventions we need to follow
- Change only files in which others are not working, otherwise it will lead to conflict.
- Complete your assigned task within a week.
- Properly Run and Test edge cases in your code and Softeware, then only push the changes.
- Search before ask, find solution your self. If you feel very confused then ask. Learn Continuously !
- Your every contribution will be counted, so try to interect and contribute as much as you can.
