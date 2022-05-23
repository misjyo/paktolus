import React, { useState} from "react";
import { Input, Space, Modal, Card, Spin, Typography } from "antd";
import avatar from "./images/avatar.png";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
const { Link } = Typography;

const Login = ({
  setVisibleLoginModel,
  setLogin,
  setUser,
  setCreateNewAccount,
  is_create_new_account,
}) => {
  const [isloading] = useState(false);

  const [state, setstate] = useState({
    username: "",
    password: "",
    name: "",
    price: "20.99",
  });

  const loginHandler = (e) => {
    e.preventDefault();
    if (is_create_new_account) {
      if (localStorage.getItem(state.username)) {
        alert("This user id alredy exist");
      } else {
        localStorage.setItem(
          state.username,
          state.password + "=" + state.name + "=" + state.price
        );
        alert(" Registered successfully");
      }
    } else {
      const data = localStorage.getItem(state.username);
      console.log("stored username:", data);
      if (!data) {
        alert("You are not Registered");
      } else {
        if (data.split("=")[0] === state.password) {
          setLogin(true);
          setVisibleLoginModel(false);
          setUser({
            id: state.username,
            password: data.split("=")[0],
            name: data.split("=")[1],
            price: data.split("=")[2],
          });
        } else {
          alert("Wrong password or username");
        }
      }
    }
    console.log("Login Clicked", state);
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setstate((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    console.log("input changed");
  };

  return (
    <Modal
      footer={null}
      onCancel={() => {
        setVisibleLoginModel(false);
      }}
      visible={true}
      bodyStyle={{ padding: "0px", margin: "0px" }}
      closable={false}
      style={{
        padding: "0px",
      }}
      maskClosable
    >
      <Card
        hoverable
        style={{
          width: "100%",
          backgroundImage: "linear-gradient(to bottom right, white,#325285,black)",
        }}
        bodyStyle={{
          padding: "1px",
        }}
        className=" rounded text-center  mx-auto my-5 p-0"
      >
        <form onSubmit={loginHandler} className="rounded">
          <h2 className="text-center my-2">
            <strong className="text-dark">
              {is_create_new_account ? "Registration " : "Login "}Form
            </strong>
          </h2>
          <hr className="bg-info" />
          <img
            src={avatar}
            className="img-fluid px-3"
            width="200px"
            alt="..."
          ></img>
          <div className="py-3 mt-2">
            {" "}
            <Spin
              size="large"
              tip="Please Wait..."
              spinning={isloading ? true : false}
            >
              <Space direction="vertical" style={{ minWidth: "80%" }}>
                {is_create_new_account && (
                  <div style={{ textAlign: "start" }}>
                    <h6>
                      <b>Your Name: </b>
                    </h6>{" "}
                    <Input
                      size="large"
                      placeholder="Enter your name"
                      name="name"
                      onChange={inputEvent}
                      value={state.name}
                      required
                    />
                  </div>
                )}
                <div style={{ textAlign: "start" }}>
                  <h6>
                    <b>User Id: </b>
                  </h6>{" "}
                  <Input
                    size="large"
                    placeholder="Enter user Id"
                    name="username"
                    onChange={inputEvent}
                    value={state.username}
                    prefix={<UserOutlined />}
                    required
                  />
                </div>
                <div style={{ textAlign: "start" }}>
                  <h6>
                    <b>Password:</b>
                  </h6>{" "}
                  <Input.Password
                    placeholder="Enter password"
                    onChange={inputEvent}
                    value={state.password}
                    name="password"
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className=" btn btn-dark w-100 text-light"
                >
                  <b>{is_create_new_account ? "REGISTER" : "LOGIN"}</b>
                </button>
                <div className=" d-flex text-light w-100  justify-content-between">
                  <div></div>
                  <p
                    className="forget-container"
                    onClick={() => {
                      setCreateNewAccount(!is_create_new_account);
                    }}
                  >
                    {is_create_new_account ? (
                      <Link>Already have an account</Link>
                    ) : (
                      <Link>register now!</Link>
                    )}
                  </p>
                </div>
              </Space>
            </Spin>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default Login;
