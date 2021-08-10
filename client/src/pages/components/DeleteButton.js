import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

import {
    DELETE_WORD,
    LIST_WORDS_ADMIN,
    DELETE_COMMENT,
    DELETE_EXAMPLE,
} from "../../utils/graphql";

const DeleteButton = ({ wordId, commentId, exampleId }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId
        ? DELETE_COMMENT
        : exampleId
        ? DELETE_EXAMPLE
        : DELETE_WORD;

    const [handleDelete] = useMutation(mutation, {
        update: (proxy) => {
            setConfirmOpen(false);

            if (!commentId && !exampleId) {
                const data = proxy.readQuery({
                    query: LIST_WORDS_ADMIN,
                });

                let newData = data.listWords.filter((w) => w.id !== wordId);

                proxy.writeQuery({
                    query: LIST_WORDS_ADMIN,
                    data: {
                        ...data,
                        listWords: newData,
                    },
                });
            }
        },
        onError: (err) => {
            console.log(err);
        },
        variables: {
            wordId,
            commentId,
            exampleId,
        },
    });

    return (
        <>
            <Button
                content="Delete"
                icon="trash"
                labelPosition="left"
                floated="right"
                color="red"
                style={{ marginLeft: 6 }}
                onClick={() => setConfirmOpen(true)}
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default DeleteButton;
