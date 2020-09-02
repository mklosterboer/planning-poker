import React from "react";
import "../App.css";
import firebase from "../Firebase";
import { Row, Col } from "react-bootstrap";

function HomePage() {
    const [dbValue, setDbValue] = React.useState("initialValue");

    React.useEffect(() => {
        // const fbRef = firebase.database().ref("test");

        // fbRef.on("value", snapshot => {
        //     let fbValue = snapshot.val();
        //     setDbValue(fbValue);
        // });
    }, []);

    return (
        <>
            <Row className="justify-content-md-center">
                <h1>Planning Poker</h1>
            </Row>
            <Row className="justify-content-md-center">{dbValue}</Row>
            <Row className="justify-content-md-center">
                <Col md="4" className="justify-content-md-center" style={{ display: "flex" }}>
                    <h2>Create a new session</h2>
                </Col>
                <Col md="4" className="justify-content-md-center" style={{ display: "flex" }}>
                    <h2>Join an existing session</h2>
                </Col>
            </Row>
        </>
    );
}

export default HomePage;
