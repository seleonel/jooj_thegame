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
var player2_stand = new Image();
var player2_crouch = new Image();
var player2_punch = new Image();
var Player2_jump = new Image();
player_stand.src = "images/pulando.png";
//player_crouch.src = "images/agachando.png";
//player_punch.src ="images/fundo.png";
//Player_jump.src = "images/pulando.png";
//player2_stand.src = "images/fundo.png";
//player2_crouch.src = "images/agachando.png";
//player2_punch.src = "images/fundo.png";
//Player2_jump.src ="images/pulando.png";
nao_mutado = true;
contagem = true;
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
  y_pos: 490,
  width: 100,
  height: 290,
  no_ar: trues

};

var player_2 = {
  x_pos: 800,
  y_pos: 490,
  width: 100,
  height: 290,
  no_ar: true
};
function comecarJogo(){
  limparQuad();
  //desenho o fundo
  ctx.drawImage(fundo_jogo, 0, 0, canvas.width, canvas.height);
  //acoes player 1
  //tecla direita aumenta x
  if (teclas_press[39] == true)
  //tecla  esquerda diminui x
  if(teclas_press[37] == true)
  // tecla cima pula e diminui y
  if(teclas_press[38] == true)
  // tecla baixo agacha
  if(teclas_press[40] == true)



  desenharChars(player_1.x_pos, player_1.y_pos, player_2.x_pos, player_2.y_pos, acao_player1, acao_player2);


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
