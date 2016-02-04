export var ReportNavigation = React.createClass({

  getInitialState: function() {
    return {type:   this.props.reportType};
  },

  componentDidMount: function() {
  },

  overviewClick: function() {
      this.props.tabClick("overview")
  },

  byDayClick: function() {
      this.props.tabClick("byDay")
  },


  rawClick: function() {
      this.props.tabClick("raw")
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
          <a href="#" onClick={this.overviewClick}>Overview</a>
        </li>

        <li role="presentation" className={dayByDayClass}>
          <a href="#" onClick={this.byDayClick}>Day by Day</a>
        </li>

        <li role="presentation" className={rawClass}>
          <a href="#" onClick={this.rawClick}>Raw</a>
        </li>
      </ul>
    );
  }
});
