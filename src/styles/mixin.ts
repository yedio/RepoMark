import { css } from "styled-components";

export const scroll = css`
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    -webkit-overflow-scrolling: auto;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #9c9eb2;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

export const defaultBorder = css`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: #fff;
`;

export const defaultBtn = css`
  border-radius: 10px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.main};
  padding: 10px 30px;
  color: white;
`;
