import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from './../../login/actions';
import {
  getSuppliers,
  setSelectedSupplier,
} from './../../suppliers/actions';
import {
  getCampaigns,
  setSelectedCampaign,
} from './../../campaign/actions';

const mapStateToProps = state => ({
  login: state.loginData,
  supplier: state.suppliersData,
  campaign: state.campaignData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    loginStart,
    loginSuccess,
    loginFail,
    getSuppliers,
    getCampaigns,
    setSelectedCampaign,
    setSelectedSupplier,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
