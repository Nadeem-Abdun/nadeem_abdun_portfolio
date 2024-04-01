import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import "../../styles/componentStyles.css";

interface Props {
    jobTenure?: string;
    jobTitle?: string;
    jobCompany?: string;
    jobDescription?: string[];
    jobTechStack?: string[];
}

const ExperienceCard: React.FC<Props> = (props) => {

    const { jobTenure, jobTitle, jobCompany, jobDescription, jobTechStack } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <div className={`card ${(isXs) ? 'px-1' : 'px-3'} ${(isXs) ? 'py-1' : 'py-3'} w-full`}>
            <Grid container justifyContent='space-between' alignItems='flex-start'>
                {!(isXs || isSm) &&
                    <Grid container item xl={2} lg={3} md={3} sm={12} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={12}>
                            <Typography variant="body2" fontWeight={600} fontFamily='inter' className='py-2'>
                                {jobTenure}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                <Grid container item xl={10} lg={9} md={9} sm={12} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight={500} fontFamily='inter'>{jobTitle}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>{jobCompany}</Typography>
                    </Grid>
                    {(isXs || isSm) &&
                        <Grid item xs={12}>
                            <Typography variant="body2" fontWeight={600} fontFamily='inter' className='py-2'>
                                {jobTenure}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
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
                        <div className="flex flex-wrap gap-2 mt-4">
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