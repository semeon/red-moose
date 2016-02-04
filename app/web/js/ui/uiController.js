import {ReportNavigation} from "/js/ui/components/reportNavigation.jsx";

export var uiController = new UiController();

function UiController() {
	var self = this;
	var currentViewController = {};

	this.setCurrentView = function(repController) {
		currentViewController = repController;
	}

	this.showReportNavigation = function(repController) {
		var repType = currentViewController.getReportType();

		ReactDOM.render(
		  <ReportNavigation reportType={repType}/>,
		  document.getElementById('report-nav')
		);
	}

	this.showReport = function(repController) {
		if (!repController) repController = currentViewController;
		repController.build();
	}

}