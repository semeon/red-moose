import {ReportTypeTab} from "/js/ui/components/reportNavigation/reportTypeTab.jsx";

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

  workTypesClick: function() {
      this.props.tabClick("workTypes")
  },

  rawClick: function() {
      this.props.tabClick("raw")
  },

  sourceClick: function(value) {
      this.props.sourceTabClick(value)
  },

  render: function() {

    var self = this;

    var sourceIdListItems = [];
    this.props.reportSources.forEach(function(sourceId) {
      var node = <li><a href="#" onClick={self.sourceClick.bind(null, sourceId)}>{sourceId}</a></li>;
      sourceIdListItems.push(node);
    });

    return (
      <ul className="nav nav-pills">

        <ReportTypeTab click={this.overviewClick} 
                        tabType={"overview"}
                        currentType={this.props.reportType}
                        title="Overview" />

        <ReportTypeTab click={this.byDayClick} 
                        tabType={"byDay"} 
                        currentType={this.props.reportType}
                        title="Day by Day" />

        <ReportTypeTab click={this.workTypesClick} 
                        tabType={"workTypes"} 
                        currentType={this.props.reportType}
                        title="Work Types" />

        <ReportTypeTab click={this.rawClick}
                        tabType={"raw"} 
                        currentType={this.props.reportType}
                        title="Raw Data" />

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
