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

- **React**
- **GraphQL**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose ODM**
- **Render**
- **Cypress**
- **GitHub Actions**
- **JWT**
- **nodemon**

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

|             Team 4 |                                               |                                                                   |                                           |                                                                                                                                   |
| -----------------: | --------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------: |
|    **Axel Paxton** | [Email](mailto:axep504@gmail.com)             | [LinkedIn](https://www.linkedin.com/in/axel-paxton-125999311/)    | [GitHub](https://github.com/Axe-P)        |        ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=Axe-P&color=blue) |
|   **Ian Ferguson** | [Email](mailto:iansterlingferguson@gmail.com) | [LinkedIn](https://www.linkedin.com/in/ianferguson/)              | [GitHub](https://github.com/TEMPTAG)      |      ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=TEMPTAG&color=blue) |
| **Keith WIlliams** | [Email](mailto:keith_a_w@hotmail.com)         | [LinkedIn](https://www.linkedin.com/in/keith-a-williams-7841b022) | [GitHub](https://github.com/keithamadeus) | ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=keithamadeus&color=blue) |
|     **Rory Dowse** | [Email](mailto:rorydowse@hotmail.com)         | [LinkedIn](https://www.linkedin.com/in/rorydowse)                 | [GitHub](https://github.com/RoryDowse)    |    ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/DevDemand?authorFilter=RoryDowse&color=blue) |

---

## Questions

If you have any questions or need help, feel free to reach out to any of the contributors via the emails and LinkedIn profiles provided above.

---

## License

This project is licensed under the MIT License. The details of the MIT License can be found on their site [HERE](https://opensource.org/licenses/MIT). You can also see the full details of the [LICENSE](./LICENSE) for this specific project in the linked file.

<div align="center">
<em>Copyright © 2024 Team DevDemand - powered by relentless teamwork, overcommunication, and a little bit of fun</em>

[Back to top](#top)
