# Truthy

*Copyright 2016-2017, Caleb Evans*  
*Released under the MIT License*

[![Build Status](https://travis-ci.org/caleb531/truthy.svg?branch=master)](https://travis-ci.org/caleb531/truthy)

Truth tables have always been tedious and strenuous to create by hand; it's easy
for your mind to lose track and for your hand to fatigue. Truthy is a web app
designed to reduce this manual labor by automatically generating the truth
tables for any boolean expressions you supply.

You can view the app online at:  
https://projects.calebevans.me/truthy/

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

### 3. Serve app locally

To serve the app locally, run:

```bash
brunch watch --server
```

When run, the app will be accessible at `http://localhost:3333`.
