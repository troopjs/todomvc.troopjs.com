# TroopJS TodoMVC Example

__An implementation of [TodoMVC](https://github.com/tastejs/todomvc/) using [ToopJS](http://troopjs.com/)__

## Introduction

TroopJS is a non-opinionated framework for structuring and managing Javascript
code. It provides mechanisms to build your code in a decoupled and structured
way; such that it's easy to understand and maintain.

In this example we show how to build a simple Todo application with TroopJS.

By studying this example you will have a good sense of what TroopJS can do for
you. Namely, you should understand:

0. The importance TroopJS gives for decoupling your code through the messages
   hub.
0. How to extend the functionality of DOM elements with Widgets.
0. How to create widgets.
0. How TroopJS manages and loads dependencies.

## Installation

```bash
# clone this repo:
git clone https://github.com/troopjs/troopjs-todos.git
cd troopjs-todos

# install dependencies:
bower install
```

Run the demo by serving `index.html` from an HTTP server.

## How to study this example

You can start by:

0. Digging into the code. The source is accompanied by comments which explain
   each of the modules and the functionalities it provides. Start from
   `index.html` and see how each of the widgets enhance the functionalities
   and interactions of DOM elements. Each of the widgets attached to DOM
   elements has a corresponding JS file which contains that widget's code.
0. Reading the tutorial at [`tutorial.md`](TUTORIAL.md).

## Additional resources

0. [TroopJS TodoMVC tutorial](TUTORIAL.md)
0. [Official website](http://troopjs.com/)
0. [API reference](https://cdn.rawgit.com/troopjs/troopjs/build/3.x/docs/index.html)
