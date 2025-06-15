import React from "react";
import { Grid } from "@mui/material";
import { useBreakpoints } from "../utils/Breakpoints";
import ScrollToTop from "../components/ScrollToTop";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

interface ElementProps {
    id: string;
    children: React.ReactNode;
}

const RightElement: React.FC<ElementProps> = ({ id, children }) => {
    return (
        <Grid item xs={12} id={id} style={{ minHeight: '100dvh' }}>
            {children}
        </Grid>
    );
}

const MobileNavElement: React.FC<ElementProps> = ({ id, children }) => {
    return (
        <Grid item xs={12} id={id} style={{ minHeight: '100dvh' }}>
            {children}
        </Grid>
    );
}

interface Props {
    leftElement?: React.ReactNode;
    rightElements?: React.ReactNode[];
    mobileElement?: React.ReactNode;
}

const AppLayout: React.FC<Props> = (props) => {

    const { leftElement, rightElements, mobileElement } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <Grid container>
            {(isXl || isLg || isMd) &&
                <Grid item xl={5} lg={5} md={5} sm={0} xs={0} className='pl-10 pr-5'>
                    {leftElement}
                </Grid>
            }
            {(isXl || isLg || isMd || isSm || isXs) &&
                <Grid
                    container
                    item
                    xl={7} lg={7} md={7} sm={12} xs={12}
                    style={{ overflowY: 'auto', height: '100dvh' }}
                    className={`pl-5 ${(isXs || isSm) ? 'pr-5' : 'pr-10'}`}
                >
                    {(isXs || isSm) && mobileElement &&
                        <MobileNavElement id='section-mobile-home' children={mobileElement} />
                    }
                    {rightElements && rightElements.map((webElement, index) => (
                        <RightElement key={index} id={`section${index}`} children={webElement} />
                    ))}
                </Grid>
            }
            <ScrollToTop source="app" scrollToIdLarge="section0" scrollToIdSmall="section-mobile-home" />
        </Grid >
    );
};

export default AppLayout;
