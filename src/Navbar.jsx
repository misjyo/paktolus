import React, { useState, useEffect } from "react";
import logo_small from "./images/paktolus_logo.jpeg";
import { Space } from "antd";
// import { LoginOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import avatar from "./images/avatar.png";
import Login from "./Login";

export default function Navbar({ islogin, setLogin, price, setUser, user }) {
  const [is_visible_login_model, setVisibleLoginModel] = useState(false);
  const [is_create_new_account, setCreateNewAccount] = useState(false);
  const [state, setstate] = useState({
    islogin: false,
    price: "",
  });

  useEffect(() => {
    setstate((preval) => {
      return {
        islogin: islogin,
        price: price,
      };
    });
  }, [islogin, price, user]);

  return (
    <div>
      <nav
        class="navbar navbar-dark  alert-primary"
        style={{
          backgroundImage: "linear-gradient(to right,black,#325285 , black)",
        }}
      >
        <div className="container-fluid justify-content-between">
          <Space>
            {" "}
            <img
              src={logo_small}
              alt=""
              width="50"
              height="50"
              className="d-inline-block align-text-center rounded rounded-2 ant-card-hoverable"
            />
            <h4 className="p-0 m-0 text-white">
              {user.name ? user.name : "Casino"}
            </h4>
          </Space>

          <Space>
            {state.islogin ? (
              <>
                <span>
                  <h3 style={{ color: "white", marginTop:"12px"}}>
                    ${user.price || "00.00"}
                  </h3>
                </span>
                {/* <Image
                  width={50}
                  height={50}
                  // src={avatar}
                  className="m-0 p-0"
            
                /> */}
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setLogin(false);
                    setUser({
                      name: "",
                      price: "",
                    });
                  }}
                >
                  <h4 className="m-0 text-white">
                    <Space align="center">
                      
                      Logout
                    </Space>
                  </h4>
                </button>
              </>
            ) : (
              <Space>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setVisibleLoginModel(!is_visible_login_model);
                    setCreateNewAccount(false);
                  }}
                >
                  <h4 className="m-0 text-white">
                    Login
                  </h4>
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setVisibleLoginModel(!is_visible_login_model);
                    setCreateNewAccount(true);
                  }}
                >
                  <h4 className="m-0 text-white">
                  Register
                  </h4>
                </button>
              </Space>
            )}
          </Space>

          {is_visible_login_model && (
            <Login
              setVisibleLoginModel={setVisibleLoginModel}
              setLogin={setLogin}
              setUser={setUser}
              is_create_new_account={is_create_new_account}
              setCreateNewAccount={setCreateNewAccount}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
