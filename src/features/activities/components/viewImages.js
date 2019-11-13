import React from 'react';

import ImageGallery from './../../../components/imageGallery';

export default class ViewImages extends React.Component {
	static navigationOptions = {
		title: 'Images',
    headerStyle: {
      backgroundColor: '#8e1921',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const activity = navigation.getParam('activity', []);

  	return (
	    <ImageGallery images={activity.images}/>
	  );
  }
}
