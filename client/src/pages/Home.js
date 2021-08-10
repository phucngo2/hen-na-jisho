import { useQuery } from "@apollo/client";
import React from "react";

import { LIST_WORDS } from "../utils/graphql";
import Table from "./components/Table";

const Home = () => {
    // GraphQL fetch
    const { loading, data } = useQuery(LIST_WORDS);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Từ Điển Kỳ Quái</h1>
            <Table data={data.listWords} />
        </div>
    );
};

export default Home;
