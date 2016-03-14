export var WorkTypesReportChart = React.createClass({

  getInitialState: function() {


    return {canvasId: "workTypePieChart"};
  },

  componentDidMount: function() {

    var chartData = [];

    for (var i in this.props.values) {
      var type = i;
      var val = this.props.values[i];

      var dataItem = {};
      dataItem.value = val;
      dataItem.color = this.props.config.getWorkTypesColour(type);
      dataItem.highlight = "#EEEEEE";
      dataItem.label = type;

      chartData.push(dataItem);      
    }

    var containerWidth = $("#"+this.state.canvasId).parent().width();
    // $("#"+this.state.canvasId).width(containerWidth);
    // $("#"+this.state.canvasId).width(600);

    console.dir(">>> containerWidth: " + containerWidth);

    var ctx = document.getElementById(this.state.canvasId).getContext("2d");

    var chartOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 0,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 30, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,
    }

    var myNewChart = new Chart(ctx).Doughnut(chartData, chartOptions);

  },


  render: function() {

    var self = this;
   
    return (
      <canvas id={this.state.canvasId} height="320"></canvas>
    );
  }
});
