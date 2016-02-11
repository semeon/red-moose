export var RawReportView = React.createClass({

  getInitialState: function() {
    return {data:   this.props.records};
  },

  componentDidMount: function() {
  },


  render: function() {
    var rows = [];
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
	    	<h3>Report: {this.props.report}</h3>
	    	<div className="table-responsive">
		      <table className="table table-condensed table-bordered">
		        <thead>
		          <tr className="tableHeader">
					<th>Project</th>
					<th>Date/Time</th>
					<th>Ticket ID</th>
					<th>Ticket Type</th>
					<th>Work Type</th>
					<th>Ticket Title</th>
					<th>User</th>
					<th>Time Logged</th>
					<th>Comment</th>
		          </tr>
		        </thead>
		        <tbody>{rows}</tbody>
		      </table>
	      </div>
      </div>
    );
  }
});
