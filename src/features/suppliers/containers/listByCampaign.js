import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components/listByCampaign";
import { getSupplierByCampaign, setSelectedSupplier } from "./../actions";

const mapStateToProps = state => ({
	campaign: state.campaignData,
	supplier: state.suppliersData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  	getSupplierByCampaign,
  	setSelectedSupplier
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
