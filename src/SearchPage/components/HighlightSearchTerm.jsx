import React, { Component } from 'react';
import { myHTMLcrawler } from '../../_services/htmlCrawler.service';

export class HighlightSearchTerm extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      textBeforeSearchTerm: 'Suche im Dokument läuft...',
      highlightedSearchTerm: '',
      textAfterSearchTerm: ''
    }
  }
  
  render() {
    return (
      <p className="highlightSearchTermContainer">
        { this.state.textBeforeSearchTerm }
        <span className="highlightSearchTerm">{ this.state.highlightedSearchTerm }</span>
        { this.state.textAfterSearchTerm }
      </p>
    );
  }

  componentDidMount() {
    myHTMLcrawler.fetchPageFromUrl(this.props.urlToCrawl)
    .then(response => {
      if (response.status.error) {
        console.log('Error in AJAX-Call:', response.status.error);
      } else {
        const text = myHTMLcrawler.findAndHighlightSearchTerm(response, this.props.searchTerm);
        this.setState({...text});
      }
    });
  }
}
