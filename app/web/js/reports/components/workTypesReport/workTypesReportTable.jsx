
export var WorkTypesReportTable = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },


  render: function() {

    var self = this;

    var totalHours = this.props.data.summary.byTeam["Dev"] + this.props.data.summary.byTeam["QA"];
    totalHours = totalHours.toFixed(0);

    var workTypeRows = [];

    var totalPercentage = 0;
    var totalSum = 0;

    for (var i in this.props.values) {
      var type = i;
      var val = this.props.values[i];
      var percentage = (100*val/totalHours).toFixed(0);
      totalPercentage += Number(percentage);

      var tdStyle = {
        backgroundColor: this.props.config.getWorkTypesColour(type),
      };

      var node =  <tr>
                    <td style={tdStyle}><small>{type}</small></td>
                    <td className="right"><small>{val}</small></td>
                    <td className="right"><small>{percentage}%</small></td>
                  </tr>;
      workTypeRows.push(node);
    }

    return (
      <table className="table table-condensed table-bordered">
        <thead>
          <tr className="tableHeader">
            <th>Dev &amp; QA Total</th>
            <th className="right">{totalHours}</th>
            <th className="right">{(totalPercentage).toFixed(0)}%</th>
          </tr>
        </thead>

        <tbody>
          {workTypeRows}
        </tbody>
      </table>
    );
  }
});
