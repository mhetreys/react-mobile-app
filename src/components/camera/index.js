import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Camera, Location, Permissions, FileSystem } from 'expo';

const DESIRED_RATIO = '16:9';

export default class CameraJS extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
      hasLocationPermission: null,
      type: Camera.Constants.Type.back,
      ratio: DESIRED_RATIO,
      flashMode: Camera.Constants.FlashMode.auto,
      pictureClicked: false,
    };

    this.onFlashModeClick = this.onFlashModeClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.onPictureSaved = this.onPictureSaved.bind(this);
  }

  async componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });

    const { status: cameraPermissionStatus } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: locationPermissionStatus } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({
      hasCameraPermission: cameraPermissionStatus === 'granted',
      hasLocationPermission: locationPermissionStatus === 'granted',
    });
  }

  async prepareRatio() {
    if (Platform.OS === 'android' && this.cam) {
      const ratios = await this.cam.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

      this.setState({ ratio });
    }
  }

  onFlashModeClick() {
    this.setState({
      flashMode: this.state.flashMode === Camera.Constants.FlashMode.off ?
      Camera.Constants.FlashMode.on :
      Camera.Constants.FlashMode.off
    });
  }

  async onPictureSaved(photo) {
    const filePath = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
    await FileSystem.moveAsync({
      from: photo.uri,
      to: filePath,
    });

    // DEBUG: Enable this to list captures images
    // const dircontents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`);
    // console.log('dircontents', dircontents);

    this.props.onPhotoSaved({
      photo: Object.assign({}, photo, {
        uri: filePath,
      }),
      location: await Location.getCurrentPositionAsync({}),
    });
  }

  takePicture() {
    if (this.cam) {
      this.cam.takePictureAsync({ exif: true, onPictureSaved: this.onPictureSaved, skipProcessing: true }).then((data) => {
        console.log('exif', data);
      });
    }
    this.setState({
      pictureClicked: true,
    })
  };

  render() {
    const { hasCameraPermission, hasLocationPermission } = this.state;
    if (hasCameraPermission === null || hasLocationPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (hasLocationPermission === false) {
      return <Text>No access to device location</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ratio={this.state.ratio}
            onCameraReady={this.prepareRatio}
            ref={(cam) => this.cam = cam}
            flashMode={this.state.flashMode}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                position: 'relative',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 50,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                      });
                    }}
                  >
                    <Icon name="reverse-camera" style={{ color: '#fff' }} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 50,
                      paddingHorizontal: 10,
                    }}
                    onPress={this.takePicture}
                  >
                    {
                      !this.state.pictureClicked ?
                      <Icon name="radio-button-off" large style={{ color: '#fff', fontSize: 72 }} /> :
                      <Icon name="radio-button-on" large style={{ color: '#62B1F6', fontSize: 72 }} />
                    }
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 50,
                      paddingHorizontal: 10,
                    }}
                    onPress={this.onFlashModeClick}
                  >
                    {
                      this.state.flashMode === Camera.Constants.FlashMode.off ?
                        <Icon name="flash-off" style={{ color: '#fff' }} /> :
                        <Icon name="flash" style={{ color: '#fff' }} />
                    }
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
