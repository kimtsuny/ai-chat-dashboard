import { Link } from "react-router-dom";
export function SidebarItem({ label, to }) {
    return (
        <>
            <div to={to} className="">
                
                {label}
            </div>
        </>
    )
}