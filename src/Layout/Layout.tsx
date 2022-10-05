import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import "./Layout.scss";
export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div id="HOCLayout">
            <Header />
            <div className="main">
                <div className="main-content">
                    <SideBar />
                    <div className="main-body">{children}</div>
                </div>
            </div>
        </div>
    );
}
