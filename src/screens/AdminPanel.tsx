import React from 'react';
import { Grid, Typography } from '@mui/material';
import './ScreenStyles.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {

    const history = useNavigate();

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const portfolioPageNavigation = () => {
        history('/');
    }

    const adminLoginPageNavigation = () => {
        history('/admin/login');
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={`${(isXs || isSm || isMd) ? 'mx-5 my-3' : 'mx-10 my-10'}`}>
                <Grid container xs={12} justifyContent='center' alignItems='center' rowSpacing={(isXl || isLg || isMd) ? 5 : 3}>
                    <Grid item>
                        <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Welcome To Admin Panel</Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="h3" variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily='inter' className='text-center'>
                            "Congratulations, intrepid explorer, savvy seeker! 🕵️‍♂️ You've uncovered a clandestine corner of the web! 🎉 Alas, this space is reserved for the Admins – the guardians of digital mysteries. If you're not wearing the admin cape, fear not! Simply click the button below labeled 'Take me to the Homeland,' and you'll be whisked away to the land of the non-secretive. 🏡✨ Remember, not all who explore find what they seek, but you're one step closer to being a digital detective! 😄 #EasterEggHuntMaster".
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent='space-evenly' alignItems='center' rowSpacing={(isXl || isLg || isMd) ? 0 : 2}>
                        <Grid item>
                            <div className='flex justify-center items-center h-auto w-auto py-3 px-6 rounded bg-teal-600 bg-opacity-30 hover:text-teal-400 hover:scale-110 transition hover:bg-cyan-800 hover:bg-opacity-30'>
                                <Typography component="h6" variant="body1" fontWeight={400} fontFamily='inter' className='text-center cursor-pointer' onClick={() => portfolioPageNavigation()}>
                                    Take me to the 🏰Homeland
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className='flex justify-center items-center h-auto w-auto py-3 px-6 rounded bg-red-600 bg-opacity-30 hover:text-red-400 hover:scale-110 transition hover:bg-cyan-800 hover:bg-opacity-30'>
                                <Typography component="h6" variant="body1" fontWeight={400} fontFamily='inter' className='text-center cursor-pointer' onClick={() => adminLoginPageNavigation()}>
                                    Take me to the 🌌Galaxy of the Guardians
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AdminPanel