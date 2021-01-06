# WorkshopLogger GQL React

## Description

Built mostly as experimentation with GraphQL. Not Deployment ready yet ;)

I will be re-basing dfzstorereactredux to GraphQL + Gatsby and including it in this project too.

The idea is to have a stack to control the entire infrastructure of my (currently) hypothetical Workshop & Store.

- WS GQL Express/Restify API server
- WebStore (To be built with Gatsby for SSR)
- Workshop Job Logger (To be used by mechanics independently)
- Internal Management (Users, Employees, Orders, Deliverys, Scheduling, Products, Parts, etc)
- Attendance Tracking App (Put on a cheap tablet mounted in workshop - used to clock in/out daily)

Frontend is a long ways from anywhere near finished.. Focus is currently on backend and handling RBAC properly.

Will design a 'proper' frontend ... eventually

Database is currently MongoDB Atlas, I will be moving to Postgres once I have everything else 'mostly done'

## Features

- GraphQL (With RBAC)
- Auth0 Authentication
- Basically nothing useful yet
- Create, Update, Delete WS GQL Subscriptions

## Todos (Not in any particular order)

- Better handling of Success/Errors from GQL
- Redis Caching
- GQL Rate Limiting
- Per-Employee Calendars
- Clock In/Out System
- PWA & Push Notifications
- Custom Theming
- Customisable Shop layouts
- Image Upload & thumbnails
- Generate Printable cards with QR codes to identify machines in storage
- PDF Upload & thumbnails
- Inventory Management
- Dockerization
- User Activity Logging
- Initial/Deployment Config. Create users, config logo, footer, sitename, etc
- A whole lot of design, tidying, refactoring, optimisation, structure, etc
- Swagger Docs for API routes
- Make a Wiki / GitHub Page

## server/.env

```bash
    PORT=3001
    CLIENT_PORT=3000
    DB_URL=mongodb://
    AUTH0_DOMAIN=
    API_IDENTIFIER=
    HTTPS=false
```

## Running

IMPORANT NOTE: HOST=0.0.0.0 - Change package.json start script and update CORS, config/config.tsx if not wanted!

There are a lot of hard-coded URLs in the src tree for now. I will move them to easily modifiable env vars at some point. Possibly will add a switch statement to deal with CORS for development.

### Plain HTTP Development Mode

```bash
    touch server/.env
    nvim server/.env # add info
    yarn start
```

### Secure HTTPS Development Mode

Auth0 is a salty little one when you try and access from other machines on the local network. auth0-spa-js must run on a secure origin. unless is localhost dev. lvh.me doesn't work, nor adding hosts entry.

You will likely need to add certificate exceptions. WSS socket is irritating with CERT_AUTHORITY errors.

Perhaps it is possible an SSH tunnel to negate having to do all this

```bash
    cd server
    openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
    openssl rsa -in keytmp.pem -out key.pem
    touch .env
    nvim .env # add info & HTTPS=true
    cd ..
    nvim config/config.tsx # Change URL variables
    nvim package.json # Append HTTPS=true to start script
    yarn start
```

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
