import React, { Component } from 'react';

class InfoPage extends Component {
  render() {
    return (
        <div>
          <div className="pufferBox"></div>
          <h1>Informationen zur Webseite</h1>
          <ul className="infoliste">
            <li><span className="makeBold">App-Name:</span> Rechtsfuchs</li>
            <li><span className="makeBold">Version:</span> 1.3.7</li>
            <li><span className="makeBold">Autor:</span> <a href="https://github.com/alexlehner86" target="_blank" rel="noopener noreferrer">Alexander Lehner</a> (Wien, Österreich)</li>
            <li><span className="makeBold">Warum diese Webseite?</span><br />
                Der Rechtsfuchs bietet einen vereinfachten Zugang zum österreichischen Bundes- und Landesrecht sowie zur Rechtsprechung, mit Fokus auf das Finanzrecht (über Suchwort-Vorschläge). Wichtig war mir ein Responsive Design, um auch eine komfortable Nutzung auf Smartphones und Tablets zu ermöglichen. Die Webseite nutzt die APIs des österreichischen Rechtsinformationssystems des Bundes (<a href="https://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer">RIS</a>). Suchergebnisse können in eigenen Projekt-Ordnern verwaltet werden.</li>
            <li>Vielen Dank an <a href="http://jasonwatmore.com/" target="_blank" rel="noopener noreferrer">Jason Watmore</a>, dessen Tutorial-Projekte zu <a href="http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example" target="_blank" rel="noopener noreferrer">React+Redux</a> und <a href="http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management" target="_blank" rel="noopener noreferrer">NodeJS+MongoDB</a> mir sehr geholfen haben.</li>
            <li>Über <a href="https://github.com/alexlehner86" target="_blank" rel="noopener noreferrer">Feedback</a> würde ich mich freuen!</li>
            <li>Mehr Infos zu mir findet ihr auf <a href="https://www.linkedin.com/in/a-k-lehner/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</li>
          </ul>
          &nbsp;
        </div>
    );
  }
}

export {InfoPage};