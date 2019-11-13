import React from 'react';
import { Toast } from 'native-base';

import Camera from './../../../components/camera';
import CameraImageModal from './cameraImageModal';

import { navigateToActivities } from './../../../navigation/actions';

export default class Capture extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      isModalVisible: false,
      imageURI: '',
      location: {},
      showToast: false,
      comment: null,
    };

    this.onPhotoSaved = this.onPhotoSaved.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  onPhotoSaved({ photo, location }) {
    this.setState({
      isModalVisible: true,
      imageURI: photo.uri,
      location: location,
    });
  }

  onModalClose() {
    this.setState({
      isModalVisible: false,
    });
  }

  onCommentChange(itemValue) {
    this.setState({ comment: itemValue });
  }

  onSubmitButtonClick() {
    const { navigation } = this.props;
    const activity = navigation.getParam('activity', {});
    const activityId = activity.activity_id;

    const data = new FormData();
    data.append('file', {
      type: 'image/jpg',
      uri: this.state.imageURI,
      name: 'activityImage.jpg',
    });
    data.append('supplier_name', this.props.supplier.selectedSupplier.name);
    data.append('activity_type', activity.activity_type);
    data.append('actual_activity_date', activity.actual_activity_date);
    data.append('inventory_name', activity.inventory_name);
    data.append(
      'inventory_activity_assignment_id',
      activity.inventory_activity_assignment_id,
    );
    data.append('lat', this.state.location.coords.latitude);
    data.append('long', this.state.location.coords.longitude);
    data.append('activity_date', activity.activity_date);
    data.append('comment', this.state.comment);
    
    if(activity.dynamic){
      data.append('dynamic', activity.dynamic);
    }else{
      data.append('dynamic', false);
    }


    this.props.postImage(activityId, data);

    // Navigate to activity
    navigateToActivities();
  }

  render() {
    if (this.state.isModalVisible) {
      return (
        <CameraImageModal
          onModalClose={this.onModalClose}
          isModalVisible={this.state.isModalVisible}
          modalImageURI={this.state.imageURI}
          onCommentChange={this.onCommentChange}
          onSubmitButtonClick={this.onSubmitButtonClick}
          selectedComment={this.state.comment}
        />
      );
    } else return <Camera onPhotoSaved={this.onPhotoSaved} />;
  }
}
