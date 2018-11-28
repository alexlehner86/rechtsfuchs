import $ from 'jquery';

export const myHTMLcrawler = { fetchPageFromUrl, findAndHighlightSearchTerm };

const itemsToKeep = [
    'Text',
    'Leitsatz',
    'Rechtssatz',
    'Spruch',
    'Begründung',
    'Ratifikationstext',
    'Präambel',
    'Präambel/Promulgationsklausel'
];
const charBuffer = 150;

function fetchPageFromUrl(urlToCrawl) {
    const url = "https://allorigins.me/get?url=" + encodeURIComponent(urlToCrawl) + "&callback=?";
  
    return $.ajax({
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
        url: url,
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log('Error in AJAX-Call: ' + errorThrown);
        }
    });
}

function findAndHighlightSearchTerm(response, searchTerm){
    const textObject = {
        textBeforeSearchTerm: '',
        highlightedSearchTerm: '',
        textAfterSearchTerm: ''
    };
    const parsedToHtmlNodes = $.parseHTML(response.contents);
    let indexOfContentNode = -1;
    // find node with class 'paperw' which holds the content text
    for (let i = 0; i < parsedToHtmlNodes.length; i++) {
        if (parsedToHtmlNodes[i].className === 'paperw') {
            indexOfContentNode = i;
            break;
        }
    }
    // if no node with the content text was found, return default textObject
    if (indexOfContentNode === -1) {
        console.log('Error: Crawled html page does not contain "paperw" content element!');
        return textObject;
    }
    const relevantTextArray = getRelevantContentAsText(parsedToHtmlNodes[indexOfContentNode]);
    
    let index = -1;
    let textSnippet = '';
    for (let text of relevantTextArray) {
        const lowercaseText = text.toLowerCase();
        index = lowercaseText.indexOf(searchTerm.toLowerCase());
        if (index > -1) {
            textSnippet = text;
            break;
        }
    }

    if (index > -1) {
        let startDots = '...';
        let endDots = '...';
        let startIndex = index - charBuffer;
        if (startIndex < 0) {
            startDots = '';
            startIndex = 0;
        }
        let endIndex = index + searchTerm.length + charBuffer; 
        if (endIndex >= textSnippet.length) {
            endDots = '';
            endIndex = textSnippet.length - 1;
        }
        textObject.textBeforeSearchTerm = startDots + textSnippet.substring(startIndex, index);
        textObject.highlightedSearchTerm = textSnippet.substring(index, index + searchTerm.length);
        textObject.textAfterSearchTerm = textSnippet.substring(index + searchTerm.length, endIndex + 1) + endDots;
    } 
    return textObject;
}

function getRelevantContentAsText(htmlNode) {
    let relevantTextArray = [];
    let foundRelevantContent = false;

    if (htmlNode.children) {
        for (let child of htmlNode.children) {
            if (foundRelevantContent) {
                // add relevant text paragraph to text array
                relevantTextArray.push(child.innerText);
            } else {
                if (itemsToKeep.includes(child.innerText)) {
                    // found relevant title e.g. "Text" or "Leitsatz", therefore the 
                    // following siblings of this child contain relevant text paragraphs
                    foundRelevantContent = true;
                } else {
                    const childrenContent = getRelevantContentAsText(child);
                    if (childrenContent.length > 0) {
                        relevantTextArray.push(...childrenContent);
                    }
                }       
            }
        }
    }
    return relevantTextArray;
}