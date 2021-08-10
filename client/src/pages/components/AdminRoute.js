import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../context/auth";

function AdminRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    if (!user || (user && !user.isAdmin)) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                <Component {...props} />
            }
        />
    );
}

export default AdminRoute;