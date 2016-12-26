# test
## Electron与RequireJS冲突的解决办法
Electron在运行环境中引入了Node.js，所以在DOM中有一些额外的变量，比如module、exports和 require。这导致了许多库不能正常运行,因为它们也需要将同名的变量加入运行环境中。
在引入RequireJS库之前，重命名变量（注意：Node.js的require会首先加载，需要在引入冲突的库之前重命名才有效）

    <script type="text/javascript">
        window.nodeRequire = require;
        delete window.require;
        delete window.exports;
        delete window.module;
    </script>
    <script type="text/javascript" th:src="${domainCss} + '/js/gallery/require-jquery.js'"></script>
    <script type="text/javascript" th:src="${domainCss} + '/js/gallery/require-config.js'+${staticTimeStamp}"></script>

使用重命名后的require来继续使用Node.js和Electron提供的API
nodeRequire("electron").ipcRenderer.send("quit");

禁用Node.js

    // 在主进程中
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false
      }
    });
