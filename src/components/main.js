import React, { useEffect, useState } from "react";
import { Button, Spinner, Container, FormControl } from "react-bootstrap";
function App() {
  const [list, setList] = useState([]);
  const [isWating, setIsWating] = useState(false);
  const [spinner, setSpiner] = useState(1);
  const [search, setSearch] = useState(0);
  const [view, setView] = useState(true)

  useEffect(() => {
    if (list.length) localStorage.setItem("numbers", JSON.stringify(list))
  }, [list])

  useEffect(() => {
    let stoaredList = JSON.parse(localStorage.getItem("numbers"))
    if (stoaredList) setList(stoaredList)
  }, [])

  const handleOnReset = () => {
    setList([])
    localStorage.removeItem("numbers")
  }

  const handleOnClick = () => {
    let intervalId = setInterval(() => {
      let number = Math.floor(Math.random() * (90 - 1) + 1)
      setSpiner(number)
    }, 50)
    let flag = true;
    while (flag && list.length !== 90) {
      let number = Math.floor(Math.random() * (90 - 1) + 1)
      if (!list.includes(number)) {
        setIsWating(true)
        flag = false
        setTimeout(() => {
          clearInterval(intervalId)
          setList([...list, number])
          setIsWating(false)
        }, 1000)
      }
    }
  }

  const handleSearch = (e) => {
    setSearch(parseInt(e.target.value))
  }

  const Sequence = () => {
    let tempList = []
    for (let i = 0; i <= 89; i++) {
      tempList.push(<div
        className="d-flex align-items-center justify-content-between border border-primary rounded-pill mx-2 my-2 px-3 "
        style={{ width: "80px", height: "40px", backgroundColor: list.length == i + 1 ? "#f5cf9f" : list[i] == search ? "#7ff383" : "" }}>
        <h6 className="pt-1" style={{ color: "grey" }}>{i + 1}</h6>
        <span className="ml-2 " style={{ fontSize: "25px" }}><b>{list[i] && list[i]}</b></span>
      </div>)
    }
    return tempList;
  }

  const Board = () => {
    let tempList = []
    for (let i = 1; i <= 90; i++) {
      tempList.push(<div
        className="d-flex align-items-center justify-content-between border border-primary rounded-pill mx-2 my-2 px-3 "
        style={{ width: "80px", height: "40px", backgroundColor: list.includes(i) ? "#f5cf9f" : list[i] == search ? "#7ff383" : "" }}>
        <span className="pl-3 " style={{ fontSize: "25px", color: !list.includes(i) ? "grey" : "" }}><b>{i}</b></span>
      </div>)
    }
    return tempList;
  }

  return (
    <div className="row" style={{ height: "100vh", border: "2px solid" }}>
      <div className="col-3 d-flex align-items-center flex-column pt-3" style={{ backgroundColor: "#edf5fe" }}>
        <div className="d-flex justify-content-center">
          {/* <FormControl type="number" placeholder="Check number in list" onChange={handleSearch} />
          <span className="ml-2" style={{ fontSize: "20px", color: list.includes(search) ? "green" : "red" }}>
            {search ? list.includes(search) ? <>&#x2714;</> : <>&#x2716;</> : ""}
          </span> */}
          <Button variant="secondary" onClick={handleOnReset} size="sm">
            Reset
        </Button>
          <Button className="ml-3" variant="success" onClick={() => setView(!view)} size="sm">
            Change View
        </Button>
        </div>
        <div style={{ fontSize: "20px" }} className="pt-2">Previous</div>
        <div style={{ width: "100px", height: "100px" }} className="d-flex align-items-center justify-content-center border border-secondary rounded-circle mb-1" >
          {list.length !== 0 &&
            <span style={{ fontSize: "60px", color: "grey" }}>
              {list[list.length - 2]}
            </span>
          }
        </div>
        <div style={{ width: "200px", height: "200px" }} className="d-flex align-items-center justify-content-center border border-dark rounded-circle" >
          {isWating ?
            <span style={{ fontSize: "135px", color: "grey" }}>
              {spinner}
            </span> :
            list.length ?
              <span style={{ fontSize: list.length ? "135px" : "45px" }}>
                {list[list.length - 1]}
              </span> :
              <h1>Start With Spin &#x21e9;</h1>
          }
        </div>
        <Button className="mt-3" variant="outline-primary" onClick={handleOnClick}>
          {isWating ?
            <Spinner animation="border" variant="info" /> :
            <>Spin &#x27F3;</>
          }
        </Button>
      </div>
      <div className="col pt-2" style={{ overflow: "auto", height: "100%", backgroundColor: "#eef0d6", borderLeft: "1px solid" }}>
        <div>
          <div class="d-flex flex-wrap">
            {view ? <Sequence /> : <Board />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);
