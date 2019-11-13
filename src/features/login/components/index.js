import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Form,
  Text,
  Thumbnail,
  View,
  Toast
} from 'native-base';
import styles from './styles';
import logo from './../../../../assets/logo.png';

const validate = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Please enter an email';
  }

  if (!data.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
};

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      errors: {},
      // email: 'vidhidevelopment',
      // password: 'hdtetsp256#',
      email: '',
      password: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }


  componentDidUpdate(prevProps) {
    const { login: newLogin } = this.props;
    const { login: prevLogin } = prevProps;

    if(newLogin.user && !newLogin.isLoading && prevLogin.isLoading) {
      // Redirect to `Splash`
      this.props.navigation.navigate('Splash');
    } else if(!newLogin.user && !newLogin.isLoading && prevLogin.isLoading) {
      Toast.show({
        text: 'Wrong password!',
        buttonText: 'Okay'
      });
    }
  }

  onEmailChange(value) {
    this.setState({
      email: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      password: value,
    });
  }

  onLoginClick() {
    // Validate input data
    const errors = validate(this.state);

    if (Object.keys(errors).length) {
      this.setState({
        errors,
      });
    } else {
      this.props.doLogin(this.state);
    }
  }

  render() {
    const { login } = this.props;

    return (
      <Container style={styles.container}>
        <View style={styles.loginWrapper}>
          <View style={styles.logoView}>
            <Thumbnail style={styles.logo} square source={logo} />
          </View>
          <Form>
            <Item floatingLabel style={styles.item} error={!!this.state.errors.email}>
              <Label>Email</Label>
              <Input
                onChangeText={this.onEmailChange}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel style={styles.item} error={!!this.state.errors.password}>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={this.onPasswordChange}
                value={this.state.password}
              />
            </Item>
            <Button
              block
              success
              style={{ marginTop: 50 }}
              onPress={this.onLoginClick}
              disabled={login.isLoading}
            >
              <Text>
                {
                  !login.isLoading ?
                    'Sign In' :
                    'Signing In...'
                }
              </Text>
            </Button>
          </Form>
        </View>
      </Container>
    );
  }
}

export default Login;
