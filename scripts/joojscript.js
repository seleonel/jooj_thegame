function leiamais(vari_recebida, botaoativado){
  document.getElementById(vari_recebida).style.display = 'block';
  document.getElementById(botaoativado).style.display = 'none';
}

function leiamenos(variavel_segunda, botaodesativado){
  document.getElementById(variavel_segunda).style.display = 'none';
  document.getElementById(botaodesativado).style.display = 'block';
}

function focopag(elemento){
  var parte_focar = document.getElementById(elemento);
  parte_focar.scrollIntoView();


}
