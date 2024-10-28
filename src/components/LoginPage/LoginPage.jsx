import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    if (roomId == "") {
      toast.error("Please enter the Room id", {
        position: "top-right",
      });
    } else if (username == "") {
      toast.error("Please enter the username", {
        position: "top-right",
      });
    } else {
      navigate(`/editor/${id}/${username}`);
      toast.error("Successfully joined the room", {
        position: "top-right",
      });
    }
  };

  const createRoom = () => {
    const roomId = uuidv4();
    setId(roomId);
    toast.success("Room created successfully!", {
      position: "top-right",
      duration: 3000,
      style: {
        background: "#fff",
        color: "#333",
      },
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center relative">
      <Toaster />

      {/* Mobile Warning */}
      <div className="sm:hidden w-full h-screen flex items-center justify-center flex-col p-10">
        <h1 className="p-10 text-4xl font-bold text-red-500 animate-bounce">
          Please switch to a desktop device
        </h1>
        <h5 className="text-gray-400 text-sm font-mono w-full absolute bottom-5 flex items-center justify-center">
          Created by&nbsp;
          <a
            href="https://github.com/TheSoumenMondal"
            className="underline text-indigo-500 hover:text-indigo-400 transition duration-300"
          >
            Soumen
          </a>
          &nbsp; with 💛
        </h5>
      </div>

      {/* Desktop Login Form */}
      <div className="hidden lg:flex lg:w-full lg:h-screen items-center justify-center">
        <div className="loginForm w-[36%] h-[70%] bg-gray-800 rounded-lg p-8 shadow-lg shadow-gray-700">
          <h3 className="pt-4 text-3xl text-white font-semibold mb-4 ">
            Welcome
          </h3>
          <p className="text-gray-400 mb-8">
            Please enter a valid room ID and username
          </p>
          <div className="roomId mb-4">
            <label htmlFor="roomId" className="block text-gray-300 mb-2">
              Room ID:
            </label>
            <input
              onChange={(e) => {
                setId(e.target.value);
              }}
              type="text"
              id="roomId"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 h-12 px-4 text-white focus:ring-2 focus:ring-indigo-600 transition duration-300 hover:border-indigo-600"
              placeholder="Enter room ID"
              value={id}
            />
          </div>
          <div className="Username mb-8">
            <label htmlFor="username" className="block text-gray-300 mb-2">
              Username:
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 h-12 px-4 text-white focus:ring-2 focus:ring-indigo-600 transition duration-300 hover:border-indigo-600"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={joinRoom}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-105 shadow-md"
            >
              Join Room
            </button>
            <button
              onClick={createRoom}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105 shadow-md"
            >
              Create a new Room
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full absolute bottom-5 flex items-center justify-center space-x-2">
        <h5 className="font-bold text-gray-400 text-sm font-mono flex items-center space-x-1">
          <span>Created by</span>
          <a
            href="https://github.com/TheSoumenMondal"
            className="text-white transition duration-300 flex items-center space-x-1"
          >
            <FaGithub className="text-xl" />
            <span>&nbsp;Soumen</span>
          </a>
          <span>with 💛</span>
        </h5>
      </footer>
    </div>
  );
};

export default LoginPage;
