"use strict";

const fs = require("fs");
require('remedial');


const req_story = function (req, res, query){

    let page;
    let marqueurs;
	let n;

	n = query.action;

    page = fs.readFileSync('./html/story' + n + '.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};

module.exports = req_story;

