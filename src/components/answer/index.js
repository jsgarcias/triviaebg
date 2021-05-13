import React, {useEffect, useState, createRef, useMemo, useCallback } from 'react';
import ss from 'string-similarity';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import Fuse from 'fuse.js';
import { Textfit } from 'react-textfit';
// import ContentEditable from 'react-simple-contenteditable';
import ContentEditable from 'react-contenteditable'
import _ from 'lodash';
// Helpers
import {setCurrentCursorPosition, formatSpaces} from '../../helpers';
// Constants
import {successMessage, themes, answersContainerHeightClassName} from '../../constants';
// Components
import AnimatedStars from './animated-stars'
import Modal from './modal';
import Rankings from './rankings';
import {
  AnswersContainer,
  AddRemoveAnswerContainer,
  AnswerContainer,
  UnansweredContainer,
  AnsweredContainer,
  TextContainer,
  ImageContainer,
  AnswerInputContainer,
  AnswerInput ,
  SubmitAnswerButton,
  SuccessMessageContainer,
  SuccessMessage,
  GuessesContainer,
  MessageWrap,
  Errors,
  SeeRankButton,
} from './styled-components';

const AnimatedBorder = styled.div`
    --big: 10px;
    --small: 1px;
    --color: ${props => props.color};
    
    background-image: linear-gradient(90deg, var(--color) 50%, transparent 0%), linear-gradient(90deg, var(--color) 50%, transparent 50%), linear-gradient(0deg, var(--color) 50%, transparent 50%), linear-gradient(0deg, var(--color) 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: var(--big) var(--small), var(--big) var(--small), var(--small) var(--big), var(--small) var(--big);
    background-position: left top, right bottom, left bottom, right top;

    ${props => !props.focused ? 'animation: border-dance 5s infinite linear' : ''};

    width: calc(100% - 20px);
    height: calc(100% - 20px);
    bottom: 10px;
    pointer-events: none;
    opacity: 1;
    border-radius: 5px;

    @media (max-width: 700px) {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      bottom: 5px;
    }
`;

