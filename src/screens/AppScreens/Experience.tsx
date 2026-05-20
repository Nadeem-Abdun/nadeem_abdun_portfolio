import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import ExperienceCard from '../../components/AppComponents/ExperienceCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const Experience = () => {
  const { isXs, isSm, isMd } = useBreakpoints();
  const { experiences } = useSelector((state: RootState) => state.experience);
  const isCompact = isXs || isSm || isMd;

  const sortedFilteredExperiences = experiences
    ? [...experiences]
        .filter(experience => experience.experienceStatus === 'Active')
        .sort((a, b) => {
          const dateA = a.joiningDate ? new Date(a.joiningDate).getTime() : 0;
          const dateB = b.joiningDate ? new Date(b.joiningDate).getTime() : 0;
          return dateB - dateA;
        })
    : [];

  return (
    <div
      id="section-experience"
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
            Experience
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          {sortedFilteredExperiences.length === 0 ? (
            <Typography
              variant="body1"
              fontFamily="inter"
              className="text-gray-500"
            >
              No experience entries to show yet.
            </Typography>
          ) : (
            <div className="relative w-full">
              <div
                className="pointer-events-none absolute bottom-3 left-[13px] top-3 z-0 w-px rounded-full bg-gradient-to-b from-cyan-400/75 via-cyan-400/20 to-white/5 sm:left-[15px]"
                aria-hidden
              />
              <ul className="relative z-[1] m-0 flex list-none flex-col gap-6 p-0 sm:gap-8">
                {sortedFilteredExperiences.map((experience, index) => (
                  <li
                    key={experience._id || index}
                    className="flex w-full min-w-0 items-start gap-0"
                  >
                    <div
                      className="relative z-[1] flex w-7 shrink-0 justify-center sm:w-8"
                      aria-hidden
                    >
                      <span className="mt-5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-cyan-400/90 bg-darkblue shadow-[0_0_14px_rgba(34,211,238,0.35)] sm:mt-6 sm:h-3 sm:w-3" />
                    </div>
                    <div className="min-w-0 flex-1 pl-2 sm:pl-3">
                      <ExperienceCard
                        joiningDate={experience.joiningDate}
                        relievingDate={experience.relievingDate}
                        jobTitle={experience.jobTitle}
                        organizationName={experience.organizationName}
                        responsibilities={experience.responsibilities}
                        skillsInvolved={experience.skillsInvolved}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Experience;
