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
                    <Avatar src='https://avatars.githubusercontent.com/u/117020521?v=4' sx={{ width: '15vw', height: '15vw' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h3" variant={isXs ? "body1" : "h6"} fontWeight={400}>
                        "As a mechanical engineer, my education initially centered around the physical world. However, the curiosity to explore the virtual realm and understand how things work in the digital space led me to the exciting world of coding. Since that pivotal moment, I have embraced coding wholeheartedly, embarking on a transformative journey as a developer. Today, I specialize in turning concepts into reality as a full-stack web and mobile app developer."
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutMe