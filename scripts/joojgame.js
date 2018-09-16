/******************************************
  *   menus principais serão retangulos   *
  *   fases selecionáveis                 *
  *   jogo terá "gravidade"               *
  *                                       *
  *****************************************/

var canvas = document.getElementById('canvasjooj');
var ctx = canvas.getContext('2d');
var teclas_press = []; // vetor criado para listar as teclas pressionadas
var player_sprite = new Image();
var repeticao = 0;

player_sprite.src = "images/char1.png";
var player_char = {
  width: 45,
  height: 50,
  no_ar: true,
  pos_x: 300,
  pos_y: 300,
  vel_y: 0,
  vel_x: 0

};

var pos_seta = {
  x_seta: 220,
  y_seta: 320

};
// eventos para "detectar" quando teclas são pressionadas
document.addEventListener("keydown", function(pressaoTec){
  teclas_press[pressaoTec.keyCode] = true;
});

document.addEventListener("keyup", function(pressaoTec){
  teclas_press[pressaoTec.keyCode] = false;
});

//função basica para limpar a tela
function limparTela(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//jogo singleplayer, se não conseguirmos fazer uma 'IA', deletar e fazer sessão como jogar
function quadroSingle(){
  var frame = repeticao % 7;
  var pos_img = frame * 10;
  limparTela();
  //"física" de pulo
  if(teclas_press[32] == true && player_char.no_ar == false){
    // Tecla cima
    player_char.vel_y -= 40; //velocidade do pulo para 40
    player_char.no_ar = true;
    }

  if (teclas_press[39] == true){
    // seta direita
    player_char.vel_x += 0.3;}

  if(teclas_press[37] == true){
    // seta esquerda
    player_char.vel_x -= 0.3;}


    //gravidade
    player_char.vel_y += 0.25;
    player_char.pos_y += player_char.vel_y;
    //friccao
    player_char.pos_x += player_char.vel_x
    player_char.vel_x *= 0.9;
    player_char.vel_y *= 0.9;
    //colisao com a plataforma
    if(player_char.pos_y > 600 - player_char.height && player_char.pos_x < 500){
      player_char.no_ar = false;
      player_char.pos_y = 600 - player_char.height;
      player_char.vel_y = 0;
    }
    //primeiro personagem desenhado
  ctx.drawImage(
    player_sprite,
    pos_img, 0, player_char.width, player_char.height,
    player_char.pos_x, player_char.pos_y, 30, 45,
  );
  repeticao += 1;




  requestAnimationFrame(quadroSingle);
}


//jogo multiplayer
function quadroMulti(){
  limparTela();
  requestAnimationFrame(quadroMulti);

}

function menuPrincipal(){

  //menu terá dois submenus, singleplayer e multiplayer?
  //como mutar o áudio??
  //botoes menu criados

  var imagem_fundo = new Image();
  var jooj_logo = new Image();
  var bot_single = new Image();
  var bot_multi = new Image();
  var bot_mutar = new Image();
  var seta_icone = new Image();
  var pos_single = [250, 320];
  var pos_multi = [250, 420];
  var pos_mute = [700, 500];
  //locais das imagens definidos
  imagem_fundo.src = "images/imagem_fundo.png";
  jooj_logo.src = "images/logo.png";
  bot_single.src = "images/single.png";
  bot_multi.src = "images/multi.png";
  bot_mutar.src = "images/mute.png";
  seta_icone.src = "images/seta.png";


  //posiciono os itens no menu (onload para imagens mais pesadas)
  imagem_fundo.onload = function(){
    ctx.drawImage(imagem_fundo, 0, 0);}
  jooj_logo.onload = function(){
    ctx.drawImage(jooj_logo, 250, 100);}
    //checo posição da seta



  //botões selecionáveis
  bot_single.onload = function(){
    ctx.drawImage(bot_single, pos_single[0], pos_single[1]);}
  bot_multi.onload = function(){
    ctx.drawImage(bot_multi, pos_multi[0], pos_multi[1]);}
  bot_mutar.onload = function(){
    ctx.drawImage(bot_mutar, pos_mute[0], pos_mute[1]);}
  seta_icone.onload = function(){
    ctx.drawImage(seta_icone, pos_seta.x_seta, pos_seta.y_seta)
  }

  // enter pressionado, vamos para single ou multi
  if(teclas_press[13] == true && pos_seta.y_seta == 320){
    quadroSingle();
  }
  else if(teclas_press[13] == true && pos_seta.y_seta == pos_multi[1]){
    requestAnimationFrame(quadroMulti);
  }
  else{
    if(teclas_press[38] == true){
      pos_seta.y_seta =  pos_single[1]
      pos_seta.x_seta = pos_single[0] - 30
    }
    if(teclas_press[40] == true){
      pos_seta.y_seta = pos_multi[1]
      pos_seta.x_seta = pos_multi[0] - 30
  }}

  requestAnimationFrame(menuPrincipal);
}


function main(){

  //primeiro chamar o menu principal
  menuPrincipal();


}
//chamo main()
main();
