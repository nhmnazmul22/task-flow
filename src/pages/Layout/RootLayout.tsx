import {Outlet} from "react-router";

const RootLayout = () => {
    return (
        <div>
            <nav>Navbar</nav>
            <div className={`flex`}>
                <aside className={`min-w-75`}>Sidebar</aside>
                <Outlet/>
            </div>
            <footer>footer</footer>
        </div>
    );
};

export default RootLayout;