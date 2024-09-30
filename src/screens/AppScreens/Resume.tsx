import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import "../../styles/screenStyles.css";

const Resume = () => {
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <div id='section-resume' className={`flex flex-col justify-center items-start ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'} h-full`}>
            <Grid container xs={12} justifyContent='flex-start' rowGap={2} className="h-full">
                <Grid item xs={12} className="h-[5%]">
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Resume</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent='center' className={`${(!isXs) && 'card'} ${(!isXs) && 'px-3'} ${(!isXs) && 'py-3'} h-[80%]`}>
                    <Grid item xs={12} className="h-[95%]">
                        <iframe
                            src="https://drive.google.com/file/d/1Df_7kkdNqnadwSUrBAFTM2JMTUB8179E/preview"
                            frameBorder="0"
                            scrolling="auto"
                            height="100%"
                            width="100%"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="info" fullWidth>Download</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Resume