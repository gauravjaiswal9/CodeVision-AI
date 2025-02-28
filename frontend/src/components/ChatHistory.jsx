import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatHistory = () => {
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistories = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/chat-history", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setHistories(data.histories);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch chat histories");
      }
    };
    

    fetchHistories();
  }, []);

  const openHistory = (id) => {
    // Redirect to editor with historyId query parameter
    navigate(`/editor?historyId=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Chat History</h2>
      {histories.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {histories.map((history) => (
            <li 
              key={history._id} 
              className="bg-gray-800 p-4 rounded-lg mb-2 cursor-pointer hover:bg-gray-700"
              onClick={() => openHistory(history._id)}
            >
              <p className="font-bold">Chat on {new Date(history.createdAt).toLocaleString()}</p>
              <p className="truncate">{history.code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
