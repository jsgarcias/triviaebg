import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {themes} from '../../constants';
import { Dots } from 'css-spinners-react'

// Components
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const RankingsContainer = styled.div`
  ${props => props.hide ? 'display: none' : 'display: flex'}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: fixed;
`;

const ListContainer = styled.div`
  width: 100%;
  padding: 0 32px;
  height: 40vh;
  overflow: hidden auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoBack = styled.button`
  border: none!important;
  outline: none!important;
  text-align: center;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -0.5px;
  width: 60%;
  height: 54px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #626262;'}  ${props => props.remix ? 'display: none' : ''}
  ${props => props.background ? `background: ${props.background}` : 'background: #FFFFFF;'}
`;


const QuestionContainer = styled.div`
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: white;'}
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
`;

const Question = styled.span`
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: white;'}
  ${props => props.isEmpty ? 'opacity: 0.5;' : 'opacity: 1'}
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 35px;
  letter-spacing: -0.5px;
  display: block;
  width: fit-content;
  padding-left: 100%;
  will-change: transform;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  animation: 12s linear 0s infinite normal none running marquee;
  margin: 50px 0 5px;
  ${props => props.remix ? `cursor: pointer; margin: 15px 0 15px;` : 'cursor: default; margin: 50px 0 5px;'}

`;

const List = styled.div`
  text-align: center;
  color: white;
  word-break: break-word;
  width: 85%;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: inherit;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 8px;
  height: 40px;
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #FFFFFF;'}
  ${props => props.background ? `background: ${props.background};` : 'background: transparent;'}
`;

const Rankings = props => {
  const {appService, show, setShowRankings, revealAnswers, setModalShown} = props;
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const reset = () => {
    setAnswers({});
    setIsLoading(true);
  }

  const handleBack = () => {
    reset();
    setShowRankings(false);
    revealAnswers(false);
  }

  useEffect(() => {
    if(appService.isRemixing) handleBack();
  }, [appService.isRemixing]);

  useEffect(() => {
    if(show) {
        setModalShown(true);
        fetch(`${Koji.config.serviceMap.backend}/count?appId=${appService.appId}`, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
              let rankedAnswers = responseJson.answers;

              setAnswers(rankedAnswers);
              setIsLoading(false);
            });
    }
  }, [show]);

  return (
    <RankingsContainer
        hide={!show}
        style={
          appService.backgroundImage
            ? { backgroundImage: `url(${appService.backgroundImage})` }
            : { background: appService.backgroundColor }
        }>
      <QuestionContainer>
        <Question
            isEmpty={!appService.title}
            remix={appService.isRemixing}
            color={appService.textColor}
            key={appService.title}
            className="animate-marquee header">
          {appService.title ? appService.title : 'Enter title'}
        </Question>
      </QuestionContainer>
      {!isLoading ?
        <ListContainer className='list-container'>
          <div style={{width: '100%', height: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            {
              answers.length ?
                answers.map((answer, index) => {
                    if(index < 5) {
                        return <List
                            className="ranking-list"
                            background={themes[appService.theme.index].answerBgColors[index]}
                            color={themes[appService.theme.index].answerTextColor}
                            family={(appService.fontStyle||{}).value}>
                                {`${answer.answer.toUpperCase()} ${answer.count ? '- ' + answer.count : ''}`}
                            </List>;
                    }
                })
              : <React.Fragment />
            }
          </div>
        </ListContainer>
        : <ListContainer><span className="loader"><Dots /></span></ListContainer>
      }
      <GoBack className="play-again-btn" remix={appService.isRemixing} family={(appService.fontStyle||{}).value} color={themes[appService.theme.index].buttonTextColor} background={themes[appService.theme.index].buttonBgColor} onClick={handleBack}>Play Again</GoBack>
    </RankingsContainer>
  );
};

export default observer(Rankings);
