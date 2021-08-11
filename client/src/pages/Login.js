import React, { useContext, useState } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphql";
import { useForm } from "../utils/hooks";

const Register = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    let history = useHistory();

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update: (proxy, result) => {
            context.login(result.data.login);
            history.push("/");
        },
        onError: (err) => {
            if (err.graphQLErrors[0]) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        },
        variables: {
            username: values.username,
            password: values.password,
        },
    });

    async function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="">
            <Form className={loading ? "loading" : "form-width"} onSubmit={onSubmit}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                    error={
                        errors.username && {
                            content: errors.username,
                        }
                    }
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                    error={
                        errors.password && {
                            content: errors.password,
                        }
                    }
                />
                <Form.Field>
                    <Checkbox label="We won't remember you!" />
                </Form.Field>
                <Button type="submit" primary>
                    Login
                </Button>
                <Link to="/register" className="ui button" style={{ marginLeft: 6 }}>
                    Register
                </Link>
            </Form>
            {errors.general && (
                <div className="ui error message">
                    {errors.general}
                </div>
            )}
        </div>
    );
};

export default Register;
