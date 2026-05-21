# Campus Connect Frontend

Campus Connect is a React frontend for a campus community platform. It gives students, faculty, and admins a place to sign up, sign in, view a protected dashboard, manage campus events, and report lost or found items.

## What This Project Is Made Of

- React 19 for building the user interface.
- Vite 7 for local development, hot module reload, and production builds.
- React Router DOM 7 for page routing and protected navigation.
- Axios for HTTP requests to the backend API.
- Tailwind CSS 3, custom CSS, and Bootstrap 5 for styling.
- Bootstrap Icons for interface icons.
- ESLint 9 with React Hooks and React Refresh rules.

Bootstrap CSS, Bootstrap Icons, Bootstrap JS, and the Inter font are loaded from CDNs in `index.html`.

## What The Project Does

The app is branded as **Campus Connect**, a campus community platform. It includes:

- A public landing page that explains the platform and links users to sign in or create an account.
- Login and registration pages with styled forms, loading states, validation, and error handling.
- JWT-style authentication storage using `localStorage`.
- Protected dashboard access through a `ProtectedRoute` component.
- Automatic redirect from protected pages to `/login` when no token exists.
- Automatic redirect from the landing page to `/dashboard` when a token already exists.
- Axios request interceptor that adds `Authorization: Bearer <token>` to API requests.
- Axios response interceptor that removes the token and redirects to `/login` on `401 Unauthorized`.
- A dashboard with quick-action cards, recent activities, event management, lost-and-found reporting, and campus stats.

## Pages And Routes

- `/` renders the landing page.
- `/login` renders the login form.
- `/register` renders the registration form.
- `/dashboard` renders the protected dashboard.
- Any unknown route redirects back to `/`.

## Main Features

### Landing Page

The landing page presents Campus Connect as a student campus platform. It includes:

- Navigation with brand logo and auth links.
- Hero section with calls to action.
- Platform statistics.
- Feature cards for peers, updates, academics, and campus events.
- Final call-to-action section.

### Authentication

The login page sends credentials to:

```text
POST /auth/login
```

On success, the returned token is saved in `localStorage` under:

```text
token
```

The registration page sends new user data to:

```text
POST /auth/register
```

Registration collects:

- Full name.
- Username.
- Email.
- Password.
- Confirm password.
- Role: `STUDENT`, `FACULTY`, or `ADMIN`.

The registration form validates matching passwords and requires passwords to be at least 6 characters.

### Protected Dashboard

The dashboard is available only when a token exists in `localStorage`. It includes:

- Sticky top navigation.
- Logout button.
- Notification icon.
- Quick action cards for courses, messages, events, and library.
- Recent activity list.
- Event list with create and delete actions.
- Lost-and-found section with lost/found tabs and a reporting form.
- Campus statistics for enrolled students, online users, events, and lost-and-found items.

### Events

The dashboard fetches, creates, and deletes events through the backend:

```text
GET /events
POST /events
DELETE /events/:id
```

Events use a title and description. New events are added to the visible list after a successful API response.

### Lost And Found

The dashboard fetches and reports lost/found items through:

```text
GET /lostfound
POST /lostfound
```

Lost-and-found items include:

- Type: `LOST` or `FOUND`.
- Title.
- Description.
- Location.
- Reporter information when returned by the backend.
- Created date when returned by the backend.

The UI filters items into Lost Items and Found Items tabs.

### Campus Stats

The dashboard fetches the enrolled student count from:

```text
GET /user/enrolled-count
```

It also displays counts for events and lost-and-found records from the currently loaded dashboard data.

## API Configuration

The Axios instance is defined in:

```text
src/api/axiosConfig.js
```

The API base URL is built from the `VITE_API_URL` environment variable:

```text
${import.meta.env.VITE_API_URL}/api
```

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:8080
```

With that value, frontend requests go to:

```text
http://localhost:8080/api
```

## Project Structure

```text
.
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── axiosConfig.js
│   ├── assets/
│   │   └── react.svg
│   ├── Components/
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Important Files

- `src/main.jsx` mounts the React app into the DOM.
- `src/App.jsx` defines all frontend routes.
- `src/Components/ProtectedRoute.jsx` protects authenticated pages.
- `src/api/axiosConfig.js` centralizes backend communication and token handling.
- `src/pages/LandingPage.jsx` contains the public homepage.
- `src/pages/Login.jsx` contains the sign-in flow.
- `src/pages/Register.jsx` contains the sign-up flow.
- `src/pages/Dashboard.jsx` contains events, lost-and-found, stats, and dashboard UI.
- `src/index.css` contains Tailwind imports and custom Campus Connect styles.
- `index.html` loads Bootstrap, Bootstrap Icons, Google Fonts, and the React entry script.

## Available Scripts

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Backend Requirements

This frontend expects a backend API that supports:

- User login.
- User registration.
- JWT or bearer-token authentication.
- Event listing, creation, and deletion.
- Lost-and-found listing and creation.
- Enrolled student count retrieval.

The frontend expects authenticated API calls to accept an `Authorization` header in this format:

```text
Authorization: Bearer <token>
```

## Notes

- The dashboard currently uses some static UI data for recent activities, quick actions, notification count, and online-user count.
- The backend URL must be configured with `VITE_API_URL`; otherwise API requests will not have a valid base URL.
- The project contains some older commented-out code in page files, but the active app logic is the React code exported from each component.
