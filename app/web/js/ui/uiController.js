import {ReportNavigation} from "/js/ui/components/reportNavigation/reportNavigation.jsx";

export function UiController(config, a, rc) {
	var self = this;
	var app = a;
	var dataSourceIDs = config.getCsvFileNames();
	var reportController = rc;
	var reportNavNodeId = "report-nav";

	this.renderReportNavigation = function() {
		ReactDOM.unmountComponentAtNode(document.getElementById(reportNavNodeId));
		ReactDOM.render(
		  <ReportNavigation 
		  	reportType={reportController.getType()} tabClick={SwitchToView} 
		  	reportSources={dataSourceIDs} currentSource={reportController.getDataSourceId()} sourceTabClick={SwitchToSource}/>,
		  document.getElementById(reportNavNodeId)
		);
	}

	this.renderReport = function() {
		reportController.render();
	}

	function SwitchToView(type) {
		console.dir("SwitchToView called with param: " + type);
		reportController.setType(type);
		self.renderReportNavigation();
		self.renderReport();
	}

	function SwitchToSource(id) {
		console.dir("SwitchToSource called with param: " + id);
		app.selectDataSource(id);
		reportController
		self.renderReportNavigation();
		self.renderReport();
	}


}