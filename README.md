
# FolioFlip

FolioFlip is a customizable portfolio-building platform that allows users to create, purchase, and manage multiple portfolios. Each portfolio provides detailed sections, including About, Experience, Skills, and Projects, making it easy for users to showcase their work, skills, and experiences in a personalized way.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:** Secure login and registration
- **Multiple Portfolios:** Users can create and purchase multiple, fully customizable portfolios
- **Modular Sections:** Each portfolio contains sections like About, Experience, Skills, and Projects, stored in separate schemas
- **Responsive Design:** Optimized for both desktop and mobile users
- **Data Security:** Uses httpOnly cookies for token storage to enhance security
- **Encryption:** Token data secured using encryption techniques

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Libraries:** Mongoose, JSON Web Token (JWT), bcrypt
- **Tools:** Git, npm, Webpack

## Getting Started
### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (local or Atlas)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FolioFlip.git
   cd FolioFlip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=your_preferred_port
     ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   Your application should now be running at `http://localhost:PORT`.

## Usage
- **Creating a Portfolio:** After registering or logging in, navigate to the portfolio creation page, where you can add your personalized information.
- **Managing Sections:** Each portfolio comes with configurable sections that can be updated at any time.

## API Documentation
Here is a quick overview of the main API endpoints:
- `POST /auth/register` - Signup a new user
- `POST /auth/login` - Login user and receive token

## Project Structure
```plaintext
FolioFlip/
├── src/                   # Backend files
│   ├── models/               # Database schemas for sections
│   ├── routes/               # API routes
│   ├── controllers/          # Route handlers
│   └── utils/                # Utility functions (e.g., encryption)
├── .env                      # Environment variables
├── .gitignore                # Files to ignore in Git
├── README.md
└── package.json
```

## Contributing
We welcome contributions to improve FolioFlip! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add a new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy building with **FolioFlip**! If you have any issues or suggestions, please feel free to raise them in the issues section or reach out directly.
