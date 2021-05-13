import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { themes } from '../../constants';
import Trophy from '../../assets/svg/trophy.svg';

const modalProps = {
  'Theme 8': {
    bgColor: '#FF7200',
    textColor: '#FFFFFF'
  },
  'Theme 9': {
    bgColor: '#151313',
    textColor: '#FFFFFF'
  },
  'Theme 10': {
    bgColor: '#FD6592',
    textColor: '#FFFFFF'
  },
  'Theme 11': {
    bgColor: '#FEE689',
    textColor: '#905100'
  },
  'Theme 12': {
    bgColor: '#00D885',
    textColor: '#FFFFFF'
  },
  'Theme 13': {
    bgColor: '#000000',
    textColor: '#FFFFFF'
  }
};

const ModalContainer = styled.div`
  ${props => props.hide ? 'display: none' : 'display: flex'}
  overflow: hidden;
  background: rgba(0,0,0,0.40);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  position: fixed;
  transform: translateZ(1px);
  -webkit-transform: translateZ(1px);
  -webkit-transform-style: preserve-3d;
`;

const MessageContainer = styled.div`
  ${props => props.background ? `background: ${props.background};` : `background: #ffffff;`}
  width: 350px;
  padding: 25px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  margin: 0 25px;
`;

const ModalBody = styled.div`
`;

const Message = styled.p`
  ${props => props.color ? `color: ${props.color};` : 'color: #626262;'}
  text-align: center;
  letter-spacing: -0.2px; 
  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 36px;
  margin-top: 10px;
`;

const ModalButtons = styled.button`
  ${props => props.color ? `color: ${props.color}` : 'color: #ffffff'}
  ${props => props.linearGradient ? `background-image: ${props.linearGradient};` : 'background-image: linear-gradient(to bottom, #2299f8, #1769aa);'}
  ${props => props.border ? `border: 1px solid ${props.border}` : `border: 1px solid ${props.background}`}
  ${props => props.background ? `background: ${props.background}` : `background: transparent`}
  outline: none!important;
  width: 239px;
  height: 61px;
  margin: 2px 2px 12px;
  text-transform: uppercase;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.5px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Poppins;
`;

const AnimatedStarsImg = styled.img`
  position: absolute;
  ${props => props.left ? `left: ${props.left}px;` : ''}
  ${props => props.top ? `top: ${props.top}px;` : ''}
  ${props => props.size ? `height: ${props.size}px; width: ${props.size}` : ''}
`;

const Modal = props => {
  const { appService, show, resetModal, message, type, revealAnswers, finished } = props;
  const { label, index } = appService.theme;
  const [animatedStars, setAnimatedStars] = useState([]);

  const handleClick = key => () => {
    if (key === 'success') return revealAnswers(false);
    if (key === 'continue') return resetModal();
    revealAnswers(true);
  }

  const renderMessage = () => {
    if(Array.isArray(message)) {
      return <div className="message-header">
        <p style={{marginBottom: 11}}>{message[0]}</p>
        <p style={{fontSize: 18, lineHeight: '24px', margin: 0, fontWeight: 'normal', whiteSpace: 'pre'}}>{message[1]}</p>
      </div>
    }
    return message;
  }

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      stars.push({
        size: Math.floor(Math.random() * 24 + 8),
        left: Math.floor(Math.random() * 120),
        top: Math.floor(Math.random() * 120),
      });
    }

    setAnimatedStars(stars);
  }, [finished]);

  return (
    <ModalContainer hide={!show}>
      <MessageContainer background={themes[index].backgroundColor}>
        {finished ? <React.Fragment>
            <div className="circle">
              <Trophy className="trophy-svg glow" />
              <div className="stars-container" style={{position: 'absolute', height: 'inherit', width: 'inherit'}}>
                {animatedStars.map(animatedStar => {
                  return (
                    <AnimatedStarsImg
                      src={require('../../assets/svg/win-star.svg')}
                      left={animatedStar.left}
                      top={animatedStar.top}
                    />
                  )
                })}
              </div>
            </div>
            <div className="bg-circle" />
            <div className="bg-circle-2" />
          </React.Fragment>
        : <React.Fragment />}
        <ModalBody>
          <Message color={appService.textColor}>
            {renderMessage()}
          </Message>
          {type !== 'error' && (
            <>
              {!finished ?
                <React.Fragment>
                  <ModalButtons
                    onClick={handleClick('continue')}
                    border={themes[index].inputBorder}
                    color={themes[index].inputTextColor}>
                    Keep Guessing
              </ModalButtons>
                  <ModalButtons
                    onClick={handleClick('showAll')}
                    color={(modalProps[label] || {}).textColor || themes[index].buttonTextColor}
                    background={(modalProps[label] || {}).bgColor || themes[index].buttonBgColor}>
                    See Answers
              </ModalButtons>
                </React.Fragment>
                : <ModalButtons
                  onClick={handleClick('success')}
                  color={(modalProps[label] || {}).textColor || themes[index].buttonTextColor}
                  background={(modalProps[label] || {}).bgColor || themes[index].buttonBgColor}>
                  Play Again
            </ModalButtons>
              }
            </>
          )}
        </ModalBody>
      </MessageContainer>
    </ModalContainer>
  );
};

export default observer(Modal);
