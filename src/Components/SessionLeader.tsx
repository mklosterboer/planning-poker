import React, { useContext } from "react";
import { SessionStore } from "../Contexts/SessionContext/SessionStore";

function SessionLeader() {
    const { state } = useContext(SessionStore);
}