# WorkshopLogger GQL React

## Screenshots

![StonkShot](screenshot_lg.png?raw=true "Desktop Screenshot")

![StonkShot](screenshot_sm.png?raw=true "Mobile Screenshot")

## Description

Built mostly as experimentation with GraphQL. Not Deployment ready yet ;)

The idea is to have a stack to control the entire infrastructure of my (currently) hypothetical Workshop & Store.

## Features

- GraphQL (With RBAC using Auth0)
- Workshop Job Management
- Parts Management
- Auth0 Authentication
- Basically nothing useful yet
- Live updates with GQL Subscriptions

## Currently in development

- Messaging system
- Attachment uploads system (PDF & Images with generated thumbnails)
- Better handling on GQL Error responses
- Migration to Postgres

## Todos (Not in any particular order)

- Use Yup schma validation on server CRUD requests - stop returning DB errors to client. only validation errors.
- Better handling of Success/Errors from GQL
- Redis Caching - Client cache (apollo) & server cache. Prevent un-necessary response times & DB requests
- Connection status snackbar/toasts - Prevent form submits when no connection
- GQL Rate Limiting
- Per-Employee Calendars
- Clock In/Out System
- Push Notifications
- Customisable Shop layouts & Theming
- Generate Printable cards with QR codes to identify machines in storage
- Dockerization
- User Activity Logging
- Initial/Deployment Config. Create users, config logo, footer, sitename, etc
- A whole lot of design, tidying, refactoring, optimisation, structure, etc
- Swagger Docs for API routes
- Make a Wiki / GitHub Page
- Integration with Bring API for calculating deliverys
- Klarna Integration (?)- Flexible Payments
- Stripe/other (?) - for generating billable invoices

## Live Demo

[https://jobs.dufferz.net](https://jobs.dufferz.net)

Test user: testuser@testuser.dev

Password: sGgNEw+FK%2GxpCG

Test user has scopes applied. Newly created users will not!

I haven't created a user management section hooked to the Auth0 Management API yet so this is all for now. I'm not going to add roles to everyone manually.

## .env

```bash
    SERVER_PORT=3001
    CLIENT_PORT=3000
    DOMAIN=localhost
    DB_URL=mongodb://
    AUTH0_DOMAIN=
    API_IDENTIFIER=
```

## Starting

IMPORANT NOTES:

It is possible to use an SSH tunnel for access from different devices (Auth0 moans a lot)

```bash
    ssh -N -L 3000:127.0.0.1:3000 user@yourserversip
```

### Running Development server

```bash
    yarn install && cd frontend && yarn install && cd ..
    nvim frontend/config/config.tsx # Change server URL variables
    touch .env && nvim .env # add info
    yarn startdev
```

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
