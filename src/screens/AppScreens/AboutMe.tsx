import { Grid, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import '../../styles/screenStyles.css';

const AboutMe = () => {
  const { isMd, isSm, isXs } = useBreakpoints();
  const isStacked = isXs || isSm || isMd;

  const { profilePicture, primaryDescription, secondaryDescription } =
    useSelector((state: RootState) => state.profile);

  return (
    <div
      id="section-about-me"
      className={`mx-auto flex w-full max-w-6xl flex-col justify-center ${isStacked ? 'my-3' : 'my-10'}`}
    >
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="flex-start"
        alignItems="center"
        rowGap={2}
      >
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            fontWeight={500}
            fontFamily="inter"
            className="tracking-tight"
          >
            About Me
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          className={`${!isXs && 'card'} ${!isXs && 'px-4'} ${!isXs && 'py-6'} ${!isXs && 'md:px-6'} ${!isXs && 'md:py-8'}`}
          justifyContent="flex-start"
          alignItems={isStacked ? 'stretch' : 'center'}
          spacing={isStacked ? 3 : 4}
        >
          <Grid size={{ xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }}>
            <div
              className={
                isStacked
                  ? 'flex justify-center pb-1'
                  : 'flex justify-center lg:justify-end lg:pr-2'
              }
            >
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[min(100%,280px)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,255,255,0.18),transparent_55%)] opacity-90 blur-sm"
                />
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/15 ring-inset">
                  <img
                    src={profilePicture}
                    alt="Profile portrait"
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            container
            size={{ xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }}
            justifyContent="flex-start"
            alignItems="flex-start"
            rowGap={0}
            className={isStacked ? 'gap-5' : 'gap-6 lg:gap-7'}
          >
            <Grid size={{ xs: 12 }} className="min-w-0">
              <div className="relative border-l-[3px] border-cyan-400/50 pl-4 sm:pl-5">
                <span
                  aria-hidden
                  className="absolute -left-0 top-0 font-serif text-4xl leading-none text-cyan-400/35 select-none sm:text-5xl"
                >
                  &ldquo;
                </span>
                <Typography
                  variant={isStacked ? 'body1' : 'h6'}
                  fontWeight={500}
                  fontFamily="inter"
                  className="text-[#E5E7EB] leading-relaxed sm:leading-relaxed"
                >
                  {primaryDescription}
                </Typography>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }} className="min-w-0">
              <div className="relative border-l-[3px] border-white/15 pl-4 sm:pl-5">
                <Typography
                  variant="body1"
                  fontWeight={400}
                  fontFamily="inter"
                  className="text-[#9CA3AF] leading-relaxed"
                >
                  {secondaryDescription}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutMe;
