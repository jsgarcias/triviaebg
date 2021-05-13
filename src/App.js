import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import AppService from '../store/AppService';
import {observer} from 'mobx-react';
import WebFont from 'webfontloader';
import ContentEditable from 'react-simple-contenteditable';
import Confetti from 'react-confetti';
import {themes} from './constants';


// Components
import RemixHeader from './components/header/remix-header';
import Answer from './components/answer';
import EditModal from './components/header/edit-modal';
 
const appService = new AppService();
window.Koji = Koji;

// for thumbnail customizations
const isScreenShot = window.location.search.includes('koji-screenshot=1') ? 'height: 1200px; width: 1200px;' : '';

const Container = styled.div`
  ${isScreenShot}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  text-align: center;
  color: #fcfcfc;
  word-break: break-word;
  overflow-x: hidden;
  ${props => props.modalShown ? 'overflow: hidden' : ''}
`;

const ContentWrapper = styled.div`
  width: 85%;
  margin: 0 0 200px;
`;

const Image = styled.img`
  max-width: 50vmin;
  max-height: 50vmin;
`;

const QuestionContainer = styled.div`
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: white;'}
  width: 100%;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
`;

const Question = styled.span`
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: white;'}
  ${props => props.isEmpty ? 'opacity: 0.5;' : 'opacity: 1;'}
  opacity: ${props => props.opacity}
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
  ${isScreenShot ?
    'margin: 20vh auto 25px !important; padding-left: unset; animation: unset'
    : 'margin: 50px 0 5px;'}
  ${props => props.remix ? `cursor: pointer; margin: 15px 0 15px;` : 'cursor: default; margin: 50px 0 5px;'}

`;

const AnimatedBorder = styled.div`
    --big: 15px;
    --small: 1px;
    --color: ${props => props.color};
    
    background-image: linear-gradient(90deg, var(--color) 50%, transparent 0%), linear-gradient(90deg, var(--color) 50%, transparent 50%), linear-gradient(0deg, var(--color) 0%, transparent 0%), linear-gradient(0deg, var(--color) 0%, transparent 0%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: var(--big) var(--small), var(--big) var(--small), var(--small) var(--big), var(--small) var(--big);
    background-position: left top, right bottom, left bottom, right top;
    animation: border-dance 5s infinite linear;

    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0px;
    pointer-events: none;
    opacity: 1;

    @media (max-width: 700px) {
      height: 100%;
    }
`;

const App = () => {
  const [hasGeneratedId, setHasGeneratedId] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleRemix = (key, type = undefined) => () => {
    appService.showKojiControls([key, type]);
  };

  const commonProps = {
    appService: appService,
    handleRemix: handleRemix,
    setModalShown: setModalShown,
  };

  const generateUUID = () => {
    let id = '';

    if (hasGeneratedId) return;

    if(window) {
      id = window.Koji.config.metadata.projectId;
      if(window.KOJI_OVERRIDES) {
        id = window.KOJI_OVERRIDES.overrides.metadata.projectId;
      }
    }

    setHasGeneratedId(true);
    // comment this line to prevent infinite reloading when on EDITING and PREVIEW mode
    appService.onSetValue('appId', id);
  }

  useEffect(() => {
    if (Object.keys(appService.fontStyle).length) {
      WebFont.load({
        google: {
          families: ['Lilita One', `${appService.fontStyle.value}:400,800`, 'Poppins:400,700,800']
        }
      });
    }
  }, [appService.fontStyle]);

  useEffect(() => {
	  setHasGeneratedId(false);
    generateUUID();
    if(!appService.isRemixing) {
      appService.setShowConfetti(false);
    }
  }, [appService.isRemixing]);

  useEffect(() => {
  }, [appService.appId]);

  return (
    <React.Fragment>
      <Container
        id="app-container"
        remix={appService.isRemixing}
        className='app-container'
        modalShown={modalShown}
        style={
          appService.backgroundImage
            ? { backgroundImage: `url(${appService.backgroundImage})` }
            : { background: appService.backgroundColor }
        }>
        <RemixHeader {...commonProps}/>
        {appService.showConfetti && !appService.isRemixing ? <Confetti
          className="confetti"
          numberOfPieces={200}
        /> : <React.Fragment />}
        <QuestionContainer className='marquee-container'
          onClick={() => {
            appService.isRemixing && setShowEditModal(true)
          }}
        >
          <Question
            isEmpty={!appService.title}
            remix={appService.isRemixing}
            color={appService.textColor}
            hidden={showEditModal}
            key={appService.title}
            className={`animate-marquee header ${appService.isRemixing ? 'remix' : ''}`}
            opacity={showEditModal ? '0' : appService.title ? '1' : '0.5' }
            title={appService.title}
            >
              {appService.title ? appService.title.toUpperCase() : 'TAP TO TYPE'}
              {/*appService.isRemixing ? <ContentEditable
                id="content-editable"
                placeholder="Enter a title..."
                className="content"
                tagName="span"
                html={appService.title}
                onKeyPress={(e, value) => {
                  if (value.length > 30) {
                    e.preventDefault();
                  }
                }} 
                onChange={(e, value) => {
                  appService.onSetValue('title', value);
                }}
              /> : appService.title*/}
          </Question>
          {appService.isRemixing && (
            <AnimatedBorder 
              color={appService.textColor}
            />
          )}
        </QuestionContainer>
        <ContentWrapper className="content-wrapper">
          <Answer {...commonProps}/>
        </ContentWrapper>
        {showEditModal && (
            <EditModal
                settingsKey={'title'}
                placeholder={'ENTER TITLE'}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                appService={appService}
                color={themes[appService.theme.index].buttonTextColor}
                background={themes[appService.theme.index].buttonBgColor}
            />
        )}
      </Container>
    </React.Fragment>
  );
};

export default observer(App);
