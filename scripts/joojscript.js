function revelar(id_recebido, botaoescondido, botaoativado){
  document.getElementById(id_recebido).style.display = 'block';
   document.getElementById(botaoescondido).style.display = 'block';
  document.getElementById(botaoativado).style.display = 'none';
}

function esconder(id_segundo, botaoescondido, botaodesativado){
  document.getElementById(id_segundo).style.display = 'none';
  document.getElementById(botaoescondido).style.display = 'none';
  document.getElementById(botaodesativado).style.display = 'block';
}

function focopag(elemento){
  var parte_focar = document.getElementById(elemento);
  parte_focar.scrollIntoView();


}
