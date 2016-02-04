export var ReportNavigation = React.createClass({

  getInitialState: function() {
    return {type:   this.props.reportType};
  },

  componentDidMount: function() {
  },

  render: function() {

    var overviewClass = "";
    var dayByDayClass = "";
    var rawClass = "";

    if (this.state.type == "overview") overviewClass="active";
    if (this.state.type == "byDay") dayByDayClass="active";
    if (this.state.type == "raw") rawClass="active";

    return (

      <ul className="nav nav-tabs">
        <li role="presentation" className={overviewClass}>
          <a href="#">Overview</a>
        </li>
        <li role="presentation" className={dayByDayClass}>
          <a href="#">Day by Day</a>
        </li>
        <li role="presentation" className={rawClass}>
          <a href="#">Raw</a>
        </li>
      </ul>
    );
  }
});
