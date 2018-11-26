import $ from 'jquery';

export const myHTMLcrawler = { getPage };

const itemsToKeep = [
    'Text',
    'Leitsatz',
    'Rechtssatz'
];

function getPage(urlToCrawl) {
    const url = "http://allorigins.me/get?url=" + encodeURIComponent(urlToCrawl) + "&callback=?";
  
    $.ajax({
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
        url: url,
        success: success
    });
}

function success(response){
    const parsedToHtmlNodes = $.parseHTML(response.contents);
    const lastNodeIndex = parsedToHtmlNodes.length - 1;
    document.getElementById('show-results').innerHTML = getRelevantContentAsText(parsedToHtmlNodes[lastNodeIndex]);
}

function getRelevantContentAsText(htmlNode) {
    let contentText = '';
    let foundRelevantContent = false;

    for (let child of htmlNode.children) {
        if (foundRelevantContent) {
            contentText += '<br>' + child.innerText;
        } else {
            if (itemsToKeep.includes(child.innerText)) {
                foundRelevantContent = true;
                contentText += '<br>' + child.innerText;
            } else {
                contentText += getRelevantContentAsText(child);
            }       
        }
    }
    return contentText;
}