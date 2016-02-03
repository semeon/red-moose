export var config = new Config();

function Config() {

	var csvFilePath = "data/";
	
	var fieldCaptionMap = {};
	fieldCaptionMap.project = "Project";
	fieldCaptionMap.ticektType = "Type";
	fieldCaptionMap.ticketId = "Key";
	fieldCaptionMap.ticketTitle = "Title";
	fieldCaptionMap.dateTime = "Date";
	fieldCaptionMap.user = "Username";
	fieldCaptionMap.timeLogged = "Time Spent (h)";
	fieldCaptionMap.comment = "Comment";


	var csvReports = [];
	csvReports.push("2015-11-17.csv");
	csvReports.push("2015-12-01.csv");
	csvReports.push("report-03.csv");


	this.getCsvFileNames = function() {
		return csvReports;
	}

	this.getCsvFilePath = function() {
		return csvFilePath;
	}

	this.getFieldCaptionMap = function() {
		return fieldCaptionMap;
	}

}