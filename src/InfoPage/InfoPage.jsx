import React, { Component } from 'react';

class InfoPage extends Component {
  render() {
    return (
        <div>
          <div className="pufferBox"></div>
          <h1>Infos zur Webseite</h1>
          <ul className="infoliste">
            <li>App-Name: Rechtsfuchs</li>
            <li>Version: v1.1.0</li>
            <li>Autor: <a href="https://github.com/alexlehner86" target="_blank" rel="noopener noreferrer">Alexander Lehner</a> (Wien, Österreich)</li>
            <li><span className="makeBold">Warum diese Webseite?</span><br />
                Ich wollte das React-Redux-Framework testen und gleichzeitig eine sinnvolle Anwendung programmieren. Die Webseite bietet einen vereinfachten Zugang zum österreichischen Bundes- und Landesrecht sowie zur Rechtsprechung, mit Fokus auf das Finanzrecht (über Suchwort-Vorschläge). Die Webseite nutzt die APIs des österreichischen Rechtsinformationssystems des Bundes (<a href="https://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer">RIS</a>). Suchergebnisse können in eigenen Projekt-Ordnern verwaltet werden.</li>
            <li>Vielen Dank an <a href="http://jasonwatmore.com/" target="_blank" rel="noopener noreferrer">Jason Watmore</a>, dessen Tutorial-Projekte zu <a href="http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example" target="_blank" rel="noopener noreferrer">React+Redux</a> und <a href="http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management" target="_blank" rel="noopener noreferrer">NodeJS+MongoDB</a> mir sehr geholfen haben.</li>
            <li>Über <a href="https://github.com/alexlehner86" target="_blank" rel="noopener noreferrer">Feedback</a> würde ich mich freuen!</li>
          </ul>
          &nbsp;
        </div>
    );
  }
}

export {InfoPage};