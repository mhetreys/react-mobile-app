import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  closeButtonStyle: {
    width: 64,
    height: 64,
    top: 0,
    right: 0,
    position: 'absolute',
    padding: 20
  },
});
