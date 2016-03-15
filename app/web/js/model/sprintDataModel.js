
export function SprintDataModel(conf) {

	var self = this;
	var config = conf;
	var sprintData = {};

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


	this.setStatusToLoading = function() {
		sprintData.status = "loading";
	}

	this.saveData = function(sprintRawData) {
		UpdateSummary(sprintRawData);
		if (sprintData.summary) sprintData.status = "loaded";
	}

	// Private Members

	function UpdateSummary(sprintRawData) {

		var summary = {};
		summary.total = 0;
		summary.byPerson = {};
		summary.byTeam = {};
		summary.byTeamDay = {};
		summary.byTeamType = {};
		summary.byDay = {};
		summary.byType = {};
		summary.byDayPerson = {};
		summary.byPersonDay = {};


		for (var i=0; i<sprintRawData.length-1; i++) { 
			var record = sprintRawData[i];
			// Check record's relevance
			var recProject = record[config.getFieldMap().project];
			if (recProject == config.getProjectId()) {
				SaveRecord(record, summary);
			}
		}

		sprintData.summary = summary;

		console.dir(summary);
	}



	function SaveRecord(record, reportData) {

		if(!sprintData.records) sprintData.records = [];
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
		SaveMeta(dataRecord);
		sprintData.meta.dates.sort();
		sprintData.meta.users.sort();		

		// Save Data Record
		sprintData.records.push(dataRecord);

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

		if ( recTicketType == "Epic" ) type = "Story";
		if ( recTicketType == "Sub-task" ) type = "Story";


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