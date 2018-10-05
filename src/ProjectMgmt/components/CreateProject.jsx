import React from 'react';
import { connect } from 'react-redux';
import { FormInputFieldObligatory, FormTextareaOptional, ShowInProgressAnimation } from '../../UserMgmt/components';
import { projectActions, alertActionsProjectMgmt } from '../../_actions';

class CreateProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {
                projectTitle: '',
                description: '',
                username: this.props.user.username
            },
            submitted: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    render() {
        const { creatingProject  } = this.props;
        const { submitted } = this.state;
        const { projectTitle, description } = this.state.project;

        return (
            <div className="col-md-auto">
                <h2>Neues Projekt anlegen</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormInputFieldObligatory inputObject={{projectTitle}} inputType="text" submitted={submitted} label="Projekttitel" handleChange={this.handleChange} />
                    <FormTextareaOptional inputObject={{description}} label="Beschreibung" handleChange={this.handleChange} />

                    {creatingProject && <ShowInProgressAnimation /> }
                    {!creatingProject && (
                     <div className="form-group">
                      <button className="btn btn-primary" type="submit">Anlegen</button>
                      <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                     </div>
                    )}
                </form>
            </div>
        );
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { project } = this.state;

        this.setState({ submitted: true });

        if (project.projectTitle) {
            if (project.description === '') project.description = '–';
            dispatch(projectActions.create(project));
        }
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        dispatch(alertActionsProjectMgmt.clearAndOverlayChange("Clear"));
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { creatingProject } = state.projects;
    return {
        creatingProject,
        user
    };
}

const connectedCreateProjectPage = connect(mapStateToProps)(CreateProject);
export { connectedCreateProjectPage as CreateProject };