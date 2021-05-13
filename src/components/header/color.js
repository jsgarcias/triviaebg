import React, { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 28px;
    border: 1.5px solid white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${props => props.color};
    transition: all .2s ease-in-out;

    &:hover {
       transform: scale(1.1);  
    }
`;

const Color = ({ color, appService }) => {  
  const choose = (color) => {
    return () => {
      appService.onSetValue('textColor', color);
     //  appService.toggleColorPicker();
    };
  };
  
  return <Container onClick={choose(color)} color={color} />;
};

export default Color;
