import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";
import { getSuppliers } from "./../actions";

const mapStateToProps = state => ({
  suppliers: state.suppliersData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  	getSuppliers,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
