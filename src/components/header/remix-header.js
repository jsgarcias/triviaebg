import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ColorPicker from './color-picker';
import GradientPicker from './gradient-picker';
import AddAnswerSvg from '../../assets/svg/add-answer.svg';
import AnswerPicker from './answer-picker';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter6Icon from '@material-ui/icons/Filter6';

const HeaderContainer = styled.div`
  height: 54px;
  padding: 5px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(196, 196, 196, 0) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
`;

const LockIconContainer = styled.div`
  width: 30%;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
`;

const IconLabel = styled.span`
  font-size: 12px;
  margin-top: 4px;
`;

const ThemeContainer = styled.div`
  width: 111px;
  height: 28px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 19.3841px;
  font-style: normal;
  font-weight: 800;
  font-size: 10.5732px;
  line-height: 16px;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextColorContainer = styled.div`
  cursor: pointer;
  height: 26px;
  display: flex;
`;

const GradientBackgroundContainer = styled.div`
  width: 25.25px;
  height: 25.25px;
  background: linear-gradient(165.03deg, #DC5A58 6.58%, #F0A554 23.76%, #F4C66A 37.76%, #C7C667 51.34%, #90BF60 60.62%, #599AD4 73.85%, #7937C3 100%);
  border: 1.62906px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImageBackgroundContainer = styled.div`
  cursor: pointer;
  height: 26px;
  display: flex;
  justify-content: center;
`;

const GameSettingsContainer = styled.div`
  cursor: pointer;
`;

const FontGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const SettingsGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerValue = styled.div`
  max-width: 18px;
  min-width: 18px;
  font-size: 10px;
  font-weight: 800;
`;

const RemixHeader = props => {
  const { appService, handleRemix, setFontFam } = props;
  const [answers, setAnswers] = useState([]);
  let familyIndex = 0;
  const family = ['Poppins', 'Special Elite', 'Barlow Condensed', 'Teko', 'Oswald'];

  const handleFontFamilyChange = () => {
    appService.changeFontStyle();
  }

  const handleAddRemove = key => e => {
    let clonedAnswers = _.cloneDeep(answers);
    if (key === 'remove') {
      if (clonedAnswers.length > 1) {
        clonedAnswers.pop();
      }
    } else {
      if (clonedAnswers.length < 6) {
        clonedAnswers.push({
          shown: true,
          answer: '',
          image: ''
        });
      }
    }
    appService.onSetValue('game_settings', {
      number_of_guesses: 3,
      answers: clonedAnswers
    });
    setTimeout(() => {
      document.getElementsByClassName('content')[document.getElementsByClassName('content').length - 1].focus();
    }, 0);
  }

  useEffect(() => {
    let gameSettings = toJS(appService.game_settings);
    let { answers } = gameSettings;

    setAnswers(answers);
  }, [appService.game_settings]);

  const Icon = ({ color, onClick }) => {
    return <svg onClick={onClick} width="25" height="26" viewBox="0 0 23 25" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path
          d="M23.4751 19.4205C23.4751 21.0015 23.4751 22.4867 23.4751 24.1155C15.6501 24.1155 7.85861 24.1155 0 24.1155C0 22.5825 0 21.0494 0 19.4205C7.79144 19.4205 15.5829 19.4205 23.4751 19.4205Z"
          fill={color} />
        <path
          d="M19.6126 15.5238C17.5899 10.8241 15.5078 6.15409 13.5446 1.42463C13.0984 0.353804 12.5928 -0.122117 11.403 0.0266085C10.8081 0.0860986 10.5404 0.234824 10.3321 0.770235C8.69617 4.60735 7.03044 8.44446 5.36472 12.2816C4.76982 13.6498 4.20466 14.9884 3.58002 16.4459C4.59135 16.4459 5.51345 16.4756 6.4058 16.4161C6.58427 16.4161 6.82223 16.1782 6.91146 15.9997C7.26841 15.2263 7.56586 14.3935 7.9228 13.6201C8.01203 13.4119 8.33923 13.2037 8.54744 13.2037C10.6891 13.1739 12.8605 13.1739 15.0021 13.2037C15.2103 13.2037 15.5375 13.4416 15.6268 13.6201C15.9837 14.3637 16.2812 15.1668 16.6084 15.9402C16.6976 16.1484 16.9058 16.4161 17.0545 16.4161C17.9766 16.4756 18.9285 16.4459 19.9398 16.4459C19.8208 16.0889 19.7316 15.7915 19.6126 15.5238ZM9.05311 10.4374C9.94546 8.02803 10.8378 5.64843 11.7897 3.09035C12.7415 5.64843 13.6041 7.99829 14.5262 10.4374C12.6523 10.4374 10.927 10.4374 9.05311 10.4374Z"
          fill="white" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="22.1424" height="23.7896" fill="white" transform="translate(0 0.881104)" />
        </clipPath>
      </defs>
    </svg>;
  };

  const renderAnswerIcon = () => {
    // const IconComponent = React.lazy(() => import(`@material-ui/icons/Filter${answers.length}`));
    // return IconComponent;
    let iconProps = {
      id: 'answer-picker',
      onClick: () => appService.toggleAnswerPicker(),
      style: { height: 28, width: 28, cursor: 'pointer' }
    };
    let icon = [
      <Filter1Icon {...iconProps} />,
      <Filter2Icon {...iconProps} />,
      <Filter3Icon {...iconProps} />,
      <Filter4Icon {...iconProps} />,
      <Filter5Icon {...iconProps} />,
      <Filter6Icon {...iconProps} />,
    ];

    return icon[answers.length - 1];
  }

  return (
    <div style={{ width: '100%' }} hidden={!appService.isRemixing}>
      <HeaderContainer>
        <FontGroup>
          {/* <GradientPicker appService={appService} />
          <ThemeContainer onClick={() => appService.changeTheme()}>{appService.theme.label}</ThemeContainer> */}
          {renderAnswerIcon()}
          {/* <TextColorContainer id={'color-picker'}><Icon color={appService.textColor} onClick={() => appService.toggleColorPicker()} /></TextColorContainer> */}
          <GradientPicker appService={appService} />
          <ImageBackgroundContainer onClick={handleRemix('image')}><img src={require('../../assets/svg/background.svg')} style={{ height: 26 }} /></ImageBackgroundContainer>
        </FontGroup>
      </HeaderContainer>
      {/* <ColorPicker appService={appService} /> */}
      <AnswerPicker appService={appService} />
    </div>
  );
};

export default observer(RemixHeader);