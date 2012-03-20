## TroopJS TODOS

#### An implementation of [TodoMVC](http://addyosmani.github.com/todomvc/) using [ToopJS](http://troopjs.github.com/)

## Introduction

This project serves two purposes:

* Provide the community a well known demo application that features the style and features of TroopJS.
* Provide a step-by-step tutorial on how to write a simple TroopJS application.

## TodoMVC deviations from the specifications

For one reason or another there are parts of the application that deviates from the [original specifications](https://github.com/addyosmani/todomvc/wiki/Todo-Application-Specification). We've tried to stay as true as possible, but hey - nobody's perfect. The known deviations are:

*	Where the original specification says

	> There should be a ```css``` folder for styles, ```js``` folder for JavaScript, ```index.html``` for the markup, a ```img``` folder for images, and third-party JavaScript libraries should be kept in ```js/libs/```.

	ours is located in `js/lib`. As none of the other folders (`css`, `js` and `img`) were pluralized, we thought that it was silly to do it here.

*	When editing an item it the specification says _upon hitting enter the task list is returned to its normal display with the new value for the given task_. We do this, but in addition to this we felt it was natural to do the same when the user removes focus from the input box.

*	In addition to the defined behavior of the 'mark all' checkbox, we've also added an indeterminate state when only some of the task are marked as complete.

## Tutorial

Before we look at any code we'll take you through the (recommended) directory structure for a TroopJS application.