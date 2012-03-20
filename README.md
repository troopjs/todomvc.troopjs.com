## TroopJS TODOS

#### An implementation of [TodoMVC](http://addyosmani.github.com/todomvc/) using [ToopJS](http://troopjs.github.com/)

## Introduction

This project serves two purposes:

* Provide the community a well known demo application that features the style and features of TroopJS.
* Provide a step-by-step tutorial on how to write a simple TroopJS application.

## TodoMVC deviations from the specifications

For one reason or another there are parts of the application that deviates from the [original specifications](https://github.com/addyosmani/todomvc/wiki/Todo-Application-Specification). We've tried to stay as true as possible, but hey - nobody's perfect. The known deviations are:

*	> ...There should be a ```css``` folder for styles, ```js``` folder for JavaScript, ```index.html``` for the markup, a ```img``` folder for images, and third-party JavaScript libraries should be kept in ```js/libs/```.

	Ours is located in `js/lib`. As none of the other folders (`css`, `js` and `img`) were pluralized, we thought that it was silly to do it here.

*	> When a user enters task editing mode the task in the task list should be changed from a checkbox with a label to a textbox taking up the same area that is filled with the value of the task. The user can enter a new value for the task, and upon hitting enter the task list is returned to its normal display with the new value for the given task.

	We do this, but we felt it was natural to do the same when the user removes focus from the input box.


*	> Above the task list there should be a "Mark all as complete" checkbox. When checked this checkbox should toggle the state of all the other tasks to match the state of the mark all checkbox. This means that if the mark all checkbox was checked and is unchecked after the user clicks it, all other tasks should be unchecked (marked as incomplete). When there are no tasks present, this checkbox should be completely hidden.

	Since the specsification does not define what this checkbox should do when only _some_ of the tasks are marked as completed, we've added an indeterminate state that covers this usecase.

## Tutorial

Before we look at any code we'll take you through the (recommended) directory structure for a TroopJS application.