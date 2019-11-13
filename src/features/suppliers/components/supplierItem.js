import React from 'react';
import { Platform } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Badge,
  View,
} from 'native-base';

import styles from './styles';
  
const getStatusColor = (status) => {
   switch (status) {
    case 'complete':
      return { primary: true };

    case 'ongoing':
      return { info: true };

    case 'pending':
      return { danger: true };

    case 'upcoming':
      return { warning: true };
  }
};

function SupplierItem({
  item,
  onActivitiesClick,
  onCallSuppierClick,
  onNavigateClick,
  onCommentClick,
  onHashTagClick
}) {
  const onActivity = () => {
    onActivitiesClick(item);
  }

  const onCall = () => {
    onCallSuppierClick(item.supplier_detail.contacts);
  }

  const onNavigate = () => {
    onNavigateClick(item.supplier_detail.latitude, item.supplier_detail.longitude, item.supplier_detail.name);
  }

  const onComment = () => {
    onCommentClick(item.proposal_id, item.shortlisted_space_id);
  }

  const onHashTag = () => {
    onHashTagClick(item);
  }

  return (
    <Card>
      <CardItem>
        <Left>
          <Body style={{ marginLeft: 0 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Roboto_medium', color: '#000000de' }}>{item.supplier_detail.name}</Text>
            <Text style={{ fontSize: 12, color: '#00000099' }}>{item.proposal_name}</Text>
          </Body>
        </Left>
        <Right>
          <View style={{ flexDirection: 'row' }}>
            <Button full transparent onPress={onNavigate} style={{paddingRight: 10}}>
              <Icon name="navigate" style={{ ...styles.iconStyle, color: '#62B1F6'}} />
            </Button>
            <Button full transparent onPress={onCall} > 
              <Icon name="call" style={{ ...styles.iconStyle, color: '#5cb85c' }} />
            </Button>
          </View>
        </Right>
      </CardItem>
      <CardItem style={styles.cardItem} cardBody>
        <View style={{flexDirection: 'row', paddingLeft: 18 }}>
          <Text style={{fontSize: 13}}>
            {item.supplier_detail.address1}
            {item.supplier_detail.address2}
          </Text>
        </View>
      </CardItem>
      <CardItem style={styles.cardItem} last>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={styles.buttonWrapper}>
            <Button transparent iconLeft style={styles.cardButton} success onPress={onHashTag}>
              <Icon name="camera" style={styles.iconStyle} />
              <Text style={{fontSize: 13}}>HASHTAG</Text>
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button transparent iconLeft style={styles.cardButton} success onPress={onComment}>
              <Icon name="chatboxes" style={styles.iconStyle} />
              <Text style={{fontSize: 13}}>COMMENTS</Text>
            </Button>
          </View>
         {/* <View style={styles.buttonWrapper}>
            <Button transparent iconLeft style={styles.cardButton} success onPress={onActivity}>
              <Icon name="pulse" style={styles.iconStyle} />
              <Text style={{fontSize: 13}}>ACTIVITIES</Text>
            </Button>
          </View>*/}
        </View>
      </CardItem>
    </Card>
  );
}

export default SupplierItem;
