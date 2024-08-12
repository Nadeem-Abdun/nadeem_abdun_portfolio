import React from "react";
import { Grid } from "@mui/material";
import { useBreakpoints } from "../utils/Breakpoints";
import ScrollToTop from "../components/ScrollToTop";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

interface Props {
    navbarElement?: React.ReactNode;
    childElement?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = (props) => {

    const { navbarElement, childElement } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <Grid container>
            {navbarElement &&
                <Grid item xs={12}>
                    {navbarElement}
                </Grid>
            }
            <Grid container className={`${(isXs || isSm || isMd) ? 'mx-5 my-3' : 'mx-10 my-10'}`} id='section-admin-home'>
                {childElement}
            </Grid>
            <ScrollToTop source="admin" scrollToIdLarge="section-admin-home" scrollToIdSmall="section-admin-home" />
        </Grid>
    );
};

export default AdminLayout;