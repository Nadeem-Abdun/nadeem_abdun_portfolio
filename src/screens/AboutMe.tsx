import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';

const AboutMe = () => {
    return (
        <div className='flex flex-col justify-center items-center h-full px-10'>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' spacing={1}>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h4" fontWeight={500}>About Me</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Avatar src='https://avatars.githubusercontent.com/u/117020521?v=4' sx={{ width: '12vw', height: '12vw' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h3" variant="h6" fontWeight={400}>
                        I am a passionate software engineer with a strong foundation in programming languages and frameworks. I have experience working with a variety of programming languages and frameworks, including C++, C#, Java, Python, and JavaScript.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutMe