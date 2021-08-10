import React, { useContext, useState } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import bcrypt from "bcryptjs";

import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphql";
import { useForm } from "../utils/hooks";

const Register = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [hashedPassword, setHashedPassword] = useState("");

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        password: "",
        confirmPassword: "",
    });

    let history = useHistory();

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update: (proxy, result) => {
            context.login(result.data.register);
            history.push("/");
        },
        onError: (err) => {
            if (err.graphQLErrors[0]) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        },
        variables: {
            username: values.username,
            password: hashedPassword,
        },
    });

    async function registerUser() {
        if (values.password !== values.confirmPassword) {
            setErrors({
                confirmPassword: "Password and confirm password must match!",
            });
            return;
        }

        setHashedPassword(await bcrypt.hash(values.password, 12));
        addUser();
    }

    return (
        <Form
            className={loading ? "loading" : "form-width"}
            onSubmit={onSubmit}
        >
            <h1>Register</h1>
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
            <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={onChange}
                error={
                    errors.confirmPassword && {
                        content: errors.confirmPassword,
                    }
                }
            />
            <Form.Field>
                <Checkbox label="We don't have Terms and Conditions!" />
            </Form.Field>
            <Button type="submit" primary>
                Register
            </Button>
            <Link to="/login" className="ui button" style={{ marginLeft: 6 }}>
                Login
            </Link>
        </Form>
    );
};

export default Register;
