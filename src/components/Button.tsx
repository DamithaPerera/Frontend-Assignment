import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

// Update button styles to use custom colors and center text
const StyledButton = styled.button`
    padding: 12px 24px;
    border: none;
    background-color: #0056b3; /* Updated background color */
    color: #fff; /* Updated button text color */
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: bold;
    &:hover {
        background-color: #004494;
    }
`;

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
    return <StyledButton {...rest}>{label}</StyledButton>;
};
