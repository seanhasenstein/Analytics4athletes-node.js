/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `Analytics 4 Athletes`;

exports.menu = [
  { slug: '/', title: 'Home', },
  { slug: '/products', title: 'Products', },
  { slug: '/about', title: 'About', },
  { slug: '/blog', title: 'Blog', },
  { slug: '/contact', title: 'Contact', },
];

exports.scottieLindsey = [
  { slug: 'assisted-vs-non-assisted', vbSlug: 'visual-breakdown-assisted-vs-non-assisted', label: 'Assisted vs. Non-Assisted', category: 'Visual Breakdown', },
  { slug: 'contested-vs-non-contested', vbSlug: 'visual-breakdown-contested-vs-non-contested', label: 'Contested vs. Non-Contested', category: 'Visual Breakdown', },
  { slug: 'fga-by-area', vbSlug: 'visual-breakdown-fga-by-area', label: 'FGA by Area', category: 'Visual Breakdown', },
  { slug: 'isolation', vbSlug: 'visual-breakdown-isolation', label: 'Isolation', category: 'Visual Breakdown', },
  { slug: 'off-ball-screens', vbSlug: 'visual-breakdown-off-ball-screens', label: 'Off Ball Screens', category: 'Visual Breakdown', woSlug: 'workouts-off-ball-screens', category2: 'Workouts', },
  { slug: 'pick-and-roll', vbSlug: 'visual-breakdown-pick-and-roll', label: 'Pick and Roll', category: 'Visual Breakdown', woSlug: 'workouts-pick-and-roll', category2: 'Workouts', },
  { slug: 'shot-clock', vbSlug: 'visual-breakdown-shot-clock', label: 'Shot Clock Time', category: 'Visual Breakdown', },
  { slug: 'shots-off-dribble', vbSlug: 'visual-breakdown-shots-off-dribble', label: 'Shots Off Dribble', category: 'Visual Breakdown', woSlug: 'workouts-shots-off-dribble', category2: 'Workouts', },
  { slug: 'spot-up-jump-shots', vbSlug: 'visual-breakdown-spot-up-jump-shots', label: 'Spot Up Jump Shots', category: 'Visual Breakdown', woSlug: 'workouts-spot-up-jump-shots', category2: 'Workouts', },
  { slug: 'transition', vbSlug: 'visual-breakdown-transition', label: 'Transition', category: 'Visual Breakdown', },
];
