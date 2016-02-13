import {WorkTypesReportTable}  from "/js/reports/components/workTypesReport/workTypesReportTable.jsx";
import {WorkTypesReportChart}  from "/js/reports/components/workTypesReport/workTypesReportChart.jsx";

export var WorkTypesReportView = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },


  render: function() {

    var self = this;
   
    return (
      <div className="container-fluid">
        <h3>Report: {this.props.data.id}</h3>
        <div className="row">
          <div className="table-responsive col-md-4">
            <WorkTypesReportTable data={this.props.data} config={this.props.config} />
          </div>

          <div className="col-md-8 center">
            <WorkTypesReportChart data={this.props.data} config={this.props.config} />
          </div>

        </div>
      </div>

    );
  }
});
