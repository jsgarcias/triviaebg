import { observable, action } from 'mobx';
import KojiService from './KojiService';
import {themes} from '../src/constants';

export const backgroundColors = [
  'linear-gradient(180deg, #33CCFF 0%, #3366FF 100%)',
  'linear-gradient(180deg, #FE9C52 0%, #FD494D 100%)',
  'linear-gradient(180deg, #FFEB62 0%, #FFB32D 100%)',
  'linear-gradient(180deg, #FE87F5 0%, #5AD1F3 100%)',
  'linear-gradient(180deg, #AAFFA9 0%, #11FFBD 100%)',
  '#FFFFFF',
  '#1C2025',
  '#4E37B2',
  '#FED32C',
  '#132742',
  '#FE9C52',
  '#E2F8E6',
  '#E73526',
];

const fonts = [
  { value: 'Roboto', label: 'Classic' },
  { value: 'Lora', label: 'Lora' },
  { value: 'Poppins', label: 'Bold' },
  { value: 'Special Elite', label: 'Typewriter' },
  { value: 'Dawning of a New Day', label: 'Handwritten' }
];

class AppService extends KojiService {
  @observable background = '';
  @observable text_style = {};
  @observable game_settings = {};
  @observable appId = '';
  @observable family = '';
  @observable color = '';
  @observable backgroundImage = '';
  @observable backgroundColor = '';
  @observable textColor = '';
  @observable fontStyle = fonts[0];
  @observable theme = {
    index: 0,
    label: 'Theme 1'
  };
  @observable showColorPicker = false;
  @observable showAnswerPicker = false;
  @observable title = '';
  @observable showConfetti = false;
  @observable removedAnswers = [];

  constructor() {
    super();
    this.initData();
    this.initListeners();
  }

  @action
  setShowConfetti(show) {
    this.showConfetti = show;
  }

  @action
  toggleColorPicker(status = !this.showColorPicker) {
    this.showColorPicker = status;
  }

  @action
  toggleAnswerPicker(status = !this.showAnswerPicker) {
    this.showAnswerPicker = status;
  }

  @action
  changeTheme() {
    let themeLength = themes.length;
    let themeIndex = this.theme.index === (themeLength - 1) ? 0 : this.theme.index + 1;

    this.onSetValue('backgroundColor', themes[themeIndex].backgroundColor);
    this.onSetValue('textColor', themes[themeIndex].textColor);
    this.onSetValue('image', this.backgroundImage);
    this.onSetValue('theme', {
      index: themeIndex,
      label: `Theme ${themeIndex + 1}`
    });
  }
  
  // @action
  // changeBackgroundColor() {
  //   if (backgroundColors.findIndex(value => value === this.backgroundColor) === backgroundColors.length - 1) {
  //       this.onSetValue('backgroundColor', backgroundColors[0])
  //   } else {
  //       this.onSetValue('backgroundColor', backgroundColors[backgroundColors.findIndex(value => value === this.backgroundColor) + 1])
  //   }
  //   this.onSetValue('image','')
  // }
  
  @action
  changeFontStyle() {
    if (fonts.findIndex(({ value }) => value === this.fontStyle.value) === fonts.length - 1) {
      this.onSetValue('fontStyle', fonts[0])
    } else {
     this.onSetValue('fontStyle', fonts[fonts.findIndex(({ value }) => value === this.fontStyle.value) + 1])
   }
  }

  @action
  initData() {
    this.background = this.getData(['background']);
    this.text_style = this.getData(['text_style']);
    this.game_settings = this.getData(['game_settings']);
    this.appId = this.getData(['appId']);
    this.backgroundImage = this.getData(['image']);
    this.textColor = this.getData(['textColor']);
    this.backgroundColor = this.getData(['backgroundColor']);
    this.fontStyle = this.getData(['fontStyle']);
    this.theme = this.getData(['theme']);
    this.title = this.getData(['title']);
    this.removedAnswers = this.getData(['removedAnswers']);
  }

  @action
  initListeners() {
    this.onValueChange('title', (data) => this.title = data);
    this.onValueChange('background', (data) => this.background = data);
    this.onValueChange('text_style', (data) => this.text_style = data);
    this.onValueChange('game_settings', (data) => this.game_settings = data);
    this.onValueChange('appId', (data) => this.appId = data);
    this.onValueChange('textColor', (data) => this.textColor = data);
    this.onValueChange('fontStyle', (data) =>  this.fontStyle = data);
    this.onValueChange('theme', (data) =>  this.theme = data);
    this.onValueChange('title', (data) =>  this.title = data);
    this.onValueChange('removedAnswers', (data) =>  this.removedAnswers = data);
    this.onValueChange('image', (data) => {
      this.backgroundImage = data;
      // if(data || data !== ''){
      //     this.backgroundColor = null;
      // }
    });
    this.onValueChange('backgroundColor', (data) => {
      this.backgroundColor = data;
      // if(this.backgroundImage) {
      //   this.backgroundImage = null;
      // }
    });
  }
}

export default AppService;
