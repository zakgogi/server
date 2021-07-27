## Routes

| Route          | Data Required from front end                                           | Description                                             | Type   |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| /auth/register | username, password, email                                              | Will be hit by front end sign up page                   | POST   |
| /auth/login    | username, password                                                     | Will be hit on login page                               | POST   |
| /habits        | habitname, times_completed = 0, frequency_day, streak = 0, username_id | Will be hit when creating new habits                    | POST   |
| /habits        | id(habit_id), times_completed, frequency_day                           | Will be hit when user presses plus button on habit card | PATCH  |
| /habits        | id(habit_id)                                                           | Will be hit when user clicks on x on habit card         | DELETE |
