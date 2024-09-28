import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import "../../styles/screenStyles.css";

const Resume = () => {
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    return (
        <div id='section-about-me' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Resume</Typography>
                </Grid>
                <Grid item xs={12} className={`${(!isXs) && 'card'} ${(!isXs) && 'px-3'} ${(!isXs) && 'py-3'}`}>
                    <iframe
                        src="https://drive.google.com/file/d/1Df_7kkdNqnadwSUrBAFTM2JMTUB8179E/preview"
                        frameBorder="0"
                        scrolling="auto"
                        // height="100%"
                        // width="100%"
                        height="800px"
                        width="800px"
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Resume