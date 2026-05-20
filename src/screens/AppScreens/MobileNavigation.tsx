import { useEffect } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import {
  GithubIcon,
  LinkedInIcon,
  TwitterXIcon,
  DiscordIcon,
  MailIcon,
} from '../../assets/SvgIcons';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/screenStyles.css';

const MobileNavigation = () => {
  const history = useNavigate();

  const { isSm, isXs } = useBreakpoints();

  const {
    fullName,
    professionalRoles,
    introducingLine,
    githubUrl,
    linkedInUrl,
    discordUrl,
    twitterUrl,
    mailToId,
  } = useSelector((state: RootState) => state.profile);

  const scrollToSectionMobile = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'auto' });
    }
  };

  const adminPanelNavigation = () => {
    history('/admin');
  };

  useEffect(() => {
    document.title = 'Nadeem Abdun - Portfolio';
  }, []);
  return (
    <div
      id="section-mobile-home"
      className="flex flex-col justify-center items-center my-6"
    >
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        rowGap={isSm ? 24 : isXs ? 5 : 0}
      >
        <Grid container rowGap={isSm ? 6 : isXs ? 2 : 0} size={{ xs: 12 }}>
          <Grid container rowGap={2} size={{ xs: 12 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h2" fontWeight={600} fontFamily="inter">
                <span
                  className="easter-egg"
                  onClick={() => adminPanelNavigation()}
                >
                  {fullName?.slice(0, 1)}
                </span>
                {fullName?.slice(1)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={500}
                fontFamily="inter"
              >
                <Typewriter
                  options={{
                    strings: professionalRoles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant={isSm ? 'h5' : 'body1'}
              fontWeight={400}
              fontFamily="inter"
            >
              {introducingLine}
            </Typography>
          </Grid>
          <Grid container rowGap={isSm ? 2 : isXs ? 1 : 0} size={{ xs: 12 }}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section0')}
              >
                <pre>&lt;About Me /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section1')}
              >
                <pre>&lt;Experience /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section2')}
              >
                <pre>&lt;Resume /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section3')}
              >
                <pre>&lt;Wall of Code /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section4')}
              >
                <pre>&lt;Projects /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section5')}
              >
                <pre>&lt;Contact Me /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isSm ? 'h4' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSectionMobile('section6')}
              >
                <pre>&lt;Summary /&gt;</pre>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          size={{ xs: 12 }}
        >
          {githubUrl && (
            <Grid>
              <IconButton
                className="icon-btn"
                aria-label="GitHub"
                href={githubUrl as string}
                target="_blank"
              >
                <GithubIcon />
              </IconButton>
            </Grid>
          )}
          {linkedInUrl && (
            <Grid>
              <IconButton
                className="icon-btn"
                aria-label="LinkedIn"
                href={linkedInUrl as string}
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </Grid>
          )}
          {discordUrl && (
            <Grid>
              <IconButton
                className="icon-btn"
                aria-label="Discord"
                href={discordUrl as string}
                target="_blank"
              >
                <DiscordIcon />
              </IconButton>
            </Grid>
          )}
          {twitterUrl && (
            <Grid>
              <IconButton
                className="icon-btn"
                aria-label="TwitterX"
                href={twitterUrl as string}
                target="_blank"
              >
                <TwitterXIcon />
              </IconButton>
            </Grid>
          )}
          {mailToId && (
            <Grid>
              <IconButton
                className="icon-btn"
                aria-label="Email"
                href={`mailto:${mailToId}` as string}
              >
                <MailIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MobileNavigation;
