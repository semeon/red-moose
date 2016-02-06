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

  sourceClick: function(value) {
      this.props.sourceTabClick(value)
  },

  render: function() {

    var self = this;

    var overviewClass = "";
    var dayByDayClass = "";
    var rawClass = "";

    if (this.props.reportType == "overview") overviewClass="active";
    if (this.props.reportType == "byDay") dayByDayClass="active";
    if (this.props.reportType == "raw") rawClass="active";


    var sourceIdListItems = [];
    this.props.reportSources.forEach(function(sourceId) {
      var node = <li><a href="#" onClick={self.sourceClick.bind(null, sourceId)}>{sourceId}</a></li>;
      sourceIdListItems.push(node);
    });

    return (
      <ul className="nav nav-pills">
        <li role="presentation" className={overviewClass}>
          <a href="#" onClick={this.overviewClick}>Overview</a>
        </li>

        <li role="presentation" className={dayByDayClass}>
          <a href="#" onClick={this.byDayClick}>Day by Day</a>
        </li>

        <li role="presentation" className={rawClass}>
          <a href="#" onClick={this.rawClick}>Raw</a>
        </li>

          <li role="presentation" className="dropdown">
            <a className="dropdown-toggle" 
               data-toggle="dropdown" 
               href="#" 
               role="button" 
               aria-haspopup="true" 
               aria-expanded="false">
              Report: {this.props.currentSource}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              {sourceIdListItems}
            </ul>
          </li>
      </ul>
    );
  }
});
