import React, { Component } from 'react';
import {
  Container,
  Content,
  Spinner,
  View,
  Icon,
  Text
} from 'native-base';

import styles from './styles';
import { navigateToActivities } from './../../../navigation/actions';

import SupplierCampaignListItem from './supplierCampaignListItem';

class SupplierListByCampaign extends Component {
  static navigationOptions = {
    title: 'Select Supplier',
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

    this.state = {};

    this.onSupplierPress = this.onSupplierPress.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const campaignId = navigation.getParam('proposal_id', '');

    this.props.getSupplierByCampaign({ campaignId });
  }

  onSupplierPress(selectedSupplier) {
    this.props.setSelectedSupplier({ supplier: selectedSupplier });

    navigateToActivities({});
  }

  render() {
    const { navigation, supplier } = this.props;
    const campaignId = navigation.getParam('proposal_id', '');
    const suppliersList = supplier.suppliersByCampaignId[campaignId] || [];
    const assignedSuppliers = supplier.suppliersList.map(
      (item) => item.supplier_id
    );
    const filteredSuppliersList = suppliersList.filter(
      (item) => assignedSuppliers.indexOf(item.supplier_id) !== -1
    );
    const { selectedSupplier } = supplier;

    if (supplier.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner />
        </View>
      );
    }

    if (!supplier.isLoading && !filteredSuppliersList.length) {
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

    filteredSuppliersList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return (
      <Container style={styles.container}>
        <Content>
          {filteredSuppliersList.map((supplier) => (
            <SupplierCampaignListItem
              key={supplier.supplier_id}
              item={supplier}
              onSupplierPress={this.onSupplierPress}
              isSelected={supplier.supplier_id === selectedSupplier.supplier_id}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

export default SupplierListByCampaign;
