import React, { Component } from "react";

import {
  Layout,
  Card,
  Upload,
  Icon,
  Modal,
  message,
  Row,
  Col
} from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
      formVisible: false
    };
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  beforeUpload = () => {
    // Teste exemplo
    this.setState({ formVisible: true, licensePlate: "TE-ST-E0" });
    message.error("A matrícula da imagem já foi introduzida no sistema!");
  };

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  hideForm = () => this.setState({ formVisible: false });

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      formVisible,
      licensePlate
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>Header</Header>
        <Content style={{ padding: '0 20px', marginTop: 64, minHeight: "calc(100vh - 135px)"}}>
          <Row style={{ padding: "30px 0px" }}>
            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 10, offset: 8}} >
              <Card title={<h1>Bem-vindo ao CartaLog</h1>} bordered={false}>
                <Upload
                  accept="image/png,image/jpg"
                  action="/api/cars/plate-detector"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={this.beforeUpload}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                <CarsCreateForm
                  formVisible={formVisible}
                  licensePlate={licensePlate}
                  onCancel={this.hideForm}
                ></CarsCreateForm>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ background: "#ECECEC", padding: "25px 50px", fontWeight: 500 }}>Netuno ©2019</Footer>
      </Layout>
    );
  }
}
