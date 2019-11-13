import React from 'react';
import {
  Icon,
  View,
  Fab,
  Picker,
  Text
} from 'native-base';
import { Modal, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

function CameraImageModal({
  onModalClose,
  isModalVisible,
  modalImageURI,
  onSubmitButtonClick,
  onCommentChange,
  selectedComment
}) {

  const comments = [
    {
      label: 'Good Condition',
      value: 'Good Condition'
    }, {
      label: 'Torn',
      value: 'Torn'
    }, {
      label: 'Stolen',
      value: 'Stolen'
    }, {
      label: 'Completely Broken',
      value: 'Completely Broken'
    }, {
      label: 'Partially Broken',
      value: 'Partially Broken'
    },
  ];
  return (
    <Modal
      transparent={false}
      animationType={'fade'}
      visible={isModalVisible}
      onRequestClose={onModalClose}
    >
      <View style={styles.modelStyle}>
        <Image
          style={styles.fullImageStyle}
          source={{ uri: modalImageURI }}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.closeButtonStyle}
          onPress={onModalClose}
        >
          <Icon name="close" style={{ color: '#fff', fontSize: 32, marginTop: 10 }} />
        </TouchableOpacity>
        <View style={styles.commentInput}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 13 }}>Add a comment</Text>
            <Picker
              style={{ width: '100%', color: '#bdbdbd' }}
              selectedValue={selectedComment}
              onValueChange={onCommentChange}
              placeholder="Add a comment"
            >
              {
                comments.map(comment =>
                  <Picker.Item label={comment.label} value={comment.value} key={comment.value} />
                )
              }
            </Picker>
          </View>
          <Fab
            containerStyle={{ }}
            style={{ backgroundColor: '#D95350' }}
            position="bottomRight"
            onPress={onSubmitButtonClick}
          >
            <Icon name="send" />
          </Fab>
        </View>
      </View>
    </Modal>
  );
}

export default CameraImageModal;
