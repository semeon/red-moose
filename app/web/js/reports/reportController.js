import {OverviewReportView} 	from "/js/reports/components/overviewReport/overviewReportView.jsx";
import {ByDayReportView} 		from "/js/reports/components/byDayReport/byDayReportView.jsx";
import {WorkTypesReportView} 	from "/js/reports/components/workTypesReport/workTypesReportView.jsx";

import {RawReportView} 		from "/js/reports/components/rawReportView.jsx";
import {ErrorMessage} 		from "/js/reports/components/errorView.jsx";
import {LoadingView} 		from "/js/reports/components/loadingView.jsx";

export function ReportController(dataSource, type, conf) {
	var self = this;

	var reportType = type;
	var data = dataSource;
	var mountNodeId = "report-body";
	var config = conf;

	this.render = function() {
		console.dir("Render Report called: " + reportType + " for " + data.id);
		console.dir(data);
		RenderReport(reportType);
	}


	this.getType = function() {
		return reportType;
	}

	this.setType = function(type) {
		reportType = type;
	}


	this.getDataSourceId = function() {
		return data.id;
	}

	this.setDataSource = function(ds) {
		data = ds;
	}

	function RenderReport(type) {
		if (data.status != "loaded") type = "error"; 
		if (data.status == "loading") type = "loading"; 
		switch(type) {
			case "overview":
				ReactDOM.render(
					<OverviewReportView data={data} report={data.id}/>,
					document.getElementById(mountNodeId)
				);
			break;

			case "byDay":
				ReactDOM.render(
					<ByDayReportView data={data} config={config}/>,
					document.getElementById(mountNodeId)
				);
			break;

			case "workTypes":
				ReactDOM.render(
					<WorkTypesReportView data={data} report={data.id} config={config}/>,
					document.getElementById(mountNodeId)
				);
			break;

			case "raw":
				ReactDOM.render(
					<RawReportView records={data.records} report={data.id}/>,
					document.getElementById(mountNodeId)
				);
			break;

			case "error":
				ReactDOM.render(
					<ErrorMessage report={data.id}/>,
					document.getElementById(mountNodeId)
				);
				console.dir("Data Error:");
				console.dir(data);
			break;

			case "loading":
				ReactDOM.render(
					<LoadingView report={data.id}/>,
					document.getElementById(mountNodeId)
				);
			break;


			default:
				console.dir("ERROR");
		}
	}

}