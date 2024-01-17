import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import './ScreenStyles.css';
import { GithubIcon, LinkedInIcon, TwitterIcon, DiscordIcon } from '../assets/SvgIcons';
import { useMediaQuery } from 'react-responsive';

const MobileNavigation = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const scrollToSectionMobile = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'auto' });
        }
    };

    return (
        <div id='section-mobile-home' className='flex flex-col justify-center items-center my-6'>
            <Grid container justifyContent='flex-start' alignItems='center' rowSpacing={isSm ? 6 : isXs ? 5 : 0}>
                <Grid container item rowSpacing={isSm ? 2 : isXs ? 3 : 0} xs={12}>
                    <Grid container item rowSpacing={isSm ? 1 : isXs ? 1 : 0} xs={12}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h2" fontWeight={600} fontFamily='inter'>Nadeem Abdun</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Web & App Developer</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h3" variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily='inter'>Transforming concepts into code, Specialized in delivering pixel-perfect, accessible wonders as a full-stack web and app developer.</Typography>
                    </Grid>
                    <Grid container item rowSpacing={isSm ? 2 : isXs ? 1 : 0} xs={12}>
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h5" fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section0')}>
                                <pre>&lt;About Me /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h5" fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section1')}>
                                <pre>&lt;Experience /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h5" fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section2')}>
                                <pre>&lt;Projects /&gt;</pre>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h5" fontWeight={400} fontFamily='inter' className="underline-hover" onClick={() => scrollToSectionMobile('section3')}>
                                <pre>&lt;Contact Me /&gt;</pre>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justifyContent='space-evenly' alignItems='center' xs={12}>
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
                        <IconButton className="icon-btn" aria-label="Twitter"><TwitterIcon /></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default MobileNavigation