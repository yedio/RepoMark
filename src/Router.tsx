import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repository" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}
