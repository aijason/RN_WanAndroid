import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../component/NavBar';
import {DEVICE_WIDTH, getRealDP as dp} from '../utils/screenUtil';
import Color from '../utils/Color';
import {showToast} from '../utils/Utility';
import {fetchToLogin} from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from '../component/Touchable';

const propTypes = {};
const defaultProps = {};

/**
 * LoginScreen
 */
class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'aijason',
      password: 'asd123',
      isSecure: true,
    };
    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    const {navigation} = this.props;
    if (this.state.userName === '') {
      showToast('用户名不能为空');
    } else if (this.state.password === '') {
      showToast('密码不能为空');
    } else {
      fetchToLogin(
        {
          username: this.state.userName,
          password: this.state.password,
        },
        navigation,
      );
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <NavBar title={'登录'} navigation={navigation} />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.textInputWrapper}>
              <Icon name={'md-person'} size={dp(50)} color={Color.THEME} />
              <TextInput
                placeholder={'用户名'}
                placeholderTextColor={Color.TEXT_LIGHT}
                autoCapitalize={'none'}
                style={styles.textInput}
                value={this.state.userName}
                onChangeText={text => {
                  this.setState({userName: text});
                }}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <Icon name={'md-lock'} size={dp(50)} color={Color.THEME} />
              <TextInput
                placeholder={'密码'}
                placeholderTextColor={Color.TEXT_LIGHT}
                style={styles.textInput}
                value={this.state.password}
                secureTextEntry={this.state.isSecure}
                onChangeText={text => {
                  this.setState({password: text});
                }}
              />
              <Touchable
                activeOpacity={1}
                isPreventDouble={false}
                style={styles.eye}
                onPress={() => {
                  this.setState({isSecure: !this.state.isSecure});
                }}>
                <Icon
                  name={this.state.isSecure ? 'md-eye' : 'md-eye-off'}
                  size={dp(50)}
                  color={Color.THEME}
                />
              </Touchable>
            </View>
            <Touchable style={styles.login} onPress={this.toLogin}>
              <Text style={styles.loginText}>登录</Text>
            </Touchable>
            <Touchable
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.register}>
                <Text style={{color: Color.TEXT_LIGHT}}>新用户？去</Text>注册
              </Text>
            </Touchable>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: dp(100),
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: DEVICE_WIDTH * 0.7,
    height: dp(80),
    margin: dp(20),
    borderColor: Color.ICON_GRAY,
    borderBottomWidth: dp(1),
    paddingLeft: dp(5),
    paddingRight: dp(50),
    color: Color.TEXT_MAIN,
  },
  login: {
    width: DEVICE_WIDTH * 0.7,
    marginTop: dp(60),
    padding: dp(30),
    backgroundColor: Color.THEME,
    borderRadius: dp(50),
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: dp(32),
  },
  eye: {
    position: 'absolute',
    right: dp(20),
    backgroundColor: Color.WHITE,
    padding: dp(5),
  },
  register: {
    color: Color.THEME,
    marginTop: dp(40),
    fontSize: dp(28),
  },
});

LoginScreen.propTypes = propTypes;
LoginScreen.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
  };
};

export default connect(mapStateToProps)(LoginScreen);
