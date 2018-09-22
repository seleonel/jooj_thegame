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
fundo_menu.src ="images/fundo.png";
fundo_jogo.src="images/fase_fundo.png";
logo_menu.src ="images/logo.png";
opcao_menu.src ="images/jogar.png";
mute_button.src ="images/mute.png";
unmute_button ="images/mute_2.png";
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
var player_2stand = new Image();
var player_2crouch = new Image();
var player_2punch = new Image();
var player_2jump = new Image();
var player_2walk = new Image();
player_stand.src = "images/pe.png";
player_crouch.src = "images/agachando.png";
player_punch.src ="images/soco.png";
player_jump.src = "images/pulando.png";
player_kick.src ="images/chute.png";
player_jumpkick.src = "images/chute_pulando.png";
player_jumppunch.src ="images/soco_pulando.png";
player_walk.src ="images/andando.png";
//player_2crouch.src = "images/p2agachando.png";
//player_2punch.src = "images/p2soco.png";
//player_2jump.src ="images/p2pulando.png";
//player_2stand.src ="images/p2pe.png";
//player_2walk.src ="images/p2walk.png";
nao_mutado = true;
// gravidade?
valor_gravidade = 0.98;
var contador = 0;
// teclas no teclado são salvas no vetor teclas_press
document.addEventListener("keydown", function(pressaoTec){
    teclas_press[pressaoTec.keyCode] = true;});

document.addEventListener("keyup", function(pressaoTec){
    teclas_press[pressaoTec.keyCode] = false;});

//funcao para limpar o quadro
function limparQuad(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);}

//personagens do jogo
var player_1 = {
  x_pos: 200,
  y_pos: 490 - 97,
  x_vel: 0,
  y_vel: 0,
  width: 77,
  height: 97,
  vida: 100,
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
  x_pos: 800,
  y_pos: 490 - 290,
  x_vel: 0,
  y_vel: 0,
  width: 100,
  height: 290,
  vida: 100,
  no_ar: false,
  defendendo: false,
  lado_esquerdo: false,
  agachando: false,
  andando: false


};
function colisaoCenario(){
  //colisão vai alterar os x e y
  // no caso só com cenário
  // 490 é nosso chão
  // 800 e 0 são as paredes
  if(player_1.x_pos <= 0)
    player_1.x_pos = 0;
  if(player_1.y_pos <= 0)
    player_1.y_vel = 5;
  if(player_2.y_pos <= 0)
    player_2.y_vel = 5;
  if(player_2.x_pos <= 0)
    player_2.x_pos = 0;

  if(player_1.x_pos >= 800 - player_1.width){
    player_1.x_pos = 800 - player_1.width;
  if (player_1.y_pos >= 490 - player_1.height){
    player_1.y_pos = 490 - player_1.height;
    player_1.y_vel = 0;
    player_1.no_ar = false;
    player_1.pulando = false;}
  else if (player_1.y_pos < 0)
    player_1.y_pos = 0;}

  else if(player_1.y_pos >= 490 - player_1.height){
    player_1.y_pos = 490 - player_1.height;
    player_1.y_vel = 0;
    player_1.no_ar = false;
    player_1.pulando = false;
  if (player_1.x_pos >= 800 - player_1.width)
    player_1.x_pos = 800 - player_1.width;
  else if (player_1.x_pos < 0)
    player_1.x_pos = 0;}

  if(player_2.x_pos >= 800 - player_1.width){
    player_2.x_pos = 800 - player_1.width;
  if (player_2.y_pos >= 490 - player_2.height)
    player_2.y_pos = 490 - player_2.height;
  else if (player_2.y_pos < 0)
      player_2.y_pos = 0;}

  else if(player_2.y_pos >= 490 - player_2.height){
    player_2.y_pos = 490 - player_2.height;
  if (player_2.x_pos >= 800 - player_1.width)
    player_2.x_pos = 800 - player_1.width;
  else if (player_2.x_pos < 0)
    player_2.x_pos = 0;}
//console.log(player_1.x_pos, player_1.y_pos);
// fim das colisões com cenário

}
function checarTeclas(){
  //acoes player 1
  //tecla direita aumenta x
  if (teclas_press[39] == true){
    if(player_1.lado_esquerdo == false && player_1.no_ar == false){
      // defende se estiver no lado direito + anda lentamente
      player_1.x_vel += 0.3;}
    else if(player_1.lado_esquerdo && player_1.no_ar == false){
      player_1.x_vel += 0.7;}
    else if(teclas_press[38] == true && player_1.pulando == true){
      player_1.x_vel += 0.9;
      player_1.pulando == false;}}

  //tecla esquerda diminui x
  if(teclas_press[37] == true){
    if(player_1.lado_esquerdo && player_1.no_ar == false){
      player_1.x_vel -= 0.3;}
    else if(player_1.lado_esquerdo == false && player_1.no_ar == false){
      player_1.x_vel -= 0.7;}
    else if(teclas_press[38] == true && player_1.pulando == true){
      player_1.x_vel -= 0.9;
      player_1.pulando == false;}}

  // tecla cima pula e diminui y
  // pulo será difícil fazer
  if(teclas_press[38] == true && player_1.no_ar == false){
    player_1.y_vel -= 30;
    player_1.no_ar = true;
    player_1.pulando = true;}
  // tecla baixo agacha
  if(teclas_press[40] == true && player_1.no_ar == false){
    player_1.x_vel = 0;
    player_1.agachando = true;}
  // botao soco (*)
  if(teclas_press[106] == true && player_1.agachando == false && player_1.andando == false && player_1.chute == false){
    player_1.soco = true;}
  //botao chute (-)
  if(teclas_press[109] == true && player_1.agachando == false && player_1.andando == false && player_1.soco == false){
    player_1.chute = true;}

  //acoes player 2
  //tecla D aumenta x
  if (teclas_press[68] == true)
  //tecla A diminui x
  if(teclas_press[65] == true)
  // tecla cima pula e diminui y
  if(teclas_press[87] == true)
    // tecla S agacha
  if(teclas_press[83] == true)
    player_2.agachando = true;



}

