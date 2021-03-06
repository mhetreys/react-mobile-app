import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  infoIcon: {
    color: '#a7a7a7',
    fontSize: 15,
    lineHeight: 18,
    marginRight: 10,
  },
  cardButton: {
    height: 25,
  },
  buttonWrapper: {
    flex: 1,
  },
  badgeStyle: {
    width: 80,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#5cb85c'
  },
  iconStyle: {
    marginLeft: 0,
  },
  activityWrapper: {
    padding: 5,
  },
  card: {
    borderLeftWidth: 10,
    borderLeftColor: '#8e1921',
  },
  commentListItem: {
    backgroundColor: '#FAFAFA',
    marginBottom: 2,
    borderWidth: 0,
    position: 'relative',
    padding: 10
  },
  commentListItemFooter: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 12,
    marginRight: 5,
    color: '#9E9E9E'
  },
  commentContainer: {
    flex: 1,
  },
  commentWrapper: {
    flexDirection: 'column',
  },
  commentInputBox: {
    width: '100%',
    height: 32,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FAFAFA'
  },
  commentInput: {
    flex: 1,
    lineHeight: 33,
    padding: 10,
    paddingLeft: 0,
    backgroundColor: '#ffffff',
  },
  fullImageStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'relative',
  },
  closeButtonStyle: {
    width: 64,
    height: 64,
    top: 0,
    right: 0,
    position: 'absolute',
    padding: 20
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  }
});
