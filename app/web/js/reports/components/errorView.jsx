export var ErrorMessage = React.createClass({
  render: function() {

    return (
    	<div>
	    	<h3>Report: {this.props.report}</h3>
			<div className="alert alert-danger" role="alert">
				Oh snap! Something went wrong!
			</div>	    	
      </div>
    );
  }
});
