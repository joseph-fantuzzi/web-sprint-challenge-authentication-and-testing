# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Run `npm install` to install your dependencies.
- [ ] Build your database executing `npm run migrate`.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

   The difference between using sessions and JWTs is that JWTs store all the information about the user within the token itself while with session cookies, there is only a session-id that does not contain any information about the user except time of login and expiration, but is a random string generated and signed by the secret key. JWTs are sent in the authorization header of every HTTP request to a backend API, while session cookies are sent automatically in the request as a req.session object.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

   bcryptjs allows us to store user passwords in a database very securely. bcryptjs hashes the user's password through a hashing function and adds salt to make the string stored in the database uncrackable by attackers. Whenever the user goes to login to their account, that password input is put through bcrypt's hashing function and is compared to the one stored on the database. With bcrypt's hashing algorithm, the password can never be turned back into its orginal form.

3. How are unit tests different from integration and end-to-end testing?

   Unit tests test a piece of code in isolation, while integration tests check if different modules are working fine when combined together. End-to-end testing tests the entire application. It simulates a real user scenario from start to finish.

4. How does _Test Driven Development_ change the way we write applications and tests?

   Test Driven Development (TTD) changes the way we write applications and tests because it requires creating tests first before the code is written and then once the test is written, the development process starts. After both the test and development is complete, then the code can be refactored to keep the program DRY and efficient.
