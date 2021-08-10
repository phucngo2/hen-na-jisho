import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";
import Nav from "./pages/components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WordDetail from "./pages/WordDetail";
import Admin from "./pages/Admin";
import AuthRoute from "./pages/components/AuthRoute";
import AdminRoute from "./pages/components/AdminRoute";
import Search from "./pages/Search";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Nav />
                <Container className="page-container">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/dict/:wordId" exact>
                            <WordDetail />
                        </Route>
                        <Route path="/search/" exact>
                            <Search />
                        </Route>
                        <AuthRoute path="/login" exact>
                            <Login />
                        </AuthRoute>
                        <AuthRoute path="/register" exact>
                            <Register />
                        </AuthRoute>
                        <AdminRoute path="/admin" exact>
                            <Admin />
                        </AdminRoute>
                    </Switch>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
