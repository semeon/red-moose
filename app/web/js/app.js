import {config} from "/js/config/config.js";
import {csvController} from "/js/csv/csvController.js";
import {dataModel} from "/js/model/dataModel.js";
import {ReportController} from "/js/reports/reportController.js";


dataModel.init(config);

csvController.init(config.getCsvFilePath());
csvController.parseFiles(config.getCsvFileNames(), callback);

function callback(fileId, result) {
	// console.dir("=========== " + fileId);
	// console.dir(result);
	dataModel.saveReportData(fileId, result.data);
	dataModel.logData(fileId);
}


