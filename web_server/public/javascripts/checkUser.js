function checkUser()  {
  var name = document.forms['userform'].name.value;
  var pass = document.forms['userform'].pass.value;
  var passconf = document.forms['userform'].passconf.value;

  if(!(/\w{3,}/.test(name))) {
    document.forms['userform'].name.style.border = 'red 1px solid';
    document.getElementById('name_err').innerHTML = 'Le nom doit se composer d\'au moins 3 caractères alphanumériques'; 
    return false;
  }
  else {
    document.forms['userform'].name.style.border = 'green 1px solid';
    document.getElementById('name_err').innerHTML = ''; 
  }
  
  if(!(/\w{3,}/.test(pass))) {
    document.forms['userform'].pass.style.border = 'red 1px solid';
    document.getElementById('pass_err').innerHTML = 'Le mot de passe doit se composer d\'au moins 3 caractères alphanumériques'; 
    return false;
  }
  else {
    document.forms['userform'].pass.style.border = 'green 1px solid';
    document.getElementById('pass_err').innerHTML = ''; 
  }

  if(pass != passconf) {
    document.forms['userform'].passconf.style.border = 'red 1px solid';
    document.getElementById('conf_err').innerHTML = 'Les mots de passe doivent être identiques.';
    return false;
  }
  else {
    document.forms['userform'].pass.style.border = 'green 1px solid';
    document.forms['userform'].passconf.style.border = 'green 1px solid';
    document.getElementById('conf_err').innerHTML = '';
  }
}
