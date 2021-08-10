import React, { useState } from "react";
import { Button, Icon, Pagination } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import ModalForm from "./components/ModalForm";
import { LIST_WORDS_ADMIN } from "../utils/graphql";
import { WORDS_PER_PAGE } from "../utils/constants";
import DeleteButton from "./components/DeleteButton";

const Admin = () => {
    // Pagination handle
    const [activePage, setActivePage] = useState(1);
    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage);
    };

    // GraphQL fetch
    const { loading, data } = useQuery(LIST_WORDS_ADMIN);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <ModalForm>
                <Button
                    content="Add new"
                    icon="plus"
                    labelPosition="left"
                    color="teal"
                />
            </ModalForm>
            <table className="ui celled table unstackable">
                <thead>
                    <tr>
                        <th>Japanese</th>
                        <th>Vietnamese</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.listWords &&
                        data.listWords
                            .slice(
                                WORDS_PER_PAGE * (activePage - 1),
                                WORDS_PER_PAGE * activePage
                            )
                            .map((word) => (
                                <tr key={word.id}>
                                    <td>{word.jp}</td>
                                    <td>{word.vn}</td>
                                    <td>
                                        <Button
                                            content="Show Detail"
                                            icon="edit"
                                            labelPosition="left"
                                            floated="right"
                                            color="blue"
                                            as={Link}
                                            to={`/dict/${word.id}`}
                                        />
                                    </td>
                                    <td>
                                        <DeleteButton wordId={word.id} />
                                    </td>
                                </tr>
                            ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="4">
                            <Pagination
                                size="small"
                                activePage={activePage}
                                onPageChange={handlePaginationChange}
                                ellipsisItem={null}
                                firstItem={{
                                    content: <Icon name="angle double left" />,
                                    icon: true,
                                }}
                                lastItem={{
                                    content: <Icon name="angle double right" />,
                                    icon: true,
                                }}
                                prevItem={{
                                    content: <Icon name="angle left" />,
                                    icon: true,
                                }}
                                nextItem={{
                                    content: <Icon name="angle right" />,
                                    icon: true,
                                }}
                                totalPages={Math.ceil(
                                    data.listWords.length / WORDS_PER_PAGE
                                )}
                                boundaryRange={0}
                                siblingRange={2}
                            />
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Admin;
