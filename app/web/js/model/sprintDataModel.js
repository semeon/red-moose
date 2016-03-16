import {SprintDataSummaryModel} from "/js/model/sprintDataSummaryModel.js";


export function SprintDataModel(conf) {

	var self = this;
	var config = conf;
	var sprintData = {};
	var summaryObject = {};

	this.init = function(id) {
		sprintData.status = "empty";
		sprintData.id = id;
		sprintData.summary = {};
		sprintData.records = [];
		sprintData.meta = {};
		sprintData.meta.users = [];
		sprintData.meta.dates = [];
		sprintData.meta.teams = config.getSubteamNames();
		sprintData.meta.teamMembers = {};

		// console.dir("Data init is done for: " + id);
		// console.dir(sprintData);
	}

	this.getSprintData = function() {
		return sprintData;
	}

	// this.getSprintDataRecords = function() {
	// 	return sprintData.records;
	// }

	// this.getSprintDataSummary = function() {
	// 	return sprintData.summary;
	// }

	// this.getSprintDataMeta = function() {
	// 	return sprintData.meta;
	// }



	this.setStatusToLoading = function() {
		sprintData.status = "loading";
	}

	this.saveData = function(sprintRawData) {
		ParseData(sprintRawData);
		if (sprintData.summary) sprintData.status = "loaded";
	}

	// Private Members

	function ParseData(sprintRawData) {

		// var summary = {};
		var summaryObj = new SprintDataSummaryModel(config);
		summaryObj.init();

		for (var i=0; i<sprintRawData.length-1; i++) { 
			var rawRecord = sprintRawData[i];
			// Check record's relevance
			var recProject = rawRecord[config.getFieldMap().project];
			if (recProject == config.getProjectId()) {

				// Save raw data
				var dataRecord = CreateDataRecord(rawRecord);
				sprintData.records.push(dataRecord);


				// Update Summary
				summaryObj.update(dataRecord);

				SaveMeta(dataRecord);
			}
		}
		summaryObj.finalize();
		sprintData.summary = summaryObj.getData();
		sprintData.meta.dates.sort();
		sprintData.meta.users.sort();
		console.dir(sprintData.summary);
	}


	function CreateDataRecord(rawRecord) {
		var dataRecord = {};
		dataRecord.project = rawRecord[config.getFieldMap().project];;
		dataRecord.ticketType = rawRecord[config.getFieldMap().ticketType];
		dataRecord.ticketId = rawRecord[config.getFieldMap().ticketId];
		dataRecord.ticketTitle = rawRecord[config.getFieldMap().ticketTitle];
		dataRecord.dateTime = rawRecord[config.getFieldMap().dateTime];
		dataRecord.date = moment(dataRecord.dateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
		dataRecord.user = rawRecord[config.getFieldMap().user];
		dataRecord.team = config.defineTeamByUser(dataRecord.user);
		dataRecord.timeLogged = rawRecord[config.getFieldMap().timeLogged];
		dataRecord.workType = DefineWorkType(rawRecord);
		return dataRecord;
	}


	function SaveMeta(dataRecord) {
		var user = dataRecord.user;
		var date = dataRecord.date;
		var team = dataRecord.team;

		if ( sprintData.meta.users.indexOf(user) < 0 ) sprintData.meta.users.push(user);
		if ( sprintData.meta.dates.indexOf(date) < 0 ) sprintData.meta.dates.push(date);

		if ( !sprintData.meta.teamMembers[team] ) sprintData.meta.teamMembers[team] = [];
		if ( sprintData.meta.teamMembers[team].indexOf(user) < 0 ) sprintData.meta.teamMembers[team].push(user);
	}

	function DefineWorkType(record) {
		var type = "";
		var recTicketType = record[config.getFieldMap().ticketType];
		var title = record[config.getFieldMap().ticketTitle];

		type = recTicketType;

		if ( recTicketType == "Epic" ) 								type = "Story";
		if ( recTicketType == "Sub-task" ) 							type = "Story";

		if ( recTicketType == "Task" ) {
			if( S(title).contains("Testing Automation") ) 			type = "Testing Automation";
			else if ( S(title).contains("[Operations]") ) 			type = "Operations";
			else if ( S(title).contains("Regression Testing") ) 	type = "Regression Testing";
			else if ( S(title).contains("Release Preparation") ) 	type = "Release Preparation";
		} 
		return type;
	}
}