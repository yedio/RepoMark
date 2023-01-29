import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Issues from "./pages/Issues";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

const DefaultLayout = styled.div`
  padding: 64px 10vw;

  @media (max-width: 860px) {
    padding: 64px 3vw;
  }
`;
