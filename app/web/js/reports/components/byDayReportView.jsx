export var ByDayReportView = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {

    var rows = [];
    var lastCategory = null;
    this.props.records.forEach(function(record) {
      var row = 
        <tr>
        <td><small>{record.project}</small></td>
        <td><small>{record.dateTime}</small></td>
        <td><small>{record.ticketId}</small></td>
        <td><small>{record.ticketType}</small></td>
        <td><small>{record.workType}</small></td>
        <td className="overflowScroll ticketTitle"><small>{record.ticketTitle}</small></td>
        <td><small>{record.user}</small></td>
        <td><small>{record.timeLogged}</small></td>
        <td><small>{record.comment}</small></td>
        </tr>;
    rows.push(row);
    });

    return (
      <div>
        <h2>Report: {this.props.report}</h2>
        <div className="table-responsive">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
});
