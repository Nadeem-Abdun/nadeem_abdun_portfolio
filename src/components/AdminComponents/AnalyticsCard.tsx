import React from "react";
import { Grid, Typography } from "@mui/material";
import { Work, Assignment, MailOutline } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import AnalyticsChart from "./AnalyticsChart";
import "../../styles/componentStyles.css";

const AnalyticsCard = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <div className={`admin-card ${(isXs) ? 'px-2' : 'px-4'} ${(isXs) ? 'py-2' : 'py-4'} w-full`}>
            <Grid container columnSpacing={(isXs) ? 0 : 2} rowGap={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily='inter'>Analytics</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Users Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex justify-center">
                            <AnalyticsChart value={42} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" fontWeight={600} fontFamily='inter' className="text-center">12</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Work fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Users Visited</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={isXs ? 3 : 7}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Experience Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" fontWeight={600} fontFamily='inter' className="text-center">1</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Work fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Experiences</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={isXs ? 3 : 7}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Projects Overview</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" fontWeight={600} fontFamily='inter' className="text-center">5</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <Assignment fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Projects</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={3} rowGap={isXs ? 3 : 7}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight={500} fontFamily='inter' className="text-center">Contact Form Requests</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" fontWeight={600} fontFamily='inter' className="text-center">10</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='center' alignItems='center' columnGap={1}>
                        <Grid item>
                            <MailOutline fontSize='large' className="text-center text-gray-500" />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" fontWeight={400} fontFamily='inter' className="text-center text-gray-500">Total Requests Recieved</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AnalyticsCard