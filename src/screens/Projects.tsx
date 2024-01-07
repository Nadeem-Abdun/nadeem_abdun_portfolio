import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const Projects = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center'>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h4" fontWeight={500}>Projects</Typography>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </div>
    )
}

export default Projects