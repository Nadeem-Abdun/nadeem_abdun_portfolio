import React, { useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { GithubIcon, LinkedInIcon, TwitterXIcon, DiscordIcon, MailIcon } from "../../assets/SvgIcons";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/screenStyles.css";

const WebNavigation = () => {

    const history = useNavigate();

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const { fullName, professionalRoles, introducingLine, githubUrl, linkedInUrl, discordUrl, twitterUrl, mailToId } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const adminPanelNavigation = () => {
        history('/admin')
    }

    useEffect(() => {
        document.title = "Nadeem Abdun - Portfolio"
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Grid container justifyContent='flex-start' alignItems='center' rowGap={isXl ? 10 : isLg ? 4 : isMd ? 1 : 2} className='h-full'>
                <Grid container item rowGap={isXl ? 6 : isLg ? 4 : isMd ? 2 : 1} xs={12}>
                    <Grid container item rowGap={(isXl || isLg) ? 1 : 0} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={isMd ? "h4" : "h2"} fontWeight={600} fontFamily='inter'>
                                <span className='easter-egg' onClick={() => adminPanelNavigation()}>{fullName?.slice(0, 1)}</span>{fullName?.slice(1)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={500} fontFamily='inter'>
                                <Typewriter
                                    options={{
                                        strings: professionalRoles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isXl ? "h5" : isMd ? "body2" : "body1"} fontWeight={400} fontFamily='inter'>{introducingLine}</Typography>
                    </Grid>
                    <Grid container item rowGap={(isXl || isLg) ? 2 : 1} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section0')}>
                                <pre>&lt;About Me /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section1')}>
                                <pre>&lt;Experience /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section2')}>
                                <pre>&lt;Wall of Code /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section3')}>
                                <pre>&lt;Projects /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section4')}>
                                <pre>&lt;Contact Me /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSection('section5')}>
                                <pre>&lt;Summary /&gt;</pre>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-evenly" alignItems="center" xs={12}>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="GitHub" href={githubUrl as string} target="_blank"><GithubIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="LinkedIn" href={linkedInUrl as string} target="_blank"><LinkedInIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="Discord" href={discordUrl as string} target="_blank"><DiscordIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="TwitterX" href={twitterUrl as string} target="_blank"><TwitterXIcon /></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className="icon-btn" aria-label="Email" href={mailToId as string}><MailIcon /></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default WebNavigation