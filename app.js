"use strict";

require.config({
	"baseUrl" : "bower_components",
	"packages" : [
		{
			name : "jquery",
			main : "dist/jquery.js"
		},
		{
			name : "poly",
			main : "poly.js"
		},
		{
			name : "requirejs",
			main : "require.js"
		},
		{
			name : "when",
			main : "when.js"
		},
		{
			name : "troopjs-todos",
			location : "../"
		}
	],

	"map" : {
		"*" : {
			"template" : "mu-template/plugin",
			"text" : "requirejs-text/text",
			"config" : "app/config"
		}
	},

	"deps" : ["require", "jquery"],

	"callback" : function Boot(contextRequire, jQuery) {
		contextRequire([
			"troopjs-dom/application/widget",
			"troopjs-dom/hash/widget",
			"troopjs-dom/loom/plugin"
		], function Strap(Application, RouteWidget) {
			jQuery(function ($) {
				Application($("html"), "bootstrap", RouteWidget($(window))).start();
			});
		});
	}
});
