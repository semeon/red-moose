import {Config} from "/js/config/config.js";
import {CsvController} from "/js/csv/csvController.js";
import {DataModel} from "/js/model/dataModel.js";
import {UiController} from "/js/ui/uiController.js";
import {ReportController} from "/js/reports/reportController.js";


export var app = new App();

function App() {

	var app = this;
	var config = new Config();
	var dataModel =  new DataModel();
	var csvController = new CsvController();
	var selectedDataSource = {};

	var uiController = {};
	var reportController = {};
	
	this.init = function() {
		dataModel.init(config);
		selectedDataSource = dataModel.getData(config.getDefaultDataSourceID());
		reportController = new ReportController(selectedDataSource, config.getDefaultReportType());
		uiController = new UiController(config, app, reportController);
		csvController.init(config.getCsvFilePath());
	}


	this.start = function() {
		uiController.renderReportNavigation();
		csvController.parseFiles(config.getCsvFileNames(), onCsvLoad);
	}

	this.selectDataSource = function(id) {
		selectedDataSource = dataModel.getData(id);
		reportController.setDataSource(selectedDataSource);
	}

	// Private
	function onCsvLoad(id, result) {
		console.dir("== onCsvLoad == " + id);
		dataModel.saveReportData(id, result.data);
		if (id == config.getDefaultDataSourceID()) {
			uiController.renderReport();
		}
	}
}







