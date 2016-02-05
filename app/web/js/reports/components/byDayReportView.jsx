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
      var row = <th><center><small>{dateFormatted}</small></center></th>;
      dateHeaders.push(row);
    });

    var weekDayHeaders = [];
    this.props.data.meta.dates.forEach(function(date) {
      var dateFormatted = moment(date, "YYYY-MM-DD").format("ddd");
      var row = <th><center><small>{dateFormatted}</small></center></th>;
      weekDayHeaders.push(row);
    });


    function usersLogByDay(user) {
      var usersLogs = [];
      self.props.data.meta.dates.forEach(function(date) {
        var val = self.props.data.summary.byPersonDay[user][date];
        if(!val) val = 0;
        val = val.toFixed(2);
        var td = <td><center><small>{val}</small></center></td>;
        usersLogs.push(td);
      });
      return usersLogs;
    }


    var userRows = [];
    this.props.data.meta.users.forEach(function(user) {
      var row = 
        <tr>
          <th>{user}</th>
          {usersLogByDay(user)}
        </tr>;
      userRows.push(row);
    });

    return (
      <div>
        <h3>Report: {this.props.report}</h3>
        <div className="table-responsive">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th> </th>
                {dateHeaders}
              </tr>
              <tr>
                <th> </th>
                {weekDayHeaders}
              </tr>
            </thead>
            <tbody>
              {userRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
