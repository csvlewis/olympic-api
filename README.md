# Olympic API

## Introduction

Olympic API is an API service built with Node.js that can be used to access historical data about Olympians and events from the 2016 Summer Olympics.

## Local Setup

These instructions will get a copy of the project up and running on your local machine for usage and testing purposes.

Clone down the repo: ```$ git clone https://github.com/csvlewis/olympic-api```

cd into directory and run npm install: ```$ npm install```

Create and migrate the development database ```$ npx sequelize db:create```, ```$ npx sequelize db:migrate```

Seed the development database ```$ node seeds.js```

Launch your local server: ```$ npm start ```

All endpoints will then be accessbile at ```http://localhost:3000/api/v1/```

## Endpoints

### Get All Olympians

To retrieve all olympians in the database, users can send a GET request to ```http://localhost:3000/api/v1/olympians```.

If the response is successful, olympians will be returned in the following format:
```json
{
  "olympians": [
    {
      "name": "Hannes Aigner",
      "team": "Germany",
      "age": 27,
      "sport": "Canoeing",
      "total_medals_won": 0
    },
    {
      "name": "Samir At Sad",
      "team": "France",
      "age": 26,
      "sport": "Gymnastics",
      "total_medals_won": 0
    },
    {"..."}
  ]
}
 ```

### Get Youngest Olympian

To retrieve the youngest olympian in the database, users can send a GET request to ```http://localhost:3000/api/v1/olympians?age=youngest```.

If the response is successful, the olympian will be returned in the following format:
```json
{
  "olympian": {
    "name": "Ana Iulia Dascl",
    "team": "Romania",
    "age": 13,
    "sport": "Swimming",
    "total_medals_won": 0
  }
}
```
### Get Oldest Olympian

To retrieve the oldest olympian in the database, users can send a GET request to ```http://localhost:3000/api/v1/olympians?age=oldest```.

If the response is successful, the olympian will be returned in the following format:
```json
{
  "olympian": {
    "name": "Julie Brougham",
    "team": "New Zealand",
    "age": 62,
    "sport": "Equestrianism",
    "total_medals_won": 0
  }
}
```

### Get Olympian Stats

To get statistics about Olympians in the database, users can send a GET request to ```http://localhost:3000/api/v1/olympian_stats```.

If the response is successful, statistics will be returned in the following format:
```json
{
  "olympian_stats": {
    "total_competing_olympians": 3322,
    "average_weight": {
      "unit": "kg",
      "male_olympians": 79.1,
      "female_olympians": 62.1
    },
    "average_age": 26.3
  }
}
```

### Get All Events

To get all events in the database grouped by sport, users can send a GET request to ```http://localhost:3000/api/v1/events```.

If the response is successful, events will be returned in the following format:
```json
[
  {
    "sport": "Archery",
    "events": [
      "Archery Men's Team",
      "Archery Men's Individual",
      "Archery Women's Individual",
      "Archery Women's Team"
    ]
  },
  {
    "sport": "Gymnastics",
    "events": [
      "Gymnastics Men's Team All-Around",
      "Gymnastics Men's Rings",
      "Gymnastics Women's Team All-Around",
      "Gymnastics Men's Floor Exercise",
      "Gymnastics Women's Balance Beam",
      "Gymnastics Women's Floor Exercise",
      "Gymnastics Men's Parallel Bars",
      "Gymnastics Women's Horse Vault",
      "Gymnastics Women's Uneven Bars",
      "Gymnastics Women's Individual All-Around",
      "Gymnastics Men's Horizontal Bar",
      "Gymnastics Men's Individual All-Around",
      "Gymnastics Men's Pommelled Horse",
      "Gymnastics Men's Horse Vault"
    ]
  },
  {"..."}
]
```
### Get Event Medalists

To get all medalists for an event, users can send a GET request to ```http://localhost:3000/api/v1/events/:id/medalists```, where :id is the event id.

If the response is successful, medalists will be returned in the following format:
```json
{
  "title": "Canoeing Men's Kayak Singles, Slalom",
  "Medalists": [
    {
      "name": "Joseph \"Joe\" Clarke",
      "team": "Great Britain",
      "age": 23,
      "medal": "Gold"
    }
  ]
}
```
## Testing

Tests can be run with ```$ npm test```. For more information about seeding the test database, see 'Known Issues'.

## Known Issues

Most of the issues currently involve seeding the development and test databases. The script in ```seeds.js``` is running a findOrCreate when creating Olympians, so they should not be repeated in the database. However, I think that the script may be running too quickly, because occaisionally (but not always) Olympians will be duplicated in the database after seeding.

Similarly, the seeder script is currently set to seed the development database only. To seed my test database, I set the development database name in ```config.json``` to be the name of my test database and ran the seeder script once, then set it back to the development database. I want to find a better way to seed my test database in the future.

## Tech Stack

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)

## Created By

- [Chris Lewis](https://github.com/csvlewis)



