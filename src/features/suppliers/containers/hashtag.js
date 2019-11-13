import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components/hashtag";
import { postHashtag } from "./../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postHashtag
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
