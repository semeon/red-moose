import {RawReportTable} from "/js/reports/components/rawReportView.jsx";
import {ErrorMessage} from "/js/reports/components/errorView.jsx";

export function ReportController(reportType, dataSource) {
	var self = this;

	var activeReportData;
	var reportView;
	var reportType = reportType;
	var data = dataSource;

	this.build = function() {
		console.dir("Build Report called: " + reportType + " for " + data.id);
		console.dir(data.records);

		ReactDOM.render(
		  <RawReportTable records={data.records} report={data.id}/>,
		  document.getElementById('raw-report-'+data.id)
		);

		// if (data.records.length > 0) {
			
		// } else {
		// 	ReactDOM.render(
		// 	  <ErrorMessage report={data.id}/>,
		// 	  document.getElementById('raw-report-'+data.id)
		// 	);
		// }

	}

	this.getReportType = function() {
		return reportType;
	}

}