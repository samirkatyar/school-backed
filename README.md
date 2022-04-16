# School Management system - Backend
Dashboard API.

## Installation & Configuration

1. Install dependencies via npm:

```bash
npm i # (for local setup)
```

2. Create .env file identical to example.env with valid values
3. To start the server

```bash
npm start
```

#### Folder Structure

Common structure that is used in this project is as following

```
.
└── src
    └── components
        └── module
            ├── module.route.js
            ├── module.controller.js
            ├── module.DAL.js
            ├── module.model.js
            └── module.helper.js
```

| File                 | Usage/Description                                                                                                                                                            |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| module.route.js      | All the routes for this feature will be defined here. It will not include any kind of business logic. It will just redirect to controller function for the particular route. |
| module.controller.js | Controller will business logic to the API or it will use helpers to do the business logic                                                                                    |
| module.DAL.js        | DAL will used for all th database related logic.                                                                                                                             |
| module.model.js      | If feature will use DB then interfaces and schema for model will be defined here                                                                                             |
| module.helper.js     | Helper functions should be defined here which will be used as business logic for the controller functions. however it won't have any kind of DB query directly used.         |
