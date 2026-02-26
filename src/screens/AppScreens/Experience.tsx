import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import ExperienceCard from '../../components/AppComponents/ExperienceCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Experience = () => {
  const { isMd, isSm, isXs } = useBreakpoints();

  const { experiences } = useSelector((state: RootState) => state.experience);

  return (
    <div
      id="section-experience"
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
            Experience
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          justifyContent="flex-start"
          alignItems="flex-start"
          rowGap={1}
        >
          {experiences &&
            experiences.map((experience, index) => {
              return (
                <Grid key={index} size={{ xs: 12 }}>
                  <ExperienceCard
                    key={index}
                    joiningDate={experience.joiningDate}
                    relievingDate={experience.relievingDate}
                    jobTitle={experience.jobTitle}
                    organizationName={experience.organizationName}
                    responsibilities={experience.responsibilities}
                    skillsInvolved={experience.skillsInvolved}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Experience;
