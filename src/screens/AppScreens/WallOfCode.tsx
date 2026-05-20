import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SkillCard from '../../components/AppComponents/SkillCard';
import '../../styles/screenStyles.css';

const WallOfCode = () => {
  const { isMd, isSm, isXs } = useBreakpoints();
  const { wallOfCodeList } = useSelector(
    (state: RootState) => state.wallOfCode
  );

  return (
    <div
      id="section-wallofcode"
      className={`flex flex-col justify-center items-center ${isXs || isSm || isMd ? 'my-3' : 'my-10'}`}
    >
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="flex-start"
        alignItems="center"
        rowGap={3}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontWeight={500} fontFamily="inter">
            Wall of Code
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          {wallOfCodeList &&
            wallOfCodeList.map((skill, index) => {
              const { skillName, skillIcon } = skill;
              return (
                <Grid key={index} size={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 6 }}>
                  <SkillCard skillName={skillName} skillIcon={skillIcon} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default WallOfCode;
