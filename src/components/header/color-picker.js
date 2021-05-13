import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Color from './color';

const Container = styled.div`
    display: ${props => props.display ? 'flex' : 'none'};
    padding: ${props => props.isModal ? '10px' : '5px 32px'};
    justify-content: space-between;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent !important;
`;

const ColorPicker = props => {
  const {appService, isModal = false } = props;

  /*window.addEventListener('click', function (e) {
    if (document.getElementById('color-picker-circle').contains(e.target)) {
      appService.toggleColorPicker(true);
      return;
    }
    if (!document.getElementById('color-picker').contains(e.target)) {
      appService.toggleColorPicker(false);
    }
  });*/
  
  return (
    <Container isModal={isModal} id={'color-picker-circle'} display={isModal || appService.showColorPicker}>
      <Color appService={appService} color={'#FFFFFF'} />
      <Color appService={appService} color={'#000000'} />
      <Color appService={appService} color={'#4C97E6'} />
      <Color appService={appService} color={'#82BD65'} />
      <Color appService={appService} color={'#F7CA74'} />
      <Color appService={appService} color={'#F1914D'} />
      <Color appService={appService} color={'#DE565B'} />
      <Color appService={appService} color={'#C22D67'} />
      <Color appService={appService} color={'#962BB0'} />
    </Container>
  );
};

export default observer(ColorPicker);
