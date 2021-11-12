import React, { useState } from "react";
import { Link } from "react-router-dom";

const BinMaker = ({ limit }) => {
  const [addBins, setAddBins] = useState([]);
  const [error, setError] = useState({
    message: null,
    status: false,
  });
  const [status, setStatus] = useState({
    message: null,
    status: false,
  });
  const addBin = () => {
    const binData = {
      Name: `Bin ` + (addBins.length + 1),
      start: ``,
      end: ``,
    };
    let newBins = [...addBins];

    if (error.status) {
      setError({
        ...error,
        message:
          "You cannot add new bin until you input the correct required fields.",
      });
    } else {
      if (newBins.length === 0) {
        newBins.push(binData);
        setAddBins(newBins);
      } else {
        if (
          !newBins[newBins.length - 1].end ||
          !newBins[newBins.length - 1].start
        ) {
          setError({
            status: true,
            message:
              "You cannot add new bin until you input the correct required fields.",
          });
        } else {
          if(newBins[newBins.length - 1].end== limit.max){
            setError({
              status: true,
              message:
                "Max limit exceeded, so you can't create more bins.",
            });
          }
          else{
            newBins.push(binData);
            setAddBins(newBins);
          }
        }
      }
    }
  };

  const deleteSelectedBin = (index) => {
    let currentBin = [...addBins];
    currentBin.splice(index, 1);
    setAddBins(currentBin);
  };

  const handleStartBin = (e, index) => {
    const currentBin = [...addBins];
    currentBin[index].start = e.target.value;
    if (limit.max < e.target.value) {
      setError({
        message: "Please enter a number under Max value.",
        status: true,
      });
    } else {
      if (index === 0) {
        if (e.target.value != 2 && e.target.value < 2) {
          setError({
            message: "Please Enter a number greater than 2.",
            status: true,
          });
        } else {
          setError({ message: null, status: false });
      
          setAddBins(currentBin);
        }
      } else {
        if (parseInt(currentBin[currentBin.length - 2].end) >= e.target.value) {
          setError({
            message: "Please Enter a number greater than the last ending bin.",
            status: true,
          });
        } else if (currentBin[currentBin.length - 2].start === e.target.value) {
          setError({
            message: "Please Enter a number greater than the last ending bin.",
            status: true,
          });
        } else {
          setAddBins(currentBin);
          setError({ message: null, status: false });
        }
      }
    }
  };

  const handleEndValue = (e, index) => {
    let currentBin = [...addBins];
    currentBin[index].end = e.target.value;
    if (index === 0) {
      if (e.target.value > parseInt(currentBin[index].start)) {
        if(limit.max<e.target.value){
          setError({
            message:
              "Please enter a number under max value.",
            status: true,
          });
        }
        else{
          setError({ message: null, status: false });
        }
      }
       else {
        setError({
          message:
            "Please enter a number in a greater range than the start number.",
          status: true,
        });
      }
    }
     else if (e.target.value > parseInt(currentBin[index].start)) {
      if (limit.max < e.target.value) {
        setError({
          message:
            "Please enter a number under max value.",
          status: true,
        });
      }else{
        setError({ message: null, status: false });
      }
    } 
    else if (e.target.value === parseInt(addBins[addBins.length - 1].end)) {
      setError({
        message:
          "Please enter a number in a greater range than the start number.",
        status: true,
      });
    }
     else {
      setError({
        message:
          "Please enter a number in a greater range than the start number.",
        status: true,
      });
    }

    setAddBins(currentBin);
  };

  const handleSubmit = () => {
    if (error.status) {
      setError({
        ...error,
        message: "Cannot submit until all the required inputs the fullfilled",
      });
    } else {
      fetch("http://localhost:8080/bins", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addBins),
      })
        .then((res) => {
          setStatus({
            message: "Success",
            status: true,
          });
          setTimeout(
            () =>
              setStatus({
                message: "",
                status: false,
              }),
            4000
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCancel = () => {
    setAddBins([]);
  };
  return (
    <div className="App">
      {limit && (
        <h3 className="text-muted fw-normal m-4">{`Min Value: ${limit.min} Max Value:${limit.max}`}</h3>
      )}
      {status.status && <h4 className="text-success">{status.message}</h4>}
      {error.status && <h4 className="text-danger">{error.message}</h4>}
      <div className="row">
        <div
          className="col-4"
          style={{ cursor: "pointer" }}
          onClick={() => addBin()}
        >
          <h4 className="text-primary">
            <i className="fas fa-plus-circle"></i> Add Bin
          </h4>
        </div>
        <div className="col-6"></div>
      </div>
      <div className="row m-2 ">
        <div className="col-3"></div>
        <div className="col-1">
          <h5>Start</h5>
        </div>
        <div className="col-1 col-lg-offset-2">
          <h5>End</h5>
        </div>
      </div>
      {addBins.map((bin, index) => (
        <div className="row m-2 " key={index}>
          <div className="col-3 ml-5">
            <h4>{bin.Name}</h4>
          </div>
          <div className="col-1">
            <input
              type="number"
              value={bin.start}
              style={{ width: 60 }}
              min="0"
              onChange={(e) => handleStartBin(e, index)}
            ></input>
          </div>
          <div className="col-1">
            <input
              type="number"
              value={bin.end}
              min="0"
              style={{ width: 60 }}
              onChange={(e) => handleEndValue(e, index)}
            ></input>
          </div>
          <div
            className="col-1"
            style={{ cursor: "pointer" }}
            onClick={() => deleteSelectedBin(index)}
          >
            <i className="fas fa-trash-alt text-danger"></i>
          </div>
        </div>
      ))}
      <div className="row tc">
        <div className="col-5"></div>
        <div
          className="col-2 m-1 btn btn-primary"
          onClick={() => handleSubmit()}
        >
          <span>Save</span>
        </div>
        <div className="col-2 btn btn-light " onClick={() => handleCancel()}>
          <span>Clear</span>
        </div>
        <Link className="col-2 btn btn-success " to="/bins">
          <span>View Bins</span>
        </Link>
      </div>
    </div>
  );
};

export default BinMaker;
