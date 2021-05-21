import React, { useState } from "react";
import { Button, Spinner, Container, FormControl } from "react-bootstrap";
function App() {
  const [list, setList] = useState([]);
  const [isWating, setIsWating] = useState(false);
  const [spinner, setSpiner] = useState(1);
  const [search, setSearch] = useState(0);

  const handleOnClick = () => {
    let intervalId = setInterval(() => {
      let number = Math.floor(Math.random() * (100 - 1) + 1)
      setSpiner(number)
    }, 50)
    let flag = true;
    while (flag && list.length !== 99) {
      let number = Math.floor(Math.random() * (100 - 1) + 1)
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
    debugger
  }

  return (
    <div className="row" style={{ height: "100vh", border: "2px solid" }}>
      <div className="col-4 d-flex align-items-center flex-column pt-3" style={{ backgroundColor: "#edf5fe" }}>
        <div className="d-flex align-items-center">
          <FormControl type="number" placeholder="Check number in list" onChange={handleSearch} />
          <span className="ml-2">{search ? list.includes(search) ? <>&#x2714;</> : <>&#x2716;</> : ""}</span>
        </div>
        <div style={{ fontSize: "20px" }} className="pt-2">Previous</div>
        <div style={{ width: "120px", height: "120px" }} className="d-flex align-items-center justify-content-center border border-secondary rounded-circle mb-1" >
          {list.length !== 0 &&
            <span style={{ fontSize: "70px", color: "grey" }}>
              {list[list.length - 2]}
            </span>
          }
        </div>
        <div style={{ width: "220px", height: "220px" }} className="d-flex align-items-center justify-content-center border border-dark rounded-circle" >
          {isWating ?
            <span style={{ fontSize: "150px", color: "grey" }}>
              {spinner}
            </span> :
            list.length ?
              <span style={{ fontSize: list.length ? "150px" : "50px" }}>
                {list[list.length - 1]}
              </span> :
              <h1>Start With Spin &#x21e9;</h1>
          }
        </div>
        <Button className="mt-3" variant="outline-primary" onClick={handleOnClick} size="lg">
          {isWating ?
            <Spinner animation="border" variant="info" /> :
            <>Spin &#x27F3;</>
          }
        </Button>

        <Button className="mt-5" variant="secondary" onClick={() => setList([])} size="sm">
          Reset
        </Button>
      </div>
      <div className="col pt-2" style={{ overflow: "auto", height: "100%", backgroundColor: "#eef0d6", borderLeft: "1px solid" }}>
        <Container>
          {list.length != 0 ?
            <div class="d-flex flex-wrap">
              {list.map((number, index) => <div className="d-flex align-items-center justify-content-between border border-primary rounded-pill mx-2 my-2 px-3 pt-1" style={{ width: "100px", backgroundColor: list.length == index + 1 ? "#f5cf9f" : number == search ? "#7ff383" : "" }}>
                <h6 style={{ color: "grey" }}>{index + 1}</h6>
                <h3 className="ml-2">{number}</h3>
              </div>)}
            </div> :
            <div className="mt-5">
              <h1>Good Luck....!!!!</h1>
            </div>
          }
        </Container>
      </div>
    </div>
  );
}

export default React.memo(App);
