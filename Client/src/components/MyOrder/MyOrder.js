import React from "react";
import "./MyOrder.css";
import Menu from "./MenuOrder/MenuOrder";
import RoutesOrder from "./RoutesOrder";

function MyOrder(props) {
  return (
    <section id="myorder">
      <div className="myorder marginright">
        <Menu></Menu>
        <div className="myorder-content marginright">
          <RoutesOrder></RoutesOrder>
        </div>
      </div>
    </section>
  );
}

export default MyOrder;
