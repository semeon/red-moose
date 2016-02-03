export var config = new Config();

function Config() {

	var csvFilePath = "data/";

	var csvReports = [];
	csvReports.push("report-01.csv");
	csvReports.push("report-02.csv");
	csvReports.push("report-03.csv");

	this.getCsvFileNames = function() {
		return csvReports;
	}

	this.getCsvFilePath = function() {
		return csvFilePath;
	}

}