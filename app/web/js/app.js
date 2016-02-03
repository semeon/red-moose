import {config} from "/js/config/config.js";
import {CsvController} from "/js/csv/csvController.js";
import {dataModel} from "/js/model/dataModel.js";


dataModel.init(config.getFieldCaptionMap());

var csvController = new CsvController(config.getCsvFilePath());
csvController.parseFiles(config.getCsvFileNames(), callback);

function callback(fileId, result) {
	dataModel.saveReportData(fileId, result.data);
	dataModel.logData();
}


