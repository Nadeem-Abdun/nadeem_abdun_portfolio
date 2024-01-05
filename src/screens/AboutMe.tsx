import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const AboutMe = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center'>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h4" fontWeight={500}>About Me</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Avatar src='https://avatars.githubusercontent.com/u/117020521?v=4' sx={{ width: '12vw', height: '12vw' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h3" variant={isXs ? "body1" : "h6"} fontWeight={400}>
                        "As a passionate Web & App Developer with one year of hands-on experience in front-end development, I specialize in React, React Native, JavaScript/TypeScript, Node.js, and Express. My creative and adaptable approach focuses on building engaging user interfaces and scalable backends, leveraging technologies like Redux, Material UI, React Native Paper, and databases such as MongoDB and MySQL."
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h3" variant={isXs ? "body1" : "h6"} fontWeight={400}>
                        "My journey began as a mechanical engineer, and my curiosity to explore the virtual realm led me to coding. Embracing it wholeheartedly, I've transformed into a full-stack developer, dedicated to turning concepts into reality. Excited about the journey ahead, I look forward to crafting meaningful digital experiences."
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutMe