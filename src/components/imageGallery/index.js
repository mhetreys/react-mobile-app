import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image
} from 'react-native';
import { Icon, Spinner } from 'native-base';
import PhotoGrid from 'react-native-image-grid';
import styles from "./styles";

export default class ImageGallery extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      modalImageURI: '',
      isModalVisible: false,
      isImageLoaded: false,
    };

    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this._loadResourcesAsync = this._loadResourcesAsync.bind(this);
    this._handleFinishLoading = this._handleFinishLoading.bind(this);
  }

  componentDidMount() {
    // Build an array of photos
    const { images } = this.props;
    const items = images.map((v, i) => {
      return {
        id: i,
        src: `https://s3.ap-northeast-1.amazonaws.com/androidtokyo/${v.image_path}`,
        thumbnail: `https://s3.ap-northeast-1.amazonaws.com/androidtokyo/${v.image_path}`
      }});

    this.setState({ items });
  }

  onModalShow({ src }) {
    this.setState({
      isModalVisible: true,
      modalImageURI: src,
      isImageLoaded: false,
    }, () => {
      this._loadResourcesAsync({ src })
        .then(this._handleFinishLoading)
        .catch(this._handleLoadingError);
    });
  }

  onModalClose() {
    this.setState({
      isModalVisible: false,
    });
  }

  async _loadResourcesAsync(item) {
    return Image.prefetch(item.src);
  }

  _handleFinishLoading() {
    this.setState({
      isImageLoaded: true,
    });
  }

  _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return(
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
          this.onModalShow(item);
        }}>
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.thumbnail }}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { images } = this.props;
    if (!images.length) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="images" style={{
            color: '#dadada',
            fontSize: 48
          }}></Icon>
          <Text style={{ fontSize: 18 }}>No images available.</Text>
        </View>
      );
    }

    if (this.state.isModalVisible && !this.state.isImageLoaded) {
      return (
       <Spinner />
      );
    } else if (this.state.isModalVisible && this.state.isImageLoaded) {
      // Modal to show full image with close button
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.isModalVisible}
          onRequestClose={this.onModalClose}
        >
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.modalImageURI }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={this.onModalClose}
            >
              <Icon name="close" style={{ color: '#fff', fontSize: 32, marginTop: 10 }} />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      // Photo Grid of images
      return (
        <View style={styles.containerStyle}>
          <PhotoGrid
            data={this.state.items}
            itemsPerRow={3}
            itemMargin={1}
            itemPaddingHorizontal={1}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      );
    }
  }
}
