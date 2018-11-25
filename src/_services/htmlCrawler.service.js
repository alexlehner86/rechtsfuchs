import $ from 'jquery';

export const myHTMLcrawler = { getPage };

function getPage(urlToCrawl) {
    const url = "http://allorigins.me/get?url=" + encodeURIComponent(urlToCrawl) + "&callback=?";
  
    $.ajax({
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
        url: url,
        success: success
    });
}

function success(data){
    const parsedToHtml = $.parseHTML(data.contents);
    console.log(parsedToHtml);
    document.getElementById('show-results').innerHTML = parsedToHtml[12].children[7].innerHTML;
}