import React, { Component } from 'react';
import {
  Container,
  Text,
  Icon,
  Content,
  View,
} from 'native-base';
import { RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import {
  navigateToActivityCapture,
  navigateToViewImages,
} from './../../../navigation/actions';
import HeaderMenuButton from './../../../components/headerMenuButton';

import styles from './styles';
import ActivityItem from './activityItem';

class Activities extends Component {
  static navigationOptions = {
    title: 'Activity',
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
      isRefreshing: false,
    };

    this.onCaptureClick = this.onCaptureClick.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.setActivityList = this.setActivityList.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    let supplierActivity = navigation.getParam('activities', null);

    if (supplierActivity) {
      this.props.setActivityList({ list: supplierActivity });
    } else {
      const { supplier } = this.props;

      this.setActivityList(supplier);
    }
  }

  componentDidUpdate(prevProps) {
    const { supplier: prevSupplier } = prevProps;
    const { supplier: newSupplier } = this.props;

    if (
      (!(
        prevSupplier.selectedSupplier &&
        prevSupplier.selectedSupplier.supplier_id
      ) &&
        (newSupplier.selectedSupplier &&
          newSupplier.selectedSupplier.supplier_id)) ||
      (prevSupplier.selectedSupplier &&
        prevSupplier.selectedSupplier.supplier_id &&
        newSupplier.selectedSupplier &&
        newSupplier.selectedSupplier.supplier_id &&
        prevSupplier.selectedSupplier.supplier_id !==
          newSupplier.selectedSupplier.supplier_id)
    ) {
      this.setActivityList(newSupplier);
    }

    if (this.state.isRefreshing) {
      this.setState({
        isRefreshing: false,
      }, () => {
        this.setActivityList(newSupplier);
      });
    }

    // TODO: Handle case when activity data is passed through navigation params
  }

  onCaptureClick(activity) {
    navigateToActivityCapture({ activity });
  }

  onImageClick(activity) {
    navigateToViewImages({ activity });
  }

  onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });

    // Fetch activities list
    this.props.getSuppliers();
  };

  setActivityList(supplier) {
    let supplierActivity = [];
    const { suppliersList = [], selectedSupplier } = supplier;

    for (let i = 0, l = suppliersList.length; i < l; i += 1) {
      if (selectedSupplier.supplier_id === suppliersList[i].supplier_id) {
        supplierActivity = suppliersList[i].activities;
        break;
      }
    }

    this.props.setActivityList({ list: supplierActivity });
  }

  render() {
    const { activityList } = this.props.activity;
    const { isRefreshing } = this.state;
    // if (!activityList.length) {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //       <Spinner/>
    //     </View>
    //   );
    // }

    if (!activityList.length) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon
            name="pulse"
            style={{
              color: '#dadada',
              fontSize: 48,
            }}
          />
          <Text style={{ fontSize: 18 }}>No activities available.</Text>
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content style={styles.activityWrapper} refreshControl={ <RefreshControl onRefresh={this.onRefresh} refreshing={isRefreshing} /> }>
          {activityList.map((item) => (
            <ActivityItem
              key={item.activity_id}
              item={item}
              onCaptureClick={this.onCaptureClick}
              onImageClick={this.onImageClick}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

export default withNavigationFocus(Activities);
