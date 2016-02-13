export var WorkTypesReportChart = React.createClass({

  getInitialState: function() {


    return {canvasId: "workTypePieChart"};
  },

  componentDidMount: function() {

    var data = [
      {
          value: 300,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
      },
      {
          value: 50,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
      },
      {
          value: 100,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
      }
    ];



    var containerWidth = $("#"+this.state.canvasId).parent().width();
    $("#"+this.state.canvasId).width(containerWidth);

    console.dir(">>> containerWidth: " + containerWidth);

    var ctx = document.getElementById(this.state.canvasId).getContext("2d");
    var myNewChart = new Chart(ctx).Pie(data);

  },


  render: function() {

    var self = this;
   
    return (
      <canvas id={this.state.canvasId} ></canvas>
    );
  }
});
