/******************************************
  *   menus principais serão retangulos   *
  *   fases selecionáveis                 *
  *   jogo terá "gravidade"               *
  *                                       *
  *****************************************/

var canvas = document.getElementById('canvasjooj');
var ctx = canvas.getContext('2d');
var teclas_press = []; // vetor criado para listar as teclas pressionadas
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
  limparTela();
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
    requestAnimationFrame(quadroSingle);
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
  requestAnimationFrame(menuPrincipal);


}
//chamo main()
main();
