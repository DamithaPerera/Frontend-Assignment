import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0069d9;
  }
`;

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
    return <StyledButton {...rest}>{label}</StyledButton>;
};
