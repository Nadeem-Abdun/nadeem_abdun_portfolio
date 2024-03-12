import React from "react";
import { Grid } from "@mui/material";
import { useBreakpoints } from "../utils/Breakpoints";
import ScrollToTop from "../components/ScrollToTop";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

interface RightElementProps {
    children: React.ReactNode;
    id: string;
}

const RightElement: React.FC<RightElementProps> = ({ children, id }) => {
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const minHeightStyle = !(isXs || isSm) ? { minHeight: '100dvh' } : {};
    return (
        <div id={id} style={{ ...minHeightStyle }}>
            {children}
        </div>
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
                <Grid container item xl={5} lg={5} md={5} sm={0} xs={0} className='pl-10 pr-5'>
                    {leftElement}
                </Grid>
            }
            {(isXl || isLg || isMd || isSm || isXs) &&
                <Grid container item xl={7} lg={7} md={7} sm={12} xs={12} style={{ overflowY: 'auto', height: '100vh' }} className={`pl-5 ${(isXs || isSm) ? 'pr-5' : 'pr-10'}`}>
                    <div className="flex flex-col justify-center items-center" id='section-app-home'>
                        {(isXs || isSm) && mobileElement && <>{mobileElement}</>}
                        {rightElements && rightElements.map((element, index) => (
                            <RightElement key={index} id={`section${index}`} children={element} />
                        ))}
                    </div>
                </Grid>
            }
            <ScrollToTop source="app" scrollToIdLarge="section0" scrollToIdSmall="section-app-home" />
        </Grid >
    );
};

export default AppLayout;