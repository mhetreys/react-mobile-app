import React from 'react';
import { Linking } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Icon,
  Body,
  View
} from 'native-base';
import styles from './styles';


export default class CallSupplier extends React.Component {
	static navigationOptions = {
    title: 'Contacts',
    headerStyle: {
      backgroundColor: '#8e1921',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor() {
    super();

    this.onContactSelect = this.onContactSelect.bind(this);
    this.renderContactRow = this.renderContactRow.bind(this);
  }

  onContactSelect(number) {
    Linking.openURL(`tel:${number}`);
  }

  renderContactRow(contact) {
    const onRowPress = () => {
      this.onContactSelect(`${contact.country_code}${contact.mobile}`);
    }

    return (
      <ListItem noIndent key={contact.id} onPress={onRowPress}>
        <Body style={{ alignItems: 'center', marginLeft: 0 }}>
          <Text>{contact.name} - {contact.contact_type}</Text>
          <Text style={{ fontSize: 22, color: '#f0ad4e'}}>{contact.country_code}{contact.mobile}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    const { navigation } = this.props;
    const contacts = navigation.getParam('contacts', []);
    if(contacts && !contacts.length) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="contacts" style={{
            color: '#dadada',
            fontSize: 48
          }}></Icon>
          <Text style={{ fontSize: 18 }}>
            No contact available.
          </Text>
        </View>
      )
    };

  	return (
	    <Container style={styles.container}>
        <Content style={styles.activityWrapper}>
        	<List>
            {
              contacts.map(this.renderContactRow)
            }
        	</List>
        </Content>
      </Container>
	  );
  }
}
