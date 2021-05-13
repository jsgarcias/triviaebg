import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { backgroundColors } from "../../../store/AppService"
const Container = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 22px;
    border: 1.5px solid white;
    background: ${props => props.color};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;

const GradientPicker = props => {
  const { appService } = props;

  const setBgColor = () => {
    if (appService.backgroundColor) {
      const nextIndex = backgroundColors.findIndex(value => appService.backgroundColor === value) + 1;
      return backgroundColors[nextIndex === 13 ? 0 : nextIndex];
    } else {
      return 'linear-gradient(180deg, #33CCFF 0%, #3366FF 100%)';
    }
  }

  return <Container
    onClick={() => appService.changeTheme()}
    color={setBgColor()} />;
};

export default observer(GradientPicker);
