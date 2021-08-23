import React, { useEffect, useState } from "react";
import { Button, Spinner, Container, FormControl, FormCheck } from "react-bootstrap";
import tamblo from "tambola-generator"
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import { useHistory } from 'react-router-dom';

function Ticket() {
    const [list, setList] = useState([]);
    const [ticket, setTicket] = useState(0);
    const history = useHistory()
    const handelSubmit = () => {
        let tickets = tamblo.generateTickets(parseInt(ticket))
        setList(tickets)
    }

    const capture = (type, index) => {
        html2canvas(document.getElementById(`${index}`)).then(canvas => {
            let dataURL = canvas.toDataURL('image/png');

            if (type === 'pdf') {
                const pdf = new jsPDF({
                    orientation: "landscape",
                    unit: "in",
                    format: [14, 10]
                });
                pdf.addImage(dataURL, 'PNG', .6, .6);
                pdf.save(`${index}.pdf`);
            }
        });
    }

    const Card = ({ card, index }) => {
        return <div className="mb-4">
            <div id={index + 1} style={{ marginLeft: "20px", padding: "30px", background: "#abdec5" }} className="border border-success" >
                {card._entries.map(row =>
                    <div class="row ">
                        {row.map(col => <div class="col border border-dark" style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>{col || " "}</div>)}
                    </div>)
                }
                <span> ticket : {index + 1}</span>
            </div>
            <Button onClick={() => capture("pdf", index + 1)} className="mt-1" variant="dark">save</Button>
        </div>
    }
    return (
        <>
            {!list.length ?
                <div className="row" style={{ height: "100vh", background: "#cccbab", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <div>
                            <input style={{ padding: "10px" }} placeholder="input required tickets" onChange={(e) => setTicket(e.target.value)} type="number" />
                        </div>
                        <div className="mt-5">
                            <Button onClick={handelSubmit} variant="success">Generate Tickets</Button>
                        </div>
                    </div>
                </div> :
                <div style={{ background: "#cccbab" }}>
                    <Button onClick={() => history.push("/")} size="sm" variant="success" className="mb-2">Home</Button>
                    <div className="row" >
                        {list.map((ticket, index) => <Card card={ticket} index={index} />)}
                    </div>
                </div>

            }
        </>
    );
}

export default React.memo(Ticket);
