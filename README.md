# Check It!

Check It! is an android application in which users can create, update and delete checklists, after creating an account for themselves.

```
This repository contains the server side code of the application.
```

## General Features:

-   Unlimited of checklists can be created.
-   Each checklist can have as many items as the user wishes.
-   All the checklists can be updated at any time.
-   Items in a checklist as well as an entire checklist can be deleted anytime.
-   All the data will be stored against an account rather than a local host. So, the app can be used on various devices simultaneously.

## Tech Stack:

-   Frontend Development: Flutter
-   Server Side Development: NestJs
-   API: Rest API
-   Database: MongoDB

## Download 

## How to Use:

> Visit  [PriyaDebo/Check-It (github.com)](https://github.com/PriyaDebo/Check-It)  before proceeding with the following steps for installing the front side of the application.

**Step 1:**
>[Download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
>
>[Download and Install Compass — MongoDB Compass](https://docs.mongodb.com/compass/current/install/)
>
>[Create a database](https://docs.mongodb.com/compass/current/databases/#create-a-database) in the compass named **CheckIt**. In the database create two collections, named **users** and **checklists**.


**Step 2:**

> Download or clone this repository by using the link given below.

```
https://github.com/PriyaDebo/Check-It-Back-End.git
```

**Step 3:**

> Installation

```
$ npm install
```

**Step 4:**

> To the run the app follow these steps:

```
 Running the app
 In development mode: $ npm run start
 In watch mode: $ npm run start:dev
 In production mode: $ npm run start:prod
```

## Folder Structure

Here is the folder structure I have been using in this project:

```
src/
|-Database/
|-authentication/
|-checklists/
|-common/
|-app.controller.spec.ts
|-app.controller.ts
|-app.module.ts
|-app.service.ts
|-main.ts
test/
```

## Conclusion

I will be happy to answer any questions that you may have regarding this project, and if you want to lend a hand with the project then please feel free to submit an issue and/or pull request.
