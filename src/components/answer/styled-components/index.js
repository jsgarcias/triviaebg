import styled from 'styled-components';

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: space-evenly;
`;

const AddRemoveAnswerContainer = styled.div`
  ${props => props.remix ? 'display: flex' : 'display: none'}
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
`;

const AnswerContainer = styled.div`
  ${props => props.width ? `width: ${props.width};`: ''}
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.background ? `background: ${props.background};` : 'background: linear-gradient(292.04deg, #358AF2 2.08%, #68DCF9 65.36%);'}
  ${props => props.hidden ? 'display: none;' : 'display: flex;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #fff'}
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: translateZ(0);
  ${props => props.flip ? 'transform: rotateX(180deg);' : ''} 
`;

const UnansweredContainer = styled.div`
  border-radius: 100%;
  width: 35px;
  height: 35px;
  font-weight: bolder;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnsweredContainer = styled.div`
  ${props => props.family ? `font-family: ${props.family} !important;` : 'font-family: Poppins;'}
  ${props => props.remix ? 'cursor: pointer' : ''}
  ${props => props.color ? `color: ${props.color};` : 'color: #fff'}
  display: flex;
  width: 100%;
  height: inherit;
  text-transform: uppercase;
  word-break: break-word;
  justify-content: space-around;
  transform: rotateX(-180deg);
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  ${props => props.hide ? 'display: none;' : 'display: flex;'}
  height: inherit;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-left: 10px
  margin-right: 10px;
  width: 30%;
`;

const AnswerInputContainer = styled.div`
  ${props => props.remix ? 'display: none' : 'display: flex'}
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: inherit;
`;

const AnswerInput = styled.input`
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #ffffff'}
  ${props => props.border ? `border: 1px solid ${props.border};` : 'border: 1px solid #ffffff;'}
  ${props => props.background ? `background: ${props.background};` : 'background: transparent;'}
  height: 54px;
  font-size: 18px;
  font-weight: 800;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
`;

const SubmitAnswerButton = styled.button`
  height: 54px;
  border: none!important;
  outline: none!important;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 76%;
  align-self: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.5px;
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #626262;'}
  ${props => props.background ? `background: ${props.background}` : 'background: #FFFFFF;'}
`;

const SuccessMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin: 0 0 10px;
`;

const SuccessMessage = styled.p`
  ${props => props.hide ? `display: block` : 'display: none'}
  margin: 0;
  color: #59bf59;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #FFFFFF;
`;

const GuessesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0 0;
  height: 36px;
`;

const Errors = styled.span`
  margin: 0 5px;
`;

const SeeRankButton = styled.button`
  border: none!important;
  outline: none!important;
  text-align: center;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.5px;
  width: 93%;
  height: 54px;
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  ${props => props.family ? `font-family: ${props.family};` : 'font-family: Poppins;'}
  ${props => props.color ? `color: ${props.color};` : 'color: #626262'}
  ${props => props.background ? `background: ${props.background}` : 'background: #FFFFFF;'}
  ${props => props.remix ? 'display: none' : ''}
`;

const MessageWrap = styled.div`
  display: flex
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export {
  MessageWrap,
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
  Errors,
  SeeRankButton,
}