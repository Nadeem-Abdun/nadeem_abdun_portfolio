import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { formatToLocaleString } from "../../utils/DateFormatter";
import { Experience } from "../../redux/experience/experienceSlice";
import "../../styles/componentStyles.css";

const ExperienceCard: React.FC<Experience> = (props) => {

    const { joiningDate, relievingDate, jobTitle, organizationName, responsibilities, skillsInvolved } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    return (
        <div className={`card ${(isXs) ? 'px-1' : 'px-3'} ${(isXs) ? 'py-1' : 'py-3'} w-full`}>
            <Grid container justifyContent='space-between' alignItems='flex-start'>
                {!(isXs || isSm) &&
                    <Grid container item xl={2} lg={3} md={3} sm={12} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={12}>
                            <Typography variant="body2" fontWeight={600} fontFamily='inter' className='py-2'>
                                {`${formatToLocaleString(joiningDate)} - ${relievingDate ? formatToLocaleString(relievingDate) : "Present"}`}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                <Grid container item xl={10} lg={9} md={9} sm={12} xs={12} justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight={500} fontFamily='inter'>{jobTitle}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>{organizationName}</Typography>
                    </Grid>
                    {(isXs || isSm) &&
                        <Grid item xs={12}>
                            <Typography variant="body2" fontWeight={600} fontFamily='inter' className='py-2'>
                                {`${formatToLocaleString(joiningDate)} - ${relievingDate ? formatToLocaleString(relievingDate) : "Present"}`}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {responsibilities && responsibilities.map((description, index) => (
                                    <li key={index} style={{ marginBottom: '4px', marginTop: '4px' }}>
                                        {description}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {skillsInvolved && skillsInvolved.map((tech, index) => (
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