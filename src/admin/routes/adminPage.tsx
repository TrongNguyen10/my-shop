import { Route, Routes } from "react-router-dom"
import Admin from "../admin"

const AdminPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/my-shop/admin" element={<Admin />} />
            </Routes>
        </div>
    )
}

export default AdminPage
