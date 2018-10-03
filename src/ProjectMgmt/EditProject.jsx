import React from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsProjectMgmt } from '../_actions';

class EditProject extends React.Component {
    constructor(props) {
        super(props);

        const { listOfRIS_Projects, selectedProjectID } = this.props;
        this.state = {
            project: listOfRIS_Projects.getProjectById(selectedProjectID),
            submitted: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    render() {
        const { editingProject } = this.props;
        const { project, submitted } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Projekt bearbeiten</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !project.projectTitle ? ' has-error' : '')}>
                        <label htmlFor="projectTitle">Projekttitel</label>
                        <input type="text" className="form-control" name="projectTitle" value={project.projectTitle} onChange={this.handleChange} />
                        {submitted && !project.projectTitle &&
                            <div className="help-block">Bitte Projekttitel eingeben</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Beschreibung</label>
                        <textarea name="description" className="form-control" rows="5" style={{resize: 'none'}}
                         value={project.description} onChange={this.handleChange} />
                    </div>
                    {editingProject && (
                      <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                      </div>
                    )}
                    {!editingProject && (
                     <div className="form-group">
                      <button className="btn btn-primary" type="submit">Speichern</button>
                      <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                     </div>
                    )}
                </form>
            </div>
        );
    }

    // save changes in the form to the component's state
    handleChange(event) {
        const { name, value } = event.target;
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { dispatch } = this.props;
        const { project } = this.state;

        // only save the project in the database, if a project title is set
        if (project.projectTitle) {
            if (project.description === '') project.description = '–';
            dispatch(projectActions.update(project));
        }
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange("Clear"));
    }
}

function mapStateToProps(state) {
    const { listOfRIS_Projects, selectedProjectID, editingProject } = state.projects;
    return {
        listOfRIS_Projects,
        selectedProjectID,
        editingProject
    };
}

const connectedEditProjectPage = connect(mapStateToProps)(EditProject);
export { connectedEditProjectPage as EditProject };