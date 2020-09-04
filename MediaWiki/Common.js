/* Any JavaScript here will be loaded for all users on every page load. */

var CurrentPageLanguage = "en";
var LanguageArray = ["en", "zh", "ja"];

function GetBrowserLanguage() {
    if (navigator.appName == "Netscape") {
        var languagetype = !!navigator.languages ? navigator.languages[0] : navigator.language;
        return languagetype.substr(0, 2);
    } else {
        return navigator.userLanguages[0].substr(0, 2);
    }
}

function GetUserLanguage() {
    var la = mw.config.get("wgUserLanguage");
    if (la != null) {
        return la.substr(0, 2);
    } else {
        return GetBrowserLanguage();
    }
}

var lang = GetUserLanguage();
if (LanguageArray.indexOf(lang) > -1) {
    CurrentPageLanguage = lang;
}

function SetAdditionalStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    var childs = styleElement.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        styleElement.removeChild(childs[i]);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

function ChangePageLanguage(code) {
    SetAdditionalStyle(".lang-" + code + "{ display: unset !important; }");
    CurrentPageLanguage = code;
}

ChangePageLanguage(CurrentPageLanguage);

/* --------------------------------------------------------------------------------- */

function ModifyToc() {
    var toc = document.getElementsByClassName("toc");
    if (toc.length != 1) {
        return;
    }
    var t = toc[0];
    t.style = "display: table !important;";
    var arr = t.getElementsByTagName("a");
    for (var i = 0; i < arr.length; i++) {
        var a = arr[i];
        var hash = a.hash;
        var head = document.getElementById(hash.substr(1));
        var text = a.getElementsByClassName("toctext")[0];
        if (head != null && text != null) {
            text.innerText = head.innerText;
        }
    }
}

ModifyToc();

/* --------------------------------------------------------------------------------- */

function HideSideBarAction() {
    document.body.classList.toggle("hide-sidebar");
}

function SetSideBar() {
    // add toggle button
    var nav = document.getElementById("mw-navigation");
    if (nav == null) {
        return;
    }
    var e = document.createElement("div");
    e.id = "mw-hidesidebarwrapper";
    e.style = "margin-left: 0px;";

    var btn = document.createElement("button");
    btn.id = "mw-hidesidebar";
    btn.onclick = HideSideBarAction;

    e.appendChild(btn);
    nav.appendChild(e);

    // set class
    var arr = document.getElementsByClassName("portal");
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        e.classList.toggle("panelpage", true);
        e.classList.toggle("body", true);
    }
}

SetSideBar();

/* --------------------------------------------------------------------------------- */

function SetIframe() {
    var frames = document.body.getElementsByClassName("iframe");
    for (var i = 0; i < frames.length; i++) {
        var frame = frames[i];
        var a = frame.getElementsByTagName("a")[0];
        if (a != null) {
            a.style = "display: none;";
            var src = a.href;
            var f = document.createElement("iframe");
            f.src = src;
            f.frameBorder = 0;
            f.style = "width: 100%; height: 100%;";
            frame.appendChild(f);
        }
    }
}

SetIframe();

/* --------------------------------------------------------------------------------- */

function SetJSButton() {
    var arr = document.body.getElementsByClassName("js-btn");
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        e.setAttribute("onclick", e.getAttribute("data-js"));
        e.removeAttribute("data-js");
        var a = e.getElementsByTagName("a")[0];
        if (a != null) {
            a.removeAttribute("href");
        }
    }
}

SetJSButton();

console.log("Common.js finished");
