# SportNest

SportNest is a sports facility discovery and booking platform built with Next.js. Users can explore venues, view facility details, make reservations, and manage their bookings from one place.

## Features

- Browse football turfs, tennis courts, swimming pools, basketball arenas, badminton courts, and cricket grounds
- Search and filter available facilities
- View facility details, pricing, location, and availability
- Create and manage sports facility bookings
- Track booking status from the bookings dashboard
- Register and sign in with email/password
- Optional Google sign-in through Better Auth
- Responsive interface for desktop and mobile screens

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Tailwind CSS
- Better Auth
- MongoDB
- Axios
- Lucide React

## Project Structure

```text
src/
|-- app/              # Routes and page components
|   |-- add/           # Add a facility
|   |-- bookings/      # Booking dashboard
|   |-- facilities/    # Facility listing and details
|   |-- login/         # Sign in
|   |-- manage/        # Facility management
|   `-- register/      # Account registration
|-- components/       # Shared UI components
|-- data/              # Local application data
`-- lib/               # Authentication configuration and client
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB database for authentication

## Getting Started

1. Clone the repository and enter the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   MONGODB_URI=mongodb://localhost:27017/sportnest
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are optional. Omit them if Google sign-in is not enabled.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## API

Facility and booking pages currently communicate with the SportNest server API hosted at `https://sport-nest-server-a4sz.vercel.app`. If you use a different backend, update the API URLs in the relevant pages under `src/app/`.

## Deployment

The application can be deployed to Vercel or another Node.js hosting provider. Configure the environment variables in the hosting provider before building, then run:

```bash
npm run build
npm start
```
