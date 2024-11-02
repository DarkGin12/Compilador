function compile() {

    var inputHtml = document.getElementById("htmlInput").value;
    var parser = new DOMParser();
    var doc = parser.parseFromString(inputHtml, "text/html");
    
    var titleContent = doc.title;

    var resultContent = "";

// Função para substituir quebras de linha por <br> somente quando a tag <br> estiver presente no output
function replaceNewlinesWithBr(text) {
if (text.includes('<br>')) {
return text.replace(/\n/g, "<br>");
}
return text;
}

// Verifica as tags <span>
var spans = doc.getElementsByTagName("span");
for (var i = 0; i < spans.length; i++) {
var content = spans[i].innerHTML;
resultContent += "<span>" + replaceNewlinesWithBr(content) + "</span>";
}

if (titleContent) {
resultContent +=  titleContent;
}

// Verifica as tags de cabeçalho <h1> até <h6>
for (var i = 1; i <= 6; i++) {
var headings = doc.getElementsByTagName("h");
for (var j = 0; j < headings.length; j++) {
    var content = headings[j].textContent.trim();
    if (content) {
        var fontSize = 24 - (i - 1) * 2;
        resultContent += "<p style='font-size: " + fontSize + "px;'><strong>" + replaceNewlinesWithBr(content) + "</strong></p>";
    }
}
}

// Verifica as tags <video> com propriedade src, id e source
var videos = doc.getElementsByTagName("video");
for (var i = 0; i < videos.length; i++) {
var src = videos[i].getAttribute("src");
var id = videos[i].getAttribute("id");
var sources = videos[i].getElementsByTagName("source");

var sourceTags = "";
for (var j = 0; j < sources.length; j++) {
var sourceSrc = sources[j].getAttribute("src");
var sourceType = sources[j].getAttribute("type");
sourceTags += "<source src='" + sourceSrc + "' type='" + sourceType + "'>";
}

if (src) {
resultContent += "<video id='" + id + "' controls>" + sourceTags + "</video>";
}
}


// Cria um objeto para controlar as imagens já processadas
var processedImages = {};

// Verifica as tags <img> com atributos alt, width, height e title
var images = doc.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
var src = images[i].getAttribute("src");
var alt = images[i].getAttribute("alt");
var width = images[i].getAttribute("width");
var height = images[i].getAttribute("height");
var title = images[i].getAttribute("title");

var imageKey = src + alt + width + height + title;

if (processedImages[imageKey]) {
processedImages[imageKey] = false; 

if (alt && width && height && title) {
    resultContent += "<p class='tooltip'><img src='" + src + "' alt='" + alt + "' width='" + width + "' height='" + height + "' title='" + title + "'>";
    resultContent += "<span class='tooltiptext'>" + alt + "</span></p>";
} else if (alt) {
    resultContent += "<img src='" + src + "' alt='" + alt + "'>";
} else {
    resultContent += "<img src='" + src + "'>";
}
}
}

var pictureElements = doc.getElementsByTagName("picture");
for (var i = 0; i < pictureElements.length; i++) {
var sources = pictureElements[i].getElementsByTagName("source");
var img = pictureElements[i].getElementsByTagName("img")[0];

var alt = img.getAttribute("alt");
var style = img.getAttribute("style");

var srcSet = "";
for (var j = 0; j < sources.length; j++) {
    var sourceSrcset = sources[j].getAttribute("srcset");
    var sourceMedia = sources[j].getAttribute("media");
    srcSet += sourceSrcset + " " + sourceMedia + ",";
}
srcSet = srcSet.slice(0, -1);

var imgSrc = img.getAttribute("src");

if (imgSrc && !processedImages[imgSrc]) {
    processedImages[imgSrc] = true;
    resultContent += "<picture>";
    resultContent += "<source srcset='" + srcSet + "' media='" + sourceMedia + "'>";
    resultContent += "<img src='" + imgSrc + "' alt='" + alt + "' style='" + style + "'>";
    resultContent += "</picture>";
}
}

var paragraphs = doc.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
 var content = paragraphs[i].innerHTML.split(">")[1];
     if (content) {
            resultContent += "<p>" + content + "</p>";
        } 
    }

var styles = doc.getElementsByTagName("style");
for (var i = 0; i < styles.length; i++) {
var styleContent = styles[i].innerHTML;
resultContent += "<style>" + styleContent + "</style>";
}            

var metaframeSrcs = [];
var metaframes = doc.getElementsByTagName("metaframe");
for (var i = 0; i < metaframes.length; i++) {
var src = metaframes[i].getAttribute("src");
if (src && !metaframeSrcs.includes(src)) {
metaframeSrcs.push(src);
var metaframeClass = metaframes[i].getAttribute("class");
resultContent += "<metaframe src='" + src + "'" + (metaframeClass ? " class='" + metaframeClass + "'" : "") + "></metaframe>";
}
}

