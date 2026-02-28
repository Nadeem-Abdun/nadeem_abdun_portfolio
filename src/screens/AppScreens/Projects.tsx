import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProjectCard from '../../components/AppComponents/ProjectCard';

const Projects = () => {
  const { isMd, isSm, isXs } = useBreakpoints();

  const { projects } = useSelector((state: RootState) => state.project);

  return (
    <div
      id="section-projects"
      className={`flex flex-col justify-center items-center ${isXs || isSm || isMd ? 'my-3' : 'my-10'}`}
    >
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="flex-start"
        alignItems="center"
        rowSpacing={2}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontWeight={500} fontFamily="inter">
            Projects
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          justifyContent="flex-start"
          alignItems="flex-start"
          rowGap={1}
        >
          {projects &&
            projects.map((project, index) => {
              const {
                projectPicture,
                title,
                description,
                skillsInvolved,
                websiteUrl,
                repositoryUrl,
              } = project;
              return (
                <Grid key={index} size={{ xs: 12 }}>
                  <ProjectCard
                    key={index}
                    projectPicture={projectPicture}
                    title={title}
                    description={description}
                    skillsInvolved={skillsInvolved}
                    websiteUrl={websiteUrl}
                    repositoryUrl={repositoryUrl}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Projects;
