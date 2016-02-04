export var OverviewReportView = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {
    return (
		<div>
			<h2>Report: {this.props.report}</h2>
			<div className="jumbotron">
				<h1>Overview</h1>
				<p>for {this.props.report}</p>
				<p>Coming soon...</p>
			</div>			
		</div>
    );
  }
});
