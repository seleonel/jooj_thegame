/*
 * variáveis para múltiplos propósitos, como definir o contexto para 2d,
 *  vetor para guardar as teclas pressionadas
 */
var canvas = document.getElementById("canvasjooj");
var ctx = canvas.getContext("2d");
var teclas_press = [];
var musica_alergs;
var musica_menu;
musica_alergs.loop = true;
musica_alergs = new sound("music/jungle1.ogg");
musica_menu = new sound("music/1a.ogg");
// para desmutar a musica, jogo começa não mutado
nao_mutado = true;
// constante para gravidade
valor_gravidade = 0.98;
// variavel para a contagem de rounds (são 3)
var contador_rounds = 0;
// variavel para empate
partida_empate = false;
// variáveis para a captura momentânea da posição dos players
// será usada na permanência da direção das magias
var temp_xball;
var temp_yball
var temp1_xball;
var temp1_yball
// são definidas as "poses" de vitória e derrota
var vit_player = new Image();
var derr_player = new Image();
var pose_empate = new Image();
vit_player.src = "images/ryuvit.png";
derr_player.src = "images/deadryu.png";
pose_empate.src = "images/ryuempate.png";
//defino os elementos do menu e cenário
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
//moldura para pontuação e mostrar vida dos jogadores
var ko_p1 = new Image();
var ko_p2 = new Image();
var round_1 = new Image();
var round2_1p = new Image();
var round2_2p = new Image();
var round2_empate = new Image();
var round3_1pvant = new Image();
var round3_2pvant = new Image();
var round3_1pvic = new Image();
var round3_2pvic = new Image();
var round3_empate = new Image();
var double_ko = new Image();
round_1.src = "images/round0.png";
round2_1p.src = "images/round1.png";
round2_2p.src = "images/round1a.png";
round2_empate.src = "images/round2.png";
round3_1pvant.src = "images/ko1a.png";
round3_2pvant.src = "images/ko2a.png";
round3_1pvic.src = "images/ko1b.png";
round3_2pvic.src = "images/ko2b.png";
round3_empate.src = "images/ko3a.png";
ko_p1.src = "images/ko1.png";
ko_p2.src = "images/ko2.png";
double_ko.src = "images/ko3.png"
//imagens dos players
var player_stand = new Image();
var player_crouch = new Image();
var player_punch = new Image();
var player_jump = new Image();
var player_walk = new Image();
var player_kick = new Image();
var player_jumpkick = new Image();
var player_jumppunch = new Image();
var player_fireball = new Image();
player_fireball.src = "images/hado.png";
// troca de lados
var player_invstand = new Image();
var player_invcrouch = new Image();
var player_invpunch = new Image();
var player_invjump = new Image();
var player_invwalk = new Image();
var player_invkick = new Image();
var player_invjumpkick = new Image();
var player_invjumppunch = new Image();
var player_invfireball = new Image();
// fontes das imagens/sprites dos player
// são sprites do personagem Ryu da franquia Street Figther
// No caso, a versão seria alpha 3
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
player_invfireball.src = "images/hado_2side.png";
// fireball, ou bola de fogo
var fireball_img = new Image();
var fireball_inv = new Image();
fireball_img.src = "images/fireball.png";
fireball_inv.src = "images/fireball_2side.png";
// personagens do jogo definidos como objetos
// personagens tem os mesmos atributos para balanceamento
var player_1 = {
    x_pos: 200, //posicao ao iniciar a partida
    y_pos: 490 - 97, // posicao no chão
    x_vel: 0, // velocidade inicial no plano
    y_vel: 0, // como está no chão, a velocidade é 0
    width: 77, // tamanho padrão do sprite (não leva em conta os golpes)
    height: 97,
    rounds: 0, // quantas rounds o jogador venceu
    // começam as definicoes das acoes dos jogadores
    no_ar: false, // pulando e no_ar tem suas diferenças de uso, no_ar é utilizado para gravidade
    soco: false,
    chute: false,
    pulando: false, // pulando para alterar golpes
    lado_esquerdo: true,
    agachando: false, // agachar define a defesa no jogo
    vitoria: false, // para condicoes de vitoria
    andando: false
};

