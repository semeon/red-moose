import {config} from "/js/config/config.js";
import {csvController} from "/js/csv/csvController.js";
import {dataModel} from "/js/model/dataModel.js";
import {ReportController} from "/js/reports/reportController.js";


dataModel.init(config);

csvController.init(config.getCsvFilePath());
csvController.parseFiles(config.getCsvFileNames(), onCsvLoad);


var reports = {};
reports.raw = new ReportController("raw");

// reports.raw.show("2015-11-17.csv");

function onCsvLoad(fileId, result) {
	// console.dir("=========== " + fileId);
	// console.dir(result);
	dataModel.saveReportData(fileId, result.data);
	reports.raw.build(fileId, dataModel.getDataRecords(fileId));
	// dataModel.logData(fileId);
}


