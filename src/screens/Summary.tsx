import React from 'react'
import { Grid, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const Summary = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const currentYear = new Date().getFullYear();

    return (
        <div id='section-summary' className={`flex flex-col justify-between min-h-full ${(isXs || isSm || isMd) ? 'pt-5 pb-1' : 'pt-10 pb-3'}`}>
            <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Summary</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography component="h5" variant="h6" fontWeight={500} fontFamily='inter' style={{ textAlign: 'center' }}>
                    "Loosely sketched on paper, meticulously coded in Visual Studio Code. Crafted with React, styled with Material UI and Tailwind CSS, and finally deployed on Vercel with love."
                </Typography>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Typography component="h6" variant={(isXs || isSm || isMd) ? "subtitle2" : "subtitle1"} fontWeight={400} fontFamily='inter'>
                    © {currentYear}, Nadeem Abdun, Inc. or its affiliates. All rights reserved.
                </Typography>
            </div>
        </div>
    )
}

export default Summary