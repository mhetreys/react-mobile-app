import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./../components";

import { setActivityList } from './../actions';
import { getSuppliers } from '../../suppliers/actions';

const mapStateToProps = state => ({
  activity: state.activityData,
  supplier: state.suppliersData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setActivityList,
    getSuppliers,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
