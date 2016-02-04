import {RawReportTable} from "/js/reports/components/rawReport.js";

export function ReportController(reportType) {
	var self = this;

	var reportData;
	var reportView;
	var reportType = reportType;

	this.build = function(id, dataRecords) {
		console.dir("Build Report called:");
		console.dir(dataRecords);

		ReactDOM.render(
		  <RawReportTable records={dataRecords} report={id}/>,
		  document.getElementById('raw-report-'+id)
		);
	}

}