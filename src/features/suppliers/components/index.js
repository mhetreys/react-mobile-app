import React, { Component } from 'react';
import { Platform, Linking } from 'react-native';
import { Container, Content, Icon, View, Spinner, Text } from 'native-base';
import {
  navigateToActivities,
  navigateToSupplierContact,
  navigateToSupplierComment,
  navigateToHashTag,
} from './../../../navigation/actions';
import SupplierItem from './supplierItem';
import styles from './styles';
import HeaderMenuButton from './../../../components/headerMenuButton';

class Suppliers extends Component {
  static navigationOptions = {
    title: 'Suppliers',
    headerStyle: {
      backgroundColor: '#8e1921',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: <HeaderMenuButton />,
  };

  constructor() {
    super();

    this.state = {};

    this.onActivitiesClick = this.onActivitiesClick.bind(this);
    this.onCallSuppierClick = this.onCallSuppierClick.bind(this);
    this.onNavigateClick = this.onNavigateClick.bind(this);
    this.onCommentClick = this.onCommentClick.bind(this);
  }

  onActivitiesClick(supplier) {
    navigateToActivities(supplier);
  }

  onCommentClick(proposal_id, shortlisted_space_id) {
    navigateToSupplierComment({ proposal_id, shortlisted_space_id });
  }

  onHashTagClick(supplier) {
    navigateToHashTag({ supplier });
  }

  onCallSuppierClick(contacts) {
    navigateToSupplierContact({ contacts });
  }

  onNavigateClick(lat, lng, name) {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  }

  render() {
    const { suppliers } = this.props;
    const suppliersList = suppliers.suppliersList || [];

    if (suppliers.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner />
        </View>
      );
    }

    if (!suppliers.isLoading && !suppliersList.length) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Icon
            name="ios-list-box"
            style={{
              color: '#dadada',
              fontSize: 48,
            }}
          />
          <Text style={{ marginBottom: 20 }}>No Suppliers Available</Text>
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content style={styles.activityWrapper}>
          {suppliersList.map((supplier) => (
            <SupplierItem
              item={supplier}
              key={supplier.supplier_id}
              onActivitiesClick={this.onActivitiesClick}
              onCallSuppierClick={this.onCallSuppierClick}
              onNavigateClick={this.onNavigateClick}
              onCommentClick={this.onCommentClick}
              onHashTagClick={this.onHashTagClick}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

export default Suppliers;
