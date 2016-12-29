# Truthy

*Copyright 2016, Caleb Evans*  
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
