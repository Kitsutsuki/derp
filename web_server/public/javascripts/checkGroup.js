function checkGroup() {
  
  var name = document.forms['groupform'].name.value;
  var numberWin = parseInt(document.forms['groupform'].numberWin.value);
  var numberLin = parseInt(document.forms['groupform'].numberLin.value);
  var numberMac = parseInt(document.forms['groupform'].numberMac.value);
  var st_hour = parseInt(document.forms['groupform'].st_hour.value);
  var st_min = parseInt(document.forms['groupform'].st_min.value);
  var end_hour = parseInt(document.forms['groupform'].end_hour.value);
  var end_min = parseInt(document.forms['groupform'].end_min.value);
  
  if(!(/\w{3,}/.test(name))) {
    document.forms['groupform'].name.style.border = 'red 1px solid';
    document.getElementById('name_err').innerHTML = 'Le nom doit se composer d\'au moins 3 caractères alphanumériques'; 
    return false;
  }
  else {
    document.forms['groupform'].name.style.border = 'green 1px solid';
    document.getElementById('name_err').innerHTML = ''; 
  }
  
  if(numberWin + numberLin + numberMac == 0) {
    document.forms['groupform'].numberWin.style.border = 'red 1px solid';
    document.forms['groupform'].numberLin.style.border = 'red 1px solid';
    document.forms['groupform'].numberMac.style.border = 'red 1px solid';
    document.getElementById('nb_err').innerHTML = 'Vous devez avoir au moins une machine dans le groupe.'; 
    return false;
  }  
  else {
    document.forms['groupform'].numberWin.style.border = 'green 1px solid';
    document.forms['groupform'].numberLin.style.border = 'green 1px solid';
    document.forms['groupform'].numberMac.style.border = 'green 1px solid';
    document.getElementById('nb_err').innerHTML = ''; 
  }
  
  if(st_hour == end_hour && st_min == end_min) {
    document.forms['groupform'].st_hour.style.border = 'red 1px solid';
    document.forms['groupform'].st_min.style.border = 'red 1px solid';
    document.forms['groupform'].end_hour.style.border = 'red 1px solid';
    document.forms['groupform'].end_min.style.border = 'red 1px solid';
    document.getElementById('h_err').innerHTML = 'L\'heure de début et l\'heure de fin doivent être différentes.'; 
    return false;
  }
  else {
    document.forms['groupform'].st_hour.style.border = 'green 1px solid';
    document.forms['groupform'].st_min.style.border = 'green 1px solid';
    document.forms['groupform'].end_hour.style.border = 'green 1px solid';
    document.forms['groupform'].end_min.style.border = 'green 1px solid';
    document.getElementById('h_err').innerHTML = ''; 
  }
}
