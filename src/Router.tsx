import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Issues from "./pages/Issues";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </BrowserRouter>
  );
}
