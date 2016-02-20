import {Config} from "/js/config/config.js";
import {CsvController} from "/js/csv/csvController.js";
import {DataModel} from "/js/model/dataModel.js";
import {UiController} from "/js/ui/uiController.js";

export var app = new App();

function App() {

	var app = this;
	var config = new Config();
	var dataModel =  new DataModel();
	var csvController = new CsvController();
	var selectedDataSource = {};

	var uiController = {};
	
	this.init = function() {
		csvController.init(config.getCsvFilePath());
		dataModel.init(config, csvController);
		selectedDataSource = dataModel.getData(config.getDefaultDataSourceID());
		uiController = new UiController(app, config);
	}

	this.start = function() {
		dataModel.loadData(config.getDefaultDataSourceID(), RenderReport);
		uiController.renderReportNavigation();
		uiController.renderReport(selectedDataSource, config.getDefaultReportType());
	}

	this.changeDataSource = function(id) {
		selectedDataSource = dataModel.getData(id);
		if (selectedDataSource.status == "loaded") {
			uiController.renderReport(selectedDataSource, null);

		} else {
			dataModel.loadData(id, RenderReport);
		}
	}

	this.getDataSource = function() {
		return selectedDataSource;
	}

	// Private
	function RenderReport() {
		uiController.renderReport(selectedDataSource, null);
	}

}







