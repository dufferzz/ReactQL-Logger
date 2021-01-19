# DFZ Service - WebStack

## Screenshots

![Screenshot](screenshot_animated.gif?raw=true "Desktop Screenshots")

## Description

Built mostly as experimentation with GraphQL. Not Deployment ready yet ;)

Designed for use in workshops, for management of webstore, workshop jobs, parts, communication between employees.

Will be building a Gatsby/Next.js Webstore to go within this stack (Recreation of DFZStoreAngular).

Possibly will add invoicing, POS system app (WebUSB/WebSerial barcode scanning &receipt printing!)

Internal Management App, Webstore App, React Native App (Todo) powered by GraphQL

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

Test user has scopes asides from delete applied. Newly created users will not have any roles and can't do much.

I haven't created a user management section hooked to the Auth0 Management API yet so this is all for now. I'm not going to add roles to everyone manually.

## .env

```bash
    PORT=3001
    CLIENT_URL=
    HTTPS=false
    DB_URL=
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
    yarn && cd frontend && yarn && cd ..
    nvim frontend/config/config.tsx # Change variables as required
    touch .env && nvim .env # Change variables as required
    yarn startdev
```

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
