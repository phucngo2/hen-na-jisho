import { useQuery } from "@apollo/client";
import React from "react";
import { useLocation, Redirect } from "react-router-dom";

import { SEARCH_WORDS } from "../utils/graphql";
import Table from "./components/Table";

const Search = () => {
    let location = useLocation();
    let keyword = location.state.keyword;

    const { loading, data, error } = useQuery(SEARCH_WORDS, {
        variables: {
            keyword: keyword,
        },
        onError: (err) => console.log(err),
    });

    if (!location.state) {
        return <Redirect to="/" />;
    }

    if (loading) {
        return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }

    if (error || (!loading && !data) || data.searchWords.length === 0) {
        return (
            <h1 style={{ textAlign: "center" }}>
                We could not find your information...
            </h1>
        );
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Search result for {location.state.keyword}
            </h1>
            <Table data={data.searchWords} />
        </div>
    );
};

export default Search;
