import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Work, Assignment, MailOutline } from '@mui/icons-material';
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
            <Grid container columnSpacing={2} rowGap={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500}>Analytics</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Users Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h2" fontWeight={600} fontFamily='inter' className="text-center">12</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Work fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Users Visited</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={3}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Experience Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h2" fontWeight={600} fontFamily='inter' className="text-center">1</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Work fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Experiences</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={3}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Projects Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h2" fontWeight={600} fontFamily='inter' className="text-center">5</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Assignment fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Projects</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={3}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Contact Form Requests</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h2" fontWeight={600} fontFamily='inter' className="text-center">10</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <MailOutline fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Requests Recieved</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AnalyticsCard