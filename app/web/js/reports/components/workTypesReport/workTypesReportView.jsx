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
    totalHours = totalHours.toFixed(2);

    var workTypeRows = [];

    this.props.config.getWorkTypes().forEach(function(type) {

      var val = self.props.data.summary.byTeamType["Dev"][type] + self.props.data.summary.byTeamType["QA"][type];
      if(!val) val = 0;
      val = val.toFixed(2);
      var node =  <tr>
                    <td><small>{type}</small></td>
                    <td><center><small>{val}</small></center></td>
                  </tr>;
      workTypeRows.push(node);
    });

    
    return (
      <div className="container-fluid">
        <h3>Report: {this.props.report}</h3>
        <div className="row">
          <div className="table-responsive col-md-6">
            <table className="table table-condensed table-bordered">
              <thead>
                <tr>
                  <th>Dev &amp; QA Total</th>
                  <th><center>{totalHours}</center></th>
                </tr>
              </thead>

              <tbody>
                {workTypeRows}
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <center>CHART?</center>
          </div>

        </div>
      </div>

    );
  }
});
