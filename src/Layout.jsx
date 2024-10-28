import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import CodeEditor from "./components/CodeEditor/CodeEditor";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/editor/:roomId/:username" element={<CodeEditor />} />
    </Routes>
  );
};

export default Layout;
