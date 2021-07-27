# Installation and Usage

## Installation

- Clone or download this repo.
- Cd into server folder.

## Usage

### To start development

- In your terminal run `bash _scripts/startDev.sh` or `docker compose up`.

### To start test suite

- In your terminal run `bash _scripts/startTest.sh`

### To teardown

- In your terminal run `bash _scripts/tearDown.sh` or `docker compose down --remove-orphans --volumes`

## Routes

| Route          | Data Required from front end                                           | Description                                             | Type   |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| /auth/register | username, password, email                                              | Will be hit by front end sign up page                   | POST   |
| /auth/login    | username, password                                                     | Will be hit on login page                               | POST   |
| /habits        | habitname, times_completed = 0, frequency_day, streak = 0, username_id | Will be hit when creating new habits                    | POST   |
| /habits        | id(habit_id), times_completed, frequency_day                           | Will be hit when user presses plus button on habit card | PATCH  |
| /habits        | id(habit_id)                                                           | Will be hit when user clicks on x on habit card         | DELETE |

## Database Schema

### User Table

| Name     | Type    | Notes                                   |
| -------- | ------- | --------------------------------------- |
| id       | SERIAL  | Primary key                             |
| username | varchar | Maximum 60 characters, unique, not null |
| email    | varchar | Maxium 255 characters, unique, not null |
| password | varchar | Maxium 255 characters, not null         |

### Habits Table

| Name            | Type    | Notes                           |
| --------------- | ------- | ------------------------------- |
| id              | SERIAL  | Primary key                     |
| habitname       | varchar | Maximum 50 characters, not null |
| times_completed | int     | Not null                        |
| frequency_day   | int     | Not null                        |
| streak          | int     | Not null                        |
| username_id     | int     | Not null                        |
