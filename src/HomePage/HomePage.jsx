import React, { Component } from 'react';
import { myHTMLcrawler } from '../_services';
import './HomePage.css';

class HomePage extends Component {

  constructor() {
    super();

    this.parseHtmlPage = this.parseHtmlPage.bind(this);
  }
  render() {
    return (
      <div>
        <div className="pufferBox"></div>
        <div className="welcomeTextDIV">
          <h1>Willkommen beim Rechtsfuchs</h1>
          <p className="infotext">Die Webseite bietet dir einen vereinfachten Zugang zum österreichischen Bundes- und Landesrecht sowie zur Rechtsprechung. Du kannst einzelne Suchergebnisse in eigenen Projekt-Ordnern speichern.</p>
        </div>
        <img src="./logo.svg" alt="" className="homePageLogo" />
        <a onClick={this.parseHtmlPage}>Test PDF Parse</a>
      <div id="show-results" style={{width: 300, height: 300, backgroundColor: 'white', margin: 'auto', padding: 10, overflow: 'scroll'}}></div>
      </div>
    );
  }

  parseHtmlPage() {
    myHTMLcrawler.getPage('https://www.ris.bka.gv.at/Dokumente/Vfgh/JFR_20181010_17E04248_01/JFR_20181010_17E04248_01.html');
  }
}

export { HomePage };