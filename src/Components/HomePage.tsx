import React, { useContext } from "react";
import "../App.css";
// import firebase from "../Firebase";
import { Row, Col, Button } from "react-bootstrap";
import { UserStore } from "../Contexts/UserContext";
import { FirebaseContext } from "../Contexts/FirebaseContext/FirebaseStore";

function HomePage() {
    // const [dbValue, setDbValue] = React.useState("initialValue");

    const { state } = useContext(UserStore.UserStore);
    const { api } = useContext(FirebaseContext);

    React.useEffect(() => {
        // const fbRef = firebase.database().ref("test");

        // fbRef.on("value", snapshot => {
        //     let fbValue = snapshot.val();
        //     setDbValue(fbValue);
        // });
        api?.getDbValue();
        api?.getUsers();
    }, []);

    function setValue() {
        api?.addUser({
            id: "123",
            sessionId: "321",
            displayName: "New User 4"
        });
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <h1>Planning Poker</h1>
            </Row>
            <Row className="justify-content-md-center">{state.user?.displayName}</Row>
            <Button onClick={setValue}>Change Value</Button>
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
