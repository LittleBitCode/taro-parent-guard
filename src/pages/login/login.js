import Taro, {Component} from '@tarojs/taro'
import {View, Input, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import './login.scss'

@connect(state => state.user, {...actions})
export default class Login extends Component {

  config = {
    navigationBarTitleText: '登录',
    tabBar: ''
  }

  state = {
    mobile: '',
    password: ''
  }

  login = () => {
    const {mobile, password} = this.state
    if (!(/^1[23456789]\d{9}$/.test(mobile))) {
      Taro.showToast({title: '请输入正确的手机号', icon: 'none'})
      return;
    }
    if (password === '') {
      Taro.showToast({title: '请输入密码', icon: 'none'})
      return;
    }
    this.props.dispatchLogin({mobile: mobile, password: password}).then((res) => {
      if (res.status === "success") {
        Taro.switchTab({url: '/pages/home/home'})
      } else {
        Taro.showToast({title: res.data.errorMessage, icon: 'none'})
      }
    })
  }

  onHandleMobileInput = (e) => {
    this.setState({mobile: e.detail.value})
  }
  onHandlePasswordInput = (e) => {
    this.setState({password: e.detail.value})
  }

  render() {
    return (
      <View className='login'>
        <View className='login-top'>
          <View className='login-top-hello'>您好！</View>
          <View className='login-top-welcome'>欢迎登录家长护航</View>
        </View>
        <View className='login-form'>
          <View className='login-form-mobile-password'>
            <View className='login-form-mobile'>
              <Input className='login-form-mobile-input' type='text' onChange={this.onHandleMobileInput} placeholder='请输入手机号'
                     value={this.state.mobile}/>
            </View>
            <View className='login-form-password'>
              <Input className='login-form-password-input' type='password' onChange={this.onHandlePasswordInput} placeholder='请输入密码'
                     value={this.state.password}/>
            </View>
          </View>
          <View className='button-bg-view'>
            <Button className='login-button' onClick={this.login}>立即登录</Button>
          </View>
        </View>
      </View>
    )
  }
}

