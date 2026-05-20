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

const WebNavigation = () => {
  const history = useNavigate();

  const { isXl, isLg, isMd } = useBreakpoints();

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

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const adminPanelNavigation = () => {
    history('/admin');
  };

  useEffect(() => {
    document.title = 'Nadeem Abdun - Portfolio';
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        rowGap={isXl ? 10 : isLg ? 4 : isMd ? 1 : 2}
        className="h-full"
      >
        <Grid
          container
          rowGap={isXl ? 6 : isLg ? 4 : isMd ? 2 : 1}
          size={{ xs: 12 }}
        >
          <Grid container rowGap={isXl || isLg ? 1 : 0} size={{ xs: 12 }}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isMd ? 'h4' : 'h2'}
                fontWeight={600}
                fontFamily="inter"
              >
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
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
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
              variant={isXl ? 'h5' : isMd ? 'body2' : 'body1'}
              fontWeight={400}
              fontFamily="inter"
            >
              {introducingLine}
            </Typography>
          </Grid>
          <Grid container rowGap={isXl || isLg ? 2 : 1} size={{ xs: 12 }}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section0')}
              >
                <pre>&lt;About Me /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section1')}
              >
                <pre>&lt;Experience /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section2')}
              >
                <pre>&lt;Resume /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section3')}
              >
                <pre>&lt;Wall of Code /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section4')}
              >
                <pre>&lt;Projects /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section5')}
              >
                <pre>&lt;Contact Me /&gt;</pre>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={isXl ? 'h4' : isMd ? 'h6' : 'h5'}
                fontWeight={400}
                fontFamily="inter"
                className="underline-hover"
                onClick={() => scrollToSection('section6')}
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

export default WebNavigation;
