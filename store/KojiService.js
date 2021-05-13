import { FeedSdk, InstantRemixing } from '@withkoji/vcc';
import { toJS, action, observable } from 'mobx';

let CUSTOMIZATION_KEY = 'settings';

class KojiService {
  @observable remix;
  @observable isRemixing = false;
  @observable feed;

  constructor() {
    this.remix = new InstantRemixing();
    this.remix.onSetRemixing((isRemixing) => this.isRemixing = isRemixing);

    this.remix.ready();
    this.feed = new FeedSdk();
    this.feed.load();
  }

  /**
   * Get data from .koji/customization/*.json
   * @param data {[string]}
   * @param parentKey {string}
   * @return {Object}
   */
  @action
  getData(data = [], parentKey = CUSTOMIZATION_KEY) {
    return this.remix.get([parentKey, ...data]);
  };

  /**
   * Show koji customization
   * @param data {[string]}
   * @param parentKey {string}
   * @return {Object}
   */
  @action
  showKojiControls(data = [], parentKey = CUSTOMIZATION_KEY) {
    if (!this.isRemixing) return;

    this.remix.onPresentControl([parentKey, ...data]);
  }

  /**
   * Listens to the new value when remix is on going
   * @param key {string}
   * @param cb {function}
   * @param parentKey
   */
  @action
  onValueChange(key, cb, parentKey = CUSTOMIZATION_KEY) {
    this.remix.onValueChanged((path, newValue) => {
      if (
        path[0]
        && path[1]
        && path[0] === parentKey
        && path[1] === key) {
        cb(newValue);
      }
    });
  }

  @action
  onSetValue(key, value, parentKey = CUSTOMIZATION_KEY) {
    this.remix.onSetValue([parentKey, key], value);
  }
}

export default KojiService;
