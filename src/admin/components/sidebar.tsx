// Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Apps, Category } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = (props: any) => {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        event = event
        setExpanded(newExpanded ? panel : false);
    };


    const sidebarStyle = {
        // Drawer
        '& .css-153gm7s-MuiPaper-root-MuiDrawer-paper': {
            backgroundColor: '#1e1f27',
            color: '#fff',
            width: 'var(--sidebar-width)',
            overflowX: 'hidden',
        },
        // ListItem
        '& .css-20bmp1-MuiSvgIcon-root': {
            color: '#fff'
        },
        // ListItemIcon
        '& .css-cveggr-MuiListItemIcon-root': {
            minWidth: 40
        },
        // Accordion - ListItem
        '& .css-nt424e-MuiPaper-root-MuiAccordion-root': {
            backgroundColor: "#1e1f27",
            color: '#fff',
            boxShadow: 'none',
            width: '100%',
        },
        // Link
        '& .linkTag.inactive': {
            display: 'block',
            color: '#fff',
            textDecoration: 'none',
            paddingLeft: '3.5rem',
            cursor: 'pointer',
        },
        '& .linkTag.active': {
            display: 'block',
            color: 'orange',
            backgroundColor: '#2a2c33',
            textDecoration: 'none',
            paddingLeft: '4rem',
            cursor: 'pointer',
        },
        '& .linkTag.inactive:hover': {
            color: 'orange',
            transform: 'translateX(10px)'
        },
        // AccordionDetails
        '& .css-15v22id-MuiAccordionDetails-root': {
            padding: 0
        },
        // ListItem
        '& .css-193q0wg-MuiListItem-root': {
            padding: 0,
            marginBottom: 1
        },
    }

    return (
        <Drawer open={props.open} sx={sidebarStyle} variant="persistent">
            <List>
                <ListItem sx={{ mb: 3 }}>
                    <img style={{ maxHeight: 35, marginRight: 20 }} src="https://private-user-images.githubusercontent.com/83052755/380417031-f97718e2-96f9-4ad8-8c58-ed743e1b0f51.JPG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk5NjI5NDIsIm5iZiI6MTcyOTk2MjY0MiwicGF0aCI6Ii84MzA1Mjc1NS8zODA0MTcwMzEtZjk3NzE4ZTItOTZmOS00YWQ4LThjNTgtZWQ3NDNlMWIwZjUxLkpQRz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDI2VDE3MTA0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5MjM2ZGExNGZhNGMxNmEwNWE0NmMxM2MwY2I0ODkyNmIzYmFhMjIzOTY5NjBjYzQ5YTBiM2I3YWM3MmIxMWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.HxIMUCAqIYCp7llZBUnxaErr6fxsZH7qEZt9o5tDkXg" alt="" />
                    <ListItemText primary="NDT Admin" />
                </ListItem>

                <ListItem>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ListItemIcon>
                                <Apps />
                            </ListItemIcon>
                            <Typography>Products</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <NavLink className={({ isActive }) => (isActive ? 'linkTag active' : 'linkTag inactive')} to='/my-shop/admin/productList'>
                                    <ListItem>
                                        <ListItemText primary="List" />
                                    </ListItem>
                                </NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'linkTag active' : 'linkTag inactive')} to='/my-shop/admin/addProduct'>
                                    <ListItem>
                                        <ListItemText primary="Create" />
                                    </ListItem>
                                </NavLink>

                            </List>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
                <ListItem>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ListItemIcon>
                                <Category />
                            </ListItemIcon>
                            <Typography>Category</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <NavLink className={({ isActive }) => (isActive ? 'linkTag active' : 'linkTag inactive')} to='/my-shop/admin/categoryList'>
                                    <ListItem>
                                        <ListItemText primary="List" />
                                    </ListItem>
                                </NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'linkTag active' : 'linkTag inactive')} to='/my-shop/admin/addCategory'>
                                    <ListItem>
                                        <ListItemText primary="Create" />
                                    </ListItem>
                                </NavLink>

                            </List>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
