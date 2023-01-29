import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

export default function MenuTitle({ title }: Props) {
  return <Wrap>{title}</Wrap>;
}

const Wrap = styled.h1`
  padding: 40px 0px;
  font-size: 20px;
  font-weight: 500;
`;
