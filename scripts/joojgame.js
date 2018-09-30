var canvas = document.getElementById("canvasjooj");
var ctx = canvas.getContext("2d");
var teclas_press = [];
//defino os elementos do menu
var fundo_menu = new Image();
var fundo_jogo = new Image();
var logo_menu = new Image();
var opcao_menu = new Image();
var mute_button = new Image();
var unmute_button = new Image();
fundo_menu.src = "images/fundo.png";
fundo_jogo.src = "images/fase_fundo.png";
logo_menu.src = "images/logo.png";
opcao_menu.src = "images/jogar.png";
mute_button.src = "images/mute.png";
unmute_button.src = "images/mute_2.png";
//moldura para pontuação
var moldura_fase = new Image();
moldura_fase.src = "images/moldura.png";
//imagens dos players
// não sei se posso defini-las dentro de um vetor
var player_stand = new Image();
var player_crouch = new Image();
var player_punch = new Image();
var player_jump = new Image();
var player_walk = new Image();
var player_kick = new Image();
var player_jumpkick = new Image();
var player_jumppunch = new Image();
// troca de lados
var player_invstand = new Image();
var player_invcrouch = new Image();
var player_invpunch = new Image();
var player_invjump = new Image();
var player_invwalk = new Image();
var player_invkick = new Image();
var player_invjumpkick = new Image();
var player_invjumppunch = new Image();
// fontes das imagens
player_stand.src = "images/pe.png";
player_crouch.src = "images/agachando.png";
player_punch.src = "images/soco.png";
player_jump.src = "images/pulando.png";
player_kick.src = "images/chute.png";
player_jumpkick.src = "images/chute_pulando.png";
player_jumppunch.src = "images/soco_pulando.png";
player_walk.src = "images/andando.png";
player_invstand.src = "images/pe2side.png";
player_invcrouch.src = "images/agachando2side.png";
player_invpunch.src = "images/soco2side.png";
player_invjump.src = "images/pulando2side.png";
player_invkick.src = "images/chute2side.png";
player_invjumpkick.src = "images/chute_pulando2side.png";
player_invjumppunch.src = "images/soco_pulando2side.png";
player_invwalk.src = "images/andando2side.png";

// spritework player2
var player_2stand = new Image();
var player_2crouch = new Image();
var player_2punch = new Image();
var player_2jump = new Image();
var player_2walk = new Image();
var player_2kick = new Image();
var player_2jumpkick = new Image();
var player_2jumppunch = new Image();
player_2stand.src = "images/base1.png";
player_2crouch.src = "images/down1.png";
player_2punch.src = "images/soco1.png";
player_2jump.src = "images/jump1.png";
player_2kick.src = "images/chute1.png";
player_2jumpkick.src = "images/chute1.png";
player_2jumppunch.src = "images/soco1.png";
player_2walk.src = "base1.png";
nao_mutado = true;
// gravidade?
valor_gravidade = 0.98;
var contador = 0;
// teclas no teclado são salvas no vetor teclas_press
document.addEventListener("keydown", function(pressaoTec) {
  teclas_press[pressaoTec.keyCode] = true;
});

document.addEventListener("keyup", function(pressaoTec) {
  teclas_press[pressaoTec.keyCode] = false;
});

