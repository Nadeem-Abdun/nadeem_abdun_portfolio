import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import ProjectCard from "../../components/AppComponents/ProjectCard";
import FuelCalculatorImg from "../../assets/images/Fuel_Calculator.png";

const Projects = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const projects = [
        {
            projectImgURL: FuelCalculatorImg,
            projectName: 'Fuel Calculator',
            projectDescription: 'Fuel Calculator is a web app that efficiently estimates fuel consumption and costs before your trip, helping you plan with confidence based on current fuel prices.',
            projectTechStack: [
                'React',
                'TypeScript',
                'Material-UI',
                'CSS'
            ],
            projectLink: 'https://nadeem-abdun.github.io/fuel-calculator-app/',
            githubRepoLink: 'https://github.com/Nadeem-Abdun/fuel-calculator-app'
        },
        {
            projectImgURL: 'https://nadeem-abdun.github.io/find-my-chef/static/media/HeaderNavLogo.f796b4f86a0b2cb06f7e.png',
            projectName: 'Find My Chef!',
            projectDescription: 'Find My Chef! - Your ultimate classified site connecting restaurant owners with top-tier chefs. Empowering chefs to discover dream jobs and assisting restaurant owners in finding the perfect culinary talent for their establishments.',
            projectTechStack: [
                'React',
                'TypeScript',
                'Material-UI',
                'CSS'
            ],
            projectLink: 'https://nadeem-abdun.github.io/find-my-chef/',
            githubRepoLink: 'https://github.com/Nadeem-Abdun/find-my-chef'
        }
    ]

    return (
        <div id='section-projects' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Projects</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="flex-start" alignItems="flex-start" rowGap={1}>
                    {projects && projects.map((project, index) => {
                        const { projectImgURL, projectName, projectDescription, projectTechStack, projectLink, githubRepoLink } = project;
                        return (
                            <Grid item xs={12}>
                                <ProjectCard
                                    key={index}
                                    projectImgURL={projectImgURL}
                                    projectName={projectName}
                                    projectDescription={projectDescription}
                                    projectTechStack={projectTechStack}
                                    projectLink={projectLink}
                                    githubRepoLink={githubRepoLink}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

export default Projects