import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Logo onClick={() => navigate("/")}>🍋</Logo>
      <NavWrap>
        <NavList onClick={() => navigate("/repository?keyword=&")}>
          Repository
        </NavList>
        <NavList onClick={() => navigate("/issue")}>Issue</NavList>
      </NavWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 30px;
  height: 64px;
  background-color: navy;
`;

const Logo = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const NavWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavList = styled.div`
  font-size: 16px;
  color: white;
  cursor: pointer;
`;
