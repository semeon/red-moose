import {SprintDataModel} from "/js/model/sprintDataModel.js";

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

			data[id] = new SprintDataModel(conf);
			data[id].init(id);
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

		data[id].setStatusToLoading();
		console.dir("<<< MODEL: Start loading, ID: " + id);
		csvController.parseFile(id, OnCsvLoad);
	}

	this.getData = function(id) {
		var result = false;
		if (id) result = data[id].getSprintData();
		return result;
	}

	this.getReportIds = function() {
		return dataIds;
	}

	this.getDataRecords = function(id) {
		return data[id].records;
	}

	this.saveReportData = function(id, sprintRawData) {
		data[id].saveData(sprintRawData);
	}

	this.logData = function(id) {
		var summary = data[id].summary;
		console.dir("Report ID: " + id);
		console.dir(summary);
		console.dir("");
	}
}