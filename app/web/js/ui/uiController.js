import {ReportNavigation} from "/js/ui/components/reportNavigation.jsx";

export function UiController() {
	var self = this;
	var currentType = "";
	var currentViewController = {};
	var reportControllers = {};

	this.setCurrentView = function(repController) {
		currentViewController = repController;
		currentType = currentViewController.getType();
	}

	this.setReportViews = function(controllers) {
		reportControllers = controllers;
	}

	this.showReportNavigation = function() {
		ReactDOM.unmountComponentAtNode(document.getElementById('report-nav'));
		ReactDOM.render(
		  <ReportNavigation reportType={currentType} tabClick={SwitchToReport}/>,
		  document.getElementById('report-nav')
		);
	}

	this.showReport = function(repController) {
		if (!repController) repController = currentViewController;
		repController.build();
	}

	function SwitchToReport(type) {
		console.dir("SwitchToReport called with param: " + type)
		self.setCurrentView(reportControllers[type]);
		self.showReportNavigation();
		self.showReport();


		console.dir("currentType: " + currentType);
	}

}