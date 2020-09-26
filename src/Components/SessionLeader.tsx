import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../Contexts/FirebaseContext/FirebaseStore";
import { ActionType as SessionActionType } from "../Contexts/SessionContext/Models";
import { SessionStore } from "../Contexts/SessionContext/SessionStore";

export function SessionLeader() {
    const { id: sessionId } = useParams<{ id: string }>();
    const { state, dispatch } = useContext(SessionStore);
    const { api } = useContext(FirebaseContext);

    if (state.sessions == null) {
        api?.getSessions();
    }

    useEffect(() => {
        if (state.sessions !== null && !state.currentSession) {
            const currentSession = state.sessions.find(x => x.id === sessionId);
            dispatch({ type: SessionActionType.SET_CURRENT_SESSION, session: currentSession });
        }
    }, [dispatch, sessionId, state.currentSession, state.sessions]);

    useMemo(() => {
        api?.getUsersForSession(sessionId);
    }, [sessionId]);

    return (
        <>
            <h1>{state.currentSession?.displayName}</h1>
            {state.users.map(user => (
                <div>{user.displayName}</div>
            ))}
        </>
    );
}
