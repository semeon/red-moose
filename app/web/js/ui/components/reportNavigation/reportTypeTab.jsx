export var ReportTypeTab = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    var self = this;

    var className = "";
    if (this.props.currentType == this.props.tabType) className = "active";

    return (
      <li role="presentation" className={className}>
        <a href="#" onClick={this.props.click}>{this.props.title}</a>
      </li>
    );
  }
});



