export var LoadingView = React.createClass({
  render: function() {

    return (
      <div>
        <h3>Report: {this.props.report}</h3>
        <div className="jumbotron center">
          <i className="fa fa-spinner fa-spin fa-5x"></i>
          <br/>
          <br/>
          <p>Loading data...</p>
        </div>      
      </div>      
    );
  }
});
