export var ByDayReportTeableHeader = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },


  render: function() {
    self = this;

    var dateHeaders = [];
    var weekDayHeaders = [];
    var dailyTotals = [];
    
    this.props.data.meta.dates.forEach(function(date) {

      // Date Headers
        var dateMonthDay = moment(date, "YYYY-MM-DD").format("MMM, Do");
        var node = <th><center><small>{dateMonthDay} {weekday}</small></center></th>;
        dateHeaders.push(node);

      // Weekday Headers
        var weekday = moment(date, "YYYY-MM-DD").format("ddd");
        node = <th><center><small>{weekday}</small></center></th>;
        weekDayHeaders.push(node);
      
      // Total Value
        var val = self.props.data.summary.byDay[date];
        if(!val) val = 0;
        val = val.toFixed(2);


        node = <td><center><small>{val}</small></center></td>;
        dailyTotals.push(node);

    });


    function totalHours() {
      var val = self.props.data.summary.total;
      if(!val) val = 0;
      val = val.toFixed(2);
      var node = <center><small>{val}</small></center>
      return node;
    }

    return (
      <thead>
        <tr className="tableHeader">
          <th> </th>
          {dateHeaders}
          <th> </th>
        </tr>
        <tr className="tableHeader">
          <th> </th>
          {weekDayHeaders}
          <th><center><small>Total</small></center></th>
        </tr>
        <tr className="tableHeader">
          <td>Daily Total</td>
          {dailyTotals}
          <td>{totalHours()}</td>
        </tr>
      </thead>

    );
  }
});
