import { createContext, useState } from "react";

export const Navigation = createContext({
    route: "",
    updateRoute: (newRoute) => {}
});

/**
 * Keeps track of the current route for the navigation bar
 * 
 * @param {{children: any}} props 
 * @returns Context provider to assist navigation bar
 */
export default function NavigationProvider(props) {
    const [route, setRoute] = useState("");

    /**
     * Updates the route
     * 
     * @param {string} newRoute 
     */
    function updateRoute(newRoute) {
        if (newRoute !== "" || newRoute !== undefined) {
            setRoute(newRoute);
        }
    }

    return (
        <Navigation.Provider
            value={{
                route: route,
                updateRoute: updateRoute
            }}
        >
            {props.children}
        </Navigation.Provider>
    );
};