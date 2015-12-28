// Initialize Parse with your Parse application javascript keys
Parse.initialize("UKcM4qKQUwfsF7UTQbQ0u6feYVJaBLNpD4uP8zFQ",
                   "euwUL2zze4fkotAp8NLr0DoTgE093Dnfi4OVVU2K");

function getId(x){
  return document.getElementById(x);
}
function parseSignIn(){
	var username = getId("lg_user").value, password = getId("lg_pass").value;
  Parse.User.logIn(username, password, {
    success: function(user) {
  			window.location.href="pages/home.html";
    },
    error: function(user, error) {
    	//console.log(error.code+":"+error.message);
    	document.getElementsByClassName("error_login")[0].textContent = "Invalid username or password";	
    }
  });
}
function parseSignUp(){
  var username = getId("sg_user").value, password = getId("sg_pass").value;
  Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
    success: function(user) {
      window.location.href="pages/home.html";
    },
    error: function(user, error) {
      document.getElementsByClassName("error_signup")[0].textContent = error.message; 
    }
  });
}
var addEvent = function(elem, type, eventHandle){
  if (elem == null || typeof(elem) == 'undefined') return;
  if ( elem.addEventListener ) {
    elem.addEventListener( type, eventHandle, false );
  } 
  else if ( elem.attachEvent ) {
    elem.attachEvent( "on" + type, eventHandle);
  } 
  else {
    elem["on"+type]=eventHandle;
  }
}
addEvent(getId("lg_submit"),"click", parseSignIn);
addEvent(getId("sg_submit"),"click", parseSignUp);