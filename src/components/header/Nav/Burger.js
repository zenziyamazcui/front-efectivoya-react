import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RigthNav';
import {colors} from '../../../styles/colors'

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  right: 20px;
  top : 1.5rem;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 1.5rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? colors[3] : colors[3] };
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(51deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'rotate(-51deg)' : 'rotate(0)'};

    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open}/>
    </>
  )
}

export default Burger