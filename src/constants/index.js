const successMessage = ['Spot on!', 'That\'s Correct!', 'You figured it out! Great job!'];
const backgrounds = [
  'linear-gradient(292.04deg, #358AF2 2.08%, #68DCF9 65.36%)',
  'linear-gradient(292.04deg, #AD40F4 2.08%, #97ACFF 65.36%)',
  'linear-gradient(292.04deg, #2AE653 2.08%, #85F968 65.36%)',
  'linear-gradient(292.04deg, #F77753 2.08%, #F7C747 65.36%)',
  '#F4ED40',
  '#F46B40'
];
const answersContainerHeightClassName = [
  '',
  'equal-to-two',
  '',
  'less-than-four',
  'greater-than-four',
  'greater-than-four',
];
const themes = [
  //theme 1
  {
    backgroundColor: 'linear-gradient(180deg, #33CCFF 0%, #3366FF 100%)',
    textColor: '#ffffff',
    answerTextColor: '#ffffff',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#3366FF',
    buttonBgColor: '#ffffff',
    answerBgColors: [
      'linear-gradient(292.04deg, #683DFF 2.08%, #A751FF 65.36%)',
      'linear-gradient(292.04deg, #FF2C2C 2.08%, #FC9231 65.36%)',
      'linear-gradient(292.04deg, #FF3773 2.08%, #FF5555 65.36%)',
      'linear-gradient(292.04deg, #008703 2.08%, #45A247 65.36%)',
      'linear-gradient(292.04deg, #363795 2.08%, #005C97 65.36%)',
      'linear-gradient(292.04deg, #DD2C8E 2.08%, #FF00B1 65.36%)'
    ]
  },
  //theme 2
  {
    backgroundColor: 'linear-gradient(180deg, #FE9C52 0%, #FD494D 100%)',
    textColor: '#ffffff',
    answerTextColor: '#514646',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#FD4E4E',
    buttonBgColor: '#ffffff',
    answerBgColors: [
      'linear-gradient(292.04deg, #FFBD67 2.08%, #FEE689 65.36%)',
      'linear-gradient(292.04deg, #E7D9CE 2.08%, #F7F3EF 65.36%)',
      'linear-gradient(292.04deg, #67FF76 2.08%, #89FEAA 65.36%)',
      'linear-gradient(292.04deg, #67DBFF 2.08%, #89FEE9 65.36%)',
      'linear-gradient(292.04deg, #B5B4FF 2.08%, #B4D2FF 65.36%)',
      'linear-gradient(292.04deg, #EDA7FF 2.08%, #FFAFF7 65.36%)'
    ]
  },
  //theme 3
  {
    backgroundColor: 'linear-gradient(180deg, #FFEB62 0%, #FFB32D 100%)',
    textColor: '#372F2F',
    answerTextColor: '#372F2F',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#ffffff',
    buttonBgColor: '#151313',
    answerBgColors: [
      'linear-gradient(292.04deg, #F55555 2.08%, #FC9231 65.36%)',
      'linear-gradient(292.04deg, #75A9F8 2.08%, #83DFFC 65.36%)',
      'linear-gradient(292.04deg, #F87575 2.08%, #FC83AF 65.36%)',
      'linear-gradient(292.04deg, #30FF83 2.08%, #8CFF70 65.36%)',
      'linear-gradient(292.04deg, #7F75F8 2.08%, #83B3FC 65.36%)',
      'linear-gradient(292.04deg, #B575F8 2.08%, #E083FC 65.36%)'
    ]
  },
  //theme 4
  {
    backgroundColor: 'linear-gradient(180deg, #FE87F5 0%, #5AD1F3 100%)',
    textColor: '#ffffff',
    answerTextColor: '#ffffff',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#4786EA',
    buttonBgColor: '#ffffff',
    answerBgColors: [
      'linear-gradient(292.04deg, #F83600 2.08%, #FE8C00 65.36%)',
      'linear-gradient(292.04deg, #006159 2.08%, #00AA40 65.36%)',
      'linear-gradient(292.04deg, #93291E 2.08%, #ED213A 65.36%)',
      'linear-gradient(292.04deg, #6B55F5 2.08%, #31A7FC 65.36%)',
      'linear-gradient(292.04deg, #4A00E0 2.08%, #8E2DE2 66.34%)',
      'linear-gradient(292.04deg, #C70079 2.08%, #FF0099 65.36%)'
    ]
  },
  //theme 5
  {
    backgroundColor: 'linear-gradient(180deg, #AAFFA9 0%, #11FFBD 100%)',
    textColor: '#007B59',
    answerTextColor: '#2F3B38',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#ffffff',
    buttonBgColor: '#00513B',
    answerBgColors: [
      'linear-gradient(292.04deg, #2CD0FB 2.08%, #CCF4FF 65.36%)',
      'linear-gradient(292.04deg, #F7FB2C 2.08%, #FEFFCC 65.36%)',
      'linear-gradient(292.04deg, #FB8F2C 2.08%, #FFCFCC 65.36%)',
      'linear-gradient(292.04deg, #E960FF 2.08%, #F2CCFF 65.36%)',
      'linear-gradient(292.04deg, #5A9CFF 2.08%, #CCDAFF 65.36%)',
      'linear-gradient(292.04deg, #FF78A9 2.08%, #FFCCD5 65.36%)'
    ]
  },
  //theme 6
  {
    backgroundColor: '#FFFFFF',
    textColor: '#1C2025',
    answerTextColor: '#1C2025',
    inputBorder: '#151313',
    inputBgColor: 'rgba(0, 0, 0, 0.3)',
    inputTextColor: '#fff',
    buttonTextColor: '#FFFFFF',
    buttonBgColor: '#1C2025',
    answerBgColors: [
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
    ]
  },
  //theme 7
  {
    backgroundColor: '#1C2025',
    textColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    inputBorder: '#151313',
    inputBgColor: 'rgba(255, 255, 255, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#1C2025',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#494D51',
      '#494D51',
      '#494D51',
      '#494D51',
      '#494D51',
      '#494D51',
    ]
  },
  //theme 8
  {
    backgroundColor: '#4E37B2',
    textColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#FF7200',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#FF7200',
      '#FF7200',
      '#FF7200',
      '#FF7200',
      '#FF7200',
      '#FF7200',
    ]
  },
  //theme 9
  {
    backgroundColor: '#FED32C',
    textColor: '#372F2F',
    answerTextColor: '#FFFFFF',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#151313',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#151313',
      '#151313',
      '#151313',
      '#151313',
      '#151313',
      '#151313',
    ]
  },
  //theme 10
  {
    backgroundColor: '#132742',
    textColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#132742',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#FD6592',
      '#FD6592',
      '#FD6592',
      '#FD6592',
      '#FD6592',
      '#FD6592',
    ]
  },
  //theme 11
  {
    backgroundColor: '#FE9C52',
    textColor: '#FFFFFF',
    answerTextColor: '#905100',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#FE9C52',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#FEE689',
      '#FEE689',
      '#FEE689',
      '#FEE689',
      '#FEE689',
      '#FEE689',
    ]
  },
  //theme 12
  {
    backgroundColor: '#E2F8E6',
    textColor: '#003F38',
    answerTextColor: '#FFFFFF',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#E2F8E6',
    buttonBgColor: '#003F38',
    answerBgColors: [
      '#00D885',
      '#00D885',
      '#00D885',
      '#00D885',
      '#00D885',
      '#00D885',
    ]
  },
  //theme 13
  {
    backgroundColor: '#E73526',
    textColor: '#FFFFFF',
    answerTextColor: '#FFFFFF',
    inputBorder: '#ffffff',
    inputBgColor: 'rgba(0, 0, 0, 0.2)',
    inputTextColor: '#fff',
    buttonTextColor: '#E73526',
    buttonBgColor: '#FFFFFF',
    answerBgColors: [
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
    ]
  },
];

export {
  successMessage,
  backgrounds,
  answersContainerHeightClassName,
  themes,
};