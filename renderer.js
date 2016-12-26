window.onresize = doLayout;
let webview = document.querySelector('webview');
onload = function() {
  doLayout();
}

webview.addEventListener('dom-ready', function() {
  // webview.executeJavaScript('test("exe")', false, function() {
  //   console.log('webview');
  // });
  // webview.executeJavaScript('document.getElementById("clickBtn").value="test"');
});

webview.addEventListener('console-message', (e) => {
  console.log('Guest page message:', e.message);
  if(e.message == 'click') {
    webview.executeJavaScript('testBack("callback")');
  }
});

function doLayout() {
  var webview = document.querySelector('webview');
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
}
