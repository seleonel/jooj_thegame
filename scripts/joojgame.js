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
var Player_jump = new Image();
var player_2stand = new Image();
var player_2crouch = new Image();
var player_2punch = new Image();
var Player_2jump = new Image();
player_stand.src = "images/pe.png";
//player_crouch.src = "images/agachando.png";
//player_punch.src ="images/soco.png";
//Player_jump.src = "images/pulando.png"
//player_2crouch.src = "images/p2agachando.png";
//player_2punch.src = "images/p2soco.png";
//player_2jump.src ="images/p2pulando.png";
//player_2stand.src ="images/p2pe.png";
nao_mutado = true;

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
  y_pos: 490 - 290,
  width: 100,
  height: 290,
  vida: 100,
  no_ar: false,
  lado_esquerdo: true,
  defendendo: false,
  agachando: false,
  parado: true,
  andando: false

};

var player_2 = {
  x_pos: 800,
  y_pos: 490 - 290,
  width: 100,
  height: 290,
  vida: 100,
  no_ar: true,
  defendendo: false,
  lado_esquerdo: false,
  agachando: false,
  parado: true,
  andando: false

};


function comecarJogo(){
  limparQuad();
  //desenho o fundo
  ctx.drawImage(fundo_jogo, 0, 0, canvas.width, canvas.height);
  //acoes player 1
  //tecla direita aumenta x
  if (teclas_press[39] == true)
    if(player_1.lado_esquerdo == false){
      player_1.defendendo = true; // defende se estiver no lado direito + anda lentamente
      player_1.x_pos += 5;}
    else{
      player_1.x_pos += 10;
      player_1.andando = true;}

  //tecla esquerda diminui x
  if(teclas_press[37] == true)
    if(player_1.lado_esquerdo){
      player_1.defendendo = true;
      player_1.x_pos -= 5;}
    else{
      player_1.x_pos -= 10;
      player_1.andando = true;}
  // tecla cima pula e diminui y
  // pulo será difícil fazer
  if(teclas_press[38] == true)
  //player_1.y_pos -= 10;
  // tecla baixo agacha
  if(teclas_press[40] == true)
    player_1.agachando = true;

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

  //colisão vai alterar os x e y
  // no caso só com cenário
  // 490 é nosso chão
  // 800 e 0 são as paredes
  if(player_1.x_pos <= 0)
      player_1.x_pos = 0;
      if(player_1.y_pos <= 0)
          player_1.y_pos = 0;
  if(player_2.y_pos <= 0)
      player_2.y_pos = 0;
      if(player_2.x_pos <= 0)
          player_2.x_pos = 0;

   if(player_1.x_pos >= 800 - player_1.width){
       player_1.x_pos = 800 - player_1.width;
       if (player_1.y_pos >= 490 - player_1.height)
           player_1.y_pos = 490 - player_1.height;
       else if (player_1.y_pos < 0)
           player_1.y_pos = 0;}

   else if(player_1.y_pos >= 490 - player_1.height){
       player_1.y_pos = 490 - player_1.height;
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

// colisões entre players
//posição dos sprites
  if (player_1.x_pos > player_2.x_pos){
      player_1.lado_esquerdo = false;
      player_2.lado_esquerdo = true;
  }






  desenharChars(player_1.x_pos, player_1.y_pos, player_2.x_pos, player_2.y_pos);


  requestAnimationFrame(comecarJogo);
}
function desenharChars(pos_x1, pos_y1, pos_x2, pos_y2){
  ctx.drawImage(player_stand, pos_x1, pos_y1, player_1.width, player_1.height);


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
