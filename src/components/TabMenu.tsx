import React from "react";
import styled from "styled-components";

interface Props {
  title: string[];
  clickedMenu: string;
  changeMenu: (type: string) => void;
}

export default function TabMenu({ title, clickedMenu, changeMenu }: Props) {
  return (
    <Wrapper menuLength={title.length}>
      {title.map((title: string, idx: number) => (
        <li
          key={idx}
          onClick={() => changeMenu(title)}
          className={clickedMenu === title ? "active" : ""}
        >
          <TabLink className={clickedMenu === title ? "active" : ""}>
            {title}
          </TabLink>
        </li>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.ul<{ menuLength: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 10px;

  @media (max-width: 720px) {
    flex-direction: column;
  }

  li {
    width: ${(props) => (100 / props.menuLength).toString() + "%"};
    @media (max-width: 720px) {
      width: 100%;
    }
    &.active {
      cursor: default;
      pointer-events: none;
    }
  }
`;

const TabLink = styled.a`
  display: block;
  padding: 5px 20px 6px;
  width: 100%;
  color: ${({ theme }) => theme.subColor};
  border-radius: 10px;
  text-align: center;
  line-height: 1.4;
  word-break: break-all;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
    color: #333;
    transition: all 0.3s ease;
  }

  &.active {
    color: #fff;
    background: ${({ theme }) => theme.main};
    transition: all 0.3s ease;
  }
`;
