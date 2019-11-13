import React from 'react';
import { Icon, View, Fab, Picker, Text } from 'native-base';
import { comments, hashtags } from './../constants';
import { Modal, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

function CameraHashtagModal({
  onModalClose,
  isModalVisible,
  modalImageURI,
  onSubmitButtonClick,
  onCommentChange,
  selectedComment,
  onHashtagChange,
  selectedHashtag,
}) {
  
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
          <Icon
            name="close"
            style={{ color: '#fff', fontSize: 32, marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={styles.commentInput}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 13 }}>Add a hashtag</Text>
            <Picker
              style={{ width: '100%', color: '#bdbdbd' }}
              selectedValue={selectedHashtag}
              onValueChange={onHashtagChange}
            >
              {hashtags.map((hashtag) => (
                <Picker.Item
                  label={hashtag.label}
                  value={hashtag.value}
                  key={hashtag.value}
                />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 13  }}>Add a comment</Text>
            <Picker
              style={{ width: '100%', color: '#bdbdbd' }}
              selectedValue={selectedComment}
              onValueChange={onCommentChange}
            >
              {comments.map((comment) => (
                <Picker.Item
                  label={comment.label}
                  value={comment.value}
                  key={comment.value}
                />
              ))}
            </Picker>
          </View>
          <Fab
            containerStyle={{}}
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

export default CameraHashtagModal;
