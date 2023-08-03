# parking-finder (under development)

Purpose of this project is to practice with Google Maps API, NestJS, Prisma (postgresql) and React JS.

This app simplifies parking by allowing users to reserve parking spaces in nearby lots. You can make reservations in advance, enhancing your convenience. The app utilizes the Google Maps API to provide directions and map views for easy navigation.

## Technologies used:

- Google Maps API
- NestJS
- React (Typescript)
- React Bootstrap
- Postgresql

# Instructions

## Initialization

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend.

## Migrating the database

Make sure you have your database running, or use the dockerized one in the main directory using `docker-compose up`.
You need to create `.env` file in `backend` directory and populate it by following `.env.example` file. </br>

Next change the directory from main folder to

```
cd ./backend
```

And run the following two commands

```
npx prisma migrate dev
npx prisma generate
```

This command will migrate the prisma schema to the database, and generate artifacts.

## Environment variables instructions

You will need to create .env file in the `backend` directory and in the `frontend` directory. <br/>
Follow .env.example variables as an example and fill them with your own data. <br/>

### .env file in the `backend` directory

`PORT=5000` - is used for backend server port <br/>
`JSONWEBTOKEN_KEY=XXXX` - key for generating JWT token <br/>
`DATABASE_URL="postgresql://postgres:example@localhost:5432/postgres"` - is your database connection url <br/>
`GOOGLE_MAPS_API_KEY=XXXX` - API key from Google Cloud. You will need to enable the following 5 API's for the project to work `(Directions API, Distance Matrix API, Places API, Maps Javascript API, Geocoding API)`
<br/><br/>
The next variables are not mandatory! The email is used to send reservations information. If you want to have this functionality follow the instructions [here](#setting-up-nodemailer) <br/>
`SENDER_EMAIL=XXXX` - gmail email used for nodemailer (not required) <br/>
`SENDER_EMAIL_PASSWORD=XXXX` - gmail app password used for nodemailer (not required) <br/>

### .env file in the `frontend` directory

`GOOGLE_MAPS_API_KEY=XXXX` - API key from Google Cloud. You will need to enable the following 5 API's for the project to work `(Directions API, Distance Matrix API, Places API, Maps Javascript API, Geocoding API)`

## Running in development

Make sure you have your database running.

After everything is set, next time if you want to start the project all you need to do is run this command `npm run dev`
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```

## Screenshots of the app 👀

### Main page
![Screenshot from 2023-07-13 18-29-18](https://github.com/yosko99/parking-finder/assets/80975936/68144c89-b690-4d4d-a082-36c88bcea8c9)

### Create reservation page 
![Screenshot from 2023-07-13 18-29-53](https://github.com/yosko99/parking-finder/assets/80975936/ef40c5d2-9406-460d-9db9-e93ebf05cc55)

### Reservations analysis page
![Web capture_19-7-2023_155943_localhost](https://github.com/yosko99/parking-finder/assets/80975936/a21ae7bc-09ed-468e-a666-bafd874daef5)

### Selecting parking space
![Screenshot from 2023-07-25 11-08-03](https://github.com/yosko99/parking-finder/assets/80975936/51922737-9141-46bc-b000-0475549be2b5)
![Screenshot from 2023-07-25 11-08-26](https://github.com/yosko99/parking-finder/assets/80975936/8bd1be28-a588-4bd8-b26a-40997bce211d)

## Setting up nodemailer

As you can see there are two environment variables that require some gmail and password, usually they are used for sending an email for password reset. But dont worry they are not required and the project will not crash without them (hopefully) 😄. <br/>

But if you wanna try this feature you are gonna set up your gmail with the following requirements. <br/>
You need to activate `Forwarding and POP/IMAP` and get yourself gmail application password [app password instructions](https://support.google.com/accounts/answer/185833?hl=en). <br/>

