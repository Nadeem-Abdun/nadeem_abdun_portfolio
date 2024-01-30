import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import './ScreenStyles.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import AnalyticsCard from '../components/AnalyticsCard';

const AdminHome = () => {

    const history = useNavigate();

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    useEffect(() => {
        document.title = "Admin - Home"
    }, []);

    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item xs={12} className='text-center'>
                <Typography variant="h4" fontWeight={500} fontFamily='inter'>Admin Home</Typography>
            </Grid>
            <Grid container item xl={10} lg={10} md={11} sm={11} xs={11} justifyContent='center' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <AnalyticsCard />
                </Grid>

            </Grid>
        </Grid>
    )
}

export default AdminHome