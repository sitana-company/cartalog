import React, { Component } from "react";
import { Modal, Form, Input, Button, message, Icon, Spin } from "antd";
import CarsAutoComplete from "./CarsAutoComplete.jsx";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
          //console.log('Received values of form: ', values);
          this.setState({ loading: true });

          const data = new FormData();
          data.append('carro_uid', this.props.carUid);
          data.append('modelo_uid', this.state.modelUid);

          fetch('/api/cars/update', {
            method: 'POST',
            body: data
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          }).then((resp) => {
            this.setState({ loading: false });
            message.success('Informações atualizadas com sucesso!');
            this.props.onCancel();
          }).catch((error) => {
            this.setState({ loading: false });
            //alert("ERROR");
          });
        }
    });
  };

  render() {
    const { form, formVisible, licensePlate, onCancel, carPhotoUrl } = this.props;
    const { getFieldDecorator } = form;
    let { loading } = this.state;

    return (
      <Modal
        title="Atualizar Dados do Carro"
        width={400}
        visible={formVisible}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={null}
      >
        <img src={carPhotoUrl}
             style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "300px" }} />
        <Form
          layout="vertical"
          style={{ width: "300px", marginTop: "50px" }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="Matrícula">
            {getFieldDecorator("car_license_plate", {
              initialValue: licensePlate
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Modelo">
            {getFieldDecorator("modelo_uid", {
              rules: [
                {
                  message: "Por favor escolha o modelo do carro!"
                }
              ]
            })(<CarsAutoComplete onSelect={(value) => {
              this.setState({ modelUid: value})
            } }/>)}
          </Form.Item>
          <Form.Item>
            {!loading ? (<Button type="primary" htmlType="submit">
              Guardar
            </Button>) : <Spin indicator={antIcon} />}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CarsCreateForm);
