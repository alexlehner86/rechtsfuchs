import React from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsProjectMgmt } from '../../_actions';

class CreateProjectPage extends React.Component {
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
            dispatch(projectActions.create(project));
        }
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange("Clear"));
    }

    render() {
        const { creatingProject  } = this.props;
        const { project, submitted } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Neues Projekt anlegen</h2>
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
                    {creatingProject && (
                      <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                      </div>
                    )}
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
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { creatingProject } = state.projects;
    return {
        creatingProject,
        user
    };
}

const connectedCreateProjectPage = connect(mapStateToProps)(CreateProjectPage);
export { connectedCreateProjectPage as CreateProjectPage };