import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import Editor from "@monaco-editor/react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CodeEditor = () => {
  const { roomId, username } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.name === username);
      if (!userExists) {
        return [...prevUsers, { id: username, name: username }];
      }
      return prevUsers;
    });
  }, [username]);

  const confirmLeave = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.name !== username)
    );
    navigate("/");
  };

  const copyRoomID = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      toast.error("Failed to copy room ID", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 flex">
      <Toaster />
      <div className="left-sidebar w-80 grid grid-rows-[15%_70%_15%] px-8 py-6 h-full bg-zinc-800 shadow-lg">
        <div className="header flex flex-col items-center justify-center mt-4 text-center select-none">
          <h2 className="text-3xl font-bold font-mono text-green-500 shadow-lg">
            Devlink IDE
          </h2>
          <p className="pt-2 text-sm text-gray-300 font-mono">
            Real-time code editor
          </p>
        </div>

        <div
          className="user-list grid grid-cols-2 gap-x-2 gap-y-4 items-center py-4 rounded-md overflow-auto"
          style={{ maxHeight: "300px" }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-center gap-3 p-2 rounded-lg"
            >
              <Avatar name={user.name} round={true} size="40" />
              <p className="text-sm font-mono text-gray-300">{user.name}</p>
            </div>
          ))}
        </div>

        <div className="controls justify-center items-center text-gray-400 text-xs flex flex-col gap-3">
          <button
            className="w-full h-auto py-4 bg-green-600 text-white rounded-lg text-sm font-sans 
                     transition-all duration-300 ease-in-out
                     hover:bg-green-700 hover:shadow-lg hover:scale-[1.02]
                     active:scale-[0.98]"
            onClick={copyRoomID}
          >
            Copy Room ID
          </button>
          <button
            className="w-full h-auto py-4 bg-red-500 text-white rounded-lg text-sm font-sans
                     font-bold
                     transition-all duration-300 ease-in-out
                     hover:bg-red-600 hover:shadow-lg hover:scale-[1.02]
                     active:scale-[0.98]"
            onClick={() => setShowLeaveModal(true)}
          >
            Leave
          </button>
        </div>
      </div>

      <div className="right w-full h-full p-6 bg-zinc-900">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Start Writing Here"
          className="rounded-md border border-zinc-700 shadow-inner"
        />
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-white">
              Leave Room?
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Are you sure you want to leave the room?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md 
                           hover:bg-red-600 transition duration-200"
                onClick={confirmLeave}
              >
                Yes, Leave
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md 
                           hover:bg-gray-600 transition duration-200"
                onClick={() => setShowLeaveModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