var player_2 = {
    x_pos: 600,
    y_pos: 490 - 97,
    x_vel: 0,
    y_vel: 0,
    width: 77,
    height: 97,
    rounds: 0,
    no_ar: false,
    soco: false,
    chute: false,
    pulando: false,
    lado_esquerdo: false,
    agachando: false,
    vitoria: false,
    andando: false
};

/*
 * vidas dos jogadores são mostradas na tela
 *  a quantidade de vida = quantidade de pixels que ocupam
 * tornando mais fácil o trabalho com números
 */

var vidap1 = {
    pos_x: 361,
    pos_y: 101,
    vida: 328,
    height: 8,
    cor: "#f442d7"
};

var vidap2 = {
    pos_x: 439,
    pos_y: 101,
    vida: 328,
    height: 8,
    cor: "#f442d7"
};
/*
 * Fireballs dos jogadores, a posição de onde foram lançadas é mais importante
 * que a posição dos players em si, a presença na tela define a duração
 */
var fireball_p1 = {
    x_pos: 0,
    y_pos: 0,
    vel_x: 5,
    dano: 50,
    height: 34,
    width: 130,
    esquerda: false,
    direita: false,
    na_tela: false
};
var fireball_p2 = {
    x_pos: 0,
    y_pos: 0,
    vel_x: 5,
    dano: 50,
    height: 34,
    width: 130,
    esquerda: false,
    direita: false,
    na_tela: false
};

//funcao para limpar o quadro
function limparQuad() {
    ctx.clearRect(0, 0, 800, 600);
}

// teclas no teclado são salvas no vetor teclas_press
/*
 * Sem o delay de 200 ms, o sistema de vida pode ser abusado
 * Ganharia o jogador que mais segurasse o botão
 * O jeito foi "desativar" os botões de ação depois de um tempo
 */

