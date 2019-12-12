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
          console.log('Received values of form: ', values);

          /// FETCH GUARDAR MATRICULA
        }
      });

    message.success('Matrícula adicionada com sucesso!');
  };

  render() {
    const { form, formVisible, licensePlate, onCancel } = this.props;
    const { getFieldDecorator } = form;
    console.log(licensePlate);
    return (
      <Modal
        title="Adicionar nova matricula"
        width={300}
        visible={formVisible}
        onCancel={onCancel}
        footer={null}
      >
        <Form layout="vertical" style={{ width: "200px" }} onSubmit={this.handleSubmit}>
          <Form.Item label="Matrícula">
            {getFieldDecorator("car_license_plate", {
              initialValue: licensePlate,
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Modelo">
            {getFieldDecorator("car_model")(
              <CarsAutoComplete></CarsAutoComplete>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "form_add_license_plate" })(CarsCreateForm);
