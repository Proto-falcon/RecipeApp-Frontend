import { createContext, useState } from "react";

const CsrfCtx = createContext({
        token: "",
        sessionId: "",
        setCsrfToken: (newToken) => {},
        setSession: (newSession) => {}
    }
);

export function CsrfContext(props) {
    const [token, setToken] = useState("");
    const [session, setSession] = useState();
    

    /**
     * Updates the csrf `token`
     * 
     * @param {string} newToken 
     */
    function updateToken(newToken) {
        setToken(newToken);
    }

    /**
     * Updates the `session` Id
     * 
     * @param {string} newSession 
     */
    function updateSession(newSession) {
        setSession(newSession);
    }

    return (
        <CsrfCtx.Provider
         value={{
                token: token,
                sessionId: session,
                setCsrfToken: updateToken,
                setSession: updateSession
            }
        }
        >
            {props.children}
        </CsrfCtx.Provider>
    );
}

export default CsrfCtx;
