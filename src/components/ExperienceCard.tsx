import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import './ComponentStyles.css';

interface Props {
    jobTenure?: string;
    jobTitle?: string;
    jobCompany?: string;
    jobDescription?: string[];
    jobTechStack?: string[];
}

const ExperienceCard: React.FC<Props> = (props) => {

    const { jobTenure, jobTitle, jobCompany, jobDescription, jobTechStack } = props;

    return (
        <Card className='experienceCard px-6 py-6 w-full'>
            <Grid container justifyContent='space-between' alignItems='flex-start'>
                <Grid container item xs={3} justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs={12}>
                        <Typography component="h6" variant="body2" fontWeight={600} className='text-gray-400 hover:text-cyan-300 py-2'>
                            {jobTenure}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={9} justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h5" fontWeight={500}>{jobTitle}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="body1" fontWeight={400}>{jobCompany}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="body2" fontWeight={400}>
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
        </Card >
    )
}

export default ExperienceCard