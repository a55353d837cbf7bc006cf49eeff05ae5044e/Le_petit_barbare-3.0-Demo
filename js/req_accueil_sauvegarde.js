"use strict";

const fs = require("fs");
require('remedial');


const req_accueil_sauvegarde = function (req, res, query, heros, niveau){

	let page;
	let marqueurs;

	page = fs.readFileSync('./html/sauvegarde.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

};

module.exports = req_accueil_sauvegarde;
