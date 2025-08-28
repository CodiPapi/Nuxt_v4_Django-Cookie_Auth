# Nuxt v4 + Django — Cookie-Based Authentication

A lightweight starter demonstrating cookie-based session authentication between a Nuxt 4 frontend and a Django backend via Django Rest Framework using JSON Web Tokens (JWT) and Pinia Store.

## Features
- Django backend serving Cookie-Based (JWT) authentication
- CSRF Protection
- Nuxt 4 frontend consuming backend APIs with cookies
- Secure authentication flow without local storage
- SSR and smooth hydration (thanks to Nuxt)

## Project Structure
```bash
.
├── backend
│   ├── accounts
│   ├── backend
├── frontend
│   ├── app
│       ├── pages
│           ├── index.vue
│           ├── login.vue
│           ├── register.vue
│           ├── user.vue
│       ├── stores
│           ├── auth.ts
│       ├── app.vue
│   └── ...
├── ...
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.13+
- Node.js v22.17+
- pip and npm

### Tested & Confirmed with:
- Tested with python 3.13.5
- Node.js v22.17.1
  
### Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Runs on: http://127.0.0.1:8000/

### Frontend (Nuxt 4)
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:3000/

## Authentication Flow
- User logs in via Nuxt frontend; Django sets a secure, HttpOnly sessionid cookie and CSRF token.
- Nuxt includes the CSRF token in request headers
- API requests carry cookies automatically—no token storage in JavaScript needed.
- Pinia store handles user state management

## Contribute & Extend
- Add unit or E2E tests (Vitest, Playwright, etc.) to enable CD/CI pipelines for version testing

## License
This project is licensed under the terms of the [MIT License](LICENSE).
