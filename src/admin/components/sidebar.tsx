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
                    <img style={{ maxHeight: 35, marginRight: 20 }} src="src/dashboard/assets/logo3.png" alt="" />
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
