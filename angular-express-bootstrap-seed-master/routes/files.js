(function(){
    var DOWNLOAD_DIR = "C:\\Users\\Work\\Desktop\\DotNetStudy\\angular-express-bootstrap-seed-master\\dropfolder\\";
    var downloadableApps = [];

    exports.getAllAppVersions = function (req, res) {
        downloadableApps = searchDirectoryForApps();
        console.log("all dirs: "+ downloadableApps);
        res.json( downloadableApps);
    };
    exports.outputIpa = function(req, res){
        if(downloadableApps.length == 0){
            downloadableApps = searchDirectoryForApps();
        }
        downloadableApps.forEach(function(app) {
            if (req.param('version') === app.versionNumber){
                var filePath = app.filePath;
                console.log("Downloading file: " + app.filePath);
                res.download(app.filePath);
                return;
            }
        });
    }

    function searchDirectoryForApps(){
        var apps = [];
        var fs = require('fs');
        var appFolders = fs.readdirSync(DOWNLOAD_DIR);
        appFolders.forEach(function(folder) {
            var stat = fs.statSync(DOWNLOAD_DIR + folder);
            if (stat && stat.isDirectory()){
                apps.push({
                    filePath: DOWNLOAD_DIR + folder + "\\" + folder + ".ipa",
                    versionNumber: folder,
                    createdDate: stat.ctime.toLocaleDateString() + ' ' + stat.ctime.toLocaleTimeString(),
                    downloadLink: "/files/app/" + folder
                });
            }
        });
        return apps;
    }
}());