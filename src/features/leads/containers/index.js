import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";
import { getLeads, getExtraLeads, postExtraLeads } from "./../actions";

const mapStateToProps = state => ({
  leads: state.leadData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getLeads,
    getExtraLeads,
    postExtraLeads
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
