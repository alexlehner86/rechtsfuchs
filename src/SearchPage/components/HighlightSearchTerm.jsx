import React, { Component } from 'react';
import { myHTMLcrawler } from '../../_services/htmlCrawler.service';

export class HighlightSearchTerm extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      textBeforeSearchTerm: '...',
      highlightedSearchTerm: '',
      textAfterSearchTerm: ''
    }
  }
  
  render() {
    return (
      <p className="highlightSearchTerm">
        { this.state.textBeforeSearchTerm }
        <span style={{backgroundColor: 'lightblue', fontWeight: 'bold'}}>{ this.state.highlightedSearchTerm }</span>
        { this.state.textAfterSearchTerm }
      </p>
    );
  }

  componentDidMount() {
    myHTMLcrawler.fetchPageFromUrl(this.props.urlToCrawl)
    .then(response => {
      const text = myHTMLcrawler.findAndHighlightSearchTerm(response, this.props.searchTerm);
      this.setState({...text});
    });
  }
}
