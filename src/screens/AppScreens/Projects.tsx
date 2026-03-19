import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import ProjectCard from '../../components/AppComponents/ProjectCard';

const Projects = () => {
  const { isMd, isSm, isXs } = useBreakpoints();
  const isCompact = isXs || isSm || isMd;

  const { projects } = useSelector((state: RootState) => state.project);

  const filteredProjects = projects
    ? [...projects].filter(project => project.projectStatus === 'Active')
    : [];

  return (
    <div
      id="section-projects"
      className={`mx-auto flex w-full max-w-6xl flex-col ${isCompact ? 'my-3' : 'my-10'}`}
    >
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="flex-start"
        alignItems="flex-start"
        rowSpacing={2}
      >
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            fontWeight={500}
            fontFamily="inter"
            className="tracking-tight"
          >
            Projects
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          {filteredProjects.length === 0 ? (
            <Typography
              variant="body1"
              fontFamily="inter"
              className="text-gray-500"
            >
              No projects to show yet.
            </Typography>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-5 p-0 sm:gap-6">
              {filteredProjects.map((project, index) => (
                <li key={project._id || `${project.title}-${index}`}>
                  <ProjectCard
                    projectPicture={project.projectPicture}
                    title={project.title}
                    description={project.description}
                    skillsInvolved={project.skillsInvolved}
                    websiteUrl={project.websiteUrl}
                    repositoryUrl={project.repositoryUrl}
                  />
                </li>
              ))}
            </ul>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Projects;
