import { useMutation, useQuery } from "@apollo/client";
import React, { useRef, useState, useContext } from "react";
import {
    Button,
    Card,
    Form,
    Grid,
    Icon,
    Image,
    Label,
    Segment,
} from "semantic-ui-react";
import { Link, Redirect, useParams } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import ModalForm from "./components/ModalForm";
import { GET_WORD, CREATE_COMMENT } from "../utils/graphql";
import DeleteButton from "./components/DeleteButton";
import WordExamples from "./components/WordExamples";

const WordDetail = () => {
    // Handle comment
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState("");

    const { user } = useContext(AuthContext);

    let params = useParams();
    let wordId = params.wordId;
    const { loading, data, error } = useQuery(GET_WORD, {
        variables: {
            wordId,
        },
    });

    const [submitComment] = useMutation(CREATE_COMMENT, {
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
                    getWord: result.data.createComment,
                },
            });

            // Clear form
            setComment("");
            commentInputRef.current.blur();
        },
        variables: {
            wordId,
            body: comment,
        },
        onError: (err) => console.log(err),
    });

    if (error || (!loading && !data)) {
        console.log(error);
        return <Redirect to="/" />;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {data.getWord && (
                <>
                    <Segment className="segment-width">
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column width={7}>
                                    <h1>{data.getWord.jp}</h1>
                                    <span>{data.getWord.pronunciation}</span>
                                    <br />
                                    <p>
                                        Other Dictionary:{" "}
                                        <a
                                            href="https://google.com"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Click me
                                        </a>
                                        !
                                    </p>
                                    <Button as="div" labelPosition="right">
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label
                                            basic
                                            color="blue"
                                            pointing="left"
                                        >
                                            {data.getWord.commentCount}
                                        </Label>
                                    </Button>
                                    {user && user.isAdmin && (
                                        <ModalForm
                                            word={{
                                                id: wordId,
                                                jp: data.getWord.jp,
                                                vn: data.getWord.vn,
                                                en: data.getWord.en,
                                                romaji: data.getWord.romaji,
                                                pronunciation:
                                                    data.getWord.pronunciation,
                                                description:
                                                    data.getWord.description,
                                                src: data.getWord.src,
                                            }}
                                        >
                                            <Button
                                                content="Edit"
                                                icon="edit"
                                                labelPosition="left"
                                                color="blue"
                                                style={{ marginLeft: 6 }}
                                            />
                                        </ModalForm>
                                    )}
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="ui list">
                                        <h3 className="word-sub">
                                            1. Vietnamese: {data.getWord.vn}
                                        </h3>
                                        <h3 className="word-sub">
                                            2. Engrisk: {data.getWord.en}
                                        </h3>
                                        <p>{data.getWord.description}</p>
                                    </div>
                                    <WordExamples
                                        wordId={wordId}
                                        examples={data.getWord.examples}
                                        user={user}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment className="segment-width">
                        {!user ? (
                            <p>
                                Please <Link to="/login">login</Link> to post a
                                comment
                            </p>
                        ) : (
                            <p>Post a Comment</p>
                        )}
                        <Form>
                            <div className="ui action input fluid">
                                <input
                                    type="text"
                                    placeholder="Comment..."
                                    name="comment"
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(event.target.value)
                                    }
                                    ref={commentInputRef}
                                />
                                <button
                                    type="submit"
                                    className="ui button teal"
                                    disabled={!user || comment.trim() === ""}
                                    onClick={submitComment}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Segment>
                    {data.getWord.comments.map((comment) => (
                        <Card className="segment-width" key={comment.id}>
                            <Card.Content>
                                {user &&
                                    (user.username === comment.username ||
                                        user.isAdmin) && (
                                        <DeleteButton
                                            wordId={data.getWord.id}
                                            commentId={comment.id}
                                        ></DeleteButton>
                                    )}
                                <Card.Header>
                                    <Image src="/avatar.jpg" avatar />
                                    <span style={{ marginLeft: 6 }}>
                                        {comment.username}
                                    </span>
                                </Card.Header>
                                <Card.Meta>
                                    {moment(comment.createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {comment.body}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </>
            )}
        </div>
    );
};

export default WordDetail;
