import React from 'react';
import { useParams } from 'react-router-dom';

export function JoinSession() {
    const {id: sessionId} = useParams<{id: string}>();

    return <div></div>
}