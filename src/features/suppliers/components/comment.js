import React from 'react';
import moment from 'moment';
import { Modal, Dimensions } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Right,
  Text,
  Icon,
  View,
  Button,
  Form,
  Textarea,
  Fab,
} from 'native-base';
import styles from './styles';

const getSortedComments = (commentList) => {
  const newCommentList = [...commentList];
  newCommentList.sort((a, b) => {
    return moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf();
  });

  return newCommentList;
};

const getSupplierIdentity = (navigation) => {
  const proposal_id = navigation.getParam('proposal_id', []);
  const shortlisted_space_id = navigation.getParam('shortlisted_space_id', []);

  return { proposal_id, shortlisted_space_id };
};


export default class Comment extends React.Component {
	static navigationOptions = {
    title: 'Comments',
    headerStyle: {
      backgroundColor: '#8e1921',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor() {
    super();

    this.state = {
      isAddModalVisible: false,
      newComment: '',
    };

    this.onAddCommentClick = this.onAddCommentClick.bind(this);
    this.onAddCommentClose = this.onAddCommentClose.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    
    this.props.getCommentList(
      getSupplierIdentity(navigation)
    );
  }

  componentWillReceiveProps(nextProps) {
    const { comment } = nextProps;

    if (comment.postSuccess === true && !comment.postError) {
      this.onAddCommentClose();
    }
  }

  onAddCommentClick() {
    this.setState({
      newComment: '',
      isAddModalVisible: true,
    });
  }

  onAddCommentClose() {
    this.setState({
      isAddModalVisible: false,
    });
  }

  onCommentChange(comment) {
    this.setState({ newComment: comment });
  }

  onSubmitButtonClick() {
    const { navigation } = this.props;

    this.props.postComment({
      comment: this.state.newComment,
      ...getSupplierIdentity(navigation),
    });
  }

  render() {
    const { navigation, comment } = this.props;
    const { isAddModalVisible } = this.state;
    const proposal_id = navigation.getParam('proposal_id', []);

    const commentList = getSortedComments(comment.commentsBySupplier[proposal_id] || []);

    if (isAddModalVisible) {
      return (
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isAddModalVisible}
          onRequestClose={this.onAddCommentClose}
        >
          <Container style={{
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            alignItem: 'center',
            justifyContent: 'center',
          }}>
            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderRadius: 5,
                width: '90%',
                padding: 20,
                alignItem: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: '50%',
                transform: [
                  { translateX: - Dimensions.get('window').width * (90/100) * 0.50 },
                ]
              }}
            >
              <Text style={{ fontSize: 24, color: '#9E9E9E', marginBottom: 20 }}>Add Comment</Text>
              <Form
                style={{
                  flex: 1,
                  flexDirection: 'column'
                }}
              >
                <Textarea
                  rowSpan={3}
                  bordered
                  placeholder="Type your comment"
                  value={this.state.newComment}
                  onChangeText={this.onCommentChange}
                  style={{
                    padding: 7,
                    marginBottom: 20,
                  }}
                />
                <Button onPress={this.onSubmitButtonClick} success>
                  <Text>Submit</Text>
                </Button>
              </Form>
            </View>
            <Button onPress={this.onAddCommentClose} transparent style={{ position: 'absolute', top: 60, right: 20 }}>
              <Icon name="close" style={{ fontSize: 36 }} />
            </Button>
          </Container>
        </Modal>
      );
    }
    
  	return (
	    <Container style={styles.commentContainer}>
        {
          commentList.length ?
            <Content style={styles.commentContainer}>
              <View style={styles.commentContainer}>
                <View style={styles.commentWrapper}>
                  <List>
                    {
                      commentList.map(comment =>
                        <ListItem last style={styles.commentListItem} key={comment.timestamp}>
                          <View style={{ position: 'relative', flex: 1, marginBottom: 5 }}>
                            <Text note>{comment.comment}</Text>
                            <View style={styles.commentListItemFooter}>
                              <Text style={styles.footerText}>{moment(comment.timestamp).format('hh:mm A')}</Text>
                              <Right>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={styles.footerText}>{comment.inventory_type}</Text>
                                  <Text style={styles.footerText}>{comment.related_to}</Text>
                                </View>
                              </Right>
                            </View>
                          </View>
                        </ListItem>
                      )
                    }
                  </List>
                </View>
              </View> 
            </Content> :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="chatboxes" style={{
                color: '#dadada',
                fontSize: 48
              }}></Icon>
              <Text style={{ fontSize: 18 }}>
                No comments yet.
              </Text>
            </View>
        }
        <Fab
          active={this.state.isAddModalVisible}
          containerStyle={{ }}
          style={{ backgroundColor: '#D95350' }}
          position="bottomRight"
          onPress={this.onAddCommentClick}
        >
          <Icon name="add" />
        </Fab>
      </Container>
	  );
  }
}
