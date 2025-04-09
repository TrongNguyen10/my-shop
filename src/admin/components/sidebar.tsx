// Sidebar.tsx
import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Apps, Category } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Sidebar = (props: any) => {
    const [expanded, setExpanded] = React.useState<string | false>(
        JSON.parse(sessionStorage.getItem("panel") || "null")
    );

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            event = event;
            setExpanded(newExpanded ? panel : false);
            newExpanded &&
                sessionStorage.setItem("panel", JSON.stringify(panel));
        };

    const sidebarStyle = {
        // Drawer
        "& .MuiPaper-root": {
            backgroundColor: "#1e1f27",
            color: "#fff",
            width: "var(--sidebar-width)",
            overflowX: "hidden",
        },
        // ListItemIcon
        "& .MuiSvgIcon-root": {
            color: "#fff",
        },
        // ListItemIcon
        "& .listItemIcon": {
            minWidth: 40,
        },
        // Accordion of ListItem
        "& .accordion": {
            boxShadow: "none",
            width: "100%",
        },
        // Link
        "& .linkTag.inactive": {
            display: "block",
            color: "#fff",
            textDecoration: "none",
            paddingLeft: "3.5rem",
            cursor: "pointer",
        },
        "& .linkTag.active": {
            display: "block",
            color: "orange",
            backgroundColor: "#2a2c33",
            textDecoration: "none",
            paddingLeft: "4rem",
            cursor: "pointer",
        },
        "& .linkTag.inactive:hover": {
            color: "orange",
            transform: "translateX(10px)",
        },
        // AccordionDetails
        "& .accordionDetails": {
            padding: 0,
        },
        // ListItem
        "& .listItem": {
            padding: 0,
            marginBottom: 1,
        },
    };

    return (
        <Drawer sx={sidebarStyle} open={props.open} variant="persistent">
            <List>
                <ListItem sx={{ mb: 3 }}>
                    <img
                        style={{ maxHeight: 35, marginRight: 20 }}
                        src="/logo3.jpg"
                        alt="logo"
                    />
                    <ListItemText primary="NDT Admin" />
                </ListItem>

                <ListItem className="listItem">
                    <Accordion
                        className="accordion"
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ListItemIcon className="listItemIcon">
                                <Apps />
                            </ListItemIcon>
                            <Typography>Products</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordionDetails">
                            <List>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "linkTag active"
                                            : "linkTag inactive"
                                    }
                                    to="/admin/productList"
                                >
                                    <ListItem>
                                        <ListItemText primary="List" />
                                    </ListItem>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "linkTag active"
                                            : "linkTag inactive"
                                    }
                                    to="/admin/addProduct"
                                >
                                    <ListItem>
                                        <ListItemText primary="Create" />
                                    </ListItem>
                                </NavLink>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
                <ListItem className="listItem">
                    <Accordion
                        className="accordion"
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ListItemIcon className="listItemIcon">
                                <Category />
                            </ListItemIcon>
                            <Typography>Category</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordionDetails">
                            <List>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "linkTag active"
                                            : "linkTag inactive"
                                    }
                                    to="/admin/categoryList"
                                >
                                    <ListItem>
                                        <ListItemText primary="List" />
                                    </ListItem>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "linkTag active"
                                            : "linkTag inactive"
                                    }
                                    to="/admin/addCategory"
                                >
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
