import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UserStore } from "../Contexts/UserContext/UserStore";
import { FirebaseContext } from "../Contexts/FirebaseContext/FirebaseStore";
import { Session } from "../Contexts/SessionContext/Models";
import { SessionStore } from "../Contexts/SessionContext/SessionStore";
import { useHistory } from "react-router-dom";

function HomePage() {
    // const [dbValue, setDbValue] = React.useState("initialValue");
    const history = useHistory();

    const { state } = useContext(UserStore);
    const { state: sessionState } = useContext(SessionStore);
    const { api } = useContext(FirebaseContext);

    React.useEffect(() => {
        api?.getUsers();
    }, []);

    function setValue() {
        api?.addUser({
            id: "123",
            sessionId: "161742",
            displayName: "New User 5"
        });
    }

    function createSession() {
        // TODO: Allow user to name the session
        // TODO: Maybe make this actually check if this is random/has been used. Could put it in
        //      the firebase context and ask for a new ID
        var newID = Math.floor(Math.random() * (99999 - 10000 + 1) + 100000).toString();
        var newSession: Session = {
            id: newID,
            displayName: `New Session - ${newID}`,
        };

        api?.createSession(newSession);

        history.push(`/session/${newID}`);
        // TODO: Redirect to existing session page
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
                    <Button onClick={createSession}>New Session</Button>
                    <div>
                        Current Session: {sessionState.session?.displayName}
                    </div>
                </Col>
                <Col md="4" className="justify-content-md-center" style={{ display: "flex" }}>
                    <h2>Join an existing session</h2>
                </Col>
            </Row>
        </>
    );
}

export default HomePage;
