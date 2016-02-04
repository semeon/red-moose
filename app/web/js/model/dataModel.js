export var dataModel = new DataModel();

function DataModel() {

	var self = this;

	var lsIdPrefix = "blue-moose-";
	var config;
	var dataSummary = {};
	var dataRecords = {};

	this.init = function(conf) {
		config = conf;
	}

	this.getDataRecords = function(id) {

		var result = dataRecords;
		if (id) result = dataRecords[id];

		return result;
	}

	this.saveReportData = function(id, sprintRawData) {
		// rawData[id] = sprintRawData;
		UpdateSummary(id, sprintRawData);
		// self.logData(id);
	}

	this.logData = function(id) {
		var summary = dataSummary[id];
		console.dir("Report ID: " + id);
		console.dir(summary);
		console.dir("");
	}

	// Private Members

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
				SaveRecord(id, record, reportData);
			}
		}
		dataSummary[id] = reportData;
	}

	function SaveRecord(id, record, reportData) {

		if(!dataRecords[id]) dataRecords[id] = [];
		var dataRecord = {};
		dataRecord.project = record[config.getFieldMap().project];;
		dataRecord.ticketType = record[config.getFieldMap().ticketType];
		dataRecord.ticketId = record[config.getFieldMap().ticketId];
		dataRecord.ticketTitle = record[config.getFieldMap().ticketTitle];
		dataRecord.dateTime = record[config.getFieldMap().dateTime];
		dataRecord.date = moment(dataRecord.dateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
		dataRecord.user = record[config.getFieldMap().user];
		dataRecord.timeLogged = record[config.getFieldMap().timeLogged];
		dataRecord.workType = DefineWorkType(record);

		if(!reportData.byPerson[dataRecord.user]) reportData.byPerson[dataRecord.user] = 0;
		if(!reportData.byDay[dataRecord.date ]) reportData.byDay[dataRecord.date ] = 0;
		if(!reportData.byType[dataRecord.workType]) reportData.byType[dataRecord.workType] = 0;

		if(!reportData.byDayPerson[dataRecord.date]) reportData.byDayPerson[dataRecord.date] = {};
		if(!reportData.byDayPerson[dataRecord.date][dataRecord.user]) reportData.byDayPerson[dataRecord.date][dataRecord.user] = 0;

		if(!reportData.byPersonDay[dataRecord.user]) reportData.byPersonDay[dataRecord.user] = {};
		if(!reportData.byPersonDay[dataRecord.user][dataRecord.date]) reportData.byPersonDay[dataRecord.user][dataRecord.date] = 0;


		// Save Data Record
		dataRecords[id].push(dataRecord);

		// Save Summary
		reportData.total += dataRecord.timeLogged;
		reportData.byPerson[dataRecord.user] += dataRecord.timeLogged;
		reportData.byDay[dataRecord.date] += dataRecord.timeLogged;
		reportData.byType[dataRecord.workType] += dataRecord.timeLogged;
		reportData.byDayPerson[dataRecord.date][dataRecord.user] += dataRecord.timeLogged;
		reportData.byPersonDay[dataRecord.user][dataRecord.date] += dataRecord.timeLogged;
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