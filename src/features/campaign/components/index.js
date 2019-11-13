import React, { Component } from 'react';
import { Container, Content, Spinner, View, Icon, Text, Button } from 'native-base';

import styles from './styles';
import { navigateToSuppliersByCampaign } from './../../../navigation/actions';

import CampaignItem from './campaignItem';

class Campaign extends Component {
  static navigationOptions = {
    title: 'Select Campaign',
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

    this.onCampaignPress = this.onCampaignPress.bind(this);
    this.onRetryClick = this.onRetryClick.bind(this);
  }

  onCampaignPress(campaign) {
    this.props.setSelectedCampaign({ campaign });
    this.props.setSelectedSupplier({ supplier: {} });

    navigateToSuppliersByCampaign({
      proposal_id: campaign.proposal_id,
    });
  }

  onRetryClick() {
    this.props.getCampaigns();
  }

  render() {
    const { campaigns } = this.props;
    const campaignsList = campaigns.campaignsList || [];
    const selectedCampaign = campaigns.selectedCampaign;
    const filteredCampaignsList = campaignsList.filter(item => campaigns.assignedCampaigns.indexOf(item.proposal_id) !== -1);

    if (campaigns.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner />
        </View>
      );
    }

    if (!campaigns.isLoading && campaigns.getFail) {
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
            name="megaphone"
            style={{
              color: '#dadada',
              fontSize: 48,
            }}
          />
          <Text style={{ marginBottom: 20 }}>Unable To Load Campaign</Text>
          <Button
            success
            style={{ textAlign: 'center', alignSelf: 'center' }}
            onPress={this.onRetryClick}
          >
            <Text>Retry</Text>
          </Button>
        </View>
      );
    }

    if (!campaigns.isLoading && !filteredCampaignsList.length) {
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
            name="megaphone"
            style={{
              color: '#dadada',
              fontSize: 48,
            }}
          />
          <Text style={{ marginBottom: 20 }}>No Campaigns Available</Text>
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content>
          {filteredCampaignsList.map((campaign) => (
            <CampaignItem
              key={campaign.proposal_id}
              item={campaign}
              isSelected={campaign.proposal_id === selectedCampaign.proposal_id}
              onCampaignPress={this.onCampaignPress}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

export default Campaign;
