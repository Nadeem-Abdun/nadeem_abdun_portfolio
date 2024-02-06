import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import ProfilePic from '../assets/images/Profile_Avatar.png';

const AboutMe = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <div id='section-about-me' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>About Me</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className="bg-gradient-to-r from-gray-500 via-0F172A to-0F172A rounded-bl-full rounded-tl-full">
                        <img
                            src={ProfilePic}
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
                        "As a passionate Web & App Developer with one year of hands-on experience in front-end development, I specialize in React, React Native, JavaScript/TypeScript, Node.js, and Express. My creative and adaptable approach focuses on building engaging user interfaces and scalable backends, leveraging technologies like Redux, Material UI, React Native Paper, and databases such as MongoDB and MySQL."
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily='inter'>
                        "My journey began as a mechanical engineer, and my curiosity to explore the virtual realm led me to coding. Embracing it wholeheartedly, I've transformed into a full-stack developer, dedicated to turning concepts into reality. Excited about the journey ahead, I look forward to crafting meaningful digital experiences."
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutMe