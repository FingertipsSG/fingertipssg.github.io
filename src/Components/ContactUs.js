import React from "react";
import "../Components/css/contactus.css";
import Navbar from "../Components/Navbar";
import { Form, Button, Input, message } from "antd";
import "antd/dist/antd.css";
import { Row } from "reactstrap";
import { postApi } from "../Helper/Utils";
/*import background from "../Assets/Images/ContactUs.png";*/

function ContactUs() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    postApi("postEmail", values).then((response) => {
      // console.log("Success:", response);
      message.success(response.message);
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <html className="contactUsHTML">
      <body className="contactUsBody">
        <Navbar />
        
        <div>
          <Row>
            <div className="col-lg-4"></div>
            <div className="contactUs col-lg-8 col-md-12">
              <h1 className="formTitle"> Stay Connected With Us</h1>
              <p>
                Feel free to contact us anytime time.
                <br />
                We will get back to you as soon as we can!
              </p>

              <Form
                form={form}
                name="basic"
                wrapperCol={{
                  span: 12,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                >
                  <Input
                    style={{ borderColor: "#9B9B9B", borderWidth: "2px" }}
                    placeholder="Name"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    style={{ borderColor: "#9B9B9B", borderWidth: "2px" }}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    style={{ borderColor: "#9B9B9B", borderWidth: "2px" }}
                    placeholder="Phone"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please input message",
                    },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={1000}
                    placeholder="Message"
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 9,
                  }}
                >
                  <Button
                    type="primary"
                    className="formBtn mt-2"
                    htmlType="submit"
                  >
                    SUBMIT
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Row>
        </div>
      </body>
    </html>
  );
}

export default ContactUs;
