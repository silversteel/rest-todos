# Todos REST API
REST using express and mongodb and SendGrid API as Mailer

### How to
- Run `npm install`
- Set your sendgrid api key in `app/config.js`
- Run `npm start` or `npm start-dev` (dev mode, nodemon required)

### Mini API Docs
URL | Method | Desc | Body
---------|-----------|-------|----
`api/v1/todos` | GET | Get all todos | -
`api/v1/todos` | POST | Create new todo | `title`
`api/v1/todos/:id` | PUT | Edit todo | `title` or `is_completed`
`api/v1/todos/:id` | DELETE | Delete todo | -
`api/v1/todos/sendToEmail` | POST | Send all todos to email | `to`