document.addEventListener("keydown", function(pressaoTec) {
    teclas_press[pressaoTec.keyCode] = true;
    if (teclas_press[85] || teclas_press[73] || teclas_press[109] || teclas_press[106] || teclas_press[79] || teclas_press[107]) {
        clearTimeout()
        setTimeout(function() {
            teclas_press[pressaoTec.keyCode] = false;
        }, 300);
    } else {
        document.addEventListener("keyup", function(pressaoTec) {
            teclas_press[pressaoTec.keyCode] = false;
        });
    }
});

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
    } else {
        player_1.agachando = false;

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

    // tecla + lança a magia
    if (teclas_press[107] && player_1.andando == false && player_1.no_ar == false && fireball_p1.na_tela == false) {
        temp1_xball = player_1.x_pos;
        temp1_yball = player_1.y_pos;
        fireball_p1.x_pos = temp1_xball;
        fireball_p1.y_pos = temp1_yball;
        setTimeout(function() {
            if (player_1.lado_esquerdo)
                fireball_p1.esquerda = true;
            else
                fireball_p1.direita = true;
            fireball_p1.na_tela = true;

        }, 300);

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
    } else {
        player_2.agachando = false;

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
    // tecla O lança a magia
    if (teclas_press[79] && player_2.andando == false && player_2.no_ar == false && fireball_p2.na_tela == false) {
        temp_xball = player_2.x_pos;
        temp_yball = player_2.y_pos;
        fireball_p2.x_pos = temp_xball;
        fireball_p2.y_pos = temp_yball;
        setTimeout(function() {
            if (player_1.lado_esquerdo)
                fireball_p2.direita = true;
            else
                fireball_p2.esquerda = true;
            fireball_p2.na_tela = true;

        }, 300);

    }
}

function resetarJogo() {
    window.cancelAnimationFrame(comecarJogo);
    setTimeout(function() {
        window.location.reload(false);
    }, 5000)

}

function resetarHP() {
    if (player_1.rounds < 2 && player_2.rounds < 2) {
        vidap1.vida = 328;
        player_1.x_pos = 200;
        player_1.y_pos = 490 - 97;
        player_1.x_vel = 0;
        player_1.y_vel = 0;
        vidap2.vida = 328;
        player_2.x_pos = 600;
        player_2.y_pos = 490 - 97;
        player_2.x_vel = 0;
        player_2.y_vel = 0;
    }
}

// 3 rounds, cada player tem 328 pontos de vida
// a vida do adversário chega ao final, é garantido um round para o player
function checarVitoria() {
    if (contador_rounds < 3 && (player_2.rounds < 2 && player_1.rounds < 2)) {
        if (vidap1.vida <= 0) {
            player_2.rounds += 1;
            contador_rounds += 1;
            resetarHP();

        } else if (vidap2.vida <= 0) {
            ctx.drawImage(ko_p2, 0, 0, canvas.width, canvas.height);
            player_1.rounds += 1;
            contador_rounds += 1;
            resetarHP();

        } else if (vidap1.vida <= 0 && vidap2.vida <= 0) {
            player_1.rounds += 1;
            player_2.rounds += 1;
            contador_rounds += 1;
            resetarHP();
        }
    } else {
        if (player_1.rounds > player_2.rounds) {
            player_1.vitoria = true;
        } else if (player_2.rounds > player_1.rounds) {
            player_2.vitoria = true;

        } else {
            partida_empate = true;
        }
        telaVitoria();
    }
}


function telaVitoria() {
    limparQuad();
    desenharCenario();
    if (player_1.vitoria) {
        ctx.drawImage(derr_player,
            400, 490 - 34
        );
        ctx.drawImage(vit_player,
            300, 490 - 119
        );

    } else if (player_2.vitoria) {
        ctx.drawImage(vit_player,
            300, 490 - 119
        );
        ctx.drawImage(derr_player,
            400, 490 - 34
        );

    } else if (partida_empate) {
        ctx.drawImage(partida_empate,
            200, 490 - 97
        );
        ctx.drawImage(partida_empate,
            600, 490 - 97
        );

    }

    resetarJogo();
}

function desenharCenario() {
    // o cenário não é dinâmico, ajudando na troca das molduras
    ctx.drawImage(fundo_jogo, 0, 0, canvas.width, canvas.height);
    if (contador_rounds == 1) {
        if (player_1.rounds == player_2.rounds) { // empate num primeiro round
            ctx.drawImage(round2_empate, 0, 0, canvas.width, canvas.height);

        } else if (player_1.rounds > player_2.rounds) {
            ctx.drawImage(round2_1p, 0, 0, canvas.width, canvas.height);

        } else {
            ctx.drawImage(round2_2p, 0, 0, canvas.width, canvas.height);
        }
    } else if (contador_rounds == 2) {
        if (player_1.rounds == player_2.rounds) {
            ctx.drawImage(round2_empate, 0, 0, canvas.width, canvas.height);

        } else if (player_1.rounds > player_2.rounds) {
            if (player_2.rounds == 0) {
                ctx.drawImage(round3_1pvant, 0, 0, canvas.width, canvas.height);
            }
        } else {
            if (player_1.rounds == 0) {
                ctx.drawImage(round3_2pvant, 0, 0, canvas.width, canvas.height);
            }

        }

    } else if (contador_rounds == 3) {
        if (player_1.rounds == player_2.rounds) {
            ctx.drawImage(round3_empate, 0, 0, canvas.width, canvas.height);

        } else if (player_1.rounds > player_2.rounds) {

            ctx.drawImage(round3_1pvic, 0, 0, canvas.width, canvas.height);

        } else {

            ctx.drawImage(round3_2pvic, 0, 0, canvas.width, canvas.height);
        }


    } else if (contador_rounds == 0) {
        ctx.drawImage(round_1, 0, 0, canvas.width, canvas.height);
    }
}

function sistemaDano() {
    if (player_2.agachando == false) {
        if (player_1.lado_esquerdo) {
            if (Math.floor(player_1.x_pos) >= (Math.floor(player_2.x_pos) - player_2.width - 20)) {
                if (player_1.soco && player_1.no_ar == false) {
                    vidap2.vida -= 1;
                    player_2.x_vel += 2;

                } else if (player_1.soco && Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - player_2.height - 5)) {
                    vidap2.vida -= 1;
                }
                if (player_1.chute && player_1.no_ar == false && player_2.no_ar == false) {
                    vidap2.vida -= 2;
                } else if (player_1.chute && player_1.no_ar && Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - player_2.height - 5)) {
                    vidap2.vida -= 2;
                }
            }
        } else {
            if (Math.floor(player_1.x_pos) <= (Math.floor(player_2.x_pos) + player_2.width + 20)) {
                if (player_1.soco && player_1.no_ar == false) {
                    vidap2.vida -= 1;
                    player_2.x_vel -= 2;
                } else if (player_1.soco && Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - player_2.height - 5)) {
                    vidap2.vida -= 1;

                }
                if (player_1.chute && player_1.no_ar == false && player_2.no_ar == false) {
                    vidap2.vida -= 2;
                } else if (player_1.chute && player_1.no_ar && Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - player_2.height - 5)) {
                    vidap2.vida -= 2;
                }

            }
        }
    }
    if (player_1.agachando == false) {
        if (player_1.lado_esquerdo == false) {
            if (Math.floor(player_2.x_pos) >= (Math.floor(player_1.x_pos) - player_1.width - 20)) {
                if (player_2.soco && player_2.no_ar == false) {
                    vidap1.vida -= 1;
                    player_1.x_vel += 2;
                } else if (player_2.soco && Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - player_1.height - 5)) {
                    vidap1.vida -= 1;
                }
                if (player_2.chute && player_2.no_ar == false && player_1.no_ar == false) {
                    vidap1.vida -= 2;
                } else if (player_2.chute && player_2.no_ar && Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - player_1.height - 5)) {
                    vidap1.vida -= 2;
                }
            }
        } else {
            if (Math.floor(player_2.x_pos) <= (Math.floor(player_1.x_pos) + player_1.width + 20)) {
                if (player_2.soco && player_2.no_ar == false) {
                    vidap1.vida -= 1;
                    player_1.x_vel -= 2;
                } else if (player_2.soco && Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - player_1.height - 5)) {
                    vidap1.vida -= 1;

                }
                if (player_2.chute && player_2.no_ar == false && player_1.no_ar == false) {
                    vidap1.vida -= 2;
                } else if (player_2.chute && player_2.no_ar && Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - player_1.height - 5)) {
                    vidap1.vida -= 2;
                }
            }
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
    player_2.y_vel *= 0.9; // essas iterações constantes são pesadas para a cpu

    // fisica das magias
    if (fireball_p2.direita)
        fireball_p2.x_pos -= fireball_p2.vel_x;
    else if (fireball_p2.esquerda)
        fireball_p2.x_pos += fireball_p2.vel_x;

    if (fireball_p1.direita)
        fireball_p1.x_pos -= fireball_p1.vel_x;
    else if (fireball_p1.esquerda)
        fireball_p1.x_pos += fireball_p1.vel_x;
}

