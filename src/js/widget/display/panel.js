define( [ "troopjs/component/widget", "jquery" ], function DisplayPanelModule(Widget, $) {
	return Widget.extend({
		"dom/action/test": function ActionTest(topic, $event) {
			console.log(arguments);
		}
	});
});