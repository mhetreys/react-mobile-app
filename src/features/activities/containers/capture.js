import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components/capture";
import { postImage } from './../actions';
const mapStateToProps = state => ({
  activity: state.activityData,
  supplier: state.suppliersData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postImage
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
