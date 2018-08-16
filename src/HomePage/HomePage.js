import React, { Component } from 'react';
import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
        <div>
          <div className="pufferBox"></div>
          <div className="homepageDIV">
            <div className="homepageDIVchild">
              <h1>Willkommen beim Rechtsfuchs</h1>
              <p className="infotext">Die Webseite bietet einen vereinfachten Zugang zum österreichischen Bundes- und Landesrecht sowie zur Rechtsprechung, mit Fokus auf das Finanzrecht (über vordefinierte Suchwort-Vorschläge in der Suchmaske).</p>
            </div>
          </div>
        </div>
    );
  }
}

export { HomePage };