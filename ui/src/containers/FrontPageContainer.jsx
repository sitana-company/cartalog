import React, { Component } from "react";

import { Upload, Icon, Modal, message } from "antd";

import CarsCreateForm from "../components/cars/CarsCreateForm.jsx";

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export default class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      licensePlate: "",
      fileList: [],
      formVisible: false,
    };
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  beforeUpload = () => {
    // Teste exemplo
    this.setState({ formVisible: true, licensePlate: "TE-ST-E0" });
    message.error('A matrícula da imagem já foi introduzida no sistema!');
  };

  handleChange = ({fileList}) => {
    console.log(fileList);
    this.setState({ fileList })
  };

  handleCancel = () => this.setState({ previewVisible: false });

  hideForm = () => this.setState({ formVisible: false });

  render() {
    const { previewVisible, previewImage, fileList, formVisible, licensePlate } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="my-dashboard">
        <h1>Bem-vindo ao CartaLog</h1>
        <Upload
          action="/api/cars/plate-detector"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <CarsCreateForm formVisible={formVisible} licensePlate={licensePlate} onCancel={this.hideForm}></CarsCreateForm>
      </div>
    );
  }
}
