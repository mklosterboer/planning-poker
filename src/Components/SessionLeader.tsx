import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../Contexts/FirebaseContext/FirebaseStore";
import { SessionStore } from "../Contexts/SessionContext/SessionStore";

export function SessionLeader() {
    const { id } = useParams<{ id: string }>();
    const { state } = useContext(SessionStore);
    const { api } = useContext(FirebaseContext);

    useEffect(() => {
        api?.getUsersForSession(id);
    }, []);

    console.log("id", id);
    console.log(state.users);

    return (
        <>
            <h1>{state.session?.displayName}</h1>
            {state.users.forEach(user => {
                return (
                    <div>
                        {user.displayName}
                    </div>
                )
            })}
        </>
    )
}