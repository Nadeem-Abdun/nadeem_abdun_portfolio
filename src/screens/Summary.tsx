import React from 'react'
import { Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const Summary = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const currentYear = new Date().getFullYear();

    return (
        <div id='section-summary' className={`flex flex-col justify-between h-full ${(isXs || isSm || isMd) ? 'pt-5 pb-1' : 'pt-10 pb-3'}`}>
            <div className={`flex justify-center items-center ${(isXs || isSm) ? 'mt-4' : ''}`} style={{ flex: 1 }}>
                <Typography component="h5" variant={(isXs || isSm || isMd) ? "body1" : "h6"} fontWeight={500} fontFamily='inter' style={{ textAlign: 'center' }}>
                    "Loosely sketched on paper, meticulously coded in Visual Studio Code. Crafted with React, styled with Material UI and Tailwind CSS, and finally deployed on Vercel with love&#128151;."
                </Typography>
            </div>
            <div className={`text-center ${(isXs || isSm) ? 'mt-4' : ''}`}>
                <Typography component="h6" variant={(isXs || isSm || isMd) ? "subtitle2" : "subtitle1"} fontWeight={400} fontFamily='inter'>
                    © {currentYear}, Nadeem Abdun, Inc. or its affiliates. All rights reserved.
                </Typography>
            </div>
        </div >
    )
}

export default Summary