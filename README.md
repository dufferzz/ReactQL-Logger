# WorkshopLogger GQL React

## Description

Built mostly as experimentation with GraphQL. Not Deployment ready yet ;)

The idea is to have a stack to control the entire infrastructure of my (currently) hypothetical Workshop & Store.

## Features

- GraphQL (With RBAC)
- Auth0 Authentication
- Basically nothing useful yet
- Live updating data with GQL Subscriptions

## Todos (Not in any particular order)

- Use Yup schma validation on server CRUD requests - stop returning DB errors to client. only validation errors.
- Better handling of Success/Errors from GQL
- Redis Caching - Client cache (apollo) & server cache. Prevent un-necessary response times & DB requests
- Connection status snackbar/toasts - Prevent form submits when no connection
- GQL Rate Limiting
- Per-Employee Calendars
- Clock In/Out System
- PWA & Push Notifications
- Custom Theming
- Customisable Shop layouts
- Image Upload & thumbnails
- Generate Printable cards with QR codes to identify machines in storage
- PDF Upload & thumbnails
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

## Running

IMPORANT NOTES:

HOST=0.0.0.0 - Change package.json start script if not wanted

You may run into problems with Auth0's security. Use <https://lvh.me:3000> instead of localhost:3000 for HTTPS.

It is possible to use an SSH tunnel with HTTP Dev Server to negate having start a HTTPS server for access from other local devices.. this is far easier...

```bash
    ssh -N -L 3000:127.0.0.1:3000 user@yourserversip
```

### Plain HTTP

```bash
    yarn install && cd frontend && yarn install && cd ..
    nvim frontend/config/config.tsx # Change server URL variables
    touch .env && nvim .env # add info
    yarn start
```

### Secure HTTPS Development Mode

Auth0 is a mildly annoying.

WSS socket is irritating with CERT_AUTHORITY errors.

You will need to make sure you use specify correct URLs on Auth0 Management.

You will likely need to add certificate exceptions, or run Chrome(ium) with the --ignore-certificate-errors flag.

I would _Strongly_ recommend SSH Tunneling as noted above.

```bash
    yarn install
    openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
    openssl rsa -in keytmp.pem -out key.pem
    cd frontend
    yarn install
    nvim config/config.tsx # Change server URL variables
    nvim package.json #append HTTPS=true to startclient script
    cd ..
    touch .env && nvim .env # add info
    yarn start
```

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
