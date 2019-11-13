import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Dimensions, Linking } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Content,
  Badge,
  Spinner,
  View,
  Item,
  Input,
  Form,
  Label,
  Fab,
} from 'native-base';
import HeaderMenuButton from './../../../components/headerMenuButton';

import styles from './styles';

const getLatestExtraLead = (extraLeadsList) => {
  const newExtraLeadsList = extraLeadsList.slice();

  newExtraLeadsList.sort(
    (a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
  );

  return newExtraLeadsList[0];
};

class Leads extends Component {
  static navigationOptions = {
    title: 'Leads',
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

    this.state = {
      leadsForm: {},
      isAddModalVisible: false,
      errors: {},
      hotLead: '',
      totalLead: '',
    };

    this.onAddCommentClick = this.onAddCommentClick.bind(this);
    this.onAddCommentClose = this.onAddCommentClose.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onHotLeadChange = this.onHotLeadChange.bind(this);
    this.onTotalLeadChange = this.onTotalLeadChange.bind(this);
    this.onLeadLinkClick = this.onLeadLinkClick.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const campaignId = navigation.getParam('campaignId', []);
    this.props.getLeads({ campaignId });
  }

  componentDidUpdate(prevProps) {
    const { leads, navigation } = this.props;
    const campaignId = navigation.getParam('campaignId', []);
    const supplierId = navigation.getParam('supplier_id', []);
    const {
      leadsList,
      isLoading,
      extraLeadsList,
      isExtraLeadsLoading,
      postSuccess,
      postError,
    } = leads;
    const leadsListKeys = leadsList ? Object.keys(leadsList) : [];

    let newState = {};
    let stateCallback = () => {};

    if (
      leadsListKeys &&
      leadsListKeys.length &&
      prevProps.leads.isLoading &&
      !isLoading
    ) {
      const leadsForm = leadsList[leadsListKeys[0]];
      const leads_form_id = leadsForm.leads_form_id;

      newState = {
        leadsForm,
      };

      stateCallback = () => {
        this.props.getExtraLeads({ campaignId, supplierId, leads_form_id });
      };
    }

    if (
      extraLeadsList &&
      extraLeadsList.length &&
      prevProps.leads.isExtraLeadsLoading &&
      !isExtraLeadsLoading
    ) {
      const latestExtraLead = getLatestExtraLead(extraLeadsList);

      newState = {
        hotLead: `${latestExtraLead.extra_hot_leads}`,
        totalLead: `${latestExtraLead.extra_leads}`,
      };
    }

    if (!prevProps.leads.postSuccess && leads.postSuccess && !leads.postError) {
      newState = {
        isAddModalVisible: false,
      };

      stateCallback = () => {
        this.props.getExtraLeads({
          campaignId,
          supplierId,
          leads_form_id: this.state.leadsForm.leads_form_id,
        });
      };
    }

    if (Object.keys(newState).length) {
      this.setState(newState, stateCallback);
    }
  }

  onAddCommentClick() {
    this.setState({
      newComment: '',
      isAddModalVisible: true,
    });
  }

  onAddCommentClose() {
    this.setState({
      isAddModalVisible: false,
    });
  }

  onLeadLinkClick() {
    const { navigation } = this.props;
    const supplierId = navigation.getParam('supplier_id', []);
    const { leadsForm } = this.state;
    const url =
      'https://platform.machadalo.com/#/enterLeadsFromApplication/' +
      leadsForm.leads_form_id +
      '/' +
      supplierId;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  onHotLeadChange(hotLead) {
    this.setState({ hotLead });
  }

  onTotalLeadChange(totalLead) {
    this.setState({ totalLead });
  }

  onSaveButtonClick() {
    const { navigation } = this.props;
    const campaignId = navigation.getParam('campaignId', []);
    const supplierId = navigation.getParam('supplier_id', []);
    const { leadsForm, hotLead, totalLead } = this.state;

    const leadsData = {
      supplier_id: `${supplierId}`,
      campaign_id: `${campaignId}`,
      extra_hot_leads: +hotLead,
      extra_leads: +totalLead,
    };

    this.props.postExtraLeads({
      leadsData,
      leads_form_id: leadsForm.leads_form_id,
    });
  }

  render() {
    const { leads } = this.props;
    const { extraLeadsList, isExtraLeadsLoading } = leads;
    const { isAddModalVisible } = this.state;

    if (isExtraLeadsLoading !== false) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner />
        </View>
      );
    }

    const latestExtraLead = getLatestExtraLead(extraLeadsList);

    if (isAddModalVisible) {
      return (
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isAddModalVisible}
          onRequestClose={this.onAddCommentClose}
        >
          <Container
            style={{
              position: 'relative',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              alignItem: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderRadius: 5,
                width: '90%',
                padding: 20,
                alignItem: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: '50%',
                transform: [
                  {
                    translateX:
                      -Dimensions.get('window').width * (90 / 100) * 0.5,
                  },
                ],
              }}
            >
              <Text
                style={{ fontSize: 24, color: '#9E9E9E', marginBottom: 20 }}
              >
                Edit Form
              </Text>
              <Form
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <Item
                  floatingLabel
                  style={styles.item}
                  error={!!this.state.errors.hotLead}
                >
                  <Label>Hot Leads</Label>
                  <Input
                    onChangeText={this.onHotLeadChange}
                    value={this.state.hotLead}
                    keyboardType="numeric"
                  />
                </Item>
                <Item
                  floatingLabel
                  style={styles.item}
                  error={!!this.state.errors.totalLead}
                >
                  <Label>Total Leads</Label>
                  <Input
                    onChangeText={this.onTotalLeadChange}
                    value={this.state.totalLead}
                    keyboardType="numeric"
                  />
                </Item>
                <Button
                  block
                  style={{ marginTop: 50 }}
                  onPress={this.onSaveButtonClick}
                  success
                >
                  <Text>Save</Text>
                </Button>
              </Form>
            </View>
            <Button
              onPress={this.onAddCommentClose}
              transparent
              style={{ position: 'absolute', top: 60, right: 20 }}
            >
              <Icon name="close" style={{ fontSize: 36 }} />
            </Button>
          </Container>
        </Modal>
      );
    }

    if (extraLeadsList && !extraLeadsList.length) {
      return (
        <Container style={styles.container}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon
              name="git-network"
              style={{
                color: '#dadada',
                fontSize: 48,
              }}
            />
            <Text>No Leads Available</Text>
          </View>
          <Fab
            active={this.state.isAddModalVisible}
            containerStyle={{}}
            style={{ backgroundColor: '#D95350' }}
            position="bottomRight"
            onPress={this.onAddCommentClick}
          >
            <Icon name="create" />
          </Fab>
        </Container>
      );
    }

    return (
      <Container style={styles.container}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Roboto_medium',
              marginBottom: 10,
            }}
          >
            {this.state.leadsForm.leads_form_name}
          </Text>
          <Text style={{ marginBottom: 10 }} note>
            {moment(latestExtraLead.created_at).format('Do MMM,YYYY HH:mm')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 58,
                  fontFamily: 'Roboto_medium',
                  marginBottom: 5,
                  opacity: 0.53,
                }}
              >
                {latestExtraLead.extra_hot_leads}
              </Text>
              <Text style={{ fontSize: 18 }}>Hot Leads</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 1,
                height: '100%',
                backgroundColor: '#fafafa',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 58,
                  fontFamily: 'Roboto_medium',
                  marginBottom: 5,
                  opacity: 0.53,
                }}
              >
                {latestExtraLead.extra_leads}
              </Text>
              <Text style={{ fontSize: 18 }}>Total Leads</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}
          >
            <Button block onPress={this.onLeadLinkClick} success>
              <Text>Leads Link</Text>
            </Button>
          </View>
        </View>
        <Fab
          active={this.state.isAddModalVisible}
          containerStyle={{}}
          style={{ backgroundColor: '#D95350' }}
          position="bottomRight"
          onPress={this.onAddCommentClick}
        >
          <Icon name="create" />
        </Fab>
      </Container>
    );
  }
}

export default Leads;
