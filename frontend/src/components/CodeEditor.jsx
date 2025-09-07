import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query parameters if present and store it
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }
  }, [location]);

  // Load history if historyId is present in the query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const historyId = params.get("historyId");
    if (historyId) {
      const fetchHistory = async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`http://localhost:5000/api/chat-history/${historyId}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (data.success) {
            setCode(data.history.code);
            setReview(data.history.review);
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error(err);
          alert("Failed to load history");
        }
      };
      fetchHistory();
    }
  }, [location]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/code/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        setReview(data.review);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Code submission error:", error);
      alert("Failed to submit code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChat = async () => {
    if (!code || !review) {
      alert("Nothing to save. Please submit your code first.");
      return;
    }
    const token = localStorage.getItem("token");
    console.log("Saving chat with token:", token);
    try {
      const res = await fetch("http://localhost:5000/api/chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ code, review }),
      });
      console.log("Response status:", res.status);
      // Read the response as text first to see what is returned
      const textResponse = await res.text();
      console.log("Text response:", textResponse);
  
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        alert("Error parsing server response.");
        return;
      }
      console.log("Parsed response:", data);
      if (data.success) {
        alert("Chat saved successfully.");
      } else {
        alert("Error saving chat: " + data.message);
      }
    } catch (error) {
      console.error("Error saving chat:", error);
      alert("Error saving chat.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-gray-800 shadow">
        <h2 className="text-2xl font-semibold">Code Editor</h2>
        <div>
          <button
            onClick={() => navigate("/history")}
            className="mr-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition"
          >
            History
          </button>
          <button
            onClick={handleSaveChat}
            className="mr-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition"
          >
            Save Chat
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Full Screen Panels */}
      <main className="flex flex-1">
        {/* Left Panel: Code Input */}
        <div className="w-1/2 p-8 flex flex-col">
          <textarea
            className="w-full h-[500px] overflow-y-auto p-4 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Code"
            )}
          </button>
        </div>

        {/* Right Panel: Code Review */}
        <div className="w-1/2 p-8 flex flex-col">
          <div className="bg-gray-800 border border-gray-700 rounded-md p-4 h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <p className="text-lg">Loading review...</p>
              </div>
            ) : review ? (
              <pre className="whitespace-pre-wrap break-words text-sm font-mono">
                {review}
              </pre>
            ) : (
              <p className="text-gray-400">Response will appear here...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeEditor;
