export function DataModel() {

	var self = this;

	var lsIdPrefix = "blue-moose-";
	var config;

	var dataIds = [];
	var data = {};

	var csvController = {};

	this.init = function(conf, csvCont) {
		config = conf;
		csvController = csvCont;
		for (var i=0; i<config.getCsvFileNames().length; i++) {
			var id = config.getCsvFileNames()[i];
			dataIds.push(id);
			data[id] = {};
			data[id].status = "empty";
			data[id].id = id;
			data[id].summary = {};
			data[id].records = [];
			data[id].meta = {};
			data[id].meta.users = [];
			data[id].meta.dates = [];
			data[id].meta.teams = config.getSubteamNames();
			data[id].meta.teamMembers = {};
		}

		console.dir("Data init is done:");
		console.dir(data);
	}


	this.loadData = function(id, callback) {

		function OnCsvLoad(id, result) {
			console.dir(">>> MODEL: End loading, ID: " + id + ", callback:  " + callback);
			self.saveReportData(id, result.data);
			if (callback) callback();
		}

		data[id].status = "loading";
		console.dir("<<< MODEL: Start loading, ID: " + id);
		csvController.parseFile(id, OnCsvLoad);
	}

	this.getData = function(id) {
		var result = data;
		if (id) result = data[id];
		return result;
	}

	this.getReportIds = function() {
		return dataIds;
	}

	this.getDataRecords = function(id) {
		return data[id].records;
	}

	this.saveReportData = function(id, sprintRawData) {
		UpdateSummary(id, sprintRawData);
		data[id].meta.dates.sort();
		data[id].meta.users.sort();
		if (data[id].summary.total) data[id].status = "loaded";
	}

	this.logData = function(id) {
		var summary = data[id].summary;
		console.dir("Report ID: " + id);
		console.dir(summary);
		console.dir("");
	}

	// Private Members

	function UpdateSummary(id, sprintRawData) {
		data[id].summary = {};
		var reportData = {};
		reportData.total = 0;
		reportData.byPerson = {};
		reportData.byTeam = {};
		reportData.byTeamDay = {};
		reportData.byTeamType = {};
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
		data[id].summary = reportData;

		console.dir(reportData);
	}

	function SaveRecord(id, record, reportData) {

		if(!data[id].records) data[id].records = [];
		var dataRecord = {};
		dataRecord.project = record[config.getFieldMap().project];;
		dataRecord.ticketType = record[config.getFieldMap().ticketType];
		dataRecord.ticketId = record[config.getFieldMap().ticketId];
		dataRecord.ticketTitle = record[config.getFieldMap().ticketTitle];
		dataRecord.dateTime = record[config.getFieldMap().dateTime];
		dataRecord.date = moment(dataRecord.dateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
		dataRecord.user = record[config.getFieldMap().user];
		dataRecord.team = config.defineTeamByUser(dataRecord.user);
		dataRecord.timeLogged = record[config.getFieldMap().timeLogged];
		dataRecord.workType = DefineWorkType(record);



		if(!reportData.byPerson[dataRecord.user]) reportData.byPerson[dataRecord.user] = 0;
		
		if(!reportData.byTeam[dataRecord.team]) reportData.byTeam[dataRecord.team] = 0;

		if(!reportData.byTeamDay[dataRecord.team]) reportData.byTeamDay[dataRecord.team] = {};
		if(!reportData.byTeamDay[dataRecord.team][dataRecord.date]) reportData.byTeamDay[dataRecord.team][dataRecord.date] = 0;

		if(!reportData.byTeamType[dataRecord.team]) reportData.byTeamType[dataRecord.team] = {};
		if(!reportData.byTeamType[dataRecord.team][dataRecord.workType]) reportData.byTeamType[dataRecord.team][dataRecord.workType] = 0;


		if(!reportData.byDay[dataRecord.date]) reportData.byDay[dataRecord.date] = 0;
		
		if(!reportData.byType[dataRecord.workType]) reportData.byType[dataRecord.workType] = 0;

		if(!reportData.byDayPerson[dataRecord.date]) reportData.byDayPerson[dataRecord.date] = {};
		if(!reportData.byDayPerson[dataRecord.date][dataRecord.user]) reportData.byDayPerson[dataRecord.date][dataRecord.user] = 0;

		if(!reportData.byPersonDay[dataRecord.user]) reportData.byPersonDay[dataRecord.user] = {};
		if(!reportData.byPersonDay[dataRecord.user][dataRecord.date]) reportData.byPersonDay[dataRecord.user][dataRecord.date] = 0;

		// Same Meta
		SaveMeta(id, dataRecord);

		// Save Data Record
		data[id].records.push(dataRecord);

		// Save Summary
		reportData.total += dataRecord.timeLogged;
		reportData.byPerson[dataRecord.user] += dataRecord.timeLogged;
		reportData.byTeam[dataRecord.team] += dataRecord.timeLogged;
		reportData.byTeamDay[dataRecord.team][dataRecord.date] += dataRecord.timeLogged;
		reportData.byTeamType[dataRecord.team][dataRecord.workType] += dataRecord.timeLogged;
		reportData.byDay[dataRecord.date] += dataRecord.timeLogged;
		reportData.byType[dataRecord.workType] += dataRecord.timeLogged;
		reportData.byDayPerson[dataRecord.date][dataRecord.user] += dataRecord.timeLogged;
		reportData.byPersonDay[dataRecord.user][dataRecord.date] += dataRecord.timeLogged;
	}

	function SaveMeta(id, dataRecord) {
		var user = dataRecord.user;
		var date = dataRecord.date;
		var team = dataRecord.team;

		if ( data[id].meta.users.indexOf(user) < 0 ) data[id].meta.users.push(user);
		if ( data[id].meta.dates.indexOf(date) < 0 ) data[id].meta.dates.push(date);

		if ( !data[id].meta.teamMembers[team] ) data[id].meta.teamMembers[team] = [];
		if ( data[id].meta.teamMembers[team].indexOf(user) < 0 ) data[id].meta.teamMembers[team].push(user);
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