const Answer = props => {
  const {appService, handleRemix, setModalShown} = props;
  const [answers, setAnswers] = useState([]);
  const [pattern, setPattern] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showRankings, setShowRankings] = useState(false);
  const [focused, setFocused] = useState(null);
  const [minMax, setMinMax] = useState({
    min: 1,
    max: 14
  });

  // star state and setter
  const [starred, setStarred] = useState({});
  const starSetter = (value, index) => setStarred(state => ({ ...state, [index]: value }));

  let inputRef = createRef();
  let textFitRef = createRef();

  const showAllRankings = () => {
    setShowRankings(true);
    appService.setShowConfetti(false);
  }

  const toggleRevealAnswers = reveal => {
    let clonedAnswers = getAnswers();

    clonedAnswers.map(val => {
      val.shown = reveal;
    });

    setAnswers(clonedAnswers);
    setRevealed(reveal);
    resetModal();
  }

  const resetModal = () => {
    setErrors(0);
    setFinished(false);
    setSuccess(false);
    appService.setShowConfetti(false);
    setShowModal(false);
    setModalType('');
    setModalShown(false);
    setHasError(false);
    setPattern('');
  }

  const handleChange = e => setPattern(e.target.value.toUpperCase());

  const saveAnswer = pattern => {
    const body = {
      appId: appService.appId,
      answer: pattern,
    };

    fetch(`${Koji.config.serviceMap.backend}/create`, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(JSON.stringify(responseJson));
      });
  }

  const showErrorModal = message => {
    setPattern('');
    setModalMessage(message);
    setModalType('error');
    setTimeout(() => {
      setShowModal(false), 1000
      setModalShown(false);
      setModalType('');
    }, 1000);
  }

  const handleOk = () => e => {
    e.preventDefault();
    if(!pattern) {
      setHasError(true);
      return setTimeout(() => setHasError(false), 1000)
    }

    let cloneAnswers = _.cloneDeep(answers);
    let filteredAnswers = cloneAnswers.filter(val => val.answer);
    let resultList = cloneAnswers.map((answer, index) => {
        let score = ss.compareTwoStrings(answer.answer.toUpperCase().replace(/[’']+/g, ''), pattern.replace(/[’']+/g, ''));
        if(score >= 0.90) {
            return {
                item : {
                    answer : answer.answer
                },
                refIndex : index
            }
        }
        return null;
    }).filter((val)=> val);

    setHasError(false);
    setFinished(false);
    let isRepeatedAnswer = false;
    if(resultList.length) {
      // Exact answer
      const realAnswer = resultList[0].item.answer;

      // Filter all with the same answer from fuse result
      resultList = _.filter(resultList, ({ item: { answer }}) => answer.toLowerCase() === realAnswer.toLowerCase());
      let isCorrectFlag = false;
      _.each(resultList, result => {
        if(!cloneAnswers[result.refIndex].shown) {
          cloneAnswers[result.refIndex].shown = true;
          filteredAnswers = cloneAnswers.filter(val => val.answer);
          starSetter(true, result.refIndex);
          setPattern('');
          isCorrectFlag = true;
          setTimeout(() => {
            starSetter(false, result.refIndex);
          }, 2000);
        } else {
          isRepeatedAnswer = true;
        }
      });

      if(isCorrectFlag) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        saveAnswer(pattern);
        setPattern('');
        setAnswers(cloneAnswers);
        if(_.every(filteredAnswers, val => val.shown === true) && !revealed) {
          return setTimeout(() => {
            setFinished(true);
            appService.setShowConfetti(true);
            setModalMessage(['Congratulations!', 'You’ve figured it all out.\nGreat job!']);
            setShowModal(true);
          }, 2000);
        }
        return;
      }
    }
    setModalShown(true);
    setShowModal(true);
    if(errors + 1 === appService.game_settings.number_of_guesses) {
      setModalMessage('Want to continue?');
      setModalType('help');
    } else {
      if(isRepeatedAnswer) return showErrorModal('You\'ve already entered this');
      showErrorModal(<React.Fragment>Sorry!<br/>That’s incorrect</React.Fragment>);
    }
    setPattern('');
    setErrors(errors + 1);
    setError(true);
    setTimeout(() => setError(false), 2000)
  }

  const getAnswers = () => {
    let gameSettings = toJS(appService.game_settings);
    let {answers} = gameSettings;

    let formattedAnswer = [];

    answers.map(answer => {
      if(appService.isRemixing) {
        return formattedAnswer.push({
          shown: false,
          showStars: true,
          answer: answer.answer,
          image: answer.image
        });
      }

      if(answer) {
        formattedAnswer.push({
          shown: false,
          showStars: true,
          answer: answer.answer,
          image: answer.image
        });
      }
    });

    return formattedAnswer;
  };

  // Handle wrapper clicks
  const onWrapperClick = (keyName, index) => () => {
    document.getElementById(keyName).focus();
    document.execCommand("selectall", null, false);
    setFocused(index);
  };

  const renderAnswers = key => {
    let clonedAnswers = _.cloneDeep(answers);
    let filteredAnswers = clonedAnswers.filter(val => val.answer);

    return answers.length ?
      answers.map((answer, index) => {
        let answerKey = answer.answer || null;

        if(index < 6) {
          const keyName = `${index}_content`;
          return <AnswerContainer
            key={index}
            className={`answer-container`}
            flip={answer.shown}
            background={themes[appService.theme.index].answerBgColors[index]}
            family={appService.family}
            style={{ 
              border: appService.backgroundColor === '#FFFFFF' ? '1px solid #E3E3E3' : 'none',
            }}
            color={themes[appService.theme.index].answerTextColor}
            hidden={(!appService.isRemixing && !answer.answer) ? true : false}
            width={filteredAnswers.length <= 3 ? '93%' : '45%'}>
              <UnansweredContainer
                  className="animate-flip"
                  shown={!answer.shown ? true : false}
                  family={(appService.fontStyle||{}).value}
                  color={themes[appService.theme.index].answerTextColor}>
                  ?
              </UnansweredContainer>
              <AnsweredContainer
                  key={`${index}-${success}`}
                  shown={answer.shown ? true : false}
                  className="animate-flip answer-wrapper"
                  remix={appService.isRemixing}
                  family={(appService.fontStyle||{}).value}
                  color={themes[appService.theme.index].answerTextColor}
                  onClick={onWrapperClick(keyName, index)}
                  >
                  <Textfit
                    ref={textFitRef}
                    key={`${index}-${revealed}`}
                    className="answered-container"
                    mode="multi"
                    throttle={30}
                    {...minMax}>
                    {formatSpaces(answer.answer)}
                    {starred[index] ? <AnimatedStars
                      barColor={themes[appService.theme.index].answerBgColors[index]}
                      isMobile={true}
                    /> : <React.Fragment />}
                  </Textfit>
              </AnsweredContainer>
            </AnswerContainer>;
          }
      }) : <div hidden={!appService.isRemixing}>Please add at least 1 answer</div>
  }

  const idKeys = ['0_content', '1_content', '2_content', '3_content', '4_content', '5_content'];
    useEffect(() => {
        if (appService.isRemixing) {
           setTimeout(() => {
            idKeys.map(key => {
                let element = document.getElementById(key);
                setEndOfContentEditable(element);
            });
           }, 0);
        }
    }, [appService.isRemixing]);

    const setEndOfContentEditable = (contentEditableElement) => {
      if(contentEditableElement) {
        let range, selection;
        if (document.createRange) {
          //Firefox, Chrome, Opera, Safari, IE 9+
          range = document.createRange(); //Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
          range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
          selection = window.getSelection(); //get the selection object (allows you to change selection)
          selection.removeAllRanges(); //remove any selections already made
          selection.addRange(range); //make the range you have just created the visible selection
        } else if (document.selection) {
          //IE 8 and lower
          range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
          range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
          range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
          range.select(); //Select the range (make it the visible selection
        }
      } 
    };

  const renderRemix = useCallback((key) => {
    let clonedAnswers = _.cloneDeep(answers);

    return answers.length ?
      answers.map((answer, index) => {
        if (index < 6) {
          const keyName = `${index}_content`;
          return <AnswerContainer
            key={index}
            className={`answer-container`}
            flip={true}
            background={themes[appService.theme.index].answerBgColors[index]}
            family={appService.family}
            color={themes[appService.theme.index].answerTextColor}
            hidden={false}
            remix={appService.isRemixing}
            width={answers.length <= 3 ? '100%' : '45%'}>
            <AnsweredContainer
              key={`${index}-${success}`}
              shown={true}
              className="animate-flip answer-wrapper"
              remix={appService.isRemixing}
              style={{ 
                border: appService.backgroundColor === '#FFFFFF' ? '1px solid #E3E3E3' : '',
                borderRadius: 10
              }}
              family={(appService.fontStyle || {}).value}
              color={themes[appService.theme.index].answerTextColor}
              onClick={onWrapperClick(keyName, index)}
            >
              <Textfit
                ref={textFitRef}
                key={`${index}-${revealed}-${answers.length}`}
                className="answered-container"
                mode="multi"
                throttle={10}
                onReady={() => {}}
                {...minMax}>
                <ContentEditable
                    placeholder="Enter answer..."
                    html={answer.answer}
                    tagName="span"
                    id={keyName}
                    className="content"
                    onBlur={() => setFocused(null)}
                    contentEditable="plaintext-only"
                    onClick={() => setFocused(index)}
                    onChange={event => {
                      const htmlValue = event.currentTarget.textContent;
                      const checkValue = event.target.value;
                      clonedAnswers[index].answer = htmlValue;
                      if (!htmlValue || !checkValue.trim() || checkValue === '\n' || checkValue === ''
                        || checkValue === '&nbsp;' || checkValue === '<br>') {
                        event.currentTarget.innerHTML = '';
                        clonedAnswers[index].answer = '';
                      }

                      setAnswers(clonedAnswers);
                      appService.onSetValue('game_settings', {
                        number_of_guesses: 3,
                        answers: clonedAnswers
                      });
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      if (e.clipboardData) {
                        const content = (e.originalEvent || e).clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, content);
                      }
                      else if (window.clipboardData) {
                        const content = window.clipboardData.getData('Text');
                        document.selection.createRange().pasteHTML(content);
                      }
                    }}
                  />
              </Textfit>
            </AnsweredContainer>
            <AnimatedBorder color={appService.theme.index === 8 ? '#FFF' : appService.textColor} focused={focused === index} />
          </AnswerContainer>;
        }
      }) : <div hidden={!appService.isRemixing}>Please add at least 1 answer</div>
  }, [answers, focused])

  useEffect(() => {
    if (focused !== null) return;  

    let formatted = getAnswers();
    setAnswers(formatted);
  }, [appService.game_settings.answers]);

  useEffect(() => {
    if(appService.isRemixing) {
      toggleRevealAnswers(true);
    } else {
      toggleRevealAnswers(false);
    }
  }, [appService.isRemixing]);

  useEffect(() => {
    let answersElem = document.getElementsByClassName('answer-container');
    if(answersElem.length) {
      if(answersElem[0].offsetHeight === 96) {
        setMinMax({
          min: 1,
          max: 20
        });
      }
    }
  }, [answers]);

  // filter only answers with value
  const answersLength = () => (appService.isRemixing ? answers : answers.filter(data => data.answer !== '')).length - 1;

  useEffect(() => {
    if(finished) {
       // re-focus answer input
       if(inputRef.current) inputRef.current.blur();
    }
  }, [finished]);

  useEffect(() => {
    // Auto focus only on after success
    if(answers.length && !showModal) {
      // re-focus answer input
      if(inputRef.current) inputRef.current.focus();
    }
  }, [showModal]);

  const acquireMessage = useMemo(() => success && successMessage[Math.round(Math.random())], [success]);

  const generateMessage = useCallback(() => success && (
    <MessageWrap>
      <img src={require('../../assets/svg/check.svg')} style={{ marginRight: 10 }} />
      <SuccessMessage className='answer-message'>{acquireMessage}</SuccessMessage>
    </MessageWrap>
  ), [success]);

  return (
    <React.Fragment>
      <AnswersContainer answersLength={answers.length} className={`answers-container ${answersContainerHeightClassName[answersLength()]}`}>
        {
          appService.isRemixing ? renderRemix() : renderAnswers()
        }
      </AnswersContainer>
      <SuccessMessageContainer className='success-message'>
        {!revealed && generateMessage()}
      </SuccessMessageContainer>
      {!revealed ?
        <React.Fragment>
          <AnswerInputContainer remix={appService.isRemixing} className='form-container'>
            <form
              className='answer-form'
              style={{width: '93%', display: 'flex', flexDirection: 'column'}}
              onSubmit={handleOk()}>
              <AnswerInput
                disabled={finished || showModal}
                color={themes[appService.theme.index].inputTextColor}
                border={themes[appService.theme.index].inputBorder}
                background={themes[appService.theme.index].inputBgColor}
                value={pattern}
                ref={inputRef}
                placeholder="ENTER YOUR ANSWER HERE"
                className={hasError ? 'answer-input has-error' : 'answer-input'}
                onChange={handleChange}
              />
              <SubmitAnswerButton className="submit-btn" color={themes[appService.theme.index].buttonTextColor} background={themes[appService.theme.index].buttonBgColor}>SUBMIT</SubmitAnswerButton>
            </form>
          </AnswerInputContainer>
        </React.Fragment> : <SeeRankButton className="rank-btn" remix={appService.isRemixing} color={themes[appService.theme.index].buttonTextColor} background={themes[appService.theme.index].buttonBgColor} onClick={showAllRankings}>See what other people guessed</SeeRankButton>
      }
      <Rankings appService={appService} show={showRankings} setShowRankings={setShowRankings} revealAnswers={toggleRevealAnswers} setModalShown={setModalShown}/>
      <Modal appService={appService} revealAnswers={toggleRevealAnswers} type={modalType} show={showModal} message={modalMessage} resetModal={resetModal} finished={finished}/>
    </React.Fragment>
  );
};

export default observer(Answer);
