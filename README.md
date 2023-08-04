# Truthy

*Copyright 2016-2023 Caleb Evans*  
*Released under the MIT License*

[![tests](https://github.com/caleb531/truthy/actions/workflows/tests.yml/badge.svg)](https://github.com/caleb531/truthy/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/caleb531/truthy/badge.svg?branch=main)](https://coveralls.io/github/caleb531/truthy?branch=main)

Truth tables have always been tedious and strenuous to create by hand; it's easy
for your mind to lose track and for your hand to fatigue. Truthy is a web app
designed to reduce this manual labor by automatically generating the truth
tables for any boolean expressions you supply.

You can view the app online at:  
https://projects.calebevans.me/truthy/

![Truthy in action](screenshot.png)

## Run the project locally

### 1. Clone project

Clone the project down via HTTPS or SSH:

```bash
git clone https://github.com/caleb531/truthy.git
```

### 2. Install packages

This project uses [pnpm][pnpm] (instead of npm) for package
installation and management.

[pnpm]: https://pnpm.io/

```bash
npm install -g pnpm
pnpm install
```

### 2. Serve app locally

To serve the app locally, run:

```bash
pnpm dev
```

When run, the app will be accessible at http://localhost:5173.
