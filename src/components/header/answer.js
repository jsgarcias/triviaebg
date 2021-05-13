import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toJS } from 'mobx';
import { themes } from '../../constants';
import OneActive from '@material-ui/icons/LooksOne';
import TwoActive from '@material-ui/icons/LooksTwo';
import ThreeActive from '@material-ui/icons/Looks3';
import FourActive from '@material-ui/icons/Looks4';
import FiveActive from '@material-ui/icons/Looks5';
import SixActive from '@material-ui/icons/Looks6';
import OnePassive from '@material-ui/icons/LooksOneTwoTone';
import TwoPassive from '@material-ui/icons/LooksTwoTwoTone';
import ThreePassive from '@material-ui/icons/Looks3TwoTone';
import FourPassive from '@material-ui/icons/Looks4TwoTone';
import FivePassive from '@material-ui/icons/Looks5TwoTone';
import SixPassive from '@material-ui/icons/Looks6TwoTone';

const textColorTypes = {
    0: '#33CCFF',
    1: '#FE9C52',
    2: '#FFEB62',
    3: '#FE87F5',
    4: '#AAFFA9',
    5: '#FFFFFF',
    6: '#1C2025',
    7: '#4E37B2',
    8: '#FED32C',
    9: '#132742',
    10: '#FE9C52',
    11: '#E2F8E6',
    12: '#E73526',
};

const Container = styled.div`
    width: 25.1px;
    height: 25.1px;
    border-radius: 3px;
    font-size: 19px;
    font-family: 'Poppins';
    font-weight: bold;
    /*box-shadow: 0px 0px 0px 1.5px #FFF inset;
    box-shadow: 0px 3.67416px 3.67416px rgba(0, 0, 0, 0.15);
    border: 1.5px solid #FFF;*/
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.active ? props.color : '#FFF'};
    background: ${props => props.active ? props.bg : 'rgba(0, 0, 0, .30)'};
`;

const AnswerIconContainer = styled.div`
    transition: all .2s ease-in-out;

    &:hover {
       transform: scale(1.1);  
    }
`;

const iconTypes = {
    oneTone: [OneActive, TwoActive, ThreeActive, FourActive, FiveActive, SixActive,],
    twoTone: [OnePassive, TwoPassive, ThreePassive, FourPassive, FivePassive, SixPassive]
};

const Answer = ({ count, appService, isActive, setActive }) => {
    const [answers, setAnswers] = useState([]);
    const [removedAnswers, setRemovedAnswers] = useState([]);

    const saveAnswer = newAnswers => {
        setAnswers(newAnswers);
        appService.onSetValue('game_settings', {
            number_of_guesses: 3,
            answers: newAnswers
        });
    };

    const choose = (count) => {
        return e => {
            e.stopPropagation();
            setActive(count);
            let clonedAnswers = _.cloneDeep(answers);
            let clonedRemoved = _.cloneDeep(removedAnswers);
            if (count > answers.length) {
                let diff = count - answers.length;
                for (let i = 0; i < diff; i++) {
                    if (clonedRemoved.length) {
                        clonedAnswers.push(clonedRemoved.shift());
                        appService.onSetValue('removedAnswers', clonedRemoved);
                    } else {
                        clonedAnswers.push({
                            shown: true,
                            answer: '',
                            image: ''
                        });
                    }
                }
                saveAnswer(clonedAnswers)
            } else {
                let removed = clonedAnswers.slice(count);
                let slicedAnswers = clonedAnswers.slice(0, count);

                setRemovedAnswers([...removed, ...clonedRemoved]);
                appService.onSetValue('removedAnswers', [...removed, ...clonedRemoved]);
                saveAnswer(slicedAnswers)
            }
        };
    };

    let iconProps = {
        id: 'answer-picker',
        onClick: choose(count),
        active: isActive,
        color: textColorTypes[appService.theme.index],
        bg: themes[appService.theme.index].answerTextColor,
    };

    const AnswerIcon = iconTypes[isActive ? 'oneTone' : 'twoTone'][count - 1];

    useEffect(() => {
        let gameSettings = toJS(appService.game_settings);
        let { answers } = gameSettings;

        setAnswers(answers);
    }, [appService.game_settings]);

    useEffect(() => {
        setRemovedAnswers(appService.removedAnswers);
    }, [appService.removedAnswers]);

    return (
        <AnswerIconContainer>
            <AnswerIcon
                {...iconProps}
                style={{
                    cursor: 'pointer',
                    height: 34,
                    width: 34,
                    color: themes[appService.theme.index].answerTextColor
                }} />
        </AnswerIconContainer>
    );
};

export default Answer;
