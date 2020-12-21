import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ErrorMessages from '../../components/UI/ErrorMessages/ErrorMessages';
import * as actions from '../../store/actions/auth';
/**/ 
import './Auth.scss';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

const initialFieldsState = {
    fullName: {
        value: '',
        rules: {
            userName: true
        },
        errorMessages: null
    },
    email: {
        value: '',
        rules: {
            email: true
        },
        errorMessages: null
    },
    password: {
        value: '',
        rules: {
            minLength: 6
        },
        errorMessages: null
    },
    confirmPassword: {
        value: '',
        rules: {
            confirmation: 'password'
        },
        errorMessages: null
    }
};

class Auth extends Component {
    state = {
        ...initialFieldsState,
        mode: SIGN_IN,
        showPassword: false,
        showConfirmPassword: false
    }

    formRef = createRef();

    onChangeInputHandler = e => {
        const { name, value } = e.target;

        this.setState({ 
            [name]: {
                ...this.state[name],
                value
            } 
        });
    }

    onBlurInputHandler = e => {
        const { name } = e.target;

        const field = this.state[name];

        const errorMessages = this.validate(field);

        this.setState({
            [name]: {
                ...this.state[name],
                errorMessages: errorMessages.length ? errorMessages : null
            }
        });
    }

    validate = field => {
        const validationFunctions = {
            email(value) {
                const pattern = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}$/i;

                if (pattern.test(value)) return null;

                return 'Provided value should be an email address.';
            },
            minLength(value, length) {
                if (value.length >= length) return null;

                return `Provided value should have length of ${length}.`;
            },
            userName(value) {
                const pattern = /[a-zа-яёы ]+/i;

                if (pattern.test(value)) return null;

                return 'Provided value should contain only letters and spaces';
            },
            confirmation(value, confirmationName) {
                const confirmationValue = this.state[confirmationName].value

                if (value === confirmationValue) return null;

                return `Provided value and ${confirmationName} should be equal.`;
            }
        };

        const { value, rules } = field;

        const errorMessages = [];

        for (const key in rules) {
            this.validationFunction = validationFunctions[key];

            const errorMessage = this.validationFunction(value.trim(), rules[key]);

            if (errorMessage) {
                errorMessages.push(errorMessage);
            }
        }

        return errorMessages;
    }

    changeAuthModeHandler = chosenMode => {
        const { mode } = this.state;

        if (mode === chosenMode) return;

        this.setState({ 
            mode: chosenMode,
            ...initialFieldsState
        });
    }

    onSubmitHandler = e => {
        e.preventDefault();

        const form = this.formRef.current;
        const inputs = form.querySelectorAll('input');

        let isValid = true;

        for (const { name } of inputs) {
            const errorMessages = this.validate(this.state[name]);

            if (isValid && errorMessages.length) {
                isValid = false;
            }

            this.setState({
                [name]: {
                    ...this.state[name],
                    errorMessages: errorMessages.length ? errorMessages : null
                }
            });
        }

        if (isValid) {
            const { mode, email, password, fullName } = this.state;
            const { authenticateUser } = this.props;

            authenticateUser({ mode, email, password, fullName });
        }
    }

    togglePasswordIconHandler = propName => {
        this.setState(prevState => ({
            [propName]: !prevState[propName]
        }));
    }

    getAuthErrorMessage(type) {
        switch (type) {
            case 'EMAIL_EXISTS': return 'The email address is already in use by another account.';
            case 'OPERATION_NOT_ALLOWED': return 'Password sign-in is disabled for this project.';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER' : return 'We have blocked all requests from this device due to unusual activity. Try again later.';
            case 'EMAIL_NOT_FOUND': 
            case 'INVALID_PASSWORD': return 'Some of the entered data is invalid.';
            default: return null;
        }
    }

    render() {
        const { 
            mode, 
            fullName, 
            email, 
            password, 
            confirmPassword,
            showPassword,
            showConfirmPassword
        } = this.state;

        const { idToken, localId, authError } = this.props;

        if (idToken && localId) return <Redirect to="/" />;

        return(
            <div className="Auth">
                <form 
                    ref={this.formRef}
                    autoComplete="off"
                    onSubmit={this.onSubmitHandler}    
                >
                <div className="Tabs">
                        <div 
                            className={ 
                                mode === SIGN_IN
                                    ? 'Tab Active'
                                    : 'Tab'
                            }
                            onClick={() => this.changeAuthModeHandler(SIGN_IN)}
                        >
                            <span>Sign In</span>
                        </div>

                        <div 
                            className={
                                mode === SIGN_UP
                                    ? 'Tab Active'
                                    : 'Tab'
                            }
                            onClick={() => this.changeAuthModeHandler(SIGN_UP)}
                        >
                            <span>Sign Up</span>
                        </div>
                </div>

                {
                    mode === SIGN_UP &&
                    <div className="InputWrapper">
                        <Input
                            name="fullName"
                            placeholder="Full Name"
                            value={fullName.value}
                            onChange={this.onChangeInputHandler}
                            onBlur={this.onBlurInputHandler}
                        />

                        <ErrorMessages 
                            errorMessages={fullName.errorMessages}
                        />
                    </div>
                }

                    <div className="InputWrapper">
                        <Input 
                            name="email"
                            placeholder="E-mail"
                            value={email.value}
                            onChange={this.onChangeInputHandler}
                            onBlur={this.onBlurInputHandler}
                        />

                        <ErrorMessages 
                            errorMessages={email.errorMessages}
                        />
                    </div>


                    <div className="InputWrapper">
                        <Input
                            type={ showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={password.value}
                            onChange={this.onChangeInputHandler}
                            onBlur={this.onBlurInputHandler}
                        />

                        <ErrorMessages 
                            errorMessages={password.errorMessages}
                        />

                        {
                            showPassword
                                ? <i 
                                    onClick={() => this.togglePasswordIconHandler('showPassword')} 
                                    className="far fa-eye" 
                                />
                                : <i 
                                    onClick={() => this.togglePasswordIconHandler('showPassword')} 
                                    className="far fa-eye-slash" 
                                />
                        }
                    </div>
                    
                    {
                        mode === SIGN_UP &&
                        <div className="InputWrapper">
                            <Input
                                type={ showConfirmPassword ? 'text' : 'password' }
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={confirmPassword.value}
                                onChange={this.onChangeInputHandler}
                                onBlur={this.onBlurInputHandler}
                            />

                        <ErrorMessages 
                            errorMessages={confirmPassword.errorMessages}
                        />

                        {
                            showConfirmPassword
                                ? <i 
                                    onClick={() => this.togglePasswordIconHandler('showConfirmPassword')} 
                                    className="far fa-eye" 
                                />
                                : <i 
                                    onClick={() => this.togglePasswordIconHandler('showConfirmPassword')} 
                                    className="far fa-eye-slash" 
                                />
                        }
                        </div>
                    }

                    <ErrorMessages errorMessages={this.getAuthErrorMessage(authError)} />

                    <Button type="submit">Send</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    idToken: state.auth.idToken,
    localId: state.auth.localId,
    authError: state.authError
});

const mapDispatchToProps = dispatch => ({
    authenticateUser: (mode, email, password) => {
        dispatch(actions.authenticateUser(mode, email, password));
    }
});

export default connect(
    /**/
    /**/
    mapStateToProps,
    mapDispatchToProps
)(Auth);