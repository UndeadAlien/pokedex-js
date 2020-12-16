import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

export const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    transition: all .3s cubic-bezier(0.25, 0.8, 0.25, 1);

    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;


    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

`;

export const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 25%);
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 3em;
`;

export const LoadMoreButton = styled.button`
    background-color: #ef5350;
    color: white;
    font-weight: bold;

    &:hover {
        background: transparent;
        color: black;
    }
`;

export const ShowLessButton = styled.button`
    background-color: #fff;
    color: black;
    font-weight: bold;

    &:hover {
        background: #ef5350;
        color: white;
    }
`;