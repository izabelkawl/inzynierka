import React, { Component } from 'react';
import classnames from "classnames";
import api, { updateManagementById } from '../../api';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form,Button} from 'react-bootstrap';
import {  Span, BlueButtonStyle } from '../../pages/constants';

class EditRodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
        id: "6009bbfedb3f5e215007b7e0",
        rodo: '',
        errors: {}
    };
  };

  componentDidMount = async () => {
    const { id } = this.state
    const management = await api.getManagementById(id)

    this.setState({
      title: management.data.data.title,
      name: management.data.data.name,
      city: management.data.data.city,
      address: management.data.data.address,
      phone: management.data.data.phone,
      description: management.data.data.description,
      rodo: management.data.data.rodo,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    };
  };

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  handleUpdateManagement = e => {

      e.preventDefault();
      const {id,description, rodo, title, name, city, address, phone } = this.state
      const payload = {description, rodo, title, name, city, address, phone }

      this.props.updateManagementById(id, payload)
  };

  render() {
    const { errors, rodo} = this.state

    return (
          <Form>
            <Form.Group>
              <Span>{errors.rodo}</Span>
              <Form.Control
                onChange={this.onChange}
                error={errors.rodo}
                id="rodo"
                as="textarea"
                className={classnames("", {
                    invalid: errors.rodo
                })}
                value={rodo}
                rows={10}
              />
            </Form.Group>
            <br></br>
            <Button style={BlueButtonStyle} type="submit" onClick={this.handleUpdateManagement}>
              Zapisz
            </Button>
          </Form>
  )};
};

EditRodo.propTypes = {
    updateManagementById: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateManagementById }
)(withRouter( EditRodo));