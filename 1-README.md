# BlogSphere - Full-Stack MERN Blog Platform

A modern, feature-rich blogging platform built with MongoDB, Express.js, React.js, and Node.js. Features include user authentication with JWT, personal dashboards, CRUD operations, and a responsive Material-UI design.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based login and registration with bcrypt password hashing
- 👤 **Personal Dashboards**: Each user has their own isolated blog space
- ✍️ **CRUD Operations**: Create, read, update, and delete blog posts
- 🎨 **Modern UI**: Responsive design with Material-UI components
- ⚡ **Real-time Updates**: Instant feedback on all operations
- 🗄️ **NoSQL Database**: Scalable MongoDB with Mongoose ODM
- 🔒 **Password Security**: Industry-standard bcrypt hashing
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Backend
- Node.js - JavaScript runtime
- Express.js - Web application framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- JWT - JSON Web Tokens for authentication
- bcryptjs - Password hashing

### Frontend
- React.js - UI library
- Material-UI (MUI) - Component library
- Axios - HTTP client
- React Hooks - State management

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/downloads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/blogsphere.git
cd blogsphere
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (see `.env.example`):
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogDB
JWT_SECRET=your-super-secret-jwt-key-change-this
```

For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogDB
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Running the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

Browser opens automatically at `http://localhost:3000`

## 🔑 API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Blog Post Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all user's posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

## 📁 Project Structure

```
blogsphere/
├── server/           # Backend
│   ├── server.js     # Express server & API routes
│   ├── package.json  # Backend dependencies
│   └── .env.example  # Environment variables template
├── client/           # Frontend
│   ├── src/
│   │   ├── App.js    # Main React component
│   │   └── App.css   # Styles
│   └── package.json  # Frontend dependencies
├── .gitignore
└── README.md
```

## 🎯 Key Features Demonstrated

- Full-stack development with MERN architecture
- RESTful API design and implementation
- JWT authentication and authorization
- MongoDB document modeling
- React component lifecycle and hooks
- Responsive UI development
- Form validation and error handling
- Secure password hashing

## 🚀 Future Enhancements

- [ ] Rich text editor
- [ ] Image upload
- [ ] Comment system
- [ ] Post categories
- [ ] Search functionality
- [ ] User profiles

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React for the frontend library
- Material-UI for the component library

---

**Built with ❤️ using MERN Stack**