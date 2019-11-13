import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";
import { navigateToSuppliers } from "./../../../navigation/actions";
import {
  doLogin,
} from './../actions';

const mapStateToProps = state => ({
  login: state.loginData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doLogin, navigateToSuppliers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
