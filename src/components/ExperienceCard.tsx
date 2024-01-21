import React from 'react';
import { Grid, Typography } from '@mui/material';
import './ComponentStyles.css';
import { useMediaQuery } from 'react-responsive';

interface Props {
    jobTenure?: string;
    jobTitle?: string;
    jobCompany?: string;
    jobDescription?: string[];
    jobTechStack?: string[];
}

const ExperienceCard: React.FC<Props> = (props) => {

    const { jobTenure, jobTitle, jobCompany, jobDescription, jobTechStack } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <div className={`card ${(isXs) ? 'px-3' : 'px-6'} ${(isXs) ? 'py-2' : 'py-6'} w-full`}>
            <Grid container justifyContent='space-between' alignItems='flex-start' columnSpacing={1}>
                {!isXs &&
                    <Grid container item sm={3} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={12}>
                            <Typography component="h6" variant="body2" fontWeight={600} fontFamily='inter' className='hover:text-cyan-300 py-2'>
                                {jobTenure}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                <Grid container item sm={9} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h5" fontWeight={500} fontFamily='inter'>{jobTitle}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="body1" fontWeight={400} fontFamily='inter'>{jobCompany}</Typography>
                    </Grid>
                    {isXs &&
                        <Grid item xs={12}>
                            <Typography component="h6" variant="body2" fontWeight={600} fontFamily='inter' className='hover:text-cyan-300 py-2'>
                                {jobTenure}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Typography component="h2" variant="body2" fontWeight={400} fontFamily='inter'>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {jobDescription && jobDescription.map((desc, index) => (
                                    <li key={index} style={{ marginBottom: '4px', marginTop: '4px' }}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex flex-wrap gap-2 my-4">
                            {jobTechStack && jobTechStack.map((tech, index) => (
                                <span key={index} className="bg-teal-300 bg-opacity-15 text-teal-300 px-3 py-1 rounded-full text-sm hover:bg-teal-900 hover:text-teal-300 hover:bg-opacity-50 transition">{tech}</span>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default ExperienceCard