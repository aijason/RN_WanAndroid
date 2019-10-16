import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../../component/NavBar';
import {DEVICE_WIDTH, getRealDP as dp} from '../../utils/screenUtil';
import Color from '../../utils/Color';
import {i18n, showToast} from '../../utils/Utility';
import {fetchToLogin} from '../../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from '../../component/Touchable';

const propTypes = {};
const defaultProps = {};

/**
 * LoginScreen
 */
class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isSecure: true,
    };
    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    const {navigation} = this.props;
    if (this.state.userName === '') {
      showToast(i18n('User name cannot be empty'));
    } else if (this.state.password === '') {
      showToast(i18n('Password cannot be empty'));
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
    const {navigation, themeColor} = this.props;
    return (
      <View style={styles.container}>
        <NavBar title={i18n('login')} navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.textInputWrapper}>
              <Icon name={'md-person'} size={dp(50)} color={themeColor} />
              <TextInput
                autoFocus
                placeholder={i18n('userName')}
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
              <Icon name={'md-lock'} size={dp(50)} color={themeColor} />
              <TextInput
                placeholder={i18n('password')}
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
                  color={themeColor}
                />
              </Touchable>
            </View>
            <Touchable
              style={[styles.login, {backgroundColor: themeColor}]}
              onPress={this.toLogin}>
              <Text style={styles.loginText}>{i18n('login')}</Text>
            </Touchable>
            <Touchable
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={[styles.register, {color: themeColor}]}>
                <Text style={{color: Color.TEXT_LIGHT}}>
                  {i18n('New users? To')}
                </Text>
                {i18n('register')}
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
    marginTop: dp(40),
    fontSize: dp(28),
  },
});

LoginScreen.propTypes = propTypes;
LoginScreen.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfo: state.user.userInfo,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(LoginScreen);
