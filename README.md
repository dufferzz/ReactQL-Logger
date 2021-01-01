# WorkshopLogger GQL React

Built as experimentation with GraphQL. Not Deploymment ready yet ;)

I will be re-basing dfstore-react-redux to GraphQL + Gatsby and including it in this project too.

The idea is to have a stack to control the entire infrastructure of my (currently) hypothetical Workshop & Store.

- WS GQL Express/Restify API server
- WebStore (To be built with Gatsby for SSR)
- Workshop Job Logger (To be used by mechanics independently)
- Internal Management (Users, Employees, Orders, Deliverys, Scheduling, Products, Parts, etc)
- Attendance Tracking App (Put on a cheap tablet mounted in workshop - used to clock in/out daily)

Frontend is a long ways from anywhere near finished.. Focus is primarily on Backend atm.

Everything will be migrated to TS for the sake of my sanity and ease of development. Types will be changing regularly until I get to a point where I feel

Haven't even made a Figma design of anything yet. Purely working on 'getting things working' before I even consider making it pretty - or as configurable as I intend to.

Handling RBAC and Scoping on QL Mutations is interesting

## Features

- GraphQL (With RBAC)
- Basically nothing useful yet
- Create, Update, Delete WS GQL Subscriptions
- Auth0 Authentication (Protected Frontend routes are TODO, API is 50/50)

## Todos (Not in any particular order)

- Better handling of Success/Errors from GQL
- Redis Caching
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
- Swagger Docs for API routes
- Make a Wiki / GitHub Page
- Add Tests?
- Make Server logging less janky
- Considering implementing a logger like LogRocket..

## server/.env

```bash
    PORT=3001
    DB_URL=mongodb://
    AUTH0_DOMAIN=
    API_IDENTIFIER=
    LOGROCKET_CONFIG=
```

## Running

IMPORANT NOTE: DEFAULT HOST=0.0.0.0 - Change package.json start script if not wanted!

There are a lot of hard-coded URLs in the src tree for now. I will move them to easily modifiable env vars at some point

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

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
