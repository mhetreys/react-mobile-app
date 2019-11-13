import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components/callSupplier";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
