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

	var reportTypes = ["overview", "byDay", "workTypes", "raw"];

	var subteamNames = ["Dev", "QA", "UX/UI", "Other"];

	var workTypes = [	"Story", 
						"Improvement", 
						"Task", 
						"Bug", 
						"Regression Testing", 
						"Testing Automation", 
						"Release Preparation",
						"Design Task",
						"Overhead"
						];

	var workTypesColour = {};
	// http://www.materialui.co/colors
	workTypesColour["Story"] = "#4CAF50";
	workTypesColour["Improvement"] = "#8BC34A";
	workTypesColour["Task"] = "#29B6F6";
	workTypesColour["Bug"] = "#FF6F00";
	workTypesColour["Regression Testing"] = "#BCAAA4";
	workTypesColour["Testing Automation"] = "#00BCD4";
	workTypesColour["Release Preparation"] = "#BDBDBD";
	workTypesColour["Design Task"] = "#90CAF9";
	workTypesColour["Overhead"] = "#FF8A65";


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
		return subteams;
	}

	this.getWorkTypes = function() {
		return workTypes;
	}

	this.getWorkTypesColour = function(type) {
		var result = "#EEEEEE";
		if (workTypesColour[type]) result = workTypesColour[type];
		return result;
	}


	this.getReportTypes = function() {
		return reportTypes;
	}

	this.getDefaultReportType = function() {
		return reportTypes[2];
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