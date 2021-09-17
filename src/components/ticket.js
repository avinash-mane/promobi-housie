import React, { useEffect, useState } from "react";
import { Button, Spinner, Container, FormControl, FormCheck } from "react-bootstrap";
import tamblo from "tambola-generator"
import html2canvas from 'html2canvas'
import { useHistory } from 'react-router-dom';

const constSets = [1, 2, 3, 4, 5, 6];
const colors = ["red", "green", "blue", "purple", "orange", "yellow"]
function Ticket() {
    const [list, setList] = useState([]);
    const [player, setPlayers] = useState(0);
    const [sets, setSets] = useState(1);
    const history = useHistory()
    const handelSubmit = () => {
        let tickets = tamblo.generateTickets(parseInt(player * sets))
        setList(tickets)
    }

    const capture = (color, index) => {
        html2canvas(document.getElementById(`${index*(colors.indexOf(color)+1)}`)).then(canvas => {
            let dataURL = canvas.toDataURL('image/png');
            var link = document.createElement('a');
            link.download = `${color + "_" + index}.png`;
            link.href = dataURL;
            link.click();
        });
    }

    //const Temp = 
    const Card = () => {
        let temp = 0;
        const func = (card, index) => {
            if (index % player == 0) temp += 1
            let i = index + 1 > player ? (index + 1) - player * (temp - 1) : index + 1
            let color = colors[temp - 1]
            return <div className="mb-4">
                <div id={index+1} style={{ marginLeft: "20px", padding: "30px", background: "#fff" }} className="border border-success" >
                    <span>{color}</span>
                    {card._entries.map(row =>
                        <div class="row ">
                            {row.map(col => <div class="col border border-dark" style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", background: col ? "#fff" : colors[temp - 1] }}>{col || " "}</div>)}
                        </div>)
                    }
                    <span> ticket : {i}</span>
                </div>
                <Button onClick={() => capture(color, i)} className="mt-1" variant="dark">save</Button>
            </div>
        }
        return func;
    }

    const tempCard = Card();

    return (
        <>
            {!list.length ?
                <div className="row" style={{ height: "100vh", background: "#cccbab", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <Button onClick={() => history.push("/promobi-housie")} size="sm" variant="success" className="mb-2">Home</Button>
                        <div>
                            <input style={{ padding: "10px" }} placeholder="enter number of players" onChange={(e) => setPlayers(e.target.value)} type="number" />
                        </div>
                        <div className="mt-2">
                            <label className="mr-3">select number of sets : </label>
                            <select onChange={(e) => setSets(e.target.value)} className="px-2 py-1">
                                {constSets.map(set => <option value={set} >{set}</option>)}
                            </select>
                        </div>
                        <div className="mt-5">
                            <Button onClick={handelSubmit} variant="success">Generate Tickets</Button>
                        </div>
                    </div>
                </div> :
                <div style={{ background: "#cccbab" }}>
                    <Button onClick={() => history.push("/promobi-housie")} size="sm" variant="success" className="mb-2">Home</Button>
                    <div className="row" >
                        {list.map((ticket, index) => tempCard(ticket, index))}
                    </div>
                </div>

            }
        </>
    );
}

export default React.memo(Ticket);
