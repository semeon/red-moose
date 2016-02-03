export var dataModel = new DataModel();

function DataModel() {

	var lsIdPrefix = "blue-moose-";
	var reportData = {};
	var fieldCaptionMap;

	this.init = function(fildMap) {
		fieldCaptionMap = fildMap;
	}

	this.saveReportData = function(id, data) {
		reportData[id] = data;
	}

	this.logData = function() {
		for(var id in reportData) {
			var rep = reportData[id];
			console.dir(rep);
		}
	}

}