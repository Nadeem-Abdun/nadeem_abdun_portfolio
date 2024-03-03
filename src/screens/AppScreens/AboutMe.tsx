import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import ProfilePic from "../../assets/images/Profile_Avatar.png";
import "../../styles/screenStyles.css";

const AboutMe = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <div id='section-about-me' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>About Me</Typography>
                </Grid>
                <Grid container item xs={12} className={`card ${(isXs) ? 'px-2' : 'px-4'} ${(isXs) ? 'py-2' : 'py-4'}`} justifyContent='flex-start' alignItems='center' rowGap={1}>
                    <Grid item xs={12}>
                        <div className="bg-gradient-to-r from-gray-400 via-0F172A to-0F172A rounded-bl-full rounded-tl-full">
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
            </Grid>
        </div>
    )
}

export default AboutMe