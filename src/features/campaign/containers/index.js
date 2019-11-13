import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";
import { getCampaigns, setSelectedCampaign } from "./../actions";
import { setSelectedSupplier } from './../../suppliers/actions';

const mapStateToProps = state => ({
	campaigns: state.campaignData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  	getCampaigns,
    setSelectedCampaign,
    setSelectedSupplier,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