function colisaoMagia() {
    if (fireball_p2.x_pos >= 800) { // magia passa da largura no eixo X
        fireball_p2.na_tela = false; // deixa de aparecer
        fireball_p2.direita = false; // não tem mais nenhum estado
        fireball_p2.esquerda = false;
    } else if (fireball_p2.x_pos < 0 - fireball_p2.width) { // largura mínima para X
        fireball_p2.na_tela = false;
        fireball_p2.direita = false;
        fireball_p2.esquerda = false;
    }
    if (fireball_p1.x_pos >= 800) { // mesmo válido para P1
        fireball_p1.na_tela = false;
        fireball_p1.direita = false;
        fireball_p1.esquerda = false;
    } else if (fireball_p1.x_pos < 0 - fireball_p1.width) {
        fireball_p1.na_tela = false;
        fireball_p1.direita = false;
        fireball_p1.esquerda = false;
    }
    if (player_1.agachando == false && fireball_p2.na_tela) {
        if (fireball_p2.direita) {
            if (fireball_p2.x_pos < player_1.x_pos + player_1.width && fireball_p2.x_pos + fireball_p2.width > player_1.x_pos && // aqui é utilizado o sistema de "bounding box"
                fireball_p2.y_pos < player_1.y_pos + player_1.height && fireball_p2.y_pos + fireball_p2.height > player_1.y_pos) { // se um objeto estiver dentro dos espaços entre as coordenadas
                fireball_p2.direita = false; // automaticamente estarão se tocando
                setTimeout(function() {
                    vidap1.vida -= 10;
                    player_1.x_vel -= 5;
                    fireball_p2.na_tela = false;
                }, 100);
            }
        } else if (fireball_p2.esquerda) {
            if (fireball_p2.x_pos < player_1.x_pos + player_1.width && fireball_p2.x_pos + fireball_p2.width > player_1.x_pos &&
                fireball_p2.y_pos < player_1.y_pos + player_1.height && fireball_p2.y_pos + fireball_p2.height > player_1.y_pos) {
                fireball_p2.esquerda = false;
                setTimeout(function() {
                    vidap1.vida -= 10;
                    player_1.x_vel += 5;
                    fireball_p2.na_tela = false;
                }, 100);
            }
        }
    }
    /*
     * Se repete para o P2
     *  Comentar seria redundante
     * A redução de vida é a mesma
     */


    if (player_2.agachando == false && fireball_p1.na_tela) {
        if (fireball_p1.direita) {
            if (fireball_p1.x_pos < player_2.x_pos + player_2.width / 2 && fireball_p1.x_pos + fireball_p1.width > player_2.x_pos &&
                fireball_p1.y_pos < player_2.y_pos + player_2.height / 2 && fireball_p1.y_pos + fireball_p1.height > player_2.y_pos) {
                fireball_p1.direita = false;
                setTimeout(function() {
                    vidap2.vida -= 10;
                    player_2.x_vel -= 5;
                    fireball_p1.na_tela = false;
                }, 100);
            }
        } else if (fireball_p1.esquerda) {
            if (fireball_p1.x_pos < player_2.x_pos + player_2.width && fireball_p1.x_pos + fireball_p1.width > player_2.x_pos &&
                fireball_p1.y_pos < player_2.y_pos + player_2.height && fireball_p1.y_pos + fireball_p1.height > player_2.y_pos) {
                fireball_p1.esquerda = false;
                setTimeout(function() {
                    vidap2.vida -= 10;
                    player_2.x_vel += 5;
                    fireball_p1.na_tela = false;
                }, 100);
            }
        }
    }
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

    if (player_1.x_pos >= 800 - player_1.width) {
        player_1.x_pos = 800 - player_1.width;
        if (player_1.y_pos >= 490 - player_1.height) {
            player_1.y_pos = 490 - player_1.height;
            player_1.y_vel = 0;
            player_1.no_ar = false; // ao tocar no chão, player 1 perde o estado "no ar"
            player_1.pulando = false; // e também o "pulando"
            recoveryDelayP1();
        } else if (player_1.y_pos < 0)
            player_1.y_pos = 0;
    } else if (player_1.y_pos >= 490 - player_1.height) {
        player_1.y_pos = 490 - player_1.height;
        player_1.y_vel = 0;
        player_1.no_ar = false;
        player_1.pulando = false;
        recoveryDelayP1();
        if (player_1.x_pos >= 800 - player_1.width)
            player_1.x_pos = 800 - player_1.width;
        else if (player_1.x_pos < 0)
            player_1.x_pos = 0;
    }

    if (player_2.x_pos >= 800 - player_2.width) {
        player_2.x_pos = 800 - player_2.width;
        if (player_2.y_pos >= 490 - player_2.height) {
            player_2.y_pos = 490 - player_2.height;
            player_2.y_vel = 0;
            player_2.no_ar = false;
            player_2.pulando = false;
            recoveryDelayP2();
        } else if (player_2.y_pos < 0)
            player_2.y_pos = 0;
    } else if (player_2.y_pos >= 490 - player_2.height) {
        player_2.y_pos = 490 - player_2.height;
        player_2.y_vel = 0;
        player_2.no_ar = false;
        player_2.pulando = false;
        recoveryDelayP2();
        if (player_2.x_pos >= 800 - player_2.width)
            player_2.x_pos = 800 - player_2.width;
        else if (player_2.x_pos < 0)
            player_2.x_pos = 0;
    }
    //console.log(player_1.x_pos, player_1.y_pos);
    // fim das colisões com cenário

}

