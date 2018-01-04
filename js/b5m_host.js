! function(t) {
    var n = function() {
            return this || (1, eval)("this")
        },
        e = Object.prototype.hasOwnProperty,
        o = n();
    if (o.b5m && o.b5m.host) return !1;
    var c = t.split(".").reverse(),
        m = {
            stage: 1,
            prod: 1,
            b5cai: 1
        };
    o.b5m = {}, b5m.env = o._b5m_env_ || c[1], b5m.env = b5m.env in m && b5m.env || t, b5m.getHost = function(t, n) {
        return n && (new RegExp("b5cai.com$").test((window.location || document.location).hostname) || new RegExp("10.80.9.56$").test((window.location || document.location).hostname) || new RegExp("10.80.9.55$").test((window.location || document.location).hostname)) && n.match(/stage|prod/) && (n = ""), n = n || b5m.env, n in {
            stage: 1,
            prod: 1
        } && (t.indexOf(n) > -1 || (t = t.replace(/\.b5cai(cdn)?\./, ".b5cai." + n + "."))), "http" !== t.slice(0, 4) && (t = "http://" + t), t
    }, o.cdn = "b5cai" == b5m.env || "localhost:3000" == b5m.env || "stage" == b5m.env ? b5m.env in m ? "b5cai" === b5m.env ? "st.b5cai.com" : b5m.env in m ? "b5cstatic." + b5m.env + ".com" : "" : b5m.env : "st.b5cai.com", b5m.host = {
        cdn: o.cdn,
        www: "www.b5cai.com",
        b5caiapi: "b5caiapi.b5cai.com",
        c: "m.b5cai.com",
        ucenter: "http://ucenter.stage.com"
    }, b5m.getInterface = function(n, o, c) {
        b5m.env.indexOf(/localhost/) > -1 && (b5m.env = "stage");
        var a;
        if (c = c || b5m.env, !(o || c in m)) {
            for (a in n) e.call(n, a) && (n[a] = b5m.getHost(t, o, c) + n[a]);
            return n
        }
        for (a in n) b5m.host[o] && e.call(b5m.host, o) && (n[a] = b5m.getHost(b5m.host[o], c) + n[a]);
        return n
    };
    for (var a in b5m.host) e.call(b5m.host, a) && (b5m.host[a] = b5m.getHost(b5m.host[a]))
}(function() {
    try {
        return location.host
    } catch (t) {
        return "localhost"
    }
}());