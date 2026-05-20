import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { formatToLocaleString } from '../../utils/DateFormatter';
import { Experience } from '../../redux/experience/experienceSlice';
import '../../styles/componentStyles.css';

const ExperienceCard: React.FC<Experience> = props => {
  const {
    joiningDate,
    relievingDate,
    jobTitle,
    organizationName,
    responsibilities,
    skillsInvolved,
  } = props;

  const { isSm, isXs } = useBreakpoints();

  return (
    <div
      className={`card ${isXs ? 'px-1' : 'px-3'} ${isXs ? 'py-1' : 'py-3'} w-full`}
    >
      <Grid container justifyContent="space-between" alignItems="flex-start">
        {!(isXs || isSm) && (
          <Grid
            container
            size={{ xl: 2, lg: 3, md: 3, sm: 12, xs: 12 }}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="inter"
                className="py-2"
              >
                {`${formatToLocaleString(joiningDate)} - ${relievingDate ? formatToLocaleString(relievingDate) : 'Present'}`}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          size={{ xl: 10, lg: 9, md: 9, sm: 12, xs: 12 }}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" fontWeight={500} fontFamily="inter">
              {jobTitle}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="body1"
              fontWeight={400}
              fontFamily="inter"
              className="text-gray-400"
            >
              {organizationName}
            </Typography>
          </Grid>
          {(isXs || isSm) && (
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="inter"
                className="py-2"
              >
                {`${formatToLocaleString(joiningDate)} - ${relievingDate ? formatToLocaleString(relievingDate) : 'Present'}`}
              </Typography>
            </Grid>
          )}
          <Grid size={{ xs: 12 }}>
            <Typography
              component="div"
              variant="body2"
              fontWeight={400}
              fontFamily="inter"
              className="text-gray-300"
            >
              <ul className="list-disc space-y-1.5 py-1 pl-5 marker:text-cyan-400/50">
                {responsibilities &&
                  responsibilities.map((description, index) => (
                    <li key={index} className="leading-relaxed">
                      {description}
                    </li>
                  ))}
              </ul>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillsInvolved &&
                skillsInvolved.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100/90 transition hover:border-cyan-400/45 hover:bg-cyan-400/15 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExperienceCard;
