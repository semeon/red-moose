import {config} from "/js/config/config.js";
import {CsvController} from "/js/csv/csvController.js";



var csvController = new CsvController(config.getCsvFilePath());

csvController.parseFiles(config.getCsvFileNames(), callback);

function callback(fileId, result) {
	console.dir("Callback for " + fileId);
	console.dir(result);
}


