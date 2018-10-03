import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions, projectDocActions } from '../../_actions';
import { ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class ProjectListGroupItem extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    const { project, key, isSelected } = this.props;
    const numberOfDocsText = this.getNumberOfDocsText(project.numberOfDocs);

    if (isSelected) {
      return (
        <ListGroupItem key={key} id={project.id} header={project.projectTitle} active>
          <span className="descriptionTextSelected">{project.description}</span><br />
          <span className="erstelltAmTextSelected">(erstellt am { moment(project.createdDate).format("DD.MM.YYYY") }, {numberOfDocsText})</span>
        </ListGroupItem>
      );
    } else {
      return (
        <ListGroupItem key={key} id={project.id} header={project.projectTitle} onClick={this.handleSelect}>
          <span className="descriptionText">{project.description}</span><br />
          <span className="erstelltAmText">(erstellt am { moment(project.createdDate).format("DD.MM.YYYY") }, {numberOfDocsText})</span>
        </ListGroupItem>
      );
    }
  }

  getNumberOfDocsText(numberOfDocs) {
    if (numberOfDocs === 1) {
      return '1 Dokument';
    } else {
      return `${numberOfDocs} Dokumente`;
    }
  }

  handleSelect(e) {
    const { dispatch } = this.props;
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;

    // if click-event was triggered by a child element of the button, climb up DOM to button that stores the correct id
    while (eventTarget.getAttribute('type') !== 'button') {
      eventTarget = eventTarget.parentElement;
    }

    dispatch(projectActions.selectProject(eventTarget.id));
    dispatch(projectDocActions.getAllByProjectId(eventTarget.id));

    //Zum Anfang des ProjectDocuments-Elements scrollen, mit 0.5 Sekunden Verzögerung
    setTimeout(() => {
      document.getElementById('Documents-List').scrollIntoView(true);
    }, 500);
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedDeleteDocButton = connect(mapStateToProps)(ProjectListGroupItem);
export { connectedDeleteDocButton as ProjectListGroupItem };