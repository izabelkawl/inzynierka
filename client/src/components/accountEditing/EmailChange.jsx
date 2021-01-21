import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import api, { updateUserById } from '../../api';
import { logoutUser } from "../../api/index";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Title from '../Title';
import classnames from "classnames";
import {BlueButtonStyle} from '../../pages/constants.jsx';

const Container = styled.div.attrs({
    className: 'form-group',
})`
   
`
const Span = styled.span.attrs({
    className: `red-text`,
})`
    color: red;
`
class EmailChange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.auth.user.id,
            email: '',
            password: '',
            errors: {}
        }
    }
    
    componentDidMount = async () => {
        const { id } = this.state
        const user = await api.getUserById(id)

        this.setState({
            email: user.data.data.email,
            firstname: user.data.data.firstname,
            lastname: user.data.data.lastname,
            address: user.data.data.address,
            phone: user.data.data.phone
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleUpdateUser = e => {

        e.preventDefault();
        const { id, email, firstname, lastname, address, phone, password} = this.state
        const payload = { email, firstname, lastname, address, phone, password}

        this.props.updateUserById(id, payload)

    }

    render() {
        const { errors, email } = this.state;
        return (
                <Container>
                    <Title>Zmiana adresu email</Title>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email">Nowy email:</Form.Label>
                            <Span>
                                {errors.email}
                            </Span>
                            <Form.Control
                                onChange={this.onChange}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                                })}
                                value={email}
                                />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Hasło: </Form.Label >
                            <Span>
                                {errors.passwordincorrect}
                            </Span>
                            <Form.Control
                                onChange={this.onChange}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.passwordincorrect
                                })}
                            />
                        </Form.Group>
                        <Button style={BlueButtonStyle} type="submit"  className="float-right" onClick={this.handleUpdateUser} >Zapisz</Button>
                    </Form>
                </Container>
        );
    }
}
EmailChange.propTypes = {
    updateUserById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser, updateUserById }
)(EmailChange);