# 📌 CodeVision-AI

An **AI-powered code review system** that analyzes code for errors, suggests optimizations, highlights performance bottlenecks, and provides alternative implementations with **better time complexity**. It also supports **Google Sign-In**, **chat history saving**, and an interactive **code editor**.

---

## 🚀 Features
- ✅ AI-powered **code correctness checks** and **error detection**  
- ✅ **Optimization suggestions** for better readability & maintainability  
- ✅ **Time Complexity Analysis** → suggests optimized code with **lower complexity** if possible  
- ✅ **Interactive Code Editor** with syntax highlighting  
- ✅ **Save & View Chat History**  
- ✅ **Google Sign-In Authentication**  
- ✅ **Modern UI** with beautiful CSS and hover effects  
- ✅ **Loading animations** while processing code submissions  

---

## 📂 Folder Structure  

```bash
CodeVision-AI/
│── backend/                 # Node.js + Express backend
│   ├── models/              # Database models (MongoDB)
│   │   ├── ChatHistory.js   # Schema for storing chat/code history
│   │   └── User.js          # Schema for authentication users
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes (Google login, JWT)
│   │   └── ChatHistory.js   # Routes for saving & fetching chat/code
│   ├── server.js            # Entry point for backend server
│   ├── config/              # Configurations (DB connection, JWT secret)
│   └── package.json         # Backend dependencies

│── frontend/                # React.js frontend
│   ├── src/                 
│   │   ├── components/      # Reusable UI components
│   │   │   ├── CodeEditor.jsx  # Code editor with AI review
│   │   │   ├── ChatHistory.jsx # Display saved chats
│   │   │   └── Navbar.jsx      # Navigation bar with buttons
│   │   ├── App.js           # Main React component
│   │   ├── index.js         # Entry point
│   │   └── styles/          # CSS styling
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies

│── README.md                # Documentation
│── .gitignore               # Ignore unnecessary files
```

---

## ⚙️ Project Flow  

1. **User Authentication**  
   - User logs in using **Google Sign-In**.  
   - JWT tokens are generated to secure API requests.  

2. **Code Submission**  
   - User writes code in the **Code Editor** and clicks **Submit**.  
   - A **loading animation** appears while the backend processes the request.  

3. **AI Review & Suggestions**  
   - Backend AI engine analyzes the code.  
   - Detects **syntax errors, performance issues, and bad practices**.  
   - Suggests **optimized code with lower time complexity (if possible)**.  

4. **Save Chat History**  
   - If the user clicks **Save Chat**, the reviewed code and AI suggestions are stored in **MongoDB**.  

5. **View Past Chats**  
   - User can view **previously saved reviews** from the **Chat History** section.  

---

## 🛠️ Tech Stack  

**Frontend:** React.js, Tailwind CSS, ShadCN/UI, Framer Motion  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Authentication:** Google Sign-In, JWT  
**Hosting:**  
- Frontend → [Vercel](https://code-vision-ai-n8q5.vercel.app/)  
- Backend → [Render](https://codevision-ai-8.onrender.com/)  

---

## 🔧 Installation & Setup  

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/CodeVision-AI.git
   cd CodeVision-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create `.env` in `backend/`:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

---

## 🌍 Live Demo  

- **Frontend (Vercel):** [CodeVision-AI Frontend](https://code-vision-ai-n8q5.vercel.app/)  
- **Backend (Render):** [CodeVision-AI Backend](https://codevision-ai-8.onrender.com/)  

---

## Screenshots
![Home Page](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Home.png)
![Login]([img/Login.png](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Login.png))
![Signup](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Signup.png)
![Code Editor](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Code_editor1.png)
![](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Review.png)
![](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/Review%20(2).png)
![](https://github.com/gauravjaiswal9/CodeVision-AI/blob/785413ac54db4312e0fca0f6a8945abecdd79511/img/History.png)

---

## 💡 Real-World Use Cases  
- Helps **developers learn better coding practices**  
- Acts as a **teaching assistant for students** learning Data Structures & Algorithms  
- Saves time for **companies** by detecting inefficient code before deployment  
- Encourages **performance-first mindset** by suggesting optimized solutions  

---

## ✨ Challenges Faced  
- Integration of **Google Sign-In** authentication  
- Handling **chat history persistence** with JWT security  
- Designing a **beautiful, responsive UI** with loading animations  

---

## 👨‍💻 Author  
**Gaurav Kumar Jaiswal**  
B.Tech ECE @ IIIT Nagpur | DSA & Full-Stack Developer  
