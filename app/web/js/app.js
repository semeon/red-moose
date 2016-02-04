import {config} from "/js/config/config.js";
import {csvController} from "/js/csv/csvController.js";
import {dataModel} from "/js/model/dataModel.js";
import {ReportController} from "/js/reports/reportController.js";
import {uiController} from "/js/ui/uiController.js";

var defaultReport = config.getDefaultReport();

dataModel.init(config);



var reports = {};
for (var i=0; i<dataModel.getReportIds().length; i++ ) {
	var id = dataModel.getReportIds()[i];
	var dataSource = dataModel.getData()[id];

	reports[id] = {};
	reports[id].raw = new ReportController("raw", dataSource);
	if (id == defaultReport) {
		uiController.setCurrentView(reports[id].raw);
	}	
}

csvController.init(config.getCsvFilePath());
csvController.parseFiles(config.getCsvFileNames(), onCsvLoad);


function onCsvLoad(id, result) {
	console.dir("== onCsvLoad == " + id);
	console.dir("defaultReport: " + defaultReport);
	dataModel.saveReportData(id, result.data);
	if (id == defaultReport) {
		uiController.showReport();
	}
}


