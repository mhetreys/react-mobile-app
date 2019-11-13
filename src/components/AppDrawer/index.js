import React from "react";
import styles from "./styles";
import {
  Container,
  Content,
  Icon,
  View,
  Text,
  List,
  ListItem,
  Right,
} from 'native-base';
import {
  closeDrawer,
  navigateToSuppliers,
  navigateToLeads,
  navigateToActivities,
  navigateToCampaign,
  navigateToSuppliersByCampaign,
  navigateToAuth,
  navigateToProfile
} from "./../../navigation/actions";

const AppDrawer = ({ profile, campaign, supplier, doLogout }) => {
  const { selectedCampaign } = campaign;
  const { selectedSupplier } = supplier;

  const user = profile.user || {};

  const onSuppliersPress = () => {
    closeDrawer();
    navigateToSuppliers();
  };

  const onLeadsPress = () => {
    closeDrawer();
    navigateToLeads({ campaignId: selectedCampaign.proposal_id, supplier_id: selectedSupplier.supplier_id });
  };

  const onActivityPress = () => {
    closeDrawer();
    navigateToActivities();
  }

  const onSelectedCampaignPress = () => {
    closeDrawer();
    navigateToCampaign();
  }

  const onSelectedSupplierPress = () => {
    closeDrawer();
    navigateToSuppliersByCampaign({ proposal_id: selectedCampaign.proposal_id });
  }

  const onProfilePress = () => {
    closeDrawer();
    navigateToProfile();
  }

  const onLogoutPress = () => {
    // Perform logout
    doLogout();

    // Navigate to login
    navigateToAuth();
  };

  return (
    <Container>
      <Content>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={{ fontSize: 21, fontFamily: 'Roboto_medium' }}>{user.name}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>{user.username}</Text>
          <Text note>{user.email}</Text>
        </View>
        <View>
          <List>
            <ListItem last onPress={onSelectedCampaignPress}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.screenTextStyle}>Campaign</Text>
                <Text note>
                  {
                    selectedCampaign && selectedCampaign.name ?
                      selectedCampaign.name :
                      "Not Selected"
                  }
                </Text>
              </View>
              <Right>
                <Icon name="create"/>
              </Right>
            </ListItem>
            <ListItem last onPress={onSelectedSupplierPress}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.screenTextStyle}>Supplier</Text>
                <Text note>
                  {
                    selectedSupplier && selectedSupplier.name ?
                      selectedSupplier.name :
                      "Not Selected"
                  }
                </Text>
              </View>
              <Right>
                <Icon name="create"/>
              </Right>
            </ListItem>
          </List>
        </View>
        <View style={styles.screenContainer}>
          <List>
            <ListItem last onPress={onActivityPress}>
              <Text style={styles.screenTextStyle}>Activities</Text>
            </ListItem>
            <ListItem last onPress={onSuppliersPress}>
              <Text style={styles.screenTextStyle}>Suppliers</Text>
            </ListItem>
            <ListItem last onPress={onLeadsPress}>
              <Text style={styles.screenTextStyle}>Leads</Text>
            </ListItem>
            <ListItem last onPress={onProfilePress}>
              <Text style={styles.screenTextStyle}>Profile</Text>
            </ListItem>
            <ListItem last onPress={onLogoutPress}>
              <Text style={styles.screenTextStyle}>Logout</Text>
            </ListItem>
            <ListItem last>
            </ListItem>
          </List>
        </View>
      </Content>
    </Container>
  );
};

export default AppDrawer;
