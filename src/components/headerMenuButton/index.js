import React from 'react';
import {
  Platform,
} from "react-native";
import { openDrawer } from "./../../navigation/actions";
import { Icon, Button } from 'native-base';

export default function HeaderMenuButton() {
  return (
    <Button transparent style={{ height: 55 }} onPress={() => openDrawer()}> 
      <Icon name="menu" style={{ color: '#FFFFFF', marginBottom: (Platform.OS === 'ios' ? 8 : 0) }} />
    </Button>
  )
}