import React, { useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { GithubIcon, LinkedInIcon, TwitterXIcon, DiscordIcon } from "../../assets/SvgIcons";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "../../styles/screenStyles.css";

const MobileNavigation = () => {

    const history = useNavigate();

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const scrollToSectionMobile = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'auto' });
        }
    }

    const adminPanelNavigation = () => {
        history('/admin')
    }

    useEffect(() => {
        document.title = "Nadeem Abdun - Portfolio"
    }, []);

    return (
        <div id='section-mobile-home' className='flex flex-col justify-center items-center my-6'>
            <Grid container justifyContent='flex-start' alignItems='center' rowGap={isSm ? 24 : isXs ? 5 : 0}>
                <Grid container item rowGap={isSm ? 6 : isXs ? 2 : 0} xs={12}>
                    <Grid container item rowGap={2} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h2" fontWeight={600} fontFamily='inter'>
                                <span className='easter-egg' onClick={() => adminPanelNavigation()}>N</span>adeem Abdun
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={500} fontFamily='inter'>
                                <Typewriter
                                    options={{
                                        strings: ["Web App Developer", "Mobile App Developer", "Mechanical Engineer"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isSm ? "h5" : "body1"} fontWeight={400} fontFamily='inter'>Transforming concepts into code, Specialized in delivering pixel-perfect, accessible wonders as a full-stack web and app developer.</Typography>
                    </Grid>
                    <Grid container item rowGap={isSm ? 2 : isXs ? 1 : 0} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section0')}>
                                <pre>&lt;About Me /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section1')}>
                                <pre>&lt;Experience /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section2')}>
                                <pre>&lt;Wall of Code /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section3')}>
                                <pre>&lt;Projects /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section4')}>
                                <pre>&lt;Contact Me /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isSm ? "h4" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section5')}>
                                <pre>&lt;Summary /&gt;</pre>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-evenly" alignItems="center" xs={12}>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="GitHub" href='https://github.com/Nadeem-Abdun' target="_blank"><GithubIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="LinkedIn" href='https://in.linkedin.com/in/abdun-nadeem' target="_blank"><LinkedInIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="Discord"><DiscordIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="TwitterX"><TwitterXIcon /></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default MobileNavigation