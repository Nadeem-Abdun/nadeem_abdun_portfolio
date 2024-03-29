import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import ExperienceCard from "../../components/AppComponents/ExperienceCard";

const Experience = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const experienceList = [
        {
            jobTenure: 'Feb 2023 - Present',
            jobTitle: 'React Frontend Developer',
            jobCompany: 'Bluepal Solution Pvt. Ltd.',
            jobDescription: [
                'Representing Bluepal Solution Pvt Ltd in delivering high-quality solutions and services on behalf of JPMorgan Chase Bank.',
                'Currently working on a Property Management Application for JPMorgan Chase Bank in the Asia region as a dedicated consultant.',
                'Crafting and maintaining a robust React application, contributing to its stability and functionality.',
                'Implementing an intuitive and responsive user interface using Material UI to enhance the user experience.',
                'Creating Proof of Concepts (POCs) for UI enhancements in new applications to be deployed for JPMorgan Chase Bank.',
                'Specializing in Material UI, React, TypeScript, and Jest RTL for comprehensive and effective development.',
                "Ensuring the application's responsiveness and addressing ADA and NVDA issues to enhance accessibility.",                
            ],
            jobTechStack: [
                'Html',
                'CSS',
                'JavaScript',
                'TypeScript',
                'React',
                'Material UI',
                'React Testing Library',
                'Jest',
            ],
        }
    ]

    return (
        <div id='section-experience' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Experience</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="flex-start" alignItems="flex-start" rowGap={1}>
                    {experienceList && experienceList.map((experience, index) => {
                        return (
                            <Grid item xs={12}>
                                <ExperienceCard
                                    key={index}
                                    jobTenure={experience.jobTenure}
                                    jobTitle={experience.jobTitle}
                                    jobCompany={experience.jobCompany}
                                    jobDescription={experience.jobDescription}
                                    jobTechStack={experience.jobTechStack}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

export default Experience