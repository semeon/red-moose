export var ErrorMessage = React.createClass({
  render: function() {

    return (
    	<div>
	    	<h2>Report: {this.props.report}</h2>
			<div className="alert alert-danger" role="alert">
				Oh snap! Something went wrong!
			</div>	    	
      </div>
    );
  }
});
