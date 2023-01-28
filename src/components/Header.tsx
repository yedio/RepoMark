import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrap>
      <Logo>🍋</Logo>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 64px;
  background-color: navy;
`;

const Logo = styled.div`
  font-size: 30px;
`;
