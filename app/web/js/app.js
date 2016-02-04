import {config} from "/js/config/config.js";
import {csvController} from "/js/csv/csvController.js";
import {dataModel} from "/js/model/dataModel.js";
import {ReportController} from "/js/reports/reportController.js";
import {uiController} from "/js/ui/uiController.js";

dataModel.init(config);

var reportControllers = {};
for (var i=0; i<config.getReportTypes().length; i++ ) {
	var type = config.getReportTypes()[i];
	
	var defRepId = config.getDefaultReport();
	var dataSource = dataModel.getData(defRepId);

	reportControllers[type] = new ReportController(type, dataSource);
	if (type == config.getDefaultReportType()) {
		uiController.setCurrentView(reportControllers[type]);
	}	
}

console.dir(reportControllers);
uiController.setReportViews(reportControllers);


csvController.init(config.getCsvFilePath());
csvController.parseFiles(config.getCsvFileNames(), onCsvLoad);

uiController.showReportNavigation();

function onCsvLoad(id, result) {
	console.dir("== onCsvLoad == " + id);
	dataModel.saveReportData(id, result.data);
	if (id == config.getDefaultReport()) {
		uiController.showReport();
	}
}


