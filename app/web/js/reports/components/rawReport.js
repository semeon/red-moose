export var RawReportTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.records.forEach(function(record) {

	// fieldCaptionMap.project = "Project";
	// fieldCaptionMap.ticketType = "Type";
	// fieldCaptionMap.ticketId = "Key";
	// fieldCaptionMap.ticketTitle = "Title";
	// fieldCaptionMap.dateTime = "Date";
	// fieldCaptionMap.user = "Username";
	// fieldCaptionMap.timeLogged = "Time Spent (h)";
	// fieldCaptionMap.comment = "Comment";

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

// export var RawReportTable = React.createClass({
//   render: function() {

//   	console.dir("-----------------------------");
//   	console.dir(this.props.data);

//     var rows = [];
//     this.props.records.forEach(
//     	function(record) {
//         	rows.push(<tr>La la la<tr/>);
//     	}
//     );
	
//     return (
// 		<div className="table-responsive">
// 		  <table className="table table-condensed">
// 			{rows}
// 		  </table>
// 		</div>
//     );
//   }
// });