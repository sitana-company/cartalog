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

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  hideForm = () => this.setState({ formVisible: false });

  customRequest = ({onSuccess, onError, file}) => {
    const data = new FormData();
    data.append('file', file);

    fetch('/api/cars/plate-detector', {
      method: 'POST',
      'content-type': 'multipart/form-data',
      body: data
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    }).then((resp) => {
      this.setState({ formVisible: true, licensePlate: resp.plate, carUid: resp.uid });
      
      if (resp.isNew) {
        message.success("A matrícula da imagem foi carregada com sucesso!");
      } else {
        message.info("Atualizar matrícula!");
      }

      onSuccess(resp, file);
    }).catch(() => {
        message.error("Não foi possível encontrar nenhuma matrícula!");
    });
  }

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      formVisible,
      licensePlate,
      carUid
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}><img style={{ height: "100%", padding: "10px" }} src={"./images/logo-main.png"}></img></Header>
        <Content style={{ padding: '0 20px', marginTop: 64, minHeight: "calc(100vh - 135px)"}}>
          <Row style={{ padding: "30px 0px" }}>
            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 10, offset: 8}} >
              <Card title={<h1>Bem-vindo ao CartaLog</h1>} bordered={false}>
                <Upload
                  customRequest={this.customRequest}
                  accept="image/*"
                  //action="/api/cars/plate-detector"
                  listType="picture-card"
                  fileList={fileList}
                  //beforeUpload={this.beforeUpload}
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
                  carUid={carUid}
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
