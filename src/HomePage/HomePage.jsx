import React, { Component } from 'react';
import { myPDFcrawler } from '../_services';
import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
        <div>
          <div className="pufferBox"></div>
          <div className="welcomeTextDIV">
              <h1>Willkommen beim Rechtsfuchs</h1>
              <p className="infotext">Die Webseite bietet dir einen vereinfachten Zugang zum österreichischen Bundes- und Landesrecht sowie zur Rechtsprechung. Du kannst einzelne Suchergebnisse in eigenen Projekt-Ordnern speichern.</p>
          </div>
          <img src="./logo.svg" alt="" className="homePageLogo" />
          <a href="#" onClick={this.parsePDF}>Test PDF Parse</a>
        </div>
    );
  }

  parsePDF() {
    myPDFcrawler.fetchPdfAsText('./test.pdf');
  }
}

export { HomePage };