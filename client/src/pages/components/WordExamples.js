import React, { useState } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { CREATE_EXAMPLE, GET_WORD } from "../../utils/graphql";
import DeleteButton from "./DeleteButton";

const WordExample = ({ wordId, examples, user }) => {
    const [errors, setErrors] = useState({});

    let initialState = {
        jp: "",
        vn: "",
    };

    const { onChange, onSubmit, values, setValues } = useForm(
        callback,
        initialState
    );

    const [createExample] = useMutation(CREATE_EXAMPLE, {
        update: (proxy, result) => {
            // Reload data
            const data = proxy.readQuery({
                query: GET_WORD,
                variables: {
                    wordId: wordId,
                },
            });

            proxy.writeQuery({
                query: GET_WORD,
                variables: {
                    wordId: wordId,
                },
                data: {
                    ...data,
                    getWord: result.data.createExample,
                },
            });

            // Clear form
            setValues(initialState);
            setErrors({});
        },
        variables: {
            wordId,
            jp: values.jp,
            vn: values.vn,
        },
        onError: (err) => {
            if (err.graphQLErrors[0]) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        },
    });

    function callback() {
        createExample();
    }

    return (
        <div>
            {examples.length > 0 && (
                <div className="example">
                    <h5>Examples</h5>
                    {examples.map((example) => (
                        <div key={example.id}>
                            <p style={{ padding: 1, margin: 0 }}>
                                <b>{example.jp}</b>
                                {user && user.isAdmin && <DeleteButton wordId={wordId} exampleId={example.id} />}
                            </p>
                            <p style={{ padding: 1, margin: 0 }}>
                                {example.vn}
                            </p>
                            <br />
                        </div>
                    ))}
                </div>
            )}
            {user && user.isAdmin && (
                <Segment>
                    <h4>Add a new Example</h4>
                    <Form onSubmit={onSubmit}>
                        <Form.Input
                            label="Japanese"
                            placeholder="Japanese"
                            name="jp"
                            type="text"
                            value={values.jp}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Vietnamese"
                            placeholder="Vietnamese"
                            name="vn"
                            type="text"
                            value={values.vn}
                            onChange={onChange}
                        />
                        <Button
                            content="Add example"
                            icon="plus"
                            labelPosition="left"
                            color="teal"
                            type="submit"
                        />
                    </Form>
                    {errors.general && (
                        <div className="ui error message">{errors.general}</div>
                    )}
                </Segment>
            )}
        </div>
    );
};

export default WordExample;
