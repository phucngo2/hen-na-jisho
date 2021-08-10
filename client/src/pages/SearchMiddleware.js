import React from "react";
import { useLocation, Redirect } from "react-router-dom";

const SearchMiddleware = () => {
    let location = useLocation();

    if (!location.state) {
        return <Redirect to="/" />;
    }

    return (
        <Redirect
            to={{
                pathname: "/search/",
                state: { keyword: location.state.keyword },
            }}
        />
    );
};

export default SearchMiddleware;
