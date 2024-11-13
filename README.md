## <a name="top"></a>

# DevDemand

### Browse, Research, and Contact Freelance Web and Software Developers

---

[Visit the Deployed Application]()

![GitHub License](https://img.shields.io/github/license/TEMPTAG/DevDemand?label=License)

## Description

DevDemand is a platform for developers to showcase their skills and connect with potential clients, empowering individuals and small businesses to find the right freelance talent for their projects.

![Screenshot of Application]()

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [GraphQL Queries and Mutations](#graphql-queries-and-mutations)
- [Usage](#usage)
- [Tests](#tests)
- [Contributors](#contributors)
- [Questions](#questions)
- [License](#license)

---

## Features

- **Developer Management**:

  - Create, update, and delete Developer Profiles

---

## Technologies Used

### Packages Used:

- [**bcrypt**](https://www.npmjs.com/package/bcrypt)
  - A cryptographic hashing algorithm for storing passwords securely by converting passwords into secure, irreversible strings.
- [**concurrently**](https://www.npmjs.com/package/concurrently)
  - A Node package that enables running multiple commands simultaneously in the same terminal, streamlining workflows.
- [**Cypress**](https://www.cypress.io/)
  - An end-to-end testing framework for web applications that allows developers to write, execute, and debug tests for web app functionality.
- [**dotenv**](https://www.npmjs.com/package/dotenv)
  - A package that manages environment variables, making it easy to store and access sensitive information in .env files.
- [**ESLint**](https://eslint.org/)
  - A static code analysis tool that identifies and automatically fixes problems in JavaScript and TypeScript code, improving code quality.
- [**Express.js**](https://expressjs.com/)
  - A lightweight web application framework for Node.js that simplifies building server-side applications by providing routing and middleware.
- [**JSDOM**](https://www.npmjs.com/package/jsdom)
  - A library that simulates a web browser environment within Node, enabling browser-specific code testing without requiring an actual browser.
- [**jwt-decode**](https://www.npmjs.com/package/jwt-decode)
  - A package for decoding JSON Web Tokens (JWT) to retrieve payload data without validating the signature.
- [**MongoDB**](https://www.mongodb.com/)
  - A NoSQL database for storing and managing large volumes of unstructured data.
- [**Mongoose**](https://mongoosejs.com/)
  - An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model application data.
- [**msw (Mock Service Worker)**](https://mswjs.io/)
  - A testing utility that intercepts network requests at the client-side and provides mock responses, enabling the testing of client-server interactions without a real backend.
- [**nodemon**](https://www.npmjs.com/package/nodemon)
  - A tool for automatically restarting a Node server upon detecting changes in the file system, enhancing development speed.
- [**react-router-dom**](https://reactrouter.com/en/main)
  - A routing library that enables seamless navigation and view management in React applications without reloading the entire page.
- [**ts-node**](https://www.npmjs.com/package/ts-node)
  - A TypeScript execution environment for running TypeScript code directly, streamlining development and debugging without precompiling.
- [**TypeScript**](https://www.typescriptlang.org/)
  - A typed superset of JavaScript that compiles to plain JavaScript, adding static typing and interfaces to improve code maintainability.
- [**Vitest**](https://vitest.dev/)
  - A fast unit testing framework for Vite projects that integrates smoothly with modern front-end development workflows.
- [**Vite**](https://vite.dev/)
  - A build tool and development server optimized for performance and efficiency, providing a fast developer experience.

### Libraries Used:

- [**Apollo Client**](https://www.apollographql.com/docs/react)
  - A state management library for JavaScript applications, enabling seamless interaction with GraphQL APIs.
- [**Apollo Server**](https://www.apollographql.com/docs/apollo-server)
  - A GraphQL server for building APIs with schema definitions, resolvers, and query/mutation handling.
- [**Bootstrap**](https://getbootstrap.com/)
  - A front-end framework for building responsive and mobile-first applications with a grid system and pre-designed components.
- [**GraphQL**](https://graphql.org/)
  - A query language and runtime for APIs that allows clients to specify the data they need, promoting efficiency and flexibility in data fetching.
- [**jsonwebtoken (JWT)**](https://www.npmjs.com/package/jsonwebtoken)
  - A JSON-based standard used for securely transmitting information between a server and client, often for authentication purposes.
- [**React**](https://react.dev/)
  - A JavaScript library for building dynamic user interfaces, especially for single-page applications with stateful components.
- [**react-bootstrap**](https://react-bootstrap.netlify.app/)
  - A collection of Bootstrap components built specifically for React, simplifying the process of adding Bootstrap styles to React projects.
- [**react-dom**](https://www.npmjs.com/package/react-dom)
  - A package that provides the necessary methods for React to interact with the DOM in web applications.

### Services Used:

- [**GitHub Actions**](https://github.com/features/actions)
  - A CI/CD tool that automates workflows, builds, and deployments directly within GitHub.
- [**Node.js**](https://nodejs.org/en)
  - A JavaScript runtime environment that enables server-side execution of JavaScript, allowing developers to build scalable network applications.
- [**Render**](https://render.com/)
  - A cloud platform for deploying web applications, databases, and static sites, offering hosting solutions for full-stack applications.

---

## Installation

_To install this project locally, using your terminal application, please follow these steps_:

1. **Clone the `DevDemand` repository**:

   ```bash
    Using HTTPS:
    git clone https://github.com/TEMPTAG/DevDemand.git

    Using SSH:
    git clone git@github.com:TEMPTAG/DevDemand.git

    Using GitHub CLI:
    gh repo clone TEMPTAG/DevDemand
   ```

2. **Navigate into the `DevDemand` directory**:

   ```bash
   cd DevDemand
   ```

3. **Install the npm dependencies**:

   ```bash
   npm install
   ```

4. **Create an `.env` file in the root directory and add the following**:

   ```
   coming soon...
   ```

5. **Seed the Database**:

   ```bash
   npm run seed
   ```

6. **Start the appropriate server**:

   - Development server with live (nodemon) reloading:

   ```bash
   npm run dev
   ```

   - Production server:

   ```bash
   npm run start
   ```

7. **Test the API using Insomnia with the following GraphQL Queries and Mutations...**

---

## GraphQL Queries and Mutations

- **Developer Queries**:

  - Fetch all Developers

    ```graphql
    query {
      developers {
        id
        firstName
        lastName
        location
        experience
        hourlyRate
        skillset
        bio
      }
    }
    ```

  - Fetch a single Developer by ID

    ```graphql
    query ($id: ID!) {
      developer(id: $id) {
        id
        firstName
        lastName
        location
        experience
        hourlyRate
        skillset
        bio
      }
    }
    ```

- **Developer Mutations**

  - Add a new Developer

    ```graphql
    mutation ($input: DeveloperInput!) {
      addDeveloper(input: $input) {
        id
        firstName
        lastName
        location
        experience
        hourlyRate
        skillset
        bio
      }
    }
    ```

  - Update an existing Developer

    ```graphql
    mutation ($id: ID!, $input: DeveloperUpdateInput!) {
      updateDeveloper(id: $id, input: $input) {
        id
        firstName
        lastName
        location
        experience
        hourlyRate
        skillset
        bio
      }
    }
    ```

  - Delete a Developer

    ```graphql
    mutation ($id: ID!) {
      deleteDeveloper(id: $id) {
        success
        message
      }
    }
    ```

---

## Usage

- Once the server is running, use Insomnia or any GraphQL client to test the GraphQL Queries and Mutations at the base URL: http://localhost:3001

- Use the above Developer Queries and Mutations to:

  - Create
  - Read
  - Update
  - Delete

- Example Developer Object JSON:

  ```json
  {
    "id": "example",
    "firstName": "Ian",
    "lastName": "Ferguson",
    "location": "Phoenix, AZ",
    "experience": "20 Years",
    "hourlyRate": "$125",
    "skillset": ["html", "JavaScript", "etc."],
    "bio": "👋 Full-stack developer with 20+ years in automotive and medical industries, focused on building efficient, user-centered web applications."
  }
  ```

---

## Tests

**Cypress**

Testing functionality with Cypress will be added soon...

---

## Contributors

![GitHub contributors](https://img.shields.io/github/contributors/TEMPTAG/DevDemand?color=green) ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand)

|             Team 4 |                                                  |                                                                   |                                           |                                                                                                                                   |
| -----------------: | ------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------: |
|    **Axel Paxton** | [Email](mailto:axep504@gmail.com)                | [LinkedIn](https://www.linkedin.com/in/axel-paxton-125999311/)    | [GitHub](https://github.com/Axe-P)        |        ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=Axe-P&color=blue) |
|   **Ian Ferguson** | [Email](mailto:iansterlingferguson@gmail.com)    | [LinkedIn](https://www.linkedin.com/in/ianferguson/)              | [GitHub](https://github.com/TEMPTAG)      |      ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=TEMPTAG&color=blue) |
| **Keith WIlliams** | [Email](mailto:keith.amadeus.williams@gmail.com) | [LinkedIn](https://www.linkedin.com/in/keith-a-williams-7841b022) | [GitHub](https://github.com/keithamadeus) | ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=keithamadeus&color=blue) |
|     **Rory Dowse** | [Email](mailto:rorydowse@hotmail.com)            | [LinkedIn](https://www.linkedin.com/in/rorydowse)                 | [GitHub](https://github.com/RoryDowse)    |    ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=RoryDowse&color=blue) |

---

## Questions

If you have any questions or need help, feel free to reach out to any of the contributors via the emails and LinkedIn profiles provided above.

---

## License

This project is licensed under the MIT License. The details of the MIT License can be found on their site [HERE](https://opensource.org/licenses/MIT). You can also see the full details of the [LICENSE](./LICENSE) for this specific project in the linked file.

<div align="center">
<em>Copyright © 2024 Team DevDemand - powered by relentless teamwork, overcommunication, and a little bit of fun</em>

[Back to top](#top)
