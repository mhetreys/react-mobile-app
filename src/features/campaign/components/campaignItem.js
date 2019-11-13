import React from 'react';
import {
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Badge,
  View,
  List,
  ListItem
} from 'native-base';

import styles from './styles';

function CampaignItem({ onCampaignPress, item, isSelected }) {

  onCampaign = () => {
    onCampaignPress(item);
  }

  return (
    <List>
      <ListItem style={styles.listItem} last onPress={onCampaign} selected={isSelected}>
        <Text>{item.name}</Text>
      </ListItem>
    </List>
  );
}

export default CampaignItem;
