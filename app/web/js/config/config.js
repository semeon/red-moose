export function Config() {

	var csvReports = [];
	csvReports.push("report-03.csv");
	csvReports.push("2015-11-17.csv");
	csvReports.push("2015-12-01.csv");

	var csvFilePath = "data/";
	var projectId = "Ratchet Health";

	
	var fieldCaptionMap = {};
	fieldCaptionMap.project = "Project";
	fieldCaptionMap.ticketType = "Type";
	fieldCaptionMap.ticketId = "Key";
	fieldCaptionMap.ticketTitle = "Title";
	fieldCaptionMap.dateTime = "Date";
	fieldCaptionMap.user = "Username";
	fieldCaptionMap.timeLogged = "Time Spent (h)";
	fieldCaptionMap.comment = "Comment";

	var reportTypes = ["overview", "byDay", "raw"];

	var subteamNames = ["Dev", "QA", "UX/UI", "Other"];

	var subteams = {};
	subteams["Dev"] = ["Albert Zhang", "Charles Chen", "Colin Chen", "Dennis Yan", "Michael Zhao", "Sky Wang", "Thomas Cai"];
	subteams["QA"] = ["Lilith Zhang", "Sandy Chen", "Edith Sun"];
	subteams["UX/UI"] = ["Claire Lu"];

	this.defineTeamByUser = function(user) {
		var team = "Other";

		for (var i=0; i<subteamNames.length; i++) {
			var subteamName = subteamNames[i];
			if (subteamName!="Other") {
				if( subteams[subteamName].indexOf(user) > -1 ) team = subteamName;
			}
		}
		return team;		
	}

	this.getSubteamNames = function() {
		return subteamNames;
	}

	this.getReportTypes = function() {
		return reportTypes;
	}

	this.getDefaultReportType = function() {
		return reportTypes[1];
	}

	this.getDefaultDataSourceID = function() {
		var result = csvReports[csvReports.length-1];
		return result;
	}

	this.getCsvFileNames = function() {
		return csvReports;
	}

	this.getCsvFilePath = function() {
		return csvFilePath;
	}

	this.getFieldMap = function() {
		return fieldCaptionMap;
	}

	this.getProjectId = function() {
		return projectId;
	}

}