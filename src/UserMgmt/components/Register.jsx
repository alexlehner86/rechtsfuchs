import React from 'react';
import { connect } from 'react-redux';
import { FormInputFieldObligatory, FormInputFieldOptional, ShowInProgressAnimation } from './';
import { userActions, alertActionsUserMgmt } from '../../_actions';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserMgmtChange = this.handleUserMgmtChange.bind(this);
    }

    render() {
        const { registering  } = this.props;
        const { submitted } = this.state;
        const { firstName, lastName, username, password } = this.state.user;
        return (
            <div className="col-md-auto">
                <h2>Nutzerkonto anlegen</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormInputFieldOptional inputObject={{firstName}} label="Vorname" handleChange={this.handleChange} />
                    <FormInputFieldOptional inputObject={{lastName}} label="Nachname" handleChange={this.handleChange} />
                    <FormInputFieldObligatory inputObject={{username}} inputType="text" submitted={submitted} label="Nutzername" handleChange={this.handleChange} />
                    <FormInputFieldObligatory inputObject={{password}} inputType="password" submitted={submitted} label="Passwort" handleChange={this.handleChange} />
                    
                    {registering && <ShowInProgressAnimation /> }
                    {!registering && (
                      <div className="form-group">
                        <button className="btn btn-primary" type="submit">Registrieren</button>                     
                        <button id="Clear" className="btn btn-default" type="button" onClick={this.handleUserMgmtChange}>Abbrechen</button>
                        <button id="Login" className="btn btn-link btn-sm" type="button" onClick={this.handleUserMgmtChange}>Login</button>
                      </div>
                    )}
                </form>
            </div>
        );
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;

        this.setState({ submitted: true });
        if (user.username && user.password) {
            const userToRegister = JSON.parse(JSON.stringify(user));
            userToRegister.firstName = user.firstName ? user.firstName : user.username;
            userToRegister.lastName = user.lastName ? user.lastName : '-';
            console.log(userToRegister);

            dispatch(userActions.register(userToRegister));
        }
    }

    handleUserMgmtChange(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        // pass 'Clear' or 'Login' to Redux-Store to exit the register window or show login window
        dispatch(alertActionsUserMgmt.clearAndOverlayChange(event.target.id));
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegister = connect(mapStateToProps)(Register);


class RegisterWasSuccessful extends React.Component {
    constructor(props) {
        super(props);
        this.handleUserMgmtChange = this.handleUserMgmtChange.bind(this);
    }

    render() {
        return (
            <div className="col-md-auto">
                <p>Melde dich jetzt an, um Such&shy;ergebnisse aus dem Rechts&shy;informations&shy;system in eigenen Projekt-Ordnern zu speichern.</p>
                <button id="Login" className="btn btn-primary" type="button" onClick={this.handleUserMgmtChange}>Zum Login...</button>&nbsp;
                <button id="Clear" className="btn btn-default" type="button" onClick={this.handleUserMgmtChange}>Abbrechen</button>
            </div>
        );
    }

    handleUserMgmtChange(event) {
        const { dispatch } = this.props;

        //pass 'Clear' or 'Login' to Redux-Store to exit the register window or show login window
        dispatch(alertActionsUserMgmt.clearAndOverlayChange(event.target.id));
    }
}

function mapStateToProps2(state) {
    return { };
}

const connectedRegisterWasSuccessful = connect(mapStateToProps2)(RegisterWasSuccessful);

export { connectedRegister as Register, connectedRegisterWasSuccessful as RegisterWasSuccessful };