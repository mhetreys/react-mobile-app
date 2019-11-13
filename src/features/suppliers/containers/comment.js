import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components/comment";

import { getCommentList, postComment } from "./../actions";


const mapStateToProps = state => ({
  comment: state.commentData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCommentList, postComment }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
