export var ByDayReportTeamTableBody = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },


  render: function() {
    self = this;

    var dailyTotals = [];
    this.props.data.meta.dates.forEach(function(date) {
      var val = self.props.data.summary.byTeamDay[self.props.team][date];
      if(!val) val = 0;
      val = val.toFixed(2);

      var node = <th><center><small>{val}</small></center></th>;
      dailyTotals.push(node);
    });

    function totalHours() {
      var val = self.props.data.summary.byTeam[self.props.team];
      if(!val) val = 0;
      val = val.toFixed(2);
      var node = <center><small>{val}</small></center>
      return node;
    }


    var userRows = [];
    
    this.props.data.meta.users.forEach(function(user) {

      if( self.props.data.meta.teamMembers[self.props.team].indexOf(user) > -1 ) {

        var total = self.props.data.summary.byPerson[user];
        if(!total) total = 0;
        total = total.toFixed(2);
        
        var totalNode = <th><center><small>{total}</small></center></th>;
 
        var row = 
          <tr>
            <th><small>{user}</small></th>
            {usersLogByDay(user)}
            {totalNode}
          </tr>;
        userRows.push(row);
      }


    function usersLogByDay(user) {
      var usersLogs = [];
      self.props.data.meta.dates.forEach(function(date) {
        var val = self.props.data.summary.byPersonDay[user][date];
        if(!val) val = 0;
        val = val.toFixed(2);
        var node = <td><center><small>{val}</small></center></td>;
        usersLogs.push(node);
      });
      return usersLogs;
    }


    });

    return (
      <tbody>
        <tr>
          <td colSpan="12"></td>
        </tr>

        <tr className="tableSubHeader">
          <th>Team: {this.props.team}</th>
          {dailyTotals}
          <th>{totalHours()}</th>          
        </tr>

        {userRows}

      </tbody>
    );
  }
});
