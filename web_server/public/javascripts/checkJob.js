function checkJob() {
  var name = document.forms['jobform'].name.value;
  var prior = parseInt(document.forms['jobform'].prior.value);
  var exec_nb = parseInt(document.forms['jobform'].exec_nb.value);
  
  if(!(/\w{3,}/.test(name))) {
    document.forms['jobform'].name.style.border = 'red 1px solid';
    document.getElementById('name_err').innerHTML = 'Le nom doit se composer d\'au moins 3 caractères alphanumériques'; 
    return false;
  }
  else {
    document.forms['jobform'].name.style.border = 'green 1px solid';
    document.getElementById('name_err').innerHTML = ''; 
  }
  
  if(prior > 6 || prior < 1) {
    document.forms['jobform'].prior.style.border = 'red 1px solid';
    document.getElementById('prior_err').innerHTML = 'La priorité doit être comprise entre 1 et 6.'; 
    return false;
  }
  else {
    document.forms['jobform'].prior.style.border = 'green 1px solid';
    document.getElementById('prior_err').innerHTML = ''; 
  }
  
  if(exec_nb <= 0) {
    document.forms['jobform'].exec_nb.style.border = 'red 1px solid';
    document.getElementById('exec_err').innerHTML = 'Le nombre d\'exécutions doit être supérieur à 0.'
    return false;
  }
  else {
    document.forms['jobform'].exec_nb.style.border = 'green 1px solid';
    document.getElementById('exec_err').innerHTML = ''
  }
}
