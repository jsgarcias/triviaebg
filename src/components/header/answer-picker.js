import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Answer from './answer';
import { toJS } from 'mobx';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .25s ease;

    height: ${({ display }) => display ? '41px' : 0};
    padding: ${({ display }) => display ? '5px 32px' : 0};
    opacity: ${({ display }) => display ? 1 : 0};
    visibility: ${({ display }) => display ? 'visible' : 'hidden'};
`;

const AnswerPicker = props => {
  const { appService } = props;
  const [active, setActive] = useState(0);

  window.addEventListener('click', function (e) {
    if (document.getElementById('answer-picker-circle').contains(e.target)) {
      appService.toggleAnswerPicker(true);
      return;
    }
    if (!document.getElementById('answer-picker').contains(e.target)) {
      appService.toggleAnswerPicker(false);
    }
  });

  useEffect(() => {
    const gameSettings = toJS(appService.game_settings);
    const { answers } = gameSettings;

    setActive(answers.length);
  }, [appService.game_settings]);

  return (
    <Container id={'answer-picker-circle'} display={appService.showAnswerPicker}>
      {[...new Array(6)].map((data, index) => {
        const countIndex = index + 1;
        return <Answer appService={appService} count={countIndex} isActive={active === countIndex} setActive={setActive} />
      })}
    </Container>
  );
};

export default observer(AnswerPicker);
