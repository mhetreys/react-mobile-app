import React from 'react';
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
  View
} from 'native-base';

import styles from './styles';
  
// const getStatusColor = (status) => {
//    switch (status) {
//     case 'complete':
//       return { info: true };

//     case 'pending':
//       return { warning: true };
//   }
// };

const getStatusText = (status) => {
  switch (status) {
    case 'complete':
      return 'Complete';

    case 'pending':
      return 'Pending';
  }
};

function ActivityItem({ item, onCaptureClick, onImageClick }) {
  const onCapture = () => {
    onCaptureClick(item);
  }

  const onImage = () => {
    onImageClick(item);
  }

  return (
    <Card>
      <CardItem style={styles.cardItem}>
        <Left>
          <Body style={{ marginLeft: 0 }}>
            <Text style={{ fontSize: 14, fontFamily: 'Roboto_medium', color: '#000000de' }}>{item.inventory_name}({item.inventory_id})</Text>
            <Text style={{ fontSize: 12, color: '#00000099' }}>{item.activity_type}</Text>
          </Body>
        </Left>
        <Right>
          <View style={styles.badgeStyle}>
            <Text style={{ fontSize: 13, color: 'white' }}>{getStatusText(item.status)}</Text>
          </View>
        </Right>
      </CardItem>
      <CardItem style={styles.cardItem} cardBody>
        <View style={{flexDirection: 'row', paddingHorizontal: 18 }}>
          <Icon name="time" style={styles.infoIcon} />
          <Text style={{ fontSize: 13 }}>{item.due_date}</Text>
        </View>
      </CardItem>
      <CardItem style={styles.cardItem} last>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={styles.buttonWrapper}>
            <Button transparent iconLeft style={styles.cardButton} success onPress={onImage}>
              <Icon name="image" style={styles.iconStyle} />
              <Text style={{fontSize: 13}}>{item.images.length} Images</Text>
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button transparent iconLeft style={styles.cardButton} onPress={onCapture} success>
              <Icon name="camera" style={styles.iconStyle} />
              <Text style={{fontSize: 13}}>Capture</Text>
            </Button>
          </View>
        </View>
      </CardItem>
    </Card>
  );
}

export default ActivityItem;
