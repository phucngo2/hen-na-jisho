import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Pagination } from "semantic-ui-react";

import { WORDS_PER_PAGE } from "../../utils/constants";

const Table = ({ data }) => {
    // Pagination handle
    const [activePage, setActivePage] = useState(1);
    const handlePaginationChange = (e, { activePage }) =>
        setActivePage(activePage);

    let history = useHistory();

    const handleSelectRow = (wordId) => {
        history.push(`/dict/${wordId}`);
    };

    return (
        <table className="ui celled table unstackable selectable">
            <thead>
                <tr>
                    <th>Japanese</th>
                    <th>Pronunciation</th>
                    <th>Vietnamese</th>
                    <th>Engrisk</th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data
                        .slice(
                            WORDS_PER_PAGE * (activePage - 1),
                            WORDS_PER_PAGE * activePage
                        )
                        .map((word) => (
                            <tr
                                key={word.id}
                                onClick={() => handleSelectRow(word.id)}
                            >
                                <td>{word.jp}</td>
                                <td>{word.pronunciation}</td>
                                <td>{word.vn}</td>
                                <td>{word.en}</td>
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
                            totalPages={Math.ceil(data.length / WORDS_PER_PAGE)}
                            boundaryRange={0}
                            siblingRange={2}
                        />
                    </th>
                </tr>
            </tfoot>
        </table>
    );
};

export default Table;
