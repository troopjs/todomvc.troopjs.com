## TroopJS TODOS

#### An implementation of [TodoMVC](http://addyosmani.github.com/todomvc/) using [ToopJS](http://troopjs.github.com/)

## Introduction

This project serves two purposes:

* Provide the community a well known demo application that features the style and features of TroopJS.
* Provide a step-by-step tutorial on how to write a simple TroopJS application.

## TodoMVC deviations from the specifications

For one reason or another there are parts of the application that deviates from the [original specifications](https://github.com/addyosmani/todomvc/wiki/Todo-Application-Specification). We've tried to stay as true as possible, but hey - nobody's perfect. The known deviations are:

*	Where the original specification says

* When editing an item it the specification says _upon hitting enter the task list is returned to its normal display with the new value for the given task_. We do this, but in addition to this we felt it was natural to do the same when the user removes focus from the input box.

* In addition to the defined behavior of the 'mark all' checkbox, we've also added an indeterminate state when only some of the task are marked as complete.