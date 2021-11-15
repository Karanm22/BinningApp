import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const BinList = ({ bins }) => {
  const [binData, setBinData] = useState();
  useEffect(() => {
    setBinData(_.flatten(bins));
  }, [bins]);

  return (
    <div>
      <div className="row justify-content-between">
        <div className="col-2">
          <h3>Bin ID</h3>
        </div>
        <div className="col-2">
          <h3>Name</h3>
        </div>
        <div className="col-2">
          <h3>Start</h3>
        </div>
        <div className="col-2">
          <h3>End</h3>
        </div>
      </div>
      {bins &&
        binData &&
        binData.map((bin, index) => (
          <div className="row  justify-content-between" key={index}>
            <div className="col-2">
              {" "}
              <h6> {index + 1}</h6>
            </div>
            <div className="col-2">{bin.Name}</div>
            <div className="col-2">{bin.start}</div>
            <div className="col-2">{bin.end}</div>
          </div>
        ))}
         <span className=" btn btn-primary m-2" onClick={()=>window.location.reload()}>Reload</span>
      <Link to="/">
        
        <span className=" btn btn-primary m-2">Back</span>
      </Link>
    </div>
  );
};

export default BinList;
