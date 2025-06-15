import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import "../../styles/screenStyles.css";

const AboutMe = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const { profilePicture, primaryDescription, secondaryDescription } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();

    return (
        <div id='section-about-me' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>About Me</Typography>
                </Grid>
                <Grid container item xs={12} className={`${(!isXs) && 'card'} ${(!isXs) && 'px-3'} ${(!isXs) && 'py-3'}`} justifyContent='flex-start' alignItems='center' rowGap={1}>
                    <Grid item xs={12}>
                        <div className="bg-gradient-to-r from-gray-400 via-0F172A to-0F172A rounded-bl-full rounded-tl-full">
                            <img
                                src={profilePicture}
                                alt='Profile_Picture'
                                style={{
                                    width: isXs ? '40vw' : isSm ? '30vw' : '12vw',
                                    height: isXs ? '40vw' : isSm ? '30vw' : '12vw',
                                    borderRadius: '20%',
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily='inter'>
                            "{primaryDescription}"
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily='inter'>
                            "{secondaryDescription}"
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutMe
