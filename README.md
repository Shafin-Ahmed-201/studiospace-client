# StudioSpace – Creative Studio Booking Platform

StudioSpace is a peer-to-peer creative workspace and production studio-sharing platform where users can discover, list, and book creative spaces for different purposes. Whether someone needs a photography studio, podcast room, music suite, sound stage, or art workshop, StudioSpace makes finding and booking the right space easier.

The platform connects studio owners with creators through a simple and user-friendly booking experience.

## ✨ Key Features

### 🏠 Studio Discovery
- Browse all available creative studios.
- Explore studios by category.
- View featured studios on the homepage.
- Check studio details, images, location, and amenities.
- View hourly rates, security deposits, and maximum capacity.

### 🔐 Authentication
- Secure user authentication with Better Auth.
- Sign up and sign in functionality.
- Protected routes for authenticated users.
- User-specific studio listings and bookings.

### ➕ Studio Management
- Add new studios with detailed information.
- Update existing studio information.
- Manage personal studio listings.
- Remove listed studios.
- Store studio information in MongoDB.

### 📅 Booking System
- Book studios by selecting a date and time.
- Specify the number of guests.
- Add optional booking notes.
- Automatically calculate booking duration and estimated price.
- Display security deposits separately.
- Validate booking information before submission.
- Prevent overlapping bookings for the same studio and time slot.

### 📋 Booking Management
- View personal booking history.
- Check booking details and status.
- Manage bookings through a dedicated page.

### 🎨 User Experience
- Responsive design for desktop, tablet, and mobile.
- Modern interface built with Tailwind CSS and shadcn/ui.
- Loading skeletons and empty states.
- Toast notifications for important actions.
- Custom error and not-found handling.

## 🛠️ Technologies Used

**Frontend**
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- REST API

**Authentication**
- Better Auth

**Development Tools**
- Git
- GitHub
- VS Code
- Postman

## 📂 Project Structure

```text
StudioSpace/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   └── package.json
│
└── server/
    ├── index.js
    ├── package.json
    └── .env
```

*Note: Adjust the folder names above to match your actual repository structure.*

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd StudioSpace
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Configure frontend environment variables

Create a `.env.local` file in the frontend root directory:

```env
API_URL=https://studiospace-client-alpha-x15.vercel.app/
NEXT_PUBLIC_API_URL=https://studiospace-server-puce.vercel.app/
```

Add your Better Auth and database-related environment variables according to your authentication configuration.

### 5. Start the frontend

```bash
npm run dev
```

Frontend will run at:

```text
https://studiospace-client-alpha-x15.vercel.app/
```

### 6. Start the backend

Open another terminal:

```bash
cd server
npm install
```

Configure your backend `.env` file with your MongoDB connection string and other required environment variables.

Start the backend:

```bash
npm run dev
```

Backend will run at:

```text
https://studiospace-server-puce.vercel.app/
```

## 🗄️ Database

StudioSpace uses MongoDB to store application data.

Main collections include:

- `studios` – Studio information, pricing, location, and amenities.
- `bookings` – Booking details, customer information, pricing, and booking status.
- Better Auth database collections – Authentication and session-related data.

## 🎯 Studio Categories

Users can explore creative spaces across different categories:

- Photo Studios
- Sound Stages
- Podcast Rooms
- Music Suites
- Art Workshops

## 🔮 Future Improvements

- Online payment integration.
- Advanced studio search and filtering.
- Studio ratings and reviews.
- Availability calendar for studio owners.
- Email notifications for booking updates.
- Admin dashboard and analytics.
- Real-time booking status updates.

## 👨‍💻 Author

**Shafin Ahmed**

Full Stack Developer

- GitHub: YOUR_GITHUB_PROFILE_URL
- LinkedIn: YOUR_LINKEDIN_PROFILE_URL

---

⭐ If you find this project interesting, consider giving it a star on GitHub!

**StudioSpace – Find Your Space. Create Your Vision.**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
