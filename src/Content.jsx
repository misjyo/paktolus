import React, { useState, useEffect } from "react";
import { Space, Table, Button, Result } from "antd";
import PlayGame from "./PlayGame";
import PlayingCard from "./PlayingCard";

export default function Content({ islogin, setUser, user }) {
  const [isplay, setPlay] = useState(false);
  const [all_history, setAllHistory] = useState([]);

  const arrToObjConverter = (arr, id) => {
    return {
      id: id,
      slot1: arr[0],
      slot2: arr[1],
      slot3: arr[2],
      time: arr[3],
    };
  };
  // 0-1-2-Fri Oct 22 2021 02:22:58 GMT+0530 (India Standard Time)=2-0-1-Fri Oct 22 2021 02:23:15 GMT+0530 (India Standard Time)=

  useEffect(() => {
    if (islogin && localStorage.getItem(user.id + "-history")) {
      const history = localStorage.getItem(user.id + "-history").split("=");
      const arr_history = history.map((record, index) => {
        if (record) {
          return arrToObjConverter(record.split("-"), parseInt(index) + 1);
        }
      });
      arr_history.pop();
      setAllHistory(arr_history);
      console.log("all history :", arr_history);
    }
  }, [islogin, user]);

  const columns = [
    {
      title: (
        <span className="bg-dark">
          <h4>
            <b>Id</b>
          </h4>
        </span>
      ),
      width: "70px",
      fixed: "left",
      className: "text-center",
      dataIndex: "id",
      render: (text) => <h5>{text}</h5>,
    },
    {
      title: (
        <span className="bg-dark">
          <h3>
            <b>Slots</b>
          </h3>
        </span>
      ),
      width: "250px",
      className: "text-center",
      dataIndex: "slot1",
      render: (text, record) => {
        return (
          <Space>
            <PlayingCard option={record.slot1} width="35px" height="35px" />
            <PlayingCard option={record.slot2} width="35px" height="35px" />
            <PlayingCard option={record.slot3} width="35px" height="35px" />
          </Space>
        );
      },
    },
    {
      title: (
        <span className="bg-dark">
          <h3>
            <b>Time</b>
          </h3>
        </span>
      ),
      className: "text-center",
      dataIndex: "time",
      key: "address",
      render: (text) => {
        return <h5>{text}</h5>;
      },
    },
  ];
  return (
    <div
      style={{
        height: "100%",
        textAlign: "left",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "space-between",
      }}
    >
      { <div className="container px-6 text-center">
        {islogin ? (
          <div>
            {" "}
            <h2 className="">
              <span
                className=" p-1 px-4 ant-card-hoverable  rounded-pill  text-white"
                style={{
                  backgroundImage: "linear-gradient(to right,#325285 , black)",
                  // textShadow: "2px 2px 2px white",
                }}
              >
                ScoreBoard
              </span>
            </h2>
            {all_history.length <= 0 ? (
              <Result
                status="404"
                title={
                  <h2>
                    <span
                      className=" p-1 px-4 ant-card-hoverable"
                      style={{
                        textShadow: "2px 2px 2px black",
                        color: "white", fontSize:"25px",
                      }}
                    >
                      Sorry you have empty record.
                    </span>
                  </h2>
                }
              />
            ) : (
              <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={all_history}
                scroll={{ x: 600 }}
                pagination={{ position: ["bottomCenter"], pageSize: 10 }}
              />
            )}
          </div>
        ) : (
          <Result
            status="403"
            title={
              <h2>
                <span
                  className=" p-1 px-4 ant-card-hoverable "
                  style={{
                    textShadow: "2px 2px 2px black",
                    color: "#edf2fa",fontSize:"25px"
                  }}
                >
                  You need to get register
                </span>
              </h2>
            }
          />
        )}
      </div> }
      <div
        className="d-block m-4"
        style={{ textAlign: "center", paddingRight: "30px" }}
      >
        <Button
          size="large"
          shape="round"
          className="ant-card-hoverable border-0"
          style={{
            backgroundImage: "linear-gradient(to right,#79a5ed,black)",
            height: "50px",
          }}
          onClick={() => {
            console.log("clicked");
            setPlay(true);
          }}
        >
          <b style={{ fontSize: "24px" ,color:"white"}}>Start Game</b>
        </Button>
      </div>
      {isplay && (
        <PlayGame
          setPlay={setPlay}
          islogin={islogin}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
}