var scripts = doc.getElementsByTagName("script");
for (var i = 0; i < scripts.length; i++) {
var src = scripts[i].getAttribute("src");
var type = scripts[i].getAttribute("type");
if (src && type) {
   fetch(src)
       .then(response => response.text())
       .then(scriptContent => {
           if (type === "text/javascript") {
               var scriptElement = document.createElement("script");
               scriptElement.innerHTML = scriptContent;
               document.body.appendChild(scriptElement);
           }
       });
}
}

var divs = doc.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
var content = divs[i].innerHTML;
resultContent += "<div>" + replaceNewlinesWithBr(content) + "</div>";
}

var ulList = doc.getElementsByTagName("ul");
for (var i = 0; i < ulList.length; i++) {
var liItems = ulList[i].getElementsByTagName("li");
resultContent += "<ul>";
for (var j = 0; j < liItems.length; j++) {
    var content = liItems[j].innerHTML;
    resultContent += "<li>" + replaceNewlinesWithBr(content) + "</li>";
}
resultContent += "</ul>";
}

var olList = doc.getElementsByTagName("ol");
for (var i = 0; i < olList.length; i++) {
var liItems = olList[i].getElementsByTagName("li");
resultContent += "<ol>";
for (var j = 0; j < liItems.length; j++) {
    var content = liItems[j].innerHTML;
    resultContent += "<li>" + replaceNewlinesWithBr(content) + "</li>";
}
resultContent += "</ol>";
}

var dlList = doc.getElementsByTagName("dl");
for (var i = 0; i < dlList.length; i++) {
var dtItems = dlList[i].querySelectorAll("dt");
var ddItems = dlList[i].querySelectorAll("dd");
resultContent += "<dl>";
for (var j = 0; j < dtItems.length; j++) {
    var dtContent = dtItems[j].innerHTML;
    resultContent += "<dt>" + replaceNewlinesWithBr(dtContent) + "</dt>";
    if (j < ddItems.length) {
        var ddContent = ddItems[j].innerHTML;
        resultContent += "<dd>" + replaceNewlinesWithBr(ddContent) + "</dd>";
    }
}
resultContent += "</dl>";
}

var anchors = doc.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
var href = anchors[i].getAttribute("href");
var target = anchors[i].getAttribute("target");
var content = anchors[i].innerHTML;

if (href) {
    resultContent += "<p><a href='" + href + "' target='" + target + "'>" + replaceNewlinesWithBr(content) + "</a></p>";
}
}


function processFormattingAndInputTags(text) {
return text.replace(/<b>(.*?)<\/b>/g, "<strong>$1</strong>")
           .replace(/<i>(.*?)<\/i>/g, "<em>$1</em>")
           .replace(/<sup>(.*?)<\/sup>/g, "<sup>$1</sup>")
           .replace(/<sub>(.*?)<\/sub>/g, "<sub>$1</sub>")
           .replace(/<button(.*?)>(.*?)<\/button>/g, buttonFunction)
           .replace(/<select(.*?)>(.*?)<\/select>/g, selectFunction)
           .replace(/<input(.*?)>/g, "<input$1>")
           .replace(/<option(.*?)>(.*?)<\/option>/g, optionFunction);
}

function buttonFunction(match, attributes, content) {
return "<button" + attributes + ">" + content + "</button>";
}

function selectFunction(match, attributes, content) {
var processedOptions = content.replace(/<option(.*?)>(.*?)<\/option>/g, optionFunction);
return "<select" + attributes + ">" + processedOptions + "</select>";
}

function optionFunction(match, attributes, content) {
return "<option" + attributes + ">" + content + "</option>";
}

// Verifica as tags <table>
var tables = doc.getElementsByTagName("table");
for (var i = 0; i < tables.length; i++) {
var table = tables[i];
var caption = table.querySelector("caption");
var thead = table.querySelector("thead");
var tbody = table.querySelector("tbody");
var tfoot = table.querySelector("tfoot");

resultContent += "<table>";

if (caption) {
    var captionContent = caption.innerHTML;
    resultContent += "<caption>" + replaceNewlinesWithBr(captionContent) + "</caption>";
}

if (thead) {
    var theadContent = thead.innerHTML;
    resultContent += "<thead>" + replaceNewlinesWithBr(theadContent) + "</thead>";
}

if (tbody) {
    var tbodyContent = tbody.innerHTML;
    resultContent += "<tbody>" + replaceNewlinesWithBr(tbodyContent) + "</tbody>";
}

if (tfoot) {
    var tfootContent = tfoot.innerHTML;
    resultContent += "<tfoot>" + replaceNewlinesWithBr(tfootContent) + "</tfoot>";
}

resultContent += "</table>";
}

document.getElementById("outputDiv").innerHTML = resultContent + processFormattingAndInputTags(replaceNewlinesWithBr(inputHtml));;
}