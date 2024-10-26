
import Sidebar from "./components/sidebar"
import Header from "./components/header"
import { Route, Routes } from 'react-router-dom';
import React from "react";
import routes from './routes.tsx';
import LoginForm from './components/loginForm'
import { Typography } from "@mui/material";

const Admin: React.FC = () => {

    const [open, setOpenSidebar] = React.useState(true)

    const [showLoginForm, setShowLoginForm] = React.useState(true);

    const adminPageStyle = {
        width: '100%',
        height: '100%',
    }
    const rightSidePageStyle = {
        marginLeft: open ? 'var(--sidebar-width)' : 0, // Sidebar width
        height: '100vh', // Header + Footer height 
        backgroundColor: '#17181f',
        transition: 'margin-left 225ms',
    }

    const contentAreaStyle = {
        padding: '2rem 1.8rem',
        backgroundColor: '#17181f'
    }

    return (
        <div>
            <LoginForm open={showLoginForm} setShowLoginForm={setShowLoginForm} />
            <div style={adminPageStyle}>
                <Sidebar open={open} />
                <div style={rightSidePageStyle}>
                    <Header setOpenSidebar={setOpenSidebar} open={open} />
                    <div style={contentAreaStyle}>
                        <Routes>
                            {routes.map((route) => (
                                <Route path={route.path} element={<route.component />} />
                            ))}
                        </Routes>
                        <Typography sx={{ textAlign: 'center', mt: '5rem', color: '#aab8c1' }} variant="body2">Copyright © 2024 NDT Shop. All rights reserved.</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
