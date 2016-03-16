export function SprintDataSummaryModel(conf) {

	var self = this;
	var config = conf;
	var summary = {};

	this.init = function() {
		summary.total = 0;
		summary.byPerson = {};
		summary.byTeam = {};
		summary.byTeamDay = {};
		summary.byTeamType = {};
		summary.byDay = {};
		summary.byType = {};
		summary.byDayPerson = {};
		summary.byPersonDay = {};
	}

	this.getData = function() {
		return summary;
	}

	this.update = function(dataRecord) {

		// Check and init
			if(!summary.byPerson[dataRecord.user]) summary.byPerson[dataRecord.user] = 0;
			
			if(!summary.byTeam[dataRecord.team]) summary.byTeam[dataRecord.team] = 0;

			if(!summary.byTeamDay[dataRecord.team]) summary.byTeamDay[dataRecord.team] = {};
			if(!summary.byTeamDay[dataRecord.team][dataRecord.date]) summary.byTeamDay[dataRecord.team][dataRecord.date] = 0;

			if(!summary.byTeamType[dataRecord.team]) summary.byTeamType[dataRecord.team] = {};
			if(!summary.byTeamType[dataRecord.team][dataRecord.workType]) summary.byTeamType[dataRecord.team][dataRecord.workType] = 0;


			if(!summary.byDay[dataRecord.date]) summary.byDay[dataRecord.date] = 0;
			
			if(!summary.byType[dataRecord.workType]) summary.byType[dataRecord.workType] = 0;

			if(!summary.byDayPerson[dataRecord.date]) summary.byDayPerson[dataRecord.date] = {};
			if(!summary.byDayPerson[dataRecord.date][dataRecord.user]) summary.byDayPerson[dataRecord.date][dataRecord.user] = 0;

			if(!summary.byPersonDay[dataRecord.user]) summary.byPersonDay[dataRecord.user] = {};
			if(!summary.byPersonDay[dataRecord.user][dataRecord.date]) summary.byPersonDay[dataRecord.user][dataRecord.date] = 0;


		// Update data
			summary.total += dataRecord.timeLogged;
			summary.byPerson[dataRecord.user] += dataRecord.timeLogged;
			summary.byTeam[dataRecord.team] += dataRecord.timeLogged;
			summary.byTeamDay[dataRecord.team][dataRecord.date] += dataRecord.timeLogged;
			summary.byTeamType[dataRecord.team][dataRecord.workType] += dataRecord.timeLogged;
			summary.byDay[dataRecord.date] += dataRecord.timeLogged;
			summary.byType[dataRecord.workType] += dataRecord.timeLogged;
			summary.byDayPerson[dataRecord.date][dataRecord.user] += dataRecord.timeLogged;
			summary.byPersonDay[dataRecord.user][dataRecord.date] += dataRecord.timeLogged;
	}
}