// window.onresize = doLayout;

const $ = require('jquery');

var webview = document.querySelector('webview');


onload = function() {
     var loadstart = function() {
       console.log("1");
     }
     var loadstop = function() {
       console.log("2");
     }
     webview.addEventListener("did-start-loading", loadstart);
     webview.addEventListener("did-stop-loading", loadstop);
}

function doLayout() {

}
webview.addEventListener("dom-ready", function() {
  webview.openDevTools();
  var  hmp_login = $('.hmp_login');
  console.log(hmp_login);
  // hmp_login.addEventListener('click', abc);
});
var abc  = function(){

}
// $('.hmp_login').onclick = function() {
// console.log("dddddd");
// };
