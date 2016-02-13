// import {ByDayReportTeableHeader} from "/js/reports/components/byDayReport/tableHeader.jsx";
// import {ByDayReportTeamTableBody} from "/js/reports/components/byDayReport/teamTableBody.jsx";


export var WorkTypesReportView = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },


  render: function() {

    self = this;

    var totalHours = this.props.data.summary.byTeam["Dev"] + this.props.data.summary.byTeam["QA"];
    totalHours = totalHours.toFixed(0);

    var workTypeRows = [];

    var totalPercentage = 0;
    var totalSum = 0;

    this.props.config.getWorkTypes().forEach(function(type) {

      var val = 0;
      if (self.props.data.summary.byTeamType["Dev"][type]) 
          val += self.props.data.summary.byTeamType["Dev"][type];

      if (self.props.data.summary.byTeamType["QA"][type]) 
          val += self.props.data.summary.byTeamType["QA"][type];

      if(!val) val = 0;
      val = val.toFixed(0);

      var percentage = (100*val/totalHours).toFixed(0);
      totalPercentage += Number(percentage);
      var node =  <tr>
                    <td><small>{type}</small></td>
                    <td className="right"><small>{val}</small></td>
                    <td className="right"><small>{percentage}%</small></td>
                  </tr>;
      workTypeRows.push(node);
    });

    
    return (
      <div className="container-fluid">
        <h3>Report: {this.props.report}</h3>
        <div className="row">
          <div className="table-responsive col-md-4">
            <table className="table table-condensed table-bordered">
              <thead>
                <tr>
                  <th>Dev &amp; QA Total</th>
                  <th className="right">{totalHours}</th>
                  <th className="right">{(totalPercentage).toFixed(0)}%</th>
                </tr>
              </thead>

              <tbody>
                {workTypeRows}
              </tbody>
            </table>
          </div>

          <div className="col-md-8">
            <center>CHART?</center>
          </div>

        </div>
      </div>

    );
  }
});
