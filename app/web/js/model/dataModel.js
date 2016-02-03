export var dataModel = new DataModel();

function DataModel() {

	var lsIdPrefix = "blue-moose-";
	var config;


	// var rawData = {};
	var dataSummary = {};


	// dataSummary.total = {};
	// dataSummary.byPerson = {};
	// dataSummary.byDay = {};
	// dataSummary.byDayPerson = {};
	// dataSummary.byType = {};

	this.init = function(conf) {
		config = conf;
	}

	this.saveReportData = function(id, sprintRawData) {
		// rawData[id] = sprintRawData;

		UpdateSummary(id, sprintRawData);
	}


	this.logData = function(id) {
		var summary = dataSummary[id];
		console.dir("Report ID: " + id);
		console.dir(summary);
		console.dir("");
	}


	// Private

	function UpdateSummary(id, sprintRawData) {
		dataSummary[id] = {};
		var reportData = {};
		reportData.total = 0;
		reportData.byPerson = {};
		reportData.byDay = {};
		reportData.byType = {};
		reportData.byDayPerson = {};
		reportData.byPersonDay = {};

		for (var i=0; i<sprintRawData.length-1; i++) { 

			var record = sprintRawData[i];

			// Check record's relevance
			var recProject = record[config.getFieldMap().project];

			if (recProject == config.getProjectId()) {
				// Logged time
				var recLoggedTime = record[config.getFieldMap().timeLogged];

				// Logged user
				var recUser = record[config.getFieldMap().user];
				if(!reportData.byPerson[recUser]) reportData.byPerson[recUser] = 0;

				// Logged date
				var recDateTime = record[config.getFieldMap().dateTime]; // 2015-11-17 04:51
				var recDate = moment(recDateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
				if(!reportData.byDay[recDate]) reportData.byDay[recDate] = 0;

				// Work Type
				var workType = DefineWorkType(record);
				if(!reportData.byType[workType]) reportData.byType[workType] = 0;

				// ByDay ByPerson
				if(!reportData.byDayPerson[recDate]) reportData.byDayPerson[recDate] = {};
				if(!reportData.byDayPerson[recDate][recUser]) reportData.byDayPerson[recDate][recUser] = 0;


				// ByPerson ByDay
				if(!reportData.byPersonDay[recUser]) reportData.byPersonDay[recUser] = {};
				if(!reportData.byPersonDay[recUser][recDate]) reportData.byPersonDay[recUser][recDate] = 0;


				// Save
				reportData.total += recLoggedTime;
				reportData.byPerson[recUser] += recLoggedTime;
				reportData.byDay[recDate] += recLoggedTime;
				reportData.byType[workType] += recLoggedTime;
				reportData.byDayPerson[recDate][recUser] += recLoggedTime;
				reportData.byPersonDay[recUser][recDate] += recLoggedTime;
			}
		}

		dataSummary[id] = reportData;
	}

	function DefineWorkType(record) {
		var type = "";

		var recTicketType = record[config.getFieldMap().ticketType];
		var title = record[config.getFieldMap().ticketTitle];

		type = recTicketType;

		if ( recTicketType == "Task" ) {

			if( S(title).contains("Testing Automation") ) {
				type = "Testing Automation";

			} else if ( S(title).contains("Regression Testing") ) {
				type = "Regression Testing";

			} else if ( S(title).contains("Release Preparation") ) {
				type = "Release Preparation";
			}
		} 
		return type;
	}


}