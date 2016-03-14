
export var OverviewSubTeamRows = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {


    var self = this;
    var data = this.props.data;
    var team = this.props.team;
    // var totalHours = data.summary.total.toFixed(0);

    var days = data.meta.dates.length-1;
    var teamHours = data.summary.byTeam[team].toFixed(0);
    var teamSize = data.meta.teamMembers[team].length;

    var teamHoursPerDay = teamHours / days;
    teamHoursPerDay = teamHoursPerDay.toFixed(1);

    var contributors = 0;

    for (var i=0; i < data.meta.teamMembers[team].length; i++) {
      var person = data.meta.teamMembers[team][i];
      if (data.summary.byPerson[person] > 0) {
        contributors++;
      }
    }

    var averageHours = 0;

    if (contributors != 0) {
      averageHours = teamHours / contributors;
      averageHours = averageHours.toFixed(1);
    }

    return (
      <tboby>
        <tr className="tableSubHeader">
          <th colSpan="2">{team} Team</th>
        </tr>            
        <tr>
          <td><span className="indent20">Team Effort, mh</span></td>
          <td className="right">{teamHours}</td>
        </tr>
        <tr>
          <td><span className="indent20">Team Size</span></td>
          <td className="right">{contributors}</td>
        </tr>
        <tr>
          <td><span className="indent20">Average Hours per Person</span></td>
          <td className="right">{averageHours}</td>
        </tr>            
        <tr>
          <td><span className="indent20">Average Hours per Day</span></td>
          <td className="right">{teamHoursPerDay}</td>
        </tr>            

      </tboby>
    );
  }
});
