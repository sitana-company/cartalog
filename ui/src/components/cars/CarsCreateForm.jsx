import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import CarsAutoComplete from "./CarsAutoComplete.jsx";

class CarsCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
        if (!err) {
          alert("nenhum erro");
          console.log('Received values of form: ', values);
          const data = new FormData();
          data.append('uid', this.props.carUid);
          data.append('modelo_id', values.modelo_id);

          fetch('/api/cars/update', {
            method: 'POST',
            body: data
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          }).then((resp) => {
            message.success('Matrícula adicionada com sucesso!');
            this.props.onCancel();
          }).catch((error) => {
            alert("ERROR");
          });
        }
    });
  };

  render() {
    const { form, formVisible, licensePlate, onCancel } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title="Adicionar nova matricula"
        width={300}
        visible={formVisible}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          layout="vertical"
          style={{ width: "200px" }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="Matrícula">
            {getFieldDecorator("car_license_plate", {
              initialValue: licensePlate,
              rules: [
                {
                  required: true
                }
              ]
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Modelo">
            {getFieldDecorator("modelo_id", {
              rules: [
                {
                  required: true,
                  message: "Por favor escolha o modelo do carro!"
                }
              ]
            })(<CarsAutoComplete></CarsAutoComplete>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CarsCreateForm);
