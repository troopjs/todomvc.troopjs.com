# TroopJS TodoMVC Example

__An implementation of [TodoMVC](http://addyosmani.github.com/todomvc/) using [ToopJS](http://troopjs.com/)__

## Introduction

This project serves two purposes:

* Provide the community a well known demo application that features the style and features of TroopJS.
* Provide a step-by-step tutorial on how to write a simple TroopJS application.

## TodoMVC deviations from the specifications

For one reason or another there are parts of the application that deviates from the [original specifications](https://github.com/addyosmani/todomvc/wiki/Todo-Application-Specification). We've tried to stay as true as possible, but hey - nobody's perfect. The known deviations are:

*	> This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state after the the "Clear completed" button is clicked. The "Mark all as complete" checkbox should also be updated when single todo items are checked/unchecked. Eg. When all the todos are checked it should also get checked.

	Since the specification does not define what this checkbox should do when only _some_ of the tasks are marked as completed, we've added an indeterminate state that covers this usecase.

## Tutorial

This part of the document gives you a step-by-step tutorial on how the todo application was written.

### Directory structure

Before we look at any code we'll take you through the (recommended) directory structure for a TroopJS application.

```
.
├── src
│   ├── css
│   └── js
│       └── lib
└── test
```

As you and see all application sources are contained in a top `src` folder. The reason for this is that we want to keep _application_ resources separated from _test_ and _build_ resources. So to that effect, the `test` folder contains test related resources and the `build` folder contains build output.

Inside the `js` folder there's a folder called `lib`. This is where external libraries should be stored. External libraries should be [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compliant.

> TroopJS makes use of git submodules to manage external libraries. Many of these libraries are not AMD compliant and some of them have platform or tool dependent build systems that would make the build of a TroopJS application prohibitively difficult. To solve this we've created clones of these libraries and committed AMD patches and build output to our clones. This way we can submodule our clones while still tracking upstream changes.

### Bootstrap

As previously noted the application resources are all contained in the `src` folder. In this folder there are a couple of _standard_ folders that most applications would need

```
src
├── js
│   ├── lib
│   └── widget
├── css
└── img
```

It's also recommended that there's a `src/index.html` (the application landing-page).

So before we start we'll create a skeleton structure and add the external libraries needed for TroopJS to function.

>	As previously mentioned submodules should be added using git. For instructions on how to do this you can take a look at the [documentation](http://book.git-scm.com/5_submodules.html).

After this is done the directory structure will look something like this

```
src
├── css
├── js
│   ├── lib
│   │   ├── jquery
│   │   ├── requirejs
│   │   └── troopjs-bundle
│   └── widget
└── img
```

So now we can start with our todo application. The first thing we should do is to copy the [template](https://github.com/addyosmani/todomvc/tree/gh-pages/template) resources to the correct locations. Once we're done with this we'll take a look at index.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Template • TodoMVC</title>
		<link rel="stylesheet" href="components/todomvc-common/base.css">
		<!-- CSS overrides - remove if you don't need it -->
		<link rel="stylesheet" href="css/app.css">
	</head>
	<body>
		<section id="todoapp">
			<header id="header">
				<h1>todos</h1>
				<input id="new-todo" placeholder="What needs to be done?" autofocus>
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<section id="main">
				<input id="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
					<li class="completed">
						<div class="view">
							<input class="toggle" type="checkbox" checked>
							<label>Create a TodoMVC template</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
					<li>
						<div class="view">
							<input class="toggle" type="checkbox">
							<label>Rule the web</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Rule the web">
					</li>
				</ul>
			</section>
			<!-- This footer should hidden by default and shown when there are todos -->
			<footer id="footer">
				<!-- This should be `0 items left` by default -->
				<span id="todo-count"><strong>1</strong> item left</span>
				<!-- Remove this if you don't implement routing -->
				<ul id="filters">
					<li>
						<a class="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button id="clear-completed">Clear completed (1)</button>
			</footer>
		</section>
		<footer id="info">
			<p>Double-click to edit a todo</p>
			<!-- Remove the below line ↓ -->
			<p>Template by <a href="http://github.com/sindresorhus">Sindre Sorhus</a></p>
			<!-- Change this out with your name and url ↓ -->
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
		<!-- Scripts here. Don't remove this ↓ -->
		<script src="components/todomvc-common/base.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
```

> TroopJS uses [RequireJS](http://requirejs.org/) for its dependency management. The recommended way to bootstrap a RequireJS application is described [here](http://requirejs.org/docs/start.html#add), but we're using an alternative way to configure RequireJS described [here](http://requirejs.org/docs/api.html#config) whereby we define the config as the global variable `require` __before__ `require.js` is loaded.

Let's add the configuration (inside a `script` tag right before the script that includeds `js/app`)

```javascript
"use strict";
var require = {
	"baseUrl" : "js",

	"packages" : [{
		"name" : "jquery",
		"location" : "lib/jquery",
		"main" : "dist/jquery"
	}, {
		"name" : "poly",
		"location" : "lib/troopjs-bundle/src/lib/poly",
		"main" : "poly"
	}, {
		"name" : "when",
		"location" : "lib/troopjs-bundle/src/lib/when",
		"main" : "when"
	}, {
		"name" : "troopjs-core",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-core/src"
	}, {
		"name" : "troopjs-browser",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-browser/src"
	}, {
		"name" : "troopjs-data",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-data/src"
	}, {
		"name" : "troopjs-jquery",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-jquery/src"
	}, {
		"name" : "troopjs-requirejs",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-requirejs/src"
	}, {
		"name" : "troopjs-utils",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-utils/src"
	}, {
		"name" : "troopjs-bundle",
		"location" : "lib/troopjs-bundle",
		"main" : "build/maxi"
	}, {
		"name" : "troopjs-todos",
		"location" : ".",
		"main" : "application.min"
	}],

	"map" : {
		"*" : {
			"template" : "troopjs-requirejs/template"
		}
	},

	"deps" : [ "require" ],

	"callback" : function Boot (contextRequire) {
		contextRequire([ "jquery", "troopjs-browser/application/widget", "troopjs-browser/route/widget" ], function Strap (jQuery, Application, RouteWidget) {
			jQuery(function ($) {
				Application($("html"), "bootstrap", RouteWidget($(window), "route")).start();
			});
		});
	}
};
```

Lets review

*	```javascript
	"use strict";
	```

	Tell the javascript interpreter that we run this in strict mode.

*	```javascript
	var require = {
	```

	Start configuring RequireJS

	> RequireJS supports a [configuration object as the as the global variable require](http://requirejs.org/docs/api.html#config).

*	```javascript
	"baseUrl" : "js",
	```

	Set the `baseUrl` to `js`.

	> __baseUrl__: the root path to use for all module lookups. So in the above example, "my/module"'s script tag will have a src="/another/path/my/module.js". baseUrl is not used when loading plain .js files, those strings are used as-is, so a.js and b.js will be loaded from the same directory as the HTML page that contains the above snippet.
	>
	> If no baseUrl is explicitly set in the configuration, the default value will be the location of the HTML page that loads require.js. If a data-main attribute is used, that path will become the baseUrl.
	>
	> The baseUrl can be a URL on a different domain as the page that will load require.js. RequireJS script loading works across domains. The only restriction is on text content loaded by text! plugins: those paths should be on the same domain as the page, at least during development. The optimization tool will inline text! plugin resources so after using the optimization tool, you can use resources that reference text! plugin resources from another domain.

*	```javascript
	"packages" : [{
		"name" : "jquery",
		"location" : "lib/jquery",
		"main" : "dist/jquery"
	}, {
		"name" : "poly",
		"location" : "lib/troopjs-bundle/src/lib/poly",
		"main" : "poly"
	}, {
		"name" : "when",
		"location" : "lib/troopjs-bundle/src/lib/when",
		"main" : "when"
	}, {
		"name" : "troopjs-core",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-core/src"
	}, {
		"name" : "troopjs-browser",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-browser/src"
	}, {
		"name" : "troopjs-data",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-data/src"
	}, {
		"name" : "troopjs-jquery",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-jquery/src"
	}, {
		"name" : "troopjs-requirejs",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-requirejs/src"
	}, {
		"name" : "troopjs-utils",
		"location" : "lib/troopjs-bundle/src/lib/troopjs-utils/src"
	}, {
		"name" : "troopjs-bundle",
		"location" : "lib/troopjs-bundle",
		"main" : "build/maxi"
	}, {
		"name" : "troopjs-todos",
		"location" : ".",
		"main" : "application.min"
	}],
	```

	Configures loading modules from CommonJS packages.

	> __packages__: RequireJS supports loading modules that are in a [CommonJS Packages directory](http://wiki.commonjs.org/wiki/Packages/1.1) structure, but some additional configuration needs to be specified for it to work. Specifically, there is support for the following CommonJS Packages features:
	>
	> * A package can be associated with a module name/prefix.
	> * The package config can specify the following properties for a specific package:
	>	* __name__: The name of the package (used for the module name/prefix mapping)
	>	* __location__: The location on disk. Locations are relative to the baseUrl configuration value, unless they contain a protocol or start with a front slash (/).
	>	* __main__: The name of the module inside the package that should be used when someone does a require for "packageName". The default value is "main", so only specify it if it differs from the default. The value is relative to the package folder.
	>
	> There's further information available in the RequireJS documentation about [Loading Modules from Packages](http://requirejs.org/docs/api.html#packages).

*	```javascript
	"deps": [ "require" ]
	```

	Depend on `require`

	> __deps__: An array of dependencies to load. This is useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined.
	
*	```javascript
	"callback" : function Boot (contextRequire) {
	```

	The callback that will be called after __deps__ have been resolved (in this case called `Boot`).

	> A function to execute after __deps__ have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's __deps__ array has been loaded.

*	```javascript
	contextRequire([ "jquery", "troopjs-browser/application/widget", "troopjs-browser/route/widget" ], function Strap(jQuery, Application, RouteWidget) {
	```

	Use the context require to load `jquery`, `troopjs-browser/application/widget` and `troopjs-browser/route/widget`, and once that is completed call the `Strap` function.

*	```javascript
	jQuery(document).ready(function ($) {
	```

	Add a standard ready handler to the document

*	```javascript
	Application($("html"), "bootstrap", RouteWidget($(window), "route")).start();
	```

	Create and attach the `bootstrap` application to `$("html")` and add a `RouteWidget` attached to `$(window)` as a child. Then `start` the application.

Now we've configure our application to use RequireJS and set up the application entry point.

### Adding some widgets

Lets go back and look at `index.html`. We want to try to break out functionality into small (somewhat self-contained) widgets, and the natural place to start is adding and displaying todo items.

>	There are three main classes of modules in TroopJS
>
>	*	`component`s are the base building block of anything TroopJS
>	*	`gadget`s extend `component`s with methods like `publish` and `subscribe`
>	*	`widget`s extend `gadget`s with UI related methods like `html` and `after`

Let's do this by adding _weave_ instructions in the HTML using `data-weave` attributes.

*	```html
	<input id="new-todo" placeholder="What needs to be done?" autofocus data-weave="widget/create">
	```

*	```html
	<ul id="todo-list" data-weave="widget/list">
	```

>	TroopJS _weaves_ widgets to the DOM by traversing it and finding elements that have a `data-weave` attribute. When weaving an element TroopJS will:
>
>	* Locate (and if needed async load) the module containing the widget
>	* Instantiate the widget and attach the jQuery wrapped DOM element to the created instance
>	* Wire the instance (basically reflect on the instance and scan for well-known method signatures), more on this later

#### The create widget

The first widget to deal with is `widget/create.js'

> Widgets are named after where they are located (relative to `baseUrl`) in the source tree. A general rule is to simply add `.js` to the widget name to locate the file, so `widget/create` can be found in `src/js/widget/create.js`

```javascript
define([ "troopjs-browser/component/widget" ], function CreateModule(Widget) {
	var ENTER_KEY = 13;

	return Widget.extend({
		"dom/keyup": function onKeyUp($event) {
			var self = this;
			var $element = self.$element;
			var value;

			switch ($event.keyCode) {
				case ENTER_KEY:
					// Get $element value
					value = $element.val().trim();

					// Check that the value is not empty
					if (value !== "") {
						// Publish todos/add
						self.publish("todos/add", value)
							// When all handlers are done
							.then(function () {
								// Reset val
								$element.val("");
							});
					}
					break;
			}
		}
	});
});
```

Let's go through this widget

*	```javascript
	define([ "troopjs-browser/component/widget" ], function CreateModule(Widget) {
	```

	Start the definition of this module and declare its dependencies. The module is (internally) named `CreateModule` and it depends on `troopjs-browser/component/widget` which will be available inside the module as `Widget`

	> If you look above in `index.html` you'll find a package definition for `troopjs-browser` that points to `lib/troopjs-bundle/src/lib/troopjs-browser/src`. This means that `troopjs-browser/...` actually resolves to `lib/troopjs-bundle/src/lib/troopjs-browser/src/...`

*	```javascript
	return Widget.extend({
	```

	The result of this module is extending `Widget`

*	```javascript
	var ENTER_KEY = 13;
	```

	Declare a constant for `ENTER_KEY` corresponding to the `keyCode` of enter.

*	```javascript
	"dom/keyup" : function onKeyUp($event) {
	```

	This is where wiring becomes important. As mentioned above, wiring scans for well-known method signatures, and `dom/*` is one of these. In this instance, we're indicating that we want to add a handler for the DOM `keyup` event.

	> For DOM handlers, the first argument is the original jQuery event object.

*	```javascript
	var self = this;
	var $element = self.$element;
	var value;
	
	switch ($event.keyCode) {
		case ENTER_KEY:
			// Get $element value
			value = $element.val().trim();

			// Check that the value is not empty
			if (value !== "") {
				// Publish todos/add
				self.publish("todos/add", value)
					// When all handlers are done
					.then(function () {
						// Reset val
						$element.val("");
					});
			}
			break;
	}
	```

	*	Save `this` as `self` so we can use it inside of closures
	*	Save `self.$element` (woven element) as `$element`
	*	Store the trimmed value of the element as `value`
	*	Check if the `keyCode` of the event was enter - if so `publish` `value` on `todos/add` and once all handlers are completed, reset `$element`.
