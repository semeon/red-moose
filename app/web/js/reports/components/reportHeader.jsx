export var ReportHeader = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {

    var data = this.props.data;

    var reportTitle = S(data.id).replaceAll('.csv', '').s;
    var firstDay = data.meta.dates[0];
    firstDay = moment(firstDay).format('MMM Do, YYYY');

    var lastDay = data.meta.dates[data.meta.dates.length-1];
    lastDay = moment(lastDay).format('MMM Do, YYYY');

    var days = data.meta.dates.length-1;

    return (
  		<div className="container-fluid center">
        <p><strong>Sprint:</strong> from <span className="badge">{firstDay}</span> to <span className="badge">{lastDay}</span> &nbsp;|&nbsp; <strong>Total Days:</strong> {days}</p>
        <br/>
  		</div>
    );
  }
});
