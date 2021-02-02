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
- Job Management
- Parts Management
- Auth0 Authentication
- Live updates with GQL Subscriptions

## Currently in development

- User Administtation
- Messaging system
- Attachment uploads system (PDF & Images with generated thumbnails)
- Re-Styling
- Moving UI state into redux, make it user configurable

## Todos (Not in any particular order)

- Redis Caching - Client cache (apollo) & server cache. Prevent un-necessary response times & DB requests
- Connection status snackbar/toasts - Prevent form submits when no connection
- Per-Employee Calendars
- Clock In/Out System
- Push Notifications
- Customisable Shop layouts & Theming
- Generate Printable cards with QR codes to identify machines in storage
- Dockerization
- User Activity Logging
- Initial/Deployment Config. Create users, config logo, footer, sitename, etc
- Make a Wiki / GitHub Page

## Live Demo

[https://jobs.dufferz.net](https://jobs.dufferz.net)

Test user: `testuser@testuser.dev`

Password: `sGgNEw+FK%2GxpCG`

Test user has scopes asides from delete applied. User Signup is disabled.

## Starting

It is possible to use an SSH tunnel for access from different devices (Otherwise Auth0 moans a lot)

```bash
    ssh -N -L 3000:127.0.0.1:3000 user@yourserversip
```

### Running Development server

```bash
    yarn && cd frontend && yarn && nvim src/config/config.tsx && \
    cd ../.. && cd src && cp .env.example .env && nvim .env  && \
    cd .. && yarn startdev
```

## License

Do whatever you want. I really don't care! Even feel free to remove my name!

Don't blame me if your server catches fire, or if your cat runs away because my code makes you angry.

Released under MIT License.
