import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <Wrap>
      <Logo onClick={() => navigate("/")}>🍋</Logo>
      <NavWrap>
        <NavList
          className={path === "/repository" ? "on" : ""}
          onClick={() => navigate("/repository?keyword=&")}
        >
          Repository
        </NavList>
        <NavList
          className={path === "/issues" ? "on" : ""}
          onClick={() => navigate("/issues")}
        >
          Issues
        </NavList>
      </NavWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  width: 100vw;
  padding: 10px 10px 10px 50px;
  gap: 30px;
  height: 64px;
  background-color: #fff;
  box-shadow: rgb(146 153 184 / 6%) 0px 2px 30px;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const NavWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavList = styled.div`
  font-size: 15.5px;
  font-weight: 500;
  color: #5a5f7d;
  cursor: pointer;

  &.on {
    color: ${({ theme }) => theme.main};
  }
`;
