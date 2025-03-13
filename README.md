---

# **📌 AI-Powered Code Review System**  

🚀 **AI-Powered Code Review System** is a **full-stack web application** that allows users to submit their code, receive **automated feedback** using **Gemini AI**, and save/retrieve code review history. It features **user authentication, chat history management, and a modern UI** for seamless interaction.  

---

## **📜 Features**  

✅ **🔑 User Authentication** – Secure login & signup with JWT and Google OAuth.  
✅ **📝 AI-Powered Code Review** – Automated syntax & logic analysis using **Gemini AI API**.  
✅ **💾 Save & Retrieve Code History** – Stores past code reviews in **MongoDB**.  
✅ **📡 REST API Integration** – Endpoints to manage code reviews & user authentication.  
✅ **🎨 Modern UI** – Built with **React.js + Tailwind CSS**.  
✅ **🛡 Secure Backend** – Express.js API with JWT-based authentication.  

---

## **⚙️ Tech Stack**  

### **Frontend (React.js + Tailwind CSS)**  
- React.js  
- Tailwind CSS  
- Axios  
- React Router  

### **Backend (Node.js + Express.js + MongoDB)**  
- Node.js  
- Express.js  
- Mongoose (MongoDB ORM)  
- JWT for authentication  
- Dotenv for environment variables  

### **AI Integration**  
- Gemini AI API for **code analysis & feedback**  

---

## **📌 Project Flow**  

1️⃣ **User Authentication:** JWT-based login/signup.  
2️⃣ **Code Submission:** Users submit code via the **React.js UI**.  
3️⃣ **AI Analysis:** Backend forwards code to **Gemini AI**, which returns **feedback**.  
4️⃣ **Review Display:** Feedback is displayed in the UI.  
5️⃣ **Saving History:** Users can **save their reviewed code** in MongoDB.  
6️⃣ **Retrieving History:** Users can access **past reviews** anytime.  

---

## **📁 Folder Structure**  

```plaintext
📦 ai-code-review
├── 📂 backend
│   ├── 📂 models         # Mongoose schemas
│   ├── 📂 routes         # Express.js API routes
│   ├── 📂 controllers    # API logic
│   ├── 📄 server.js      # Main backend server
│   ├── 📄 .env           # Environment variables
│   ├── 📄 package.json   # Backend dependencies
│
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 components  # React components
│   │   ├── 📂 pages       # Page views
│   │   ├── 📂 utils       # Helper functions
│   │   ├── 📄 App.js      # Main React app
│   │   ├── 📄 index.js    # React entry point
│   │   ├── 📄 styles.css  # Tailwind styling
│   │
│   ├── 📄 package.json    # Frontend dependencies
│   ├── 📄 .env            # Environment variables
│   ├── 📄 README.md       # Documentation
│
├── 📄 README.md           # Main project documentation
```

---

## **🚀 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/yourusername/ai-code-review.git
cd ai-code-review
```

### **2️⃣ Backend Setup**  

```sh
cd backend
npm install  # Install dependencies
```

- **Create a `.env` file** in the `backend` folder and add:  
```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

- **Start the backend server:**  
```sh
npm start
```

---

### **3️⃣ Frontend Setup**  

```sh
cd frontend
npm install  # Install dependencies
```

- **Create a `.env` file** in the `frontend` folder and add:  
```plaintext
VITE_API_URL=http://localhost:5000
```

- **Start the frontend:**  
```sh
npm run dev
```

---

## **🛠 API Endpoints**  

| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/auth/signup` | Register a new user |
| **POST** | `/api/auth/login` | User login |
| **POST** | `/api/code/review` | Submit code for AI analysis |
| **POST** | `/api/chat-history` | Save code review |
| **GET** | `/api/chat-history` | Retrieve saved reviews |

---

## **🔹 Screenshots**  

### **1️⃣ Home Page & Code Editor**  
![Code Editor](https://via.placeholder.com/600x300)  

### **2️⃣ AI Review & Feedback**  
![AI Feedback](https://via.placeholder.com/600x300)  

---

## **🤝 Contribution Guide**  

👥 **Want to contribute?** Follow these steps:  

1️⃣ **Fork the repository**  
2️⃣ **Create a new branch**  
```sh
git checkout -b feature-branch
```
3️⃣ **Make changes & commit**  
```sh
git add .
git commit -m "Added new feature"
```
4️⃣ **Push & create a PR**  
```sh
git push origin feature-branch
```
✅ **Submit a Pull Request for review**  

---
