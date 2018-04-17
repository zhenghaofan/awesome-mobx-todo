import {observable, action} from 'mobx'

class tabsKeyStore{
  @observable activeKey = 'non_complete'
  @action setActiveKey (status) {
    this.activeKey = status
  }
}
export default new tabsKeyStore()
