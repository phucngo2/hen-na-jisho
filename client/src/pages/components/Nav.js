import React, { useContext, useState } from "react";
import { Icon, Input, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const Nav = () => {
    // Handle active based on pathname
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const [keyword, setKeyword] = useState("");

    let history = useHistory();

    const handleSubmitSearch = () => {
        history.push({
            pathname: "/search",
            state: { keyword: keyword },
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmitSearch();
        }
    };

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const { user, logout } = useContext(AuthContext);

    const navBar = user ? (
        <Menu inverted stackable className="ui fixed">
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item>
                <Input
                    icon={
                        <Icon
                            name="search"
                            circular
                            link
                            onClick={handleSubmitSearch}
                        />
                    }
                    placeholder="Search..."
                    value={keyword}
                    onKeyDown={handleKeyPress}
                    onChange={(event) => setKeyword(event.target.value)}
                />
            </Menu.Item>
            <Menu.Menu position="right">
                {user.isAdmin ? (
                    <Menu.Item as={Link} to="/admin">
                        <span>Hello, {user.username}!</span>
                    </Menu.Item>
                ) : (
                    <Menu.Item>
                        <span>Hello, {user.username}!</span>
                    </Menu.Item>
                )}

                <Menu.Item name="logout" onClick={logout} />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu inverted stackable className="ui fixed">
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item>
                <Input
                    icon={
                        <Icon
                            name="search"
                            circular
                            link
                            onClick={handleSubmitSearch}
                        />
                    }
                    placeholder="Search..."
                    value={keyword}
                    onKeyDown={handleKeyPress}
                    onChange={(event) => setKeyword(event.target.value)}
                />
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item
                    name="login"
                    active={activeItem === "login"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={activeItem === "register"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );

    return navBar;
};

export default Nav;
