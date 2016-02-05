import {RawReportView} 		from "/js/reports/components/rawReportView.jsx";
import {ByDayReportView} 	from "/js/reports/components/byDayReportView.jsx";
import {OverviewReportView} from "/js/reports/components/overviewReportView.jsx";

import {ErrorMessage} from 	"/js/reports/components/errorView.jsx";

export function ReportController(type, dataSource) {
	var self = this;

	var reportType = type;
	var data = dataSource;
	var mountNodeId = "report-body";

	this.build = function() {
		console.dir("Build Report called: " + reportType + " for " + data.id);
		console.dir(data);
		RenderReport(reportType);
	}

	this.getType = function() {
		return reportType;
	}

	function RenderReport(type) {
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

			default:
			// default code block
		}
	}

}