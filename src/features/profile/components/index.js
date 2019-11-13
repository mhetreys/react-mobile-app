import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Dimensions } from 'react-native';
import {
  Container,
  Text,
  View,
  Thumbnail
} from 'native-base';
import user from './../images/user.png';

import styles from './styles';

class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    console.log('profile', this.props);
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{
            backgroundColor: '#8e1921',
            height: Dimensions.get('window').height * (30/100),
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <View style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: '#FFEBEE',
              transform: [
                { translateY: 60 },
              ],
              overflow: 'hidden',
              backgroundColor: '#FFEBEE',
            }}>
              <Thumbnail
                source={user}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "cover",
                  overflow: 'hidden'
                }}
              >
              </Thumbnail>
            </View>
         </View>
         <View style={{
           paddingVertical: 80,
           alignItems: 'center',
         }}>
            <Text style={{ fontSize: 32, fontFamily: 'Roboto_medium', color: '#000000de', marginBottom: 10 }}>{this.props.profile.user.name}</Text>
            <Text note style={{ marginBottom: 10}}>{this.props.profile.user.email}</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>username - {this.props.profile.user.username}</Text>
         </View>
        </View>
      </Container>
    );
  }
}

export default Profile;
