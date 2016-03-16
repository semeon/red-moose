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
    var totalHours = data.summary.total;
    var devHours = data.summary.byTeam["Dev"].toFixed(0);
    var qaHours = data.summary.byTeam["QA"].toFixed(0);
    var uiHours = data.summary.byTeam["UX/UI"].toFixed(0);

    var devQaHours = data.summary.devQaHours;
    var valueHours = data.summary.valueHours;
    var valueRatio = data.summary.valueRatio;

    var devTeamSize = data.meta.teamMembers["Dev"].length;
    var qaTeamSize = data.meta.teamMembers["QA"].length;
    var qaToDevSize = qaTeamSize / devTeamSize;
    qaToDevSize = qaToDevSize.toFixed(2);





    return (
		<div className="container-fluid">
      <ReportHeader data={this.props.data} />
      <div className="row">
        <div className="col-xs-12  col-sm-6  col-md-6  col-lg-6">
          <table className="table table-condensed table-bordered">
            <thead>
              <tr className="tableHeader">
                <th colSpan="2">General</th>
              </tr>            
            </thead>
            <tboby>
              <tr>
                <th>Sprint Length, workdays</th>
                <td className="right">{days}</td>
              </tr>
              <tr>
                <th>Total Effort, mh</th>
                <td className="right">{totalHours}</td>
              </tr>
            </tboby>


            <OverviewSubTeamRows data={data} team="Dev" />
            <OverviewSubTeamRows data={data} team="QA" />
            <OverviewSubTeamRows data={data} team="Ops" />
            <OverviewSubTeamRows data={data} team="UX/UI" />

          </table>
        </div>

        <div className="col-xs-12  col-sm-6  col-md-6  col-lg-6">
          <table className="table table-condensed table-bordered">
            <thead>
              <tr className="tableHeader">
                <th colSpan="2">Dev &amp; QA only</th>
              </tr>            
            </thead>
            <tboby>
              <tr>
                <th>Total Effort, mh</th>
                <td className="right">{devQaHours}</td>
              </tr>
            </tboby>
            <tboby>
              <tr className="tableSubHeader">
                <th colSpan="2">Team</th>
              </tr>

              <tr>
                <td><span className="indent20">Size</span></td>
                <td className="right">{Number(devTeamSize) + Number(qaTeamSize) }</td>
              </tr>

              <tr>
                <td><span className="indent20">Devs</span></td>
                <td className="right">{devTeamSize}</td>
              </tr>

              <tr>
                <td><span className="indent20">QAs</span></td>
                <td className="right">{qaTeamSize}</td>
              </tr>

              <tr className="tableSubHeader">
                <th colSpan="2">Efforts, mh</th>
              </tr>
              <tr>
                <td><span className="indent20">Product Value</span></td>
                <td className="right">{valueHours}</td>
              </tr>
              <tr>
                <td><span className="indent20">Testing Automation Hours</span></td>
                <td className="right">{data.summary.byType["Testing Automation"].toFixed(0)}</td>
              </tr>


              <tr className="tableSubHeader">
                <th colSpan="2">Efforts, %</th>
              </tr>
              <tr>
                <td><span className="indent20">Product Value</span></td>
                <td className="right">{valueRatio}%</td>
              </tr>

            </tboby>

          </table>
        </div>

      </div>
		</div>
    );
  }
});
