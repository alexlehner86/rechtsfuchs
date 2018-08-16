import React from 'react';
import { connect } from 'react-redux';
import { userActions, alertActionsUserMgmt } from '../../_actions';

class LoginPage extends React.Component {
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

        //pass 'Clear' or 'Register' to Redux-Store to...
        //exit the login window or show register window
        dispatch(alertActionsUserMgmt.clearAndOverlayChange(e.target.id));
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Nutzername</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Bitte Nutzernamen eingeben</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Passwort</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Bitte Passwort eingeben</div>
                        }
                    </div>
                    {loggingIn && (
                      <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                     </div>
                    )}
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
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 