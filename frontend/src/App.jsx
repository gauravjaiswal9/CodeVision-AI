import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import CodeEditor from './components/CodeEditor';
import ChatHistory from "./components/ChatHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/history" element={<ChatHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
