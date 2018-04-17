import {observable, action} from 'mobx'

class flyStore{

  @observable originEl;
  @observable needFly = false;

  @action removeEl() {
    this.originEl.innerHTML = null;
    // this.originEl.parentNode.removeChild(this.originEl);
  }

  @action resetNeedFly() {
    this.needFly = false;
  }

}
export default new flyStore()
