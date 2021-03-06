import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import deviceIcon from "@assets/device.png";
import './index.scss'

export default class StatisticsList extends Component {
  static defaultProps = {
    list: []
  }
  onClick = (item) => {
    const {userInfo} = this.props
    if (userInfo.isManager == 0) {
      Taro.showToast({title: '对不起！您没有权限操作', icon: 'none'})
      return
    }
    let param = JSON.stringify(item)
    Taro.navigateTo({url: '/pages/app-manager/app-manager?item=' + encodeURIComponent(param)})
  }

  render() {
    const {list, currentTabIndex} = this.props
    return (
      <View className='statistics-list'>
        {list.map(item => {
          return (
            <View className='statistics-list-item'>
              <View className='statistics-list-item-cycle'>
                <Image className='statistics-list-item-cycle-icon' src={item.icon === '' ? deviceIcon : item.icon} />
                <View className='statistics-list-item-cycle-detail'>
                  <View className='statistics-list-item-cycle-detail-app'>{item.name}</View>
                  <View className='statistics-list-item-cycle-detail-time'>
                    {currentTabIndex === 0 ? item.dayCostSeconds : (currentTabIndex === 1 ? item.weekCostSeconds : item.monthCostSeconds)}
                  </View>
                </View>
                <View className='statistics-list-item-cycle-manager' onClick={this.onClick.bind(this, item)}>管理</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
