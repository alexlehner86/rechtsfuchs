import $ from 'jquery';

export const myHTMLcrawler = { fetchPageFromUrl, findAndHighlightSearchTerm };

const anyOriginUrl = "https://api.allorigins.ml";
const itemsToKeep = [
    'Text',
    'Leitsatz',
    'Rechtssatz',
    'Spruch',
    'Begründung',
    'Ratifikationstext',
    'Präambel',
    'Präambel/Promulgationsklausel',
    'Anmerkung',
    'Schlagworte'
];
const charBuffer = 150;

function fetchPageFromUrl(urlToCrawl) {
    const url = anyOriginUrl + "/get?url=" + encodeURIComponent(urlToCrawl) + "&callback=?";
  
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
        textBeforeSearchTerm: '(Suchworte nicht gefunden)',
        highlightedSearchTerm: '',
        textAfterSearchTerm: ''
    };

    const searchTermIsPhrase = searchTerm[0] === "'";
    if (searchTermIsPhrase) {
        searchTerm = searchTerm.slice(1, searchTerm.length - 1);
    }

    const contentNode = getContentNode(response.contents);
    // if no node with the content text was found, return default textObject
    if (!contentNode) {
        console.log('Error: Crawled html page does not contain "paperw" content element!');
        return textObject;
    }

    const relevantTextArray = getRelevantContentAsTextArray(contentNode);
    let textSnippet = getTextSnippetContainingSearchTerm(relevantTextArray, searchTerm);
    if (textSnippet.index === -1) {
        // if the search term wasn't found, then check if there are several search terms
        // (separated by ' ') and only search for the first search term
        const indexOfFirstSpaceChar = searchTerm.indexOf(' ');
        if (indexOfFirstSpaceChar > -1) {
            searchTerm = searchTerm.slice(0, indexOfFirstSpaceChar);
            textSnippet = getTextSnippetContainingSearchTerm(relevantTextArray, searchTerm);
        }
    }

    if (textSnippet.index > -1) {
        let startDots = '...';
        let endDots = '...';
        let startIndex = textSnippet.index - charBuffer;
        if (startIndex < 0) {
            startDots = '';
            startIndex = 0;
        }
        let endIndex = textSnippet.index + searchTerm.length + charBuffer; 
        if (endIndex >= textSnippet.text.length) {
            endDots = '';
            endIndex = textSnippet.text.length - 1;
        }
        textObject.textBeforeSearchTerm = startDots + textSnippet.text.substring(startIndex, textSnippet.index);
        textObject.highlightedSearchTerm = textSnippet.text.substring(textSnippet.index, textSnippet.index + searchTerm.length);
        textObject.textAfterSearchTerm = textSnippet.text.substring(textSnippet.index + searchTerm.length, endIndex + 1) + endDots;
    } 
    return textObject;
}

function getContentNode(contents) {
    // find node with class 'paperw' which holds the content text
    const parsedToHtmlNodes = $.parseHTML(contents);
    for (let i = 0; i < parsedToHtmlNodes.length; i++) {
        if (parsedToHtmlNodes[i].className === 'paperw') {
            return parsedToHtmlNodes[i];
        }
    }
    return null;
}

function getRelevantContentAsTextArray(htmlNode) {
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
                    const childrenContent = getRelevantContentAsTextArray(child);
                    if (childrenContent.length > 0) {
                        relevantTextArray.push(...childrenContent);
                    }
                }       
            }
        }
    }
    return relevantTextArray;
}

function getTextSnippetContainingSearchTerm(textArray, searchTerm) {
    const textSnippet = {
        index: -1,
        text: ''
    };
    for (let text of textArray) {
        const lowercaseText = text.toLowerCase();
        textSnippet.index = lowercaseText.indexOf(searchTerm.toLowerCase());
        if (textSnippet.index > -1) {
            textSnippet.text = text;
            return textSnippet;
        }
    }
    return textSnippet;
}