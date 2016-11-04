$(function () {
    chrome.tabs.getSelected(function (n) {
        var i = chrome.extension.getBackgroundPage().headerInfo[n.id], t, r, s, u, f, e, o;
        if (i == undefined)
            $("#result").html("<b><br />Could not retrieve any headers, try reload the tab to view the headers.<br />chrome:// pages and Chrome Store don't provide any response headers.<br /><br /><\/b>");
        else {
            for (console.log(i), t = "", r = 0, s = i.response.length; r < s; ++r) {
                for (i.request[r].requestHeaders.sort(sortHeaders), i.response[r].responseHeaders.sort(sortHeaders), t += '<table class="table table-bordered table-condensed">', t += '<tr class="' + getStyle(i.response[r].statusLine) + '"><td colspan="2">', t += "<b>" + i.request[r].method + '<\/b> <input type="text" value="' + i.response[r].url + '" /><br /> <b>Status:<\/b> ' + i.response[r].statusLine, t += "<\/td><\/tr>", t += '<tr class="warning"><td colspan="2"><div class="text-center"><b>Request Headers<\/b><\/div><\/td><\/tr>', u = 0, f = i.request[r].requestHeaders.length; u < f; ++u)
                    e = i.request[r].requestHeaders[u].name, o = i.request[r].requestHeaders[u].value, t += "<tr>", t += '<th nowrap="nowrap">' + e + "<\/th>", t += '<td><input type="text" value="' + o.replace(/"/g, "&#34;") + '" /><\/td>', t += "<\/tr>";
                for (t += '<tr class="warning"><td colspan="2"><div class="text-center"><b>Response Headers<\/b><\/div><\/td><\/tr>', u = 0, f = i.response[r].responseHeaders.length; u < f; ++u)
                    e = i.response[r].responseHeaders[u].name, o = i.response[r].responseHeaders[u].value, t += "<tr>", t += '<th nowrap="nowrap">' + e + "<\/th>", t += '<td><input type="text" value="' + o.replace(/"/g, "&#34;") + '" /><\/td>', t += "<\/tr>";
                t += "<table>"
            }
            $("#result").html(t);
            $("input[type=text]").click(function () {
                $(this).select()
            })
        }
    })

});