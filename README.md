# Truthy

*Copyright 2017, Caleb Evans*  
*Released under the MIT License*

Truth tables have always been tedious and strenuous to create by hand; it's easy
for your mind to lose track and for your hand to fatigue. Back in 2013, I
created an app called [Truthy](https://projects.calebevans.me/truthy/) to solve
this problem by automatically generating the truth table for any boolean
expressions you supply.

The first iteration of Truthy was written in jQuery, and while it functioned
reasonably well, the code was heavy, lacking in structure, and not easily
extensible. I later rewrote Truthy using [Backbone.js](http://backbonejs.org/),
and though the code was certainly more structured, it was still full of heavy
DOM manipulation and other inefficiencies which hindered the scalability of the
application.

This project, deemed Truthy v3, aims to be a complete rewrite of Truthy, powered
largely by [Mithril](http://mithril.js.org/) (instead of jQuery and Backbone). I
ultimately aim for the app to be modern, clean, and efficient. The project is in
its very early stages of development, but I have made the repository public for
anyone's interest.

## Run the project locally

### 1. Install global dependencies

The project requires Node.js and Brunch, so make sure you have both.

```bash
brew install node
```

```bash
npm install -g brunch
```

### 2. Install project dependencies

From the cloned project directory, run:

```bash
npm install
```

### 3. Generate parser

To generate the application's expression parser from the project grammar file,
run:

```bash
npm run generate-parser
```

### 4. Serve app locally

To serve the app locally, run:

```bash
brunch watch --server
```

When run, the app will be accessible at `http://localhost:3333`.
