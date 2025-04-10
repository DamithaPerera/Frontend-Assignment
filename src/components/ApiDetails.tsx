import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ApiDetail } from '../types/api';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #2c5877;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    font-family: 'Helvetica Neue', 'Segoe UI', sans-serif;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    justify-content: center;
`;

const Logo = styled.img`
    height: 80px;
    object-fit: contain;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 400;
    margin: 0;
`;

const Content = styled.div`
    max-width: 700px;
    width: 100%;
    text-align: left;
`;

const Section = styled.div`
    margin-bottom: 28px;
`;

const Label = styled.div`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 6px;
`;

const Value = styled.div`
    font-size: 16px;
    font-weight: 300;
    color: #e4e4e4;
    word-break: break-word;
`;

const Button = styled.button`
    margin-top: 32px;
    padding: 12px 28px;
    font-size: 16px;
    background-color: #00aef1;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-family: 'Helvetica Neue', 'Segoe UI', sans-serif;

    &:hover {
        background-color: #0095cb;
    }
`;

export const ApiDetails: React.FC = () => {
    const location = useLocation();
    const api = (location.state as { api: ApiDetail })?.api;

    if (!api) {
        return <Wrapper>No API selected</Wrapper>;
    }

    return (
        <Wrapper>
            <Header>
                {api.logo && <Logo src={api.logo} alt="logo" />}
                <Title>{api.name}</Title>
            </Header>

            <Content>
                {api.description && (
                    <Section>
                        <Label>Description</Label>
                        <Value>{api.description}</Value>
                    </Section>
                )}

                {api.swaggerUrl && (
                    <Section>
                        <Label>Swagger</Label>
                        <Value>{api.swaggerUrl}</Value>
                    </Section>
                )}

                {(api.contact?.email || api.contact?.name || api.contact?.url) && (
                    <Section>
                        <Label>Contact</Label>
                        <Value>
                            {api.contact.email && <div><strong>Email</strong> {api.contact.email}</div>}
                            {api.contact.name && <div><strong>Name</strong> {api.contact.name}</div>}
                            {api.contact.url && <div><strong>Url</strong> {api.contact.url}</div>}
                        </Value>
                    </Section>
                )}
            </Content>

            <Button onClick={() => window.history.back()}>Explore more APIs</Button>
        </Wrapper>
    );
};