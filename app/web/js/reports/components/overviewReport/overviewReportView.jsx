import {ReportHeader}  from "/js/reports/components/reportHeader.jsx";


export var OverviewReportView = React.createClass({

  getInitialState: function() {
    return {data:   this.props.data};
  },

  componentDidMount: function() {
  },


  render: function() {
    return (
		<div className="container-fluid">

      <ReportHeader data={this.props.data} />

      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div className="well">
            <h3>Total</h3>
            <table className="table table-condensed">
              <thead>
              </thead>
              <tboby>
                <tr>
                  <td>Overall Hours</td>
                  <td>481.5 mh</td>
                </tr>
                <tr>
                  <td>Days</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Average per Person</td>
                  <td>46.1 mh</td>
                </tr>
                <tr>
                  <td>Max Hours per person</td>
                  <td>52.2 mh (Dennis)</td>
                </tr>
              </tboby>
             </table>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 ">
          <div className="well">
            <h3>Dev + QA</h3>
            <table className="table table-condensed">
              <thead>
              </thead>
              <tboby>
                <tr>
                  <td>Overall Hours</td>
                  <td>481.5 mh</td>
                </tr>
                <tr>
                  <td>Days</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Average per Person</td>
                  <td>46.1 mh</td>
                </tr>
                <tr>
                  <td>Max Hours per person</td>
                  <td>52.2 mh (Dennis)</td>
                </tr>
              </tboby>
             </table>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 ">
          <div className="well">
            <h3>Dev</h3>
            <table className="table table-condensed">
              <thead>
              </thead>
              <tboby>
                <tr>
                  <td>Overall Hours</td>
                  <td>481.5 mh</td>
                </tr>
                <tr>
                  <td>Days</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Average per Person</td>
                  <td>46.1 mh</td>
                </tr>
                <tr>
                  <td>Max Hours per person</td>
                  <td>52.2 mh (Dennis)</td>
                </tr>
              </tboby>
             </table>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 ">
          <div className="well">
            <h3>QA</h3>
            <table className="table table-condensed">
              <thead>
              </thead>
              <tboby>
                <tr>
                  <td>Overall Hours</td>
                  <td>481.5 mh</td>
                </tr>
                <tr>
                  <td>Days</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Average per Person</td>
                  <td>46.1 mh</td>
                </tr>
                <tr>
                  <td>Max Hours per person</td>
                  <td>52.2 mh (Dennis)</td>
                </tr>
              </tboby>
             </table>
          </div>
        </div>

      </div>
	
		</div>
    );
  }
});
