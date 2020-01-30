"use strict";

const fs = require("fs");
require("remedial");

const map = require('./map.js');
const pop_ennemi = require("./pop_ennemi.js");
const move_ennemi = require("./move_ennemi.js");
const dead_ennemi = require("./dead_ennemi.js");
const attaque_ennemi = require("./attaque_ennemi.js");

const move_survie = function(req, res, query, bfld, wave, oppo, heros, niveau, life_enemy){

	let play = query.action;
	let op = 0;
	let step = 0;
	let perso = heros[0];
	let tmp;
	let target;
	let checktarget = 0;
	let checktarget2 = 0;
	let damage = 0;
	let at = 0;
	let cx;
	let cy;
	let ennemi;
	let money;
	let marqueurs;
	let page;
	let reponse;
	let enemy = 3;
	let save = false;
	let n;
	let caisse = 400;

	// On fait apparaitre les ennemis que si le joueur est sur la 4ème ligne.
	for(let i = 0; i < bfld.length; i++){
    	for(let j = 0; j < bfld[0].length; j++){
        	if (bfld[i][j] === "x"){
				cx = i;
				cy = j;

				if (cy === 5 && wave[0] === 0){
					console.log("cy = " + cy);
        			ennemi = pop_ennemi(bfld);
					oppo.push(...ennemi);
        			wave[0] = wave[0] + 1;
					step = 1;
				}
			}
		}
	}

	// Si le joueur n'a pas remplit les conditions, on fait déplacer et attaquer les ennemis.
 	if(step === 0){
	    move_ennemi(bfld, oppo, heros);
	  	attaque_ennemi(oppo, heros);
	}
	
	if (play === "Haut"){
		if (cx !== 0 && op === 0){
			if (bfld[cx-1][cy] === " "){
				bfld[cx-1][cy] = "x";
				bfld[cx][cy] = " ";
				perso.x = perso.x-1;
				op = op + 1;
			}
		}
	}else if(play === "Bas"){
		if (cx !== 5 && op === 0){
            if (bfld[cx+1][cy] === " "){	
				bfld[cx+1][cy] = "x";
            	bfld[cx][cy] = " ";
				perso.x = perso.x + 1;
            	op = op + 1;
			}
        }
	}else if(play === "Gauche"){
		if (cy !== 2 && op === 0){
			if (bfld[cx][cy-1] === " "){
            	bfld[cx][cy-1] = "x";
            	bfld[cx][cy] = " ";
				perso.y = perso.y - 1;
            	perso.scry = 0;
				op = op + 1;
			}else if(bfld[cx][cy-1] === "o"){
				perso.scry = 0;
			}
        }
	}else if (play === "Droite"){
		if (cy !== 13 && op === 0){
            if (bfld[cx][cy+1] === " "){	
				bfld[cx][cy+1] = "x";
            	bfld[cx][cy] = " ";
				perso.y = perso.y + 1;
            	perso.scry = 1;
				op = op + 1;
        	}else if(bfld[cx][cy+1] === "o"){
				perso.scry = 1;
			}
		}
	
	} else if(play === "Soigner"){
		if(perso.potion >= 1){
			perso.life = Math.min(perso.life + 30, 100);
			heros[0].potion -= 1;
		}
	}else if (play === "Attaquer"){
		at = 0;
		if(perso.scry === 1){
			for(let k = 0; k < oppo.length; k++){
				tmp = oppo[k];
				if (tmp.x === perso.x && tmp.y === perso.y + 1){
					target = tmp;
					enemy = k;
					checktarget = checktarget + 1;
					checktarget2 = checktarget2 + 1;
				}else if(bfld[perso.x][perso.y + 1] === " " && tmp.x === perso.x && tmp.y === perso.y + 2){
					target = tmp;
					enemy = k;
					checktarget2 = checktarget2 + 1;
				}else if(bfld[perso.x][perso.y + 1] === " " && bfld[perso.x][perso.y + 2] === " " && tmp.x === perso.x && tmp.y === perso.y + 3){
					target = tmp;
					enemy = k;
					checktarget2 = checktarget2 + 1;
				}
			}
			if (checktarget === 1){
				if(query.arme === "hache" && perso.hache >=1){
					damage = Math.floor(Math.random()*15) + 30;
				}else if(query.arme === "dague" && perso.dague >=1){
                    damage = Math.floor(Math.random()*30) + 35;
				}else if(query.arme === "epee" && perso.epee){
					damage = Math.floor(Math.random()*25) + 30;
				}else if(query.arme === "masse" && perso.masse >=1){
                    damage = Math.floor(Math.random()*70) + 10;
				}else if(query.arme === "epee_1" && perso.epee_1 >=1){
                    damage = Math.floor(Math.random()*5) + 55;
				}else if(query.arme === "epee_2" && perso.epee_2 >=1){
                    damage = Math.floor(Math.random()*20) + 85;
				}else{
					damage = Math.floor(Math.random()*10) + 25;
				}
				console.log("damage = " + damage);
				if(at === 0){
					target.life = target.life - damage;
					at = 1;
				}
			}if(checktarget2 === 1){
				if(query.arme === "arc" && perso.arc >= 1){
					damage = Math.floor(Math.random()*25) + 45;
					if(at === 0){
						target.life = target.life - damage;
						at = 1;
					}
				}
			}
			
		}else if(perso.scry === 0){
            for(let k = 0; k < oppo.length; k++){
                tmp = oppo[k];
                if (tmp.x === perso.x && tmp.y === perso.y - 1){
                    target = tmp;
					enemy = k;
                    checktarget = checktarget + 1;
                    checktarget2 = checktarget2 + 1;
                }else if(bfld[perso.x][perso.y + 1] === " " && tmp.x === perso.x && tmp.y === perso.y + 2){
                    target = tmp;
					enemy = k;
                    checktarget2 = checktarget2 + 1;
                }else if(bfld[perso.x][perso.y + 1] === " " && bfld[perso.x][perso.y + 2] === " " && tmp.x === perso.x && tmp.y === perso.y + 3){
                    target = tmp;
					enemy = k;
                    checktarget2 = checktarget2 + 1;
	    		}
            }
            if (checktarget === 1){
                if(query.arme === "hache" && perso.hache >=1){
                    damage = Math.floor(Math.random()*15) + 30;
                }else if(query.arme === "dague" && perso.dague >=1){
                    damage = Math.floor(Math.random()*30) + 35;
				}else if(query.arme === "epee" && perso.epee){
                    damage = Math.floor(Math.random()*25) + 30;
                }else if(query.arme === "masse" && perso.masse >=1){
                    damage = Math.floor(Math.random()*70) + 10;
                }else if(query.arme === "epee_1" && perso.epee_1 >=1){
                    damage = Math.floor(Math.random()*5) + 55;
                }else if(query.arme === "epee_2" && perso.epee_2 >=1){
                    damage = Math.floor(Math.random()*20) + 85;
                }else{
					damage = Math.floor(Math.random()*10) + 25;
				}
				console.log("damage = " + damage);
                if(at === 0){
					target.life = target.life - damage;
            		at = 1;
				}
			}if(checktarget2 === 1){
                if(query.arme === "arc" && perso.arc >= 1){
                    damage = Math.floor(Math.random()*25) + 45;
					if(at ===0){
						target.life = targer.life - damage;
						at = 1;
					}
				}
            }
		}
	}
	
	dead_ennemi(bfld, oppo);

	console.log(heros);
	console.log(oppo);
	// === Envoi de la page HTML === //

	reponse = {
		"type" : "",
		"value" : "",
	};
	marqueurs = {};

	if(perso.life <= 0){
		// Quand le joueur n'a plus de vie.
		page = fs.readFileSync('./html/fin_survie.html', 'utf-8');

		marqueurs.erreur = "";
		marqueurs.level = wave[0];

		reponse.type = 'update';
		reponse.value = page.supplant(marqueurs);

	} else if(oppo.length === 0 && wave[0]!== 0){
		wave[0] = wave[0] + 1;
		
		if(wave[0]%2 === 0){
			perso.potion = perso.potion + 1;
		}
		
		caisse = Math.floor(Math.random()*725) + 1;
		console.log("caisse aléatoire = " + caisse);
		if(caisse >= 98 && caisse < 102){
			perso.epee_2 = perso.epee_2 + 1;
			console.log("tirage epee_2");
		}else if(caisse >=90 && caisse < 98){
			perso.arc = perso.arc + 1;
			console.log("tirage arc");
		}else if(caisse >=75 && caisse < 90){
			perso.epee_1 = perso.epee_1 + 1;
			console.log("tirage epee_1");
		}else if(caisse >= 55 && caisse < 75){
			perso.dague = perso.dague + 1;
			console.log("tirage dague");
		}else if(caisse >= 30 && caisse < 55){
			perso.masse = perso.masse + 1;
			console.log("tirage masse");
		}else if(caisse >= 0 && caisse < 30){
			perso.epee = perso.epee + 1;
			console.log("tirage epee");
		}else if(caisse >= 102 && caisse < 142){
			perso.hache = perso.hache + 1;
			console.log("tirage hache");
		}else if(caisse >= 142 && caisse < 192){
			perso.potion = perso.potion + 1;
			console.log("tirage potion");
		}else if(caisse >= 192 && caisse < 202){
			perso.potion = perso.potion + 2;
			console.log("tirage 2 potions");
		}else if(caisse >= 202 && caisse < 208){
			perso.potion = perso.potion + 3;
			console.log("tirage 3 potions");
		}else if(caisse >= 208 && caisse < 210){
			perso.potion = perso.potion + 2;
			pero.arc = perso.arc + 1;
			console.log("tirage care package 1");
		}else if(caisse === 210){
			perso.potion = perso.potion + 5;
			perso.epee_2 = perso.epee_2 + 1;
			console.log("tirage care package 2");
		}

		console.log(perso);

		if (wave[0] < 10000){
			// Vague suivante (dans le même niveau).
			ennemi = pop_ennemi(bfld);
			oppo.push(...ennemi);


			reponse.type = 'refresh';
			reponse.value = map(bfld, query, oppo, heros);
			reponse.life = heros[0].life;
			reponse.vague = wave[0];

			if(oppo.length !== 0){
				if(enemy === 0){
				reponse.life_enemy1 = oppo[0].life;
				}else if(enemy === 1 && oppo.length > 1){
					reponse.life_enemy1 = oppo[1].life;
				}else if(enemy === 2 && oppo.length > 2){
					reponse.life_enemy1 = oppo[2].life;
				}else{
					reponse.life_enemy1 = 100;
				}
				enemy = 3;
			}else{
				reponse.life_enemy1 = 100;
			}

			reponse.potion = heros[0].potion;
			reponse.arc = heros[0].arc;
			reponse.masse = heros[0].masse;
			reponse.hache = heros[0].hache;
			reponse.epee = heros[0].epee;
			reponse.belle = heros[0].epee_1;
			reponse.casse = heros[0].epee_2;
			reponse.dague = heros[0].dague;
		}
	}else{
		// Continuer le jeu.
		reponse.type = 'refresh';
		reponse.value = map(bfld, query, oppo, heros);
		reponse.life = heros[0].life;
		reponse.vague = wave[0];
		
		if(oppo.length !== 0){
			if(enemy === 0){
				reponse.life_enemy1 = oppo[0].life;
			}else if(enemy === 1 && oppo.length > 1){
				reponse.life_enemy1 = oppo[1].life;
			}else if(enemy === 2 && oppo.length > 2){
				reponse.life_enemy1 = oppo[2].life;
			}else{
				reponse.life_enemy1 = 100;
			}
			enemy = 3;
		}else{
			reponse.life_enemy1 = 100;
		}

		reponse.potion = heros[0].potion;
		reponse.arc = heros[0].arc;
		reponse.masse = heros[0].masse;
		reponse.hache = heros[0].hache;
		reponse.epee = heros[0].epee;
		reponse.belle = heros[0].epee_1;
		reponse.casse = heros[0].epee_2;
		reponse.dague = heros[0].dague;
	}

	res.writeHead(200, {'Content-Type' : 'application/json'});
	res.write(JSON.stringify(reponse));
	res.end();
};

module.exports = move_survie;
