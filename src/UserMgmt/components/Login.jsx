import React from 'react';
import { connect } from 'react-redux';
import { FormInputFieldObligatory, ShowInProgressAnimation } from '.';
import { userActions, alertActionsUserMgmt } from '../../_actions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserMgmtChange = this.handleUserMgmtChange.bind(this);
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormInputFieldObligatory inputObject={{username}} inputType="text" submitted={submitted} label="Nutzername" handleChange={this.handleChange} />
                    <FormInputFieldObligatory inputObject={{password}} inputType="password" submitted={submitted} label="Passwort" handleChange={this.handleChange} />

                    {loggingIn && <ShowInProgressAnimation /> }
                    {!loggingIn && (
                      <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <button id="Clear" className="btn btn-default" type="button" onClick={this.handleUserMgmtChange}>Abbrechen</button>
                        <button id="Register" className="btn btn-link btn-sm" type="button" onClick={this.handleUserMgmtChange}>Registrieren</button>
                      </div>
                    )}
                </form>
            </div>
        );
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleUserMgmtChange(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        // pass 'Clear' or 'Register' to Redux-Store to exit the login page or show register page
        dispatch(alertActionsUserMgmt.clearAndOverlayChange(e.target.id));
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 