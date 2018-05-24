import React from 'react';

let guestSession = { isLogged: false, role: 'Guest', token: ''}
const SessionContext = React.createContext(guestSession);

export default SessionContext;
