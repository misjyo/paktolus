import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import background from "./images/piccasino.jpg";
import { Row , Col} from "antd";

function App() {
  const [islogin, setLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    price: "",
  });

  return (
    <div className="container-fluid container-xxl p-0 ">
      <div
        style={{
        
          backgroundImage: `url(${background}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          // width:"100%",
          // height:"auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
    >
        <Navbar
          islogin={islogin}
          setLogin={setLogin}
          setUser={setUser}
          user={user}
        />
        <div style={{ minHeight: "70vh" }}>
          <Content user={user} setUser={setUser} islogin={islogin} />
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
