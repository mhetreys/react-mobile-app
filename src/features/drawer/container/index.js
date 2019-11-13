import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Component from './../../../components/AppDrawer';
import { doLogout } from './../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doLogout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
