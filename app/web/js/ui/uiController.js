import {ReportController} from "/js/reports/reportController.js";
import {ReportNavigation} from "/js/ui/components/reportNavigation/reportNavigation.jsx";


export function UiController(a, config) {
	var self = this;
	var reportNavNodeId = "report-nav";
	var app = a;

	var reportController = new ReportController(app.getDataSource(), config.getDefaultReportType(), config);

	this.renderReportNavigation = function() {
		var dataSourceIDs = config.getCsvFileNames();

		var dataSourceId = app.getDataSource().id;

		ReactDOM.unmountComponentAtNode(document.getElementById(reportNavNodeId));
		ReactDOM.render(
		  <ReportNavigation 
		  	reportType={reportController.getType()} tabClick={SwitchToView} 
		  	reportSources={dataSourceIDs} currentSource={reportController.getDataSourceId()} sourceTabClick={SwitchToSource}/>,
		  document.getElementById(reportNavNodeId)
		);
	}

	this.renderReport = function(data, type) {
		if (data) reportController.setDataSource(data);
		if (type) reportController.setType(type);
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
		app.changeDataSource(id);
		reportController
		self.renderReportNavigation();
		self.renderReport();
	}


}