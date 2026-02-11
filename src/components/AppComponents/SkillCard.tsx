import React from 'react';
import { Grid, Typography } from '@mui/material';
import SvgIconProvider from '../SvgIconProvider';
import type { WallOfCode } from '../../redux/wallOfCode/wallOfCodeSlice';

const SkillCard: React.FC<WallOfCode> = props => {
  const { skillName, skillIcon } = props;

  return (
    <div className="skill-card px-1 py-1">
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <SvgIconProvider iconReference={skillIcon} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            className="text-center"
            variant="body1"
            fontWeight={400}
            fontFamily="inter"
          >
            {skillName}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SkillCard;