//funcao para limpar o quadro
function limparQuad() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharCenario() {
  ctx.drawImage(fundo_jogo, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(moldura_fase, 0, 0, canvas.width, canvas.height);
}
//personagens do jogo
var player_1 = {
  x_pos: 200,
  y_pos: 490 - 97,
  x_vel: 0,
  y_vel: 0,
  width: 77,
  height: 97,
  no_ar: false,
  soco: false,
  chute: false,
  pulando: false,
  lado_esquerdo: true,
  defendendo: false,
  agachando: false,
  andando: false
};

var player_2 = {
  x_pos: 600,
  y_pos: 490 - 97,
  x_vel: 0,
  y_vel: 0,
  width: 77,
  height: 97,
  no_ar: false,
  soco: false,
  chute: false,
  pulando: false,
  lado_esquerdo: false,
  defendendo: false,
  agachando: false,
  andando: false
};

var vidap1 = {
  pos_x: 361,
  pos_y: 101,
  width: 328,
  height: 8,
  cor: "blue"
}

var vidap2 = {
  pos_x: 439,
  pos_y: 101,
  width: 328,
  height: 8,
  cor: "blue"
}

function desenharBarras() {
  ctx.fillStyle = vidap1.cor;
  ctx.fillRect(vidap1.pos_x, vidap1.pos_y, -vidap1.width, vidap1.height);
  ctx.fillStyle = vidap2.cor;
  ctx.fillRect(vidap2.pos_x, vidap2.pos_y, vidap2.width, vidap2.height);


}

function colisaoCenario() {
  //colisão vai alterar os x e y
  // no caso só com cenário
  // 490 é nosso chão
  // 800 e 0 são as paredes
  if (player_1.x_pos <= 0)
    player_1.x_pos = 0;
  if (player_1.y_pos <= 0)
    player_1.y_vel = 5;
  if (player_2.y_pos <= 0)
    player_2.y_vel = 5;
  if (player_2.x_pos <= 0)
    player_2.x_pos = 0;

    if(player_1.x_pos >= 800 - player_1.width){
     player_1.x_pos = 800 - player_1.width;
     if (player_1.y_pos >= 490 - player_1.height){
       player_1.y_pos = 490 - player_1.height;
       player_1.y_vel = 0;
       player_1.no_ar = false;
       player_1.pulando = false;
     recoveryDelayP1();}
     else if (player_1.y_pos < 0)
       player_1.y_pos = 0;}

   else if(player_1.y_pos >= 490 - player_1.height){
     player_1.y_pos = 490 - player_1.height;
     player_1.y_vel = 0;
     player_1.no_ar = false;
     player_1.pulando = false;
     recoveryDelayP1();
     if (player_1.x_pos >= 800 - player_1.width)
       player_1.x_pos = 800 - player_1.width;
       else if (player_1.x_pos < 0)
         player_1.x_pos = 0;}

   if(player_2.x_pos >= 800 - player_2.width){
     player_2.x_pos = 800 - player_2.width;
     if (player_2.y_pos >= 490 - player_2.height){
       player_2.y_pos = 490 - player_2.height;
       player_2.y_vel = 0;
       player_2.no_ar = false;
       player_2.pulando = false;
       recoveryDelayP2();}
     else if (player_2.y_pos < 0)
       player_2.y_pos = 0;}

   else if(player_2.y_pos >= 490 - player_2.height){
     player_2.y_pos = 490 - player_2.height;
 	   player_2.y_vel = 0;
     player_2.no_ar = false;
     player_2.pulando = false;
     recoveryDelayP2();
     if (player_2.x_pos >= 800 - player_2.width)
       player_2.x_pos = 800 - player_2.width;
       else if (player_2.x_pos < 0)
         player_2.x_pos = 0;}
  //console.log(player_1.x_pos, player_1.y_pos);
  // fim das colisões com cenário

}

function checarTeclasP1() {
  //acoes player 1
  //tecla direita aumenta x
  if (teclas_press[39] == true) {
    if (player_1.lado_esquerdo == false && player_1.no_ar == false) {
      // defende se estiver no lado direito + anda lentamente
      player_1.x_vel += 0.3;
    } else if (player_1.lado_esquerdo && player_1.no_ar == false) {
      player_1.x_vel += 0.7;
    } else if (teclas_press[38] == true && player_1.pulando == true) {
      player_1.x_vel += 0.9;
    }
  }

  //tecla esquerda diminui x
  if (teclas_press[37] == true) {
    if (player_1.lado_esquerdo && player_1.no_ar == false) {
      player_1.x_vel -= 0.3;
    } else if (player_1.lado_esquerdo == false && player_1.no_ar == false) {
      player_1.x_vel -= 0.7;
    } else if (teclas_press[38] == true && player_1.pulando == true) {
      player_1.x_vel -= 0.9;
    }
  }

  // tecla cima pula e diminui y
  // pulo será difícil fazer
  if (teclas_press[38] == true && player_1.no_ar == false) {
    player_1.y_vel -= 30;
    player_1.no_ar = true;
    player_1.pulando = true;
  }
  // tecla baixo agacha
  if (teclas_press[40] == true && player_1.no_ar == false) {
    player_1.x_vel = 0;
    player_1.agachando = true;
  }
  // botao soco (*)
  if (teclas_press[106] == true && player_1.agachando == false && player_1.andando == false && player_1.chute == false) {
    // "recovery", golpes não podem ser "abusados"
    recoveryDelayP1();
    if (player_1.soco == false) {
      player_1.soco = true;
    }
  }
  //botao chute (-)
  if (teclas_press[109] == true && player_1.agachando == false && player_1.andando == false && player_1.soco == false) {
    // "recovery", golpes não podem ser "abusados"
    recoveryDelayP1();
    if (player_1.chute == false) {
      player_1.chute = true;
    }
  }


}

function checarTeclasP2() {
  //acoes player 2
  //tecla D aumenta x
  if (teclas_press[68] == true) {
    if (player_1.lado_esquerdo && player_2.no_ar == false) {
      // defende se estiver no lado direito + anda lentamente
      player_2.x_vel += 0.3;
    } else if (player_1.lado_esquerdo == false && player_2.no_ar == false) {
      player_2.x_vel += 0.7;
    } else if (teclas_press[87] == true && player_2.pulando == true) {
      player_2.x_vel += 0.9;
    }
  }

  //tecla A diminui x
  if (teclas_press[65] == true) {
    if (player_1.lado_esquerdo == false && player_2.no_ar == false) {
      player_2.x_vel -= 0.3;
    } else if (player_1.lado_esquerdo && player_2.no_ar == false) {
      player_2.x_vel -= 0.7;
    } else if (teclas_press[87] == true && player_2.pulando == true) {
      player_2.x_vel -= 0.9;
    }
  }

  // tecla W pula e diminui y
  // pulo será difícil fazer
  if (teclas_press[87] == true && player_2.no_ar == false) {
    player_2.y_vel -= 30;
    player_2.no_ar = true;
    player_2.pulando = true;
  }
  // tecla S agacha
  if (teclas_press[83] == true && player_2.no_ar == false) {
    player_2.x_vel = 0;
    player_2.agachando = true;
  }
  // botao soco U
  if (teclas_press[85] == true && player_2.agachando == false && player_2.andando == false && player_2.chute == false) {
    // "recovery", golpes não podem ser "abusados"
    recoveryDelayP2();
    if (player_2.soco == false) {
      player_2.soco = true;
    }
  }
  //botao chute I
  if (teclas_press[73] == true && player_2.agachando == false && player_2.andando == false && player_2.soco == false) {
    // "recovery", golpes não podem ser "abusados"
    recoveryDelayP2();
    if (player_2.chute == false) {
      player_2.chute = true;
    }
  }
}

function fisicaJogo() {

  player_1.y_vel += valor_gravidade; // gravidade definida lá em cima
  player_1.y_pos += player_1.y_vel;
  player_1.x_pos += player_1.x_vel;
  // também chamado de atrito
  player_1.x_vel *= 0.9;
  player_1.y_vel *= 0.9; // sempre multiplicando por um valor menor que 1

  //fisica p2
  player_2.y_vel += valor_gravidade;
  player_2.y_pos += player_2.y_vel;
  player_2.x_pos += player_2.x_vel;
  player_2.x_vel *= 0.9; // dá o efeito de corridas com resistência
  player_2.y_vel *= 0.9; // wow isso aqui é pesado pra cpu




}

function colisaoPlayers() {
  // colisões entre players
  //posição dos sprites
  if (player_1.x_pos > player_2.x_pos) {
    player_1.lado_esquerdo = false;
  } else {
    player_1.lado_esquerdo = true;

  }
  if (player_1.lado_esquerdo) {
    if (player_1.andando) {
      if (Math.floor(player_2.x_pos) < (Math.floor(player_1.x_pos) + player_1.width)) {
        player_2.x_pos = player_2.x_pos;

      }
      if (Math.floor(player_1.x_pos) > (Math.floor(player_2.x_pos) - player_2.width)) {
        player_1.x_pos = player_2.x_pos - player_2.width
      }


    }
    if (player_2.andando) {
      if (Math.floor(player_2.x_pos) < (Math.floor(player_1.x_pos) + player_1.width)) {
        player_2.x_pos = player_1.x_pos + player_1.width

      }
      if (Math.floor(player_1.x_pos) > (Math.floor(player_2.x_pos) - player_2.width)) {
        player_1.x_pos = player_1.x_pos;
      }

    }

  } else {
    if (player_2.andando) {
      if (Math.floor(player_1.x_pos) < (Math.floor(player_2.x_pos) + player_2.width)) {
        player_1.x_pos = player_1.x_pos;
      }
      if (Math.floor(player_2.x_pos) > (Math.floor(player_1.x_pos) - player_1.width)) {
        player_2.x_pos = player_1.x_pos - player_1.width
      }
    }
    if (player_1.andando) {
      if (Math.floor(player_1.x_pos) < (Math.floor(player_2.x_pos) + player_2.width)) {
        player_1.x_pos = player_2.x_pos + player_2.width

      }
      if (Math.floor(player_2.x_pos) > (Math.floor(player_1.x_pos) - player_1.width)) {
        player_2.x_pos = player_2.x_pos;
      }

    }
}

}

function checarMovimento() {
  // velocidade diferente de zero
  if (player_1.x_vel != 0)
    player_1.andando = true;
  if (player_1.pulando == true || player_1.no_ar == true)
    player_1.andando = false;
  if (player_1.x_vel == 0 || (player_1.x_vel < 1 && player_1.x_vel > -1))
    player_1.andando = false;

  if (player_2.x_vel != 0)
    player_2.andando = true;
  if (player_2.pulando == true || player_2.no_ar == true)
    player_2.andando = false;
  if (player_2.x_vel == 0 || (player_2.x_vel < 1 && player_2.x_vel > -1))
    player_2.andando = false;
}
//funcao de recovery dos movimentos
function recoveryDelayP1() {
  if (player_1.chute) {
    // chute fica 300ms ativo, player ataca, mas fica invulnerável
    setTimeout(function() {player_1.chute = false;}, 200);
  }
  if (player_1.soco) {
    // mesmo para o soco
    setTimeout(function() {player_1.soco = false;}, 300);
  }

}
//funcao de recovery dos movimentos
function recoveryDelayP2() {
  if (player_2.chute) {
    // chute fica 300ms ativo, player ataca, mas fica invulnerável
    setTimeout(function() {player_2.chute = false;}, 300);
  }
  if (player_2.soco) {
    // mesmo para o soco
    setTimeout(function() {player_2.soco = false;}, 300);
  }
}



function comecarJogo() {
  limparQuad();
  //desenho o fundo
  desenharCenario();
  //teclas de ambos players checadas e variaveis definidas
  checarMovimento();
  colisaoPlayers();
  colisaoCenario();
  checarTeclasP1();
  checarTeclasP2();
  fisicaJogo();
  desenharP1();
  desenharP2();
  desenharBarras();
  player_1.agachando = false;
  player_2.agachando = false;

  requestAnimationFrame(comecarJogo);
}

function desenharP2() {
  if (player_1.lado_esquerdo == false) {
    if (player_2.andando) {
      ctx.drawImage(player_walk,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    } else if (player_2.no_ar || player_2.pulando) {
      if (player_2.soco) {
        ctx.drawImage(player_jumppunch,
          154, 0, 110, 97, //posição na imagem para sprite
          player_2.x_pos, player_2.y_pos, player_2.width + 30, player_2.height + 10 // posição no canvas
        );
      } else if (player_2.chute) {
        ctx.drawImage(player_jumpkick,
          170, 0, 138, 66, //posição na imagem para sprite
          player_2.x_pos, player_2.y_pos, player_2.width + 60, player_2.height - 30 // posição no canvas
        );
      } else {
        ctx.drawImage(player_jump,
          0, 0, 77, 97, //posição na imagem para sprite
          player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
        );
      }
    } else if (player_2.agachando) {
      ctx.drawImage(player_crouch,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    } else if (player_2.soco) {
      ctx.drawImage(player_punch,
        165, 0, 116, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width + 40, player_2.height // offset para soco
      );
    } else if (player_2.chute) {
      ctx.drawImage(player_kick,
        340, 0, 110, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width + 30, player_2.height // posição no canvas
      );
    } else if (player_2.andando == false && player_2.no_ar == false) {
      ctx.drawImage(player_stand,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    }
  } else {
    //ctx.scale(-1,1) é muito pesado pra cpu


    if (player_2.andando) {
      ctx.drawImage(player_invwalk,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    } else if (player_2.no_ar || player_2.pulando) {
      if (player_2.soco) {
        ctx.drawImage(player_invjumppunch,
          0, 0, 110, 97, //posição na imagem para sprite
          player_2.x_pos - 30, player_2.y_pos, player_2.width + 30, player_2.height + 10 // posição no canvas
        );
      } else if (player_2.chute) {
        ctx.drawImage(player_invjumpkick,
          0, 0, 140, 66, //posição na imagem para sprite
          player_2.x_pos - 60, player_2.y_pos, player_2.width + 60, player_2.height - 30 // posição no canvas
        );
      } else {
        ctx.drawImage(player_invjump,
          0, 0, 77, 97, //posição na imagem para sprite
          player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
        );
      }
    } else if (player_2.agachando) {
      ctx.drawImage(player_invcrouch,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    } else if (player_2.soco) {
      ctx.drawImage(player_invpunch,
        0, 0, 110, 97, //posição na imagem para sprite
        player_2.x_pos - 40, player_2.y_pos, player_2.width + 40, player_2.height // offset para soco
      );
    } else if (player_2.chute) {
      ctx.drawImage(player_invkick,
        180, 0, 110, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width + 30, player_2.height // posição no canvas
      );
    } else if (player_2.andando == false && player_2.no_ar == false) {
      ctx.drawImage(player_invstand,
        0, 0, 77, 97, //posição na imagem para sprite
        player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
      );
    }
  }

}







function desenharP1() {
  // como desenhar de acordo com as ações

  if (player_1.lado_esquerdo) {
    if (player_1.andando) {
      ctx.drawImage(player_walk,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    } else if (player_1.no_ar || player_1.pulando) {
      if (player_1.soco) {
        ctx.drawImage(player_jumppunch,
          154, 0, 110, 97, //posição na imagem para sprite
          player_1.x_pos, player_1.y_pos, player_1.width + 30, player_1.height + 10 // posição no canvas
        );
      } else if (player_1.chute) {
        ctx.drawImage(player_jumpkick,
          170, 0, 138, 66, //posição na imagem para sprite
          player_1.x_pos, player_1.y_pos, player_1.width + 60, player_1.height - 30 // posição no canvas
        );
      } else {
        ctx.drawImage(player_jump,
          0, 0, 77, 97, //posição na imagem para sprite
          player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
        );
      }
    } else if (player_1.agachando) {
      ctx.drawImage(player_crouch,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    } else if (player_1.soco) {
      ctx.drawImage(player_punch,
        165, 0, 116, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width + 40, player_1.height); // offset para soco




    } else if (player_1.chute) {
      ctx.drawImage(player_kick,
        340, 0, 110, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width + 30, player_1.height // posição no canvas
      );
    } else if (player_1.andando == false && player_1.no_ar == false) {
      ctx.drawImage(player_stand,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    }
  } else {
    //ctx.scale(-1,1) é muito pesado pra cpu


    if (player_1.andando) {
      ctx.drawImage(player_invwalk,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    } else if (player_1.no_ar || player_1.pulando) {
      if (player_1.soco) {
        ctx.drawImage(player_invjumppunch,
          0, 0, 110, 97, //posição na imagem para sprite
          player_1.x_pos - 30, player_1.y_pos, player_1.width + 30, player_1.height + 10 // posição no canvas
        );
      } else if (player_1.chute) {
        ctx.drawImage(player_invjumpkick,
          0, 0, 140, 66, //posição na imagem para sprite
          player_1.x_pos - 60, player_1.y_pos, player_1.width + 60, player_1.height - 30 // posição no canvas
        );
      } else {
        ctx.drawImage(player_invjump,
          0, 0, 77, 97, //posição na imagem para sprite
          player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
        );
      }
    } else if (player_1.agachando) {
      ctx.drawImage(player_invcrouch,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    } else if (player_1.soco) {
      ctx.drawImage(player_invpunch,
        0, 0, 110, 97, //posição na imagem para sprite
        player_1.x_pos - 40, player_1.y_pos, player_1.width + 40, player_1.height // offset para soco
      );
    } else if (player_1.chute) {
      ctx.drawImage(player_invkick,
        180, 0, 110, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width + 30, player_1.height // posição no canvas
      );
    } else if (player_1.andando == false && player_1.no_ar == false) {
      ctx.drawImage(player_invstand,
        0, 0, 77, 97, //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );
    }
  }

}


function menuPrincipal() {
  //desenhar fundo
  ctx.drawImage(fundo_menu, 0, 0, canvas.width, canvas.height);
  //desenhar logo
  ctx.drawImage(logo_menu, 240, 100, 400, 70);
  //desenhar opcao
  ctx.drawImage(opcao_menu, 250, 300, 300, 100);
  //desenhar e checar a opcao de desmutar
  if (teclas_press[77] == true) {
    nao_mutado = !nao_mutado;
  }
  if (nao_mutado) {
    ctx.drawImage(mute_button, 700, 500, 50, 50);
  } else {
    ctx.drawImage(unmute_button, 700, 500, 50, 50);
  }


  if (teclas_press[13] == true) {
    comecarJogo();
  } else {
    requestAnimationFrame(menuPrincipal);
  }
}



function main() {
  menuPrincipal();

}

main();