function fisicaJogo(){

  //"física"
  player_1.y_vel += valor_gravidade; // gravidade definida lá em cima
  player_1.y_pos += player_1.y_vel;
  player_2.y_vel += valor_gravidade;
  player_2.y_pos += player_1.y_vel;
  player_1.x_pos += player_1.x_vel;
  player_2.x_pos += player_2.x_vel;
  player_1.x_vel *= 0.9; // também chamado de atrito
  player_2.x_vel *= 0.9; // dá o efeito de corridas com resistência
  player_1.y_vel *= 0.9; // sempre multiplicando por um valor menor que 1
  player_2.y_vel *= 0.9; // wow isso aqui é pesado pra cpu

}

function colisaoPlayers(){
  // colisões entre players
  //posição dos sprites
  if (player_1.x_pos > player_2.x_pos){
    player_1.lado_esquerdo = false;
    player_2.lado_esquerdo = true;}

}

function checarMovimento(){
  // velocidade diferente de zero
  if(player_1.x_vel != 0)
    player_1.andando = true;
  if(player_1.pulando == true || player_1.no_ar == true)
    player_1.andando = false;
  if(player_1.x_vel == 0 || (player_1.x_vel < 1 && player_1.x_vel > -1))
    player_1.andando = false;
}

function comecarJogo(){
  limparQuad();
  //desenho o fundo
  ctx.drawImage(fundo_jogo, 0, 0, canvas.width, canvas.height);
  //teclas de ambos players checadas e variaveis definidas
  checarTeclas();
  fisicaJogo();
  colisaoCenario();
  colisaoPlayers();
  checarMovimento();




  desenharP1();
  //desenharP2();
  // reseto variáveis
  player_1.agachando = false;
  player_1.chute = false;
  player_1.soco = false;
  requestAnimationFrame(comecarJogo);
}



function desenharP1(){
// como desenhar de acordo com as ações

  if(player_1.lado_esquerdo){
    if(player_1.andando){
        ctx.drawImage(player_walk,
        0, 0, 77, 97,  //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );}
    else if(player_1.no_ar || player_1.pulando){
      if(player_1.soco){
        ctx.drawImage(player_jumppunch,
        154, 0, 110, 97,  //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width + 30, player_1.height + 10 // posição no canvas
      );}
      else if(player_1.chute){
        ctx.drawImage(player_jumpkick,
        170, 0, 138, 66,  //posição na imagem para sprite
        player_1.x_pos, player_1.y_pos, player_1.width + 60, player_1.height - 30 // posição no canvas
      );}
      else{
      ctx.drawImage(player_jump,
      0, 0, 77, 97,  //posição na imagem para sprite
      player_1.x_pos, player_1.y_pos, player_1.width , player_1.height // posição no canvas
    );}}
    else if(player_1.agachando){
      ctx.drawImage(player_crouch,
      0, 0, 77, 97,  //posição na imagem para sprite
      player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );}
    else if(player_1.soco){
      ctx.drawImage(player_punch,
      165, 0, 116, 97,  //posição na imagem para sprite
      player_1.x_pos, player_1.y_pos, player_1.width + 40, player_1.height// offset para soco
      );}
    else if (player_1.chute) {
      ctx.drawImage(player_kick,
      340, 0, 110, 97,  //posição na imagem para sprite
      player_1.x_pos, player_1.y_pos, player_1.width + 30, player_1.height // posição no canvas
      );}
    else if(player_1.andando == false && player_1.no_ar == false){
      ctx.drawImage(player_stand,
      0, 0, 77, 97, //posição na imagem para sprite
      player_1.x_pos, player_1.y_pos, player_1.width, player_1.height // posição no canvas
      );}}

}

function menuPrincipal(){
  //desenhar fundo
  ctx.drawImage(fundo_menu, 0, 0, canvas.width, canvas.height);
  //desenhar logo
  ctx.drawImage(logo_menu, 200, 100, 400, 40);
  //desenhar opcao
  ctx.drawImage(opcao_menu, 250, 300, 300, 100);
  //desenhar opcao de desmutar
  if (nao_mutado){
    ctx.drawImage(mute_button, 700, 500, 50, 50);}
  else{
    ctx.drawImage(unmute_button, 700, 500, 50, 50);}

  if (teclas_press[77] == true){
    nao_mutado = false;}
  if (teclas_press[13] == true){
    comecarJogo();}
  else{
    requestAnimationFrame(menuPrincipal);}
}



function main(){
  menuPrincipal();

}

main();
