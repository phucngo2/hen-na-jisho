import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

import { useForm } from "../../utils/hooks";
import {
    CREATE_WORD,
    GET_WORD,
    LIST_WORDS_ADMIN,
    UPDATE_WORD,
} from "../../utils/graphql";

const ModalForm = ({ children, word }) => {
    // Modal handle
    const [open, setOpen] = useState(false);

    const initialState = word
        ? word
        : {
              jp: "",
              vn: "",
              en: "",
              romaji: "",
              pronunciation: "",
              description: "",
              src: "",
          };

    const { onChange, onSubmit, values, setValues } = useForm(
        wordCallBack,
        initialState
    );

    const [createWord, { loading }] = useMutation(CREATE_WORD, {
        update: (proxy, result) => {
            // Reload data
            const data = proxy.readQuery({
                query: LIST_WORDS_ADMIN,
            });

            let newData = [result.data.createWord, ...data.listWords];

            proxy.writeQuery({
                query: LIST_WORDS_ADMIN,
                data: {
                    ...data,
                    listWords: newData,
                },
            });

            // Close Modal
            setOpen(false);
            // Clear form
            setValues({
                jp: "",
                vn: "",
                en: "",
                romaji: "",
                pronunciation: "",
                description: "",
                src: "",
            });
        },
        onError: (err) => {},
        variables: values,
    });

    const [updateWord, { loading: updateLoading }] = useMutation(UPDATE_WORD, {
        update: (proxy, result) => {
            // Reload data
            // const data = proxy.readQuery({
            //     query: GET_WORD,
            //     variables: {
            //         wordId: word.id,
            //     },
            // });

            // proxy.writeQuery({
            //     query: GET_WORD,
            //     variables: {
            //         wordId: word.id,
            //     },
            //     data: {
            //         ...data,
            //         getWord: result.data.updateWord,
            //     },
            // });

            // Close Modal
            setOpen(false);
        },
        onError: (err) => {},
        variables: values,
        // refetchQueries: [
        //     {
        //         query: GET_WORD,
        //         variables: { wordId: word.id },
        //     },
        // ],
    });

    function wordCallBack() {
        if (word) {
            updateWord();
        } else {
            createWord();
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={children}
        >
            <Modal.Header>Form</Modal.Header>
            <Modal.Content>
                <Form
                    onSubmit={onSubmit}
                    className={loading || updateLoading ? "loading" : ""}
                >
                    <Form.Group widths="equal">
                        <Form.Input
                            label="Japanese"
                            placeholder="Japanese"
                            name="jp"
                            type="text"
                            value={values.jp}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Hiragana"
                            placeholder="Hiragana"
                            name="pronunciation"
                            type="text"
                            value={values.pronunciation}
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
                        <Form.Input
                            label="Engrisk"
                            placeholder="Engrisk"
                            name="en"
                            type="text"
                            value={values.en}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            label="Romaji"
                            placeholder="Romaji"
                            name="romaji"
                            type="text"
                            value={values.romaji}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Description"
                            placeholder="Description"
                            name="description"
                            type="text"
                            value={values.description}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Source"
                            placeholder="Source"
                            name="src"
                            type="text"
                            value={values.src}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Button type="submit" primary>
                        Submit
                    </Button>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalForm;
