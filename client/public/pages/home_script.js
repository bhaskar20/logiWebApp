// Initialize Parse with your Parse application javascript keys
Parse.initialize("UKcM4qKQUwfsF7UTQbQ0u6feYVJaBLNpD4uP8zFQ",
                   "euwUL2zze4fkotAp8NLr0DoTgE093Dnfi4OVVU2K");

function getByTag(x){
  return document.getElementsByTagName(x);
}
function getById(x){
  return document.getElementById(x);
}
function getByClass(x){
	return document.getElementsByClassName(x);
}
function ExpandMenuHeight(){
	var slideMenu = document.getElementsByClassName("left_side_menu")[0];
        slideMenu.style.height = window.innerHeight+"px";
}
function generateNewEmptyRow(){
  var row = document.createElement('div');
  row.setAttribute('class','new_row');
  getByClass("grid")[0].appendChild(row);
  for(var i=0; i< 8; i++){
    var cell = document.createElement('div');
    cell.setAttribute("class", "new_cell");
    row.appendChild(cell);
  }
}
function inundatDataNewRow(da_ta){
  var row = document.createElement('div');
  row.setAttribute('class','new_row');
  getByClass("grid")[0].appendChild(row);
  for(var i=0; i< 8; i++){
    var cell = document.createElement('div');
    cell.setAttribute("class", "new_cell");
    cell.textContent = da_ta[i];
    row.appendChild(cell);
  } 
}
function inundateRequestOrder(da_ta){
  var row = document.createElement('div');
  row.setAttribute('class','new_row');
  getByClass("grid")[0].appendChild(row);
  for(var i=0; i< 7; i++){
    var cell = document.createElement('div');
    cell.setAttribute("class", "new_cell");
    cell.textContent = da_ta[i];
    row.appendChild(cell);
  }
  var cell = document.createElement('div');
  cell.setAttribute("class", "new_cell");
  var order_btn = document.createElement('BUTTON');
  order_btn.setAttribute("class", "rqst_btn_ord");
  order_btn.textContent = "Place Order";
  cell.appendChild(order_btn);
  row.appendChild(cell); 
}
function setEditabelFalse(){
  for(var i=0; i< getByClass("new_cell").length; i++){
      getByClass("new_cell")[i].contentEditable = "false";
  }
}
function removeChildElements(parentClass, childClass){
  for (var i = 0; i < getByClass(childClass).length; i++) {
      getByClass(parentClass)[0].removeChild(getByClass(childClass)[i]);
  }
}
var isEditable = false;
function contenteditable(e){
  var e = e || window.event;
  var target = e.target || e.srcElement;
  setEditabelFalse();
  if (target.className.match("edit")) {
      isEditable = true;
  }
  if (target.className.match("save")) {
     isEditable = false;
     setEditabelFalse();
     current_target.contentEditable = "false"; 
     getByClass("grid")[0].contentEditable = "false";
  }

}
var current_target;
function generalHandler(e){
  var e = e || window.event;
  var target = e.target || e.srcElement;
  setEditabelFalse();
  getByClass("grid")[0].contentEditable = "false";
  if (target.className.match("new_cell") && isEditable) {
      current_target = target;
      target.contentEditable = "true";
  }
  if (target.className.match("rqst_btn_ord")) {
      getByClass("order_form")[0].style.display = "block", getByClass("order_form")[0].style.width = "40%",getByClass("order_form")[0].style.height = "400px",getByClass("order_form")[0].style.height = "400px";
      getByClass("order_form")[0].style.boxShadow = "3px 3px 5px 6px #ccc"
      document.body.style.zIndex = "10";
      var par = target.parentNode.parentNode;
      getByClass("LA")[0].textContent = "Local Agent : " + par.getElementsByClassName("new_cell")[0].textContent;
      getByClass("to_from")[0].textContent = par.getElementsByClassName("new_cell")[1].textContent + " to " + par.getElementsByClassName("new_cell")[2].textContent;
      getByClass("order_size")[0].textContent = par.getElementsByClassName("new_cell")[3].textContent;
  }
  if (target.className.match("book")) {
      
  }
  if (target.className.match("deny")) {
      getByClass("order_form")[0].style.display =  "none";
  }
}
var addEvent = function(elem, type, eventHandle){
  if (elem == null || typeof(elem) == 'undefined') return;
  if ( elem.addEventListener ) {
    elem.addEventListener( type, eventHandle, false );
  } 
  else if ( elem.attachEvent ) {
    elem.attachEvent( "on" + type, eventHandle );
  } 
  else {
    elem["on"+type]=eventHandle;
  }
}
//////////////////////////////////////////////////////////////////////////
window.onload = ExpandMenuHeight;
addEvent(window,"resize", ExpandMenuHeight);
addEvent(getByClass("create_new_row")[0],"click", generateNewEmptyRow);
addEvent(getByClass("edit")[0],"click", contenteditable);
addEvent(getByClass("save")[0],"click", contenteditable);
addEvent(document.body,"click", generalHandler);
/////////////////////////////////////////////////////////////////////////
function fetch_requestOrder(){

  Parse.Cloud.run('GetOrderRequestedToMe', {}, {
    success: function(results) {
      if (results.length!=0) {
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].get("BookerId")), data.push(results[i].get("StartLocation").latitude+" , " +results[i].get("StartLocation").longitude), data.push(results[i].get("EndLocationLong")+" , " +results[i].get("EndLocationLat"));  
          data.push(results[i].get("Tons"));
          data.push(results[i].get("StartTime"));
          data.push(""),data.push(""),data.push("");
          removeChildElements("grid", "new_row");
          inundateRequestOrder(data);
        }
      }
    },
    error: function(error) {
      alert('Error: '+error.code+error.message);
    }
  });
}
function fetch_ongoingOrder(){
  Parse.Cloud.run('GetMyOrderInfo', {"OrderDone":false}, {
    success: function(results) {
      if (results.length!=0) {
        // alert(results[0].get("Tons"));
        for (var i = 0; i < results.length; i++) {
          var data = [];
          if(results[i].get("OrderType")) data.push("Client");
          else{data.push("Local Agent");} 
          data.push(results[i].get("StartLocation").latitude+" , " +results[i].get("StartLocation").longitude+' -- '+results[i].get("EndLocationLong")+" , " +results[i].get("EndLocationLat"));  
          data.push(results[i].get("Tons")), data.push(results[i].get("TonDone")), data.push(results[i].get("DeadLine"));
          data.push(results[i].get("WaitTime"));
          data.push(""),data.push("");
          removeChildElements("grid", "new_row");
          inundatDataNewRow(data);
          // results[i].get("StartTime");
          // results[i].get("BookerId");
          // results[i].get("DstKamId");
        }
      }
    },
    error: function(error) {
      alert('err'+error.code+error.message);
    }
  });
}
function fetch_orderHistory(){

  Parse.Cloud.run('GetMyOrderInfo', {"OrderDone":true}, {
    success: function(results) {
      if (results.length!=0) {
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].id);
          if(results[i].get("OrderType")) data.push("Client");
          else{data.push("Local Agent");} 
          data.push(results[i].get("StartLocation").latitude+" , " +results[i].get("StartLocation").longitude+' -- '+results[i].get("EndLocationLong")+" , " +results[i].get("EndLocationLat"));
          data.push("NA");
          data.push(results[i].get("Tons")), data.push(results[i].get("WaitTime"));
          data.push(""),data.push("");
          removeChildElements("grid", "new_row");
          inundatDataNewRow(data);
        }
      }
      if (results.length==0) {alert("Empty Data")};
    },
    error: function(error) {
      alert('Error: '+error.code+error.message);
    }
  });
}
function fetch_assignedTrip(){
  Parse.Cloud.run('GetMyAssignedTrips', {}, {
    success: function(results) {
      if (results.length!=0) {
        // alert(results[0].get("Tons"));
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].id); // Trip Id
          //data.push(results[i].get("GpsId"));
          data.push(results[i].get("OrderId"));
          data.push(results[i].get("StartTime"));
          data.push(results[i].get("StartLocation").latitude+" , " +results[i].get("StartLocation").longitude+' -- '+results[i].get("EndLocationLong")+" , " +results[i].get("EndLocationLat"));
          data.push(results[i].get("SalesId"));
          data.push(results[i].get("KamId"));
          data.push(""),data.push("");
          removeChildElements("grid", "new_row");
          inundatDataNewRow(data);
        }
      }
      if (results.length==0) {alert("Empty Data")};
    },
    error: function(error) {
      alert('err'+error.code+error.message);
    }
  }); 
}
function fetch_ongoingTrip(){
  Parse.Cloud.run('GetMyOnGoingTrips', {}, {
    success: function(results) {
      if (results.length!=0) {
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].id);
          data.push(results[i].get("OrderId")), data.push(results[i].get("SalesId"));
          if(results[i].get("OrderType")) data.push("Client");
          else{data.push("Local Agent");}
          data.push("NA"); // Truck Number
          data.push("NA"); // Current Position
          data.push("NA"); // Expected End Time
          data.push(results[i].get("StartLocation").latitude+" , " +results[i].get("StartLocation").longitude+' -- '+results[i].get("EndLocationLong")+" , " +results[i].get("EndLocationLat"));
          removeChildElements("grid", "new_row");
          inundatDataNewRow(data);
        }
      }
      if (results.length==0) {alert("Empty Data")};
    },
    error: function(error) {
      alert('err'+error.code+error.message);
    }
  }); 
}