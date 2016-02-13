import {ByDayReportTeableHeader} from "/js/reports/components/byDayReport/tableHeader.jsx";
import {ByDayReportTeamTableBody} from "/js/reports/components/byDayReport/teamTableBody.jsx";


export var ByDayReportView = React.createClass({

  getInitialState: function() {
    return {data: this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {

    self = this;

    var otherTeamGroup = "";
    if (this.props.data.meta.teamMembers["Other"]) {
      otherTeamGroup = <ByDayReportTeamTableBody data={this.props.data} team="Other" config={this.props.config}/>;
    }
    
    return (
      <div class="container-fluid">
        <h3>Report: {this.props.report}</h3>
        <div className="table-responsive">
          <table className="table table-condensed table-bordered">
            <ByDayReportTeableHeader data={this.props.data} />
            <ByDayReportTeamTableBody data={this.props.data} team="Dev" config={this.props.config}/>
            <ByDayReportTeamTableBody data={this.props.data} team="QA" config={this.props.config}/>
            <ByDayReportTeamTableBody data={this.props.data} team="UX/UI" config={this.props.config}/>
            {otherTeamGroup}
          </table>
        </div>
      </div>
    );
  }
});
