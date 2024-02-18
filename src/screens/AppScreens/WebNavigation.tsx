import React, { useEffect } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import '../ScreenStyles.css';
import { GithubIcon, LinkedInIcon, TwitterXIcon, DiscordIcon } from '../../assets/SvgIcons';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const WebNavigation = () => {

    const history = useNavigate();

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

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
                                <span className='easter-egg' onClick={() => adminPanelNavigation()}>N</span>a
                                <span className='easter-egg' onClick={() => adminPanelNavigation()}>d</span>eem Abdun
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={isXl ? "h4" : isMd ? "h6" : "h5"} fontWeight={500} fontFamily='inter'>
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
                        <Typography variant={isXl ? "h5" : isMd ? "body2" : "body1"} fontWeight={400} fontFamily='inter'>Transforming concepts into code, Specialized in delivering pixel-perfect, accessible wonders as a full-stack web and app developer.</Typography>
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
        </div >
    )
}

export default WebNavigation