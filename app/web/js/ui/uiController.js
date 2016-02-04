export var uiController = new UiController();

function UiController() {
	var self = this;
	var currentView = {};

	this.setCurrentView = function(repController) {
		currentView = repController;
	}

	this.showReport = function(repController) {
		if (!repController) repController = currentView;
		repController.build();
	}

}