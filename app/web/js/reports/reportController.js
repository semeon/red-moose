import {RawReportView} 		from "/js/reports/components/rawReportView.jsx";
import {ByDayReportView} 	from "/js/reports/components/byDayReportView.jsx";
import {OverviewReportView} from "/js/reports/components/overviewReportView.jsx";
import {ErrorMessage} 		from "/js/reports/components/errorView.jsx";

export function ReportController(dataSource, type) {
	var self = this;

	var reportType = type;
	var data = dataSource;
	var mountNodeId = "report-body";

	this.render = function() {
		console.dir("Render Report called: " + reportType + " for " + data.id);
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
		if (data.status!="loaded") type = "error"; 
		switch(type) {
			case "overview":
				ReactDOM.render(
					<OverviewReportView data={data} report={data.id}/>,
					document.getElementById(mountNodeId)
				);
			break;

			case "byDay":
				ReactDOM.render(
					<ByDayReportView data={data} report={data.id}/>,
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

			default:
				console.dir("ERROR");
		}
	}

}