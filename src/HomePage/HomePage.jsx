import React, { Component } from 'react';
import { crawler } from 'crawler-request';
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
    crawler("http://careers.stackoverflow.com/stack_overflow_careers.pdf").then(function(response){
      // handle response
      console.log(response.text.lenght);
    });
  }
}

export { HomePage };