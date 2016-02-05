export var ByDayReportView = React.createClass({

  getInitialState: function() {
    return {data: this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {

    self = this;

    var dateHeaders = [];
    this.props.data.meta.dates.forEach(function(date) {
      var dateFormatted = moment(date, "YYYY-MM-DD").format("MMM, Do");
      var node = <th><center><small>{dateFormatted}</small></center></th>;
      dateHeaders.push(node);
    });

    var weekDayHeaders = [];
    this.props.data.meta.dates.forEach(function(date) {
      var dateFormatted = moment(date, "YYYY-MM-DD").format("ddd");
      var node = <th><center><small>{dateFormatted}</small></center></th>;
      weekDayHeaders.push(node);
    });

    var dailyTotals = [];
    this.props.data.meta.dates.forEach(function(date) {
      var val = self.props.data.summary.byDay[date];
      if(!val) val = 0;
      val = val.toFixed(2);
      var node = <th><center><small>{val}</small></center></th>;
      dailyTotals.push(node);
    });


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

 
    var userRows = [];
    this.props.data.meta.users.forEach(function(user) {

      var total = self.props.data.summary.byPerson[user];
      if(!total) total = 0;
      total = total.toFixed(2);

      var totalNode = <th><center><small>{total}</small></center></th>;

      var row = 
        <tr>
          <th>{user}</th>
          {usersLogByDay(user)}
          {totalNode}
        </tr>;
      userRows.push(row);
    });

    function totalHours() {
      var val = self.props.data.summary.total;
      if(!val) val = 0;
      val = val.toFixed(2);
      var node = <center><small>{val}</small></center>
      return node;
    }

    return (
      <div>
        <h3>Report: {this.props.report}</h3>
        <div className="table-responsive">
          <table className="table table-condensed table-bordered">
            <thead>
              <tr>
                <th> </th>
                {dateHeaders}
                <th> </th>
              </tr>
              <tr>
                <th> </th>
                {weekDayHeaders}
                <th><center><small>Total</small></center></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Daily Total</th>
                {dailyTotals}
                <th>{totalHours()}</th>
              </tr>
              {userRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
