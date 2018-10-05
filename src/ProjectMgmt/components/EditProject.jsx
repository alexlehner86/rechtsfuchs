import React from 'react';
import { connect } from 'react-redux';
import { FormInputFieldObligatory, FormTextareaOptional, ShowInProgressAnimation } from '../../UserMgmt/components';
import { projectActions, alertActionsProjectMgmt } from '../../_actions';

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
        const { submitted } = this.state;
        const { projectTitle, description } = this.state.project;

        return (
            <div className="col-md-auto">
                <h2>Projekt bearbeiten</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormInputFieldObligatory inputObject={{projectTitle}} inputType="text" submitted={submitted} label="Projekttitel" handleChange={this.handleChange} />
                    <FormTextareaOptional inputObject={{description}} label="Beschreibung" handleChange={this.handleChange} />

                    {editingProject && <ShowInProgressAnimation /> }
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

        if (project.projectTitle) {
            if (project.description === '') project.description = '–';
            dispatch(projectActions.update(project));
        }
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

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