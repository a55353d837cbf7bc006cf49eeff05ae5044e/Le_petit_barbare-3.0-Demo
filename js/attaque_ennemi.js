"use strict";

const attaque_ennemi = function(oppo, heros){

	let degats;
	let perso = heros[0];
	let tmp;
	let target;
	let checktarget = 0;
	let succes;
	let life;
	
	for(let i = 0; i < oppo.length; i++){
		tmp = oppo[i];
		checktarget = 0;
		if(tmp.scry === 1){	
			if (tmp.x === perso.x && tmp.y === perso.y -1){
				checktarget = checktarget + 1;
				oppo[i].attaque_r = "oui";
			}else if(tmp.x === perso.x && tmp.y === perso.y + 1){
				tmp.scry = 0;
			}
		}
		if (checktarget === 1){
			degats = Math.floor(Math.random()*8);
			succes = Math.floor(Math.random()*3);
			console.log(i + "degats = " + degats);
			console.log(i + "succes = " + succes);
			if (succes === 2){
				perso.life = perso.life - degats;
			}
		}
	}

	for(let j = 0; j < oppo.length; j++){
        tmp = oppo[j];
		checktarget = 0;
        if(tmp.scry === 0){ 
            if (tmp.x === perso.x && tmp.y === perso.y +1){
                checktarget = checktarget + 1;
				oppo[j].attaque_l = "oui";
            }else if(tmp.x === perso.x && tmp.y === perso.y -1){
				tmp.scry = 1;
			}
        }
        if (checktarget === 1){
            degats = Math.floor(Math.random()*8);
            succes = Math.floor(Math.random()*3);
            console.log(j + "degats = " + degats);
			console.log(j + "succes = " + succes);
			if (succes === 2){
                perso.life = perso.life - degats;
            }
        }
    }
    life = perso.life;
    return life;


};

module.exports = attaque_ennemi;