function colisaoPlayers() {
    // colisões entre players
    // posição dos sprites
    if (player_1.x_pos > (player_2.x_pos + player_2.width)) {
        player_1.lado_esquerdo = false; // será considerado no lado esquerdo o player 1 cujas coordenadas no eixo x sejam menores que as do P2
    } else if (player_1.x_pos < (player_2.x_pos - player_2.width)) {
        player_1.lado_esquerdo = true;

    }
    if (player_1.lado_esquerdo) {
        if (player_1.andando) {
            if (Math.floor(player_2.x_pos) < (Math.floor(player_1.x_pos) + player_1.width)) {
                player_2.x_pos = player_2.x_pos; //posição continua a mesma da anterior
            }
            if (Math.floor(player_1.x_pos) > (Math.floor(player_2.x_pos) - player_2.width)) {
                player_1.x_pos = player_2.x_pos - player_2.width
            }
        }
        if (player_1.pulando) {
            if ((Math.floor(player_1.x_pos) > (Math.floor(player_2.x_pos) - (player_2.width / 2))) && (Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - (player_2.height - 30)))) {
                player_1.x_vel += 3; // se o jogador cair na área em que as colisões laterais não ocorram, o jogador "deslizará" para frente ou para trás
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
        if (player_2.pulando) {
            if ((Math.floor(player_2.x_pos) < (Math.floor(player_1.x_pos) + (player_1.width / 2))) && (Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - (player_1.height - 30)))) {
                player_2.x_vel -= 3;
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
        if (player_2.pulando) {
            if ((Math.floor(player_2.x_pos) > (Math.floor(player_1.x_pos) - (player_1.width / 2))) && (Math.floor(player_2.y_pos) >= (Math.floor(player_1.y_pos) - (player_1.height - 30)))) {
                player_2.x_vel += 3;
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
        if (player_1.pulando) {
            if ((Math.floor(player_1.x_pos) < (Math.floor(player_2.x_pos) + (player_2.width / 2))) && (Math.floor(player_1.y_pos) >= (Math.floor(player_2.y_pos) - (player_2.height - 30)))) {
                player_1.x_vel -= 3;
            }
        }
    }

}

function checarMovimento() {
    // velocidade diferente de zero
    // player então é considerado em movimentos
    // muitas ações dependem desse estado ativado
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


// funcao de recovery dos movimentos
function recoveryDelayP1() {
    if (player_1.chute) {
        // chute fica 300ms ativo, player ataca, mas fica invulnerável
        setTimeout(function() {
            player_1.chute = false;
        }, 200);
    }
    if (player_1.soco) {
        // mesmo para o soco
        setTimeout(function() {
            player_1.soco = false;
        }, 200);
    }

}

//funcao de recovery dos movimentos do player 2
function recoveryDelayP2() {

    if (player_2.chute) {
        // o tempo é o mesmo para ambos os players
        // para princípios de balanceamento
        setTimeout(function() {
            player_2.chute = false;
        }, 200);
    }
    if (player_2.soco) {
        // mesmo para o soco
        setTimeout(function() {
            player_2.soco = false;
        }, 200);
    }
}

function desenharBarras() {
    ctx.fillStyle = vidap1.cor;
    ctx.fillRect(vidap1.pos_x, vidap1.pos_y, -vidap1.vida, vidap1.height);
    ctx.fillStyle = vidap2.cor;
    ctx.fillRect(vidap2.pos_x, vidap2.pos_y, vidap2.vida, vidap2.height);


}

function desenharMagia() {
    if (fireball_p2.na_tela && fireball_p2.direita) {
        ctx.drawImage(fireball_inv,
            fireball_p2.x_pos, fireball_p2.y_pos
        );
    } else if (fireball_p2.na_tela && fireball_p2.esquerda) {
        ctx.drawImage(fireball_img,
            fireball_p2.x_pos, fireball_p2.y_pos

        );
    }

    if (fireball_p1.na_tela && fireball_p1.direita) {
        ctx.drawImage(fireball_inv,
            fireball_p1.x_pos, fireball_p1.y_pos
        );
    } else if (fireball_p1.na_tela && fireball_p1.esquerda) {
        ctx.drawImage(fireball_img,
            fireball_p1.x_pos, fireball_p1.y_pos

        );
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
            if (fireball_p1.na_tela) {
                ctx.drawImage(player_fireball,
                    player_1.x_pos, player_1.y_pos, 113, player_1.height // posição no canvas
                );
            } else {
                ctx.drawImage(player_stand,
                    0, 0, 77, 97, //posição na imagem para sprite
                    player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
                );
            }
        }


    } else {
        // ctx.scale(-1,1) é muito pesado pra cpu
        // definir na mão os sprites economiza mais RAM
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
            if (fireball_p1.na_tela) {
                ctx.drawImage(player_invfireball,
                    player_1.x_pos, player_1.y_pos, 113, player_1.height // posição no canvas
                );
            } else {
                ctx.drawImage(player_invstand,
                    0, 0, 77, 97, //posição na imagem para sprite
                    player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
                );
            }
        }
    }

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
            if (fireball_p2.na_tela) {
                ctx.drawImage(player_fireball,
                    player_2.x_pos, player_2.y_pos, 113, player_2.height // posição no canvas
                );
            } else {
                ctx.drawImage(player_stand,
                    0, 0, 77, 97, //posição na imagem para sprite
                    player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
                );
            }
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
            if (fireball_p2.na_tela) {
                ctx.drawImage(player_invfireball,
                    player_2.x_pos, player_2.y_pos, 113, player_2.height // posição no canvas
                );
            } else {
                ctx.drawImage(player_invstand,
                    0, 0, 77, 97, //posição na imagem para sprite
                    player_2.x_pos, player_2.y_pos, player_2.width, player_2.height // posição no canvas
                );
            }
        }
    }

}
// funcao para som, retirada do W3schools
// não é tão bem explicada, mas um objeto para som é criado, só então o mesmo pode ser referenciado depois
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function comecarJogo() {
    musica_alergs.play();
    limparQuad();
    //desenho o fundo
    desenharCenario();
    //teclas de ambos players checadas e variaveis definidas
    checarMovimento();
    colisaoPlayers();
    colisaoCenario();
    colisaoMagia();
    checarTeclasP1();
    checarTeclasP2();
    fisicaJogo();
    desenharMagia();
    desenharP1();
    desenharP2();
    sistemaDano();
    desenharBarras();
    checarVitoria();
    requestAnimationFrame(comecarJogo);
}

function menuPrincipal() {
    musica_menu.play();
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
        musica_menu.stop();
    }


    if (teclas_press[13] == true) {
        cancelAnimationFrame(menuPrincipal);
        musica_menu.stop();
        comecarJogo();
    } else {
        requestAnimationFrame(menuPrincipal);
    }
}



function main() {
    menuPrincipal();

}

main();
