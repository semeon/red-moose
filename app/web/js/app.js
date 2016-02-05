import {Config} from "/js/config/config.js";
import {CsvController} from "/js/csv/csvController.js";
import {DataModel} from "/js/model/dataModel.js";
import {UiController} from "/js/ui/uiController.js";
import {ReportController} from "/js/reports/reportController.js";


export var app = new App();

function App() {

	var app = this;
	var dataModel =  new DataModel();
	var uiController = new UiController();
	var reportControllers = {};
	var config = new Config();
	var csvController = new CsvController();
	
	this.init = function() {

		dataModel.init(config);

		for (var i=0; i<config.getReportTypes().length; i++ ) {
			var type = config.getReportTypes()[i];
			
			var defRepId = config.getDefaultReport();
			var dataSource = dataModel.getData(defRepId);

			reportControllers[type] = new ReportController(type, dataSource);
			if (type == config.getDefaultReportType()) {
				uiController.setCurrentView(reportControllers[type]);
			}	
		}

		uiController.setReportViews(reportControllers);
		csvController.init(config.getCsvFilePath());
	}


	this.start = function() {
		csvController.parseFiles(config.getCsvFileNames(), onCsvLoad);
		uiController.showReportNavigation();
	}


	// Private
	function onCsvLoad(id, result) {
		console.dir("== onCsvLoad == " + id);
		dataModel.saveReportData(id, result.data);
		if (id == config.getDefaultReport()) {
			uiController.showReport();
		}
	}
}







