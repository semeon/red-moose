import {ReportHeader}  from "/js/reports/components/reportHeader.jsx";
import {OverviewSubTeamRows}  from "/js/reports/components/overviewReport/overviewSubTeamRows.jsx";

export var OverviewReportView = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {

    var self = this;
    var data = this.props.data;

    /*
        Days
        Total hours, mh
        Dev Team, mh
        QA Team, mh
        Design Team, mh
      QA/Dev team members ratio, %
      QA/Dev hours ratio, %
      Average Dev hours, mh
      Average Dev hours/day, mh
      Average QA hours, mh
      Average QA hours/day, mh
      Most hours logged by one person, mh
      Person logged most hours
      Stories and Imporvements ratio, %
      Bugs and Tech tasks ratio, %
      Regression testing, %
      Testing Automation, %
      Overheads ratio, %
      Regression testing, mh
      Testing Automation, mh
    */


    var days = data.meta.dates.length-1;
    var totalHours = data.summary.total.toFixed(0);
    var devHours = data.summary.byTeam["Dev"].toFixed(0);
    var qaHours = data.summary.byTeam["QA"].toFixed(0);
    var uiHours = data.summary.byTeam["UX/UI"].toFixed(0);

    var devTeamSize = data.meta.teamMembers["Dev"].length-1;


    return (
		<div className="container-fluid">

      <ReportHeader data={this.props.data} />

      <div className="row">

          <table className="table table-condensed table-bordered">
            <thead>
              <tr className="tableHeader">
                <th colSpan="2">General</th>
              </tr>            
            </thead>
            <tboby>
              <tr>
                <th>Sprint Length, workdays</th>
                <td className="center">{days}</td>
              </tr>
              <tr>
                <th>Total Effort, mh</th>
                <td className="center">{totalHours}</td>
              </tr>
            </tboby>


            <OverviewSubTeamRows data={data} team="Dev" />
            <OverviewSubTeamRows data={data} team="QA" />
            <OverviewSubTeamRows data={data} team="UX/UI" />






           </table>


      </div>
	
		</div>
    );
  }
});
