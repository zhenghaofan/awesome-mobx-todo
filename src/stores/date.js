import {observable, action} from 'mobx'
import  moment  from 'moment'

class dateStore{
  @observable newDate = moment()

  @action backDay() {
    this.newDate = moment(this.newDate).add(-1, 'days')
  }

  @action forwardDay(){
    this.newDate = moment(this.newDate).add(1, 'days')
  }

  @action setDay(d) {
    this.newDate = d
  }
}
export default new dateStore()
