import React, { useState } from 'react';
import { Grid, Dialog, IconButton, Typography, Tooltip } from '@mui/material';
import { Close, OpenInNew } from '@mui/icons-material';
import './ComponentStyles.css';
import { useMediaQuery } from 'react-responsive';

interface Props {

}

const AnalyticsCard: React.FC<Props> = (props) => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <div className={`admin-card ${(isXs) ? 'px-3' : 'px-6'} ${(isXs) ? 'py-2' : 'py-6'} w-full`}>
            <Grid container xs={12} justifyContent='center' alignItems='center' rowSpacing={1}>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h5" fontWeight={500} fontFamily='inter'>Analytics</Typography>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </div>
    )
}

export default AnalyticsCard