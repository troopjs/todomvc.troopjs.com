# TroopJS TODOS

__An implementation of [TodoMVC](http://addyosmani.github.com/todomvc/) using [ToopJS](http://troopjs.github.com/)__

## Introduction

This project serves two purposes:

* Provide the community a well known demo application that features the style and features of TroopJS.
* Provide a step-by-step tutorial on how to write a simple TroopJS application.

## TodoMVC deviations from the specifications

For one reason or another there are parts of the application that deviates from the [original specifications](https://github.com/addyosmani/todomvc/wiki/Todo-Application-Specification). We've tried to stay as true as possible, but hey - nobody's perfect. The known deviations are:

*	> ... There should be a ```css``` folder for styles, ```js``` folder for JavaScript, ```index.html``` for the markup, a ```img``` folder for images, and third-party JavaScript libraries should be kept in ```js/libs/```.

	Ours is located in `js/lib`. As none of the other folders (`css`, `js` and `img`) were pluralized, we thought that it was silly to do it here.

*	> When a user enters task editing mode the task in the task list should be changed from a checkbox with a label to a textbox taking up the same area that is filled with the value of the task. The user can enter a new value for the task, and upon hitting enter the task list is returned to its normal display with the new value for the given task.

	We do this, but we felt it was natural to do the same when the user removes focus from the input box.

*	> Above the task list there should be a "Mark all as complete" checkbox. When checked this checkbox should toggle the state of all the other tasks to match the state of the mark all checkbox. This means that if the mark all checkbox was checked and is unchecked after the user clicks it, all other tasks should be unchecked (marked as incomplete). When there are no tasks present, this checkbox should be completely hidden.

	Since the specification does not define what this checkbox should do when only _some_ of the tasks are marked as completed, we've added an indeterminate state that covers this usecase.

## Tutorial

This part of the document gives you a step-by-step tutorial on how the todo application was written.

### Directory structure

Before we look at any code we'll take you through the (recommended) directory structure for a TroopJS application.

`
	.
	├── build
	│   └── lib
	├── src
	│   ├── css
	│   └── js
	│       └── lib
	└── test

As you and see all application sources are contained in a top `src` folder. The reason for this is that we want to keep _application_ resources separated from _test_ and _build_ resource. So to that affect the `test` folder contains test related resources and the `build` folder contains build related resources.

Inside the `js` and `build` folder there's a folder called `lib`. This is where external libraries should be stored. External libraries should be [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compliant.

> TroopJS makes use of git submodules to manage external libraries. Many of these libraries are not AMD compliant and some of them have platform or tool dependent build systems that would make the build of a TroopJS application prohibitively difficult. To solve this we've created clones of these libraries and committed AMD patches and build output to our clones. This way we can submodule our clones while still tracking upstream changes.

Any TroopJS application would (at the minimum) need the `troopjs`, `troopjs-requirejs` and `troopjs-jquery` submodules to work.

### Bootstrap

As previously noted the application resources are all contained in the `src` folder. In this folder there are a couple of _standard_ folders that most applications would need

`
	src
	├── js
	│   ├── lib
	│   └── widget
	├── css
	└── img

It's also recommended that there's a `src/index.html` (the application landing-page) and `src/js/app.js` (the application entry point).

So before we start we'll create a skeleton structure and add the external libraries needed for TroopJS to function.

>	As previously mentioned submodules should be added using git. For instructions on how to do this you can take a look at the [documentation](http://book.git-scm.com/5_submodules.html).

After this is done the directory structure will look something like this

`
	src
	├── css
	└── js
	    ├── lib
	    │   ├── composejs
	    │   ├── jquery
	    │   ├── requirejs
	    │   ├── troopjs
	    │   ├── troopjs-jquery
	    │   └── troopjs-requirejs
	    └── widget

> Note that we've omitted the `img` folder as we'll embed all the images in our CSS

So now we can start with our todo application. The first thing we should do is to copy the [template](https://github.com/addyosmani/todomvc/tree/master/template) resources to the correct locations. Once we're done with this we'll take a look at index.html

`html
	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Template - TodoMVC</title>
		<link rel="stylesheet" href="../assets/base.css">
		<link rel="stylesheet" href="css/app.css">
	</head>
	<body>
		<div id="todoapp">
			<header>
				<h1>Todos</h1>
				<input id="new-todo" type="text" placeholder="What needs to be done?">
			</header>
			<!-- this section is hidden by default and you be shown when there are todos and hidden when not -->
			<section id="main">
				<input id="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					<li class="done">
						<div class="view">
							<input class="toggle" type="checkbox" checked>
							<label>Create a TodoMVC template</label>
							<a class="destroy"></a>
						</div>
						<input class="edit" type="text" value="Create a TodoMVC template">
					</li>
					<li>
						<div class="view">
							<input class="toggle" type="checkbox">
							<label>Rule the web</label>
							<a class="destroy"></a>
						</div>
						<input class="edit" type="text" value="Rule the web">
					</li>
				</ul>
			</section>
			<!-- this footer needs to be shown with JS when there are todos and hidden when not -->
			<footer>
				<a id="clear-completed">Clear completed</a>
				<div id="todo-count"></div>
			</footer>
		</div>
		<div id="instructions">
			Double-click to edit a todo.
		</div>
		<div id="credits">
			Created by <a href="http://addyosmani.github.com/todomvc/">you</a>.
		</div>
		<!-- scripts here -->
		<script src="js/app.js"></script>
	</body>
	</html>

First we'll have to adjust the `head` section to run our application in "stand-alone" mode.

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/app.css">
```

>	Since the template did not include the `base.css` we'll copy it the from the [original](https://github.com/addyosmani/todomvc/blob/master/assets/base.css) into our `css` folder. At the same time we should add an empty `css/app.css` so we don't get a 404

And after that we should set up our application entry point

```html
<script type="text/javascript" data-main="js/app.js" src="js/lib/requirejs/require.js"></script>
```

> TroopJS uses [RequireJS](http://requirejs.org/) for its dependency management. The recomented way to bootstrap a RequireJS application is described [here](http://requirejs.org/docs/start.html#add)

Let's add a `src/app.js`

```javascript
require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"compose" : "lib/composejs/compose",
		"deferred" : "lib/troopjs-jquery/src/deferred",
		"text" : "lib/requirejs/text",
		"template" : "lib/troopjs-requirejs/src/template",
		"troopjs" : "lib/troopjs/src",
		"troopjs-jquery" : "lib/troopjs-jquery/src"
	}
}, [
	"jquery",
	"troopjs-jquery/action",
	"troopjs-jquery/destroy",
	"troopjs-jquery/dimensions",
	"troopjs-jquery/hashchange",
	"troopjs-jquery/weave",
	"troopjs-jquery/wire" ], function App(jQuery) {
	jQuery(document).ready(function ready($) {
		var body = this.body;

		$.Deferred(function deferredStart(dfdStart) {
			$(body).find("[data-weave]").weave(dfdStart);
		}).done(function doneStart() {
		});
	});
});
```

Lets review

*	```javascript
require({
```

	Start configuring RequireJS

	> RequireJS supports a [configuration object as the first argument](http://requirejs.org/docs/api.html#config) to the `require` function.

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
"paths" : {
	"jquery" : "lib/jquery/dist/jquery",
	"compose" : "lib/composejs/compose",
	"deferred" : "lib/troopjs-jquery/src/deferred",
	"text" : "lib/requirejs/text",
	"template" : "lib/troopjs-requirejs/src/template",
	"troopjs" : "lib/troopjs/src",
	"troopjs-jquery" : "lib/troopjs-jquery/src"
}
```

	Configure application path 'aliases'.

	> __paths__: path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a "/" or has a URL protocol in it ("like http:"). In those cases, the path is determined relative to baseUrl. Using the above sample config, "some/module"'s script tag will be src="/another/path/some/v1.0/module.js". The path that is used for a module name should not include the .js extension, since the path mapping could be for a directory. The path mapping code will automatically add the .js extension when mapping the module name to a path.

*	```javascript
}, [
	"jquery",
	"troopjs-jquery/action",
	"troopjs-jquery/destroy",
	"troopjs-jquery/dimensions",
	"troopjs-jquery/hashchange",
	"troopjs-jquery/weave",
	"troopjs-jquery/wire" ], function App(jQuery) {
```

	The second argument to `require` is an array of dependencies. In here we're boostrapping all the `troopjs-jquery` modules, and because they themselves are just jQuery plugins there really is not logical place to 'depend' on them except in the appstart.

	> Just like `define` the array of dependencies is [passed to the module entry point as arguments](http://requirejs.org/docs/api.html#defdep)

*	```javascript
jQuery(document).ready(function ready($) {
```

	Add a standard ready handler to the document

*	```javascript
	var body = this.body;

	$.Deferred(function deferredStart(dfdStart) {
		$(body).find("[data-weave]").weave(dfdStart);
	}).done(function doneStart() {
	});
```

	Find all children of the `body` element that have `data-weave` attributes and weave them. Wrap all of this in a `deferred` so we can get a callback when everything is done.

	> As we're not really doing anything when the deferred is resolved, we could have written the whole code block above in a much shorter way
	>
	> ```javascript
	> $(this.body).find("[data-weave]").weave();
	> ```

Now we've configure our application to use RequireJS and set up the application entry point.

### Adding some widgets

Lets go back and look at `index.html`. We want to try to break out functionality into small (somewhat selfcontained) widgets, and the natural place to start is adding and displaying todo items.

>	There are three main classes of modules in TroopJS
>
>	*	`component`s are the base building block of anything TroopJS
>	*	`gadget`s extend `component`s with methods like `publish` and `ajax`
>	*	`widget`s extend `gadget`s with UI related methods like `html` and `trigger`

Let's do this by adding _weave_ instructions in the HTML using `data-weave` attributes.

*	````html
<input id="new-todo" type="text" placeholder="What needs to be done?" data-weave="widget/create">
````

*	```html
<ul id="todo-list" data-weave="widget/list">
````

>	TroopJS _weaves_ widgets to the DOM by traversing it and finding elements that have a `data-weave` attribute. When weaving an element TroopJS will
>
>	* Locate (and if needed async load) the module containing the widget
>	* Instantiate the widget (if needed, we do support singleton widgets)
>	* Wire the instance (basically reflect on the instance and scan for well known method signatures), more on this later

The first widget to deal with is `widget/create.js'

> Widgets are named after where they are located (relative to `baseUrl`) in the source tree. A general rule is to simply add `.js` to the widget name to locate the file, so `widget/create` can be found in `src/js/widget/create.js`

```javascript
define( [ "troopjs/component/widget" ], function CreateModule(Widget) {
	return Widget.extend({
		"dom/keyup" : function onKeyUp(topic, $event) {
			var self = this;
			var $element = self.$element;

			switch($event.keyCode) {
			case 13:
				self.publish("todos/add", $element.val());

				$element.val("");
			}
		}
	});
});
```

Let's go through this widget line by line

*	```javascript
define( [ "troopjs/component/widget" ], function CreateModule(Widget) {
```

	Start the definition of this module and declare its dependencies. The module is (internally) named `CreateModule` and it depends on `troopjs/component/widget` wich will be available inside the module as `Widget`

	> If you look above in `src/js/app.js` you'll find a path definition for `troopjs` that points to `lib/troopjs/src`. This means that `troopjs/...` actually resolves to `lib/troopjs/src/...`

*	```javascript
return Widget.extend({
```

	The result of this module is extending `Widget`

	> Support for `.extend` is provided by [ComposeJS](https://github.com/kriszyp/compose). TroopJS uses ComposeJS for all its object composition

*	```javascript
"dom/keyup" : function onKeyUp(topic, $event) {
```

	This is where wireing becomes important. As mentioned above, wireing scans for well know method signatures, and `dom/*` is one of these. In this instance we're indicating that we want to add a handler for the DOM `keyup` event.

	> All wired handlers always get a `topic` as the first argument. The topic contains information what the trigger to this handler was. The rest of the arguments vary depending on the type of trigger. For DOM triggers the second argument is the original jQuery event object.

*	```javascript
var self = this;
var $element = self.$element;
switch($event.keyCode) {
case 13:
	self.publish("todos/add", $element.val());
	$element.val("");
}
```

	*	Store `this` as `self` so it can be used inside closures
	*	Store the woven element as `$element`
	*	Switch on the jQuery event `keyCode`
	*	If the key was 'enter' (`13`) we `publish` on the `todos/add` topic with the value of `$element` and then reset the value of `$element`
