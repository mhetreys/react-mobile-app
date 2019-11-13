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

function SupplierCampaignListItem({ onSupplierPress, item, isSelected }) {

  onSupplierClick = () => {
    onSupplierPress(item);
  }

  return (
    <List>
      <ListItem style={styles.listItem} last onPress={onSupplierClick} selected={isSelected}>
        <Text>{item.name}</Text>
      </ListItem>
    </List>
  );
}

export default SupplierCampaignListItem;
