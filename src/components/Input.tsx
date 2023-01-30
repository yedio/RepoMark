import React from "react";
import styled from "styled-components";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressEvent?: () => void;
  width?: string;
  height?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export default function Input({
  width = "100%",
  height = "44px",
  type = "text",
  value,
  onChange,
  onKeyPressEvent = function () {},
  placeholder = "",
  disabled,
  error,
}: Props) {
  return (
    <CustomInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={(e) => e.key === "Enter" && onKeyPressEvent()}
      value={value}
      disabled={disabled ? disabled : false}
      className={error ? "error" : ""}
      width={width}
      height={height}
    />
  );
}

const CustomInput = styled.input<{ width?: string; height?: string }>`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  cursor: text;

  &::placeholder {
    color: ${({ theme }) => theme.subLight};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.inputBorderFocus};
  }

  &.error {
    border: 1px solid #e53535;
  }
`;
