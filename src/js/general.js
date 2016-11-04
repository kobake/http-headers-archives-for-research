function sortHeaders(n, t) {
    var i = n.name.toLowerCase(), r = t.name.toLowerCase();
    return i < r ? -1 : i > r ? 1 : 0
}
function getStyle(n) {
    var t = "";
    return n.match(/(200|201|202|203|204|205|206|207)/g) !== null && (t = "success"), n.match(/(300|301|302|303|304|305|306|307)/g) !== null && (t = "info"), n.match(/(400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|416|417)/g) !== null && (t = "error"), n.match(/(500|501|502|503|504|505)/g) !== null && (t = "error"), t
}
function getStylePageAction(n) {
    n= n.toString();
    var t = "";
    return n.match(/(200|201|202|203|204|205|206|207)/g) !== null && (t = "#5cb85c"), n.match(/(300|301|302|303|304|305|306|307)/g) !== null && (t = "#39b3d7"), n.match(/(400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|416|417)/g) !== null && (t = "#d2322d"), n.match(/(500|501|502|503|504|505)/g) !== null && (t = "#d2322d"), t
}