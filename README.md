# WorkshopLogger GQL React

Built as experimentation with GraphQL. Not Deploymment ready yet ;)

Frontend is a long ways from anywhere near finished.. Focus is primarily on Backend atm.

Haven't even made a Figma design of anything yet. Purely working on 'getting things working' before I even consider making it pretty - or as configurable as I intend to.

Handling RBAC and Scoping on QL Mutations is interesting

## Features

- Basically nothing useful yet
- GraphQL
- Create, Update, Delete WS GQL Subscriptions

## Todos (Not in any particular order)

- Better handling of Success/Errors from GQL
- RBAC GQL
- Auth0 Authentication (Front end, no route guards yet etc)
- Per-Employee Calendars
- Clock In/Out System
- PWA & Push Notifications
- Custom Theming
- Customisable Shop layouts
- Image Upload & thumbnails
- PDF Upload & thumbnails
- Inventory Management
- Dockerization
- User Activity Logging
- Store all create, update, delete commands, userid, time and create backups
- Typescriptification! Frontend and Backend!
- First Admin login section. Create users, config logo, footer, sitename, etc
- A whole lot of design, tidying, refactoring, optimisation, structure, etc
- Make a Wiki / GitHub Page

## server/.env

```bash
    PORT=3001
    DB_URL=mongodb://
    AUTH0_DOMAIN=
    API_IDENTIFIER=
```

## Note: HOST=0.0.0.0

## Running

```bash
    touch server/.env
    nvim server/.env # add info
    yarn start
```

## Notes / Todos / Stuff / Misc

### RBAC / Scope based Authentication

RBAC Is still being constructed...

Scopes (category: description):

jobs: CRUD + Abilities to read + update jobs only assigned to that user

categories: CRUD

parts: CRUD

orders: CRUD

storeOrders: CRUD

customers: CRUD

attachments: CRUD

userSettings: CRUD

deploySettings: CRUD - To store all information like shop name, logo, tax %, url, etc

### User-Roles

Default scopes applied to users. Will be selectable on New User interface. These will be the default selected checkbox/toggle options once a User Type is selected on User Creation interface. Admins will be able to modify the assigned Scopes and Role applied to a selected user.

User - Read Products only

Employee - Ability to read all jobs by any user, create new orders. no modify / delete permissions at all

Mechanic - CRU all Jobs, Parts. NO deletey! If anything is 'deleted' by a mechanic, copy it to a seperate collection / table and remove(or mark removed)

Administrator - All CRUD Everywhere except deploySettings

Superuser - i am root
