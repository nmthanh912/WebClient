import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"

import * as actions from "../../store/actions"
import "./Login.scss"
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from "../../services/userService"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isHiddenPasswords: false,
            errMessage: "",
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleOnClickHidden = () => {
        this.setState({
            isHiddenPasswords: !this.state.isHiddenPasswords,
        })
    }

    handleOnClickLogin = async () => {
        this.setState({
            errMessage: "",
        })

        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }
    }
    render() {
        return (
            // A login website will has 3 main elements in 3 div
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text"> Sign In to your account </div>
                        <div className="col-12  form-group login-input">
                            <label> Email </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className="col-12  form-group login-input">
                            <label> Password </label>
                            <div className="show-password">
                                <input
                                    type={this.state.isHiddenPasswords ? "password" : "text"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span
                                    onClick={() => {
                                        this.handleOnClickHidden()
                                    }}
                                >
                                    <i
                                        className={
                                            this.state.isHiddenPasswords
                                                ? "fas fa-eye-slash"
                                                : "fas fa-eye"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 form-group fix-items">
                            <div className="col-6 form-group remember-me">
                                <input type="checkbox" className="form-check-input" />
                                <div className="text">Remember me?</div>
                            </div>
                            <div className="col-6 forgot-password">
                                <span> Forgot your password? </span>
                            </div>
                        </div>
                        <div className="col 12 errMessage">
                            <span> {this.state.errMessage} </span>
                        </div>
                        <div></div>
                        <div className="col-12 btn-fix">
                            <button
                                className="login-btn"
                                onClick={() => {
                                    this.handleOnClickLogin()
                                }}
                            >
                                {" "}
                                Login{" "}
                            </button>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span> Or login with:</span>
                        </div>
                        <div className="col-12 social-icons">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                        <div className="col-12 text-center account">
                            <span> Don't have an account?</span>
                            <span> Sign up Now</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
