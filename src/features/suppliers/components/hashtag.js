import React from 'react';
import { Toast } from "native-base";
import Camera from './../../../components/camera';
import CameraHashtagModal from './cameraHashtagModal';
import { comments, hashtags } from './../constants';
import { navigateToSuppliers } from './../../../navigation/actions';

export default class Hashtag extends React.Component {
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
      comment: comments[0].value,
      hashtag: hashtags[0].value,
    };

    this.onPhotoSaved = this.onPhotoSaved.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onHashtagChange = this.onHashtagChange.bind(this);
  }

  componentDidUpdate() {
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

  onHashtagChange(itemValue) {
    this.setState({ hashtag: itemValue });
  }

  onSubmitButtonClick() {
    const { navigation } = this.props;
    const supplier = navigation.getParam('supplier', []);

    const data = new FormData();
    data.append('file', {
      type: 'image/jpg',
      uri: this.state.imageURI,
      name: 'hashtagImage.jpg',
    });
    data.append('supplier_name', supplier.supplier_detail.name);
    data.append('campaign_name', supplier.proposal_name);
    data.append('hashtag', this.state.hashtag);
    data.append('campaign_id', supplier.proposal_id);
    data.append('supplier_id', supplier.supplier_id);
    data.append('lat', this.state.location.coords.latitude);
    data.append('long', this.state.location.coords.longitude);
    data.append('comment', this.state.comment);


    this.props.postHashtag(data);

    // Navigate to activity
    navigateToSuppliers();
  }


  render() {
    if (this.state.isModalVisible) {
      return (
        <CameraHashtagModal
          onModalClose={this.onModalClose}
          isModalVisible={this.state.isModalVisible}
          modalImageURI={this.state.imageURI}
          onCommentChange={this.onCommentChange}
          onSubmitButtonClick={this.onSubmitButtonClick}
          selectedComment={this.state.comment}
          selectedHashtag={this.state.hashtag}
          onHashtagChange={this.onHashtagChange}
        />
      );
    } else return <Camera onPhotoSaved={this.onPhotoSaved} />;
  }
}
