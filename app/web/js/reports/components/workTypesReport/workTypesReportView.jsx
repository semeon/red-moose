import {ReportHeader}          from "/js/reports/components/reportHeader.jsx";
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

    var valueTable = {};
    this.props.config.getWorkTypes().forEach(function(type) {
      var val = 0;
      if (self.props.data.summary.byTeamType["Dev"][type]) 
          val += self.props.data.summary.byTeamType["Dev"][type];
      if (self.props.data.summary.byTeamType["QA"][type]) 
          val += self.props.data.summary.byTeamType["QA"][type];
      if (!val) val = 0;
      val = val.toFixed(0);
      valueTable[type] = val;
    });

   
    return (
      <div>
        
        <ReportHeader data={this.props.data} />

        <div className="row">
          <div className="table-responsive col-md-4">
            <WorkTypesReportTable  
              data={this.props.data} 
              values={valueTable} 
              config={this.props.config} />
          </div>

          <div className="col-md-8 center">
            <WorkTypesReportChart 
              data={this.props.data} 
              values={valueTable} 
              config={this.props.config} />
          </div>

        </div>
      </div>

    );
  }
});
