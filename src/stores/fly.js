import {observable, action} from 'mobx'

class flyStore{

  @observable originEl;

  @action removeEl() {
    this.originEl.innerHTML = null;
  }

}
export default new flyStore()
