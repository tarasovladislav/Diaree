
# Diaree

Diaree is a simple journaling logging app designed to help users log events based on dates. Users can easily record their daily experiences and have the flexibility to delete entries as needed.



## Key Features

- Diaree allows users to log events seamlessly. Whether it's a memorable moment, a thought, or a significant happening, users can document it for future reference.
- Users can view their entries organized by date, providing a chronological overview of their journaling journey.
- Diaree provides the option to delete entries, giving users control over their recorded content. This feature ensures flexibility and privacy.



## Tech Stack
The tech stack utilised to create this app was as follows:

**Client:** React with Vite

**Server:** Node.js, Express, MongoDB with Mongoose


## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Make sure the MongoDB server is running)

### Clone the Repository

```bash
git clone https://github.com/tarasovladislav/Diaree
cd diaree

cd server
npm install

cd client
npm install
```
## Run Locally

In the ```server``` directory, start the Node.js server.

```bash
  node index.js
```

The backend server will run on http://localhost:3000

In the ```client``` directory, start the React app.

```bash
  npm run dev
```

If you want to use the cloudinary image upload, you have to create a cloudinary account and fill in the .env file in the server directory: CLOUDINARY_CLOUD_NAME=xxx CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=xxx

## Feedback

If you have any feedback, please reach out to us.


## Authors

- [@tarasovladislav](https://github.com/tarasovladislav)
- [@emiratee](https://github.com/emiratee)
- [@AaishaR](https://github.com/AaishaR)

