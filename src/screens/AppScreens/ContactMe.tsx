import { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Stack,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import { LaunchOutlined, SendOutlined } from '@mui/icons-material';
import { useBreakpoints } from '../../utils/Breakpoints';
import SuccessLogo from '../../assets/images/Success.png';
import ErrorLogo from '../../assets/images/Error.png';
import { ReplayOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  submitCreateContactForm,
  createContactFormSuccess,
  createContactFormFailure,
  resetCreateContactForm,
} from '../../redux/contactMe/contactMeSlice';
import { PostCreateContactForm } from '../../services/ServiceControllers';
import AlertSlider from '../../components/AlertSlider';
import {
  MailIcon,
  GithubIcon,
  LinkedInIcon,
  DiscordIcon,
  TwitterXIcon,
} from '../../assets/svg/SvgIcons';
import '../../styles/screenStyles.css';

const ContactMe = () => {
  const dispatch = useDispatch();
  const { isMd, isSm, isXs } = useBreakpoints();

  // Redux State Management
  const { loading, success } = useSelector(
    (state: RootState) => state.contactMe
  );
  const { loading: healthLoading, serverHealthy } = useSelector(
    (state: RootState) => state.health
  );
  const { githubUrl, linkedInUrl, discordUrl, twitterUrl, mailToId } =
    useSelector((state: RootState) => state.profile);

  // Local State Management
  const [contactMeRequest, setContactMeRequest] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    visitorMessage: '',
  });

  // Api Calls
  const createContactFormApiCall = async () => {
    try {
      const formData = {
        visitorName: contactMeRequest.visitorName,
        visitorEmail: contactMeRequest.visitorEmail,
        visitorPhone: contactMeRequest.visitorPhone,
        visitorMessage: contactMeRequest.visitorMessage,
      };
      const response = await PostCreateContactForm(
        formData,
        '6692a6e7a7900e23064b7c75'
      );
      if (response.success === true) {
        handleAlertSliderOpen('success', response.message);
      } else {
        handleAlertSliderOpen('error', response.message);
      }
      return response;
    } catch (error) {
      console.error('Unexpected error: ' + error);
      handleAlertSliderOpen('error', 'Unexpected error encountered');
      return undefined;
    }
  };

  // Create Contact Form Submit Functions
  const handleContactFormSubmit = async () => {
    dispatch(submitCreateContactForm());
    try {
      const response = await createContactFormApiCall();
      if (response && response.success && response.data) {
        const responseData = response.data;
        const contacMeObjectData = {
          _id: responseData._id,
          visitorName: responseData.visitorName,
          visitorEmail: responseData.visitorEmail,
          visitorPhone: responseData.visitorPhone,
          visitorMessage: responseData.visitorMessage,
          userReplyMessage: responseData.userReplyMessage,
        };
        dispatch(createContactFormSuccess(contacMeObjectData));
        setContactMeRequest({
          visitorName: '',
          visitorEmail: '',
          visitorPhone: '',
          visitorMessage: '',
        });
      } else {
        dispatch(createContactFormFailure());
      }
    } catch {
      dispatch(createContactFormFailure());
    }
  };
  const handleContactFormReset = () => {
    dispatch(resetCreateContactForm());
  };

  // Textfields Onchange Function
  const handleTextFeildsChange = (name: string, value: string) => {
    setContactMeRequest({
      ...contactMeRequest,
      [name]: value,
    });
  };

  // TextFields Dynamic Width Changing Functions
  const [formGridSize, setFormGridSize] = useState({
    visitorName: 9,
    visitorEmail: 12,
    visitorPhone: 7,
    visitorMessage: 10,
  });
  const handleGridOnFocus = (element: string, value: number) => {
    setFormGridSize(prevState => ({
      ...prevState,
      [element]: value,
    }));
  };
  const handleGridOnBlur = (element: string, value: number) => {
    setFormGridSize(prevState => ({
      ...prevState,
      [element]: value,
    }));
  };

  // Alert Slider Functions
  const [alertSliderOpen, setAlertSliderOpen] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertSliderOpen = (type: string, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertSliderOpen(true);
  };
  const handleAlertSliderClose = () => {
    setAlertSliderOpen(false);
  };
  return (
    <div
      id="section-contact-me"
      className={`flex flex-col justify-center items-center ${isXs || isSm || isMd ? 'my-3' : 'my-10'}`}
    >
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent="flex-start"
        alignItems="center"
        rowGap={2}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontWeight={500} fontFamily="inter">
            Contact Me
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          className={`${!isXs && 'card'} ${!isXs && 'px-3'} ${!isXs && 'py-3'}`}
          style={{ minHeight: `${isXs ? '527px' : '505px'}` }}
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* Health loading */}
          {healthLoading && (
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(34, 211, 238, 0.22)',
                    background:
                      'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 4, sm: 5 },
                  }}
                >
                  <Stack spacing={2.5} alignItems="center" textAlign="center">
                    <Typography
                      variant="overline"
                      fontFamily="inter"
                      sx={{
                        letterSpacing: '0.12em',
                        color: '#22d3ee',
                        fontWeight: 600,
                      }}
                    >
                      Connecting
                    </Typography>
                    <CircularProgress size={isXs ? 52 : 60} color="info" />
                    <Stack spacing={0.75} sx={{ maxWidth: 420, mx: 'auto' }}>
                      <Typography
                        variant={isXs ? 'subtitle1' : 'h6'}
                        fontWeight={600}
                        fontFamily="inter"
                        sx={{ color: '#e2e8f0' }}
                      >
                        Checking the messaging service
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontFamily="inter"
                        sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                      >
                        Please wait while we verify that the contact form is
                        available.
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
          {/* Contact Form */}
          {serverHealthy === true && loading === false && success === null && (
            <Grid container size={{ xs: 12 }} rowSpacing={2.5}>
              <Box
                sx={{
                  borderRadius: 3,
                  border: '1px solid rgba(34, 211, 238, 0.22)',
                  background:
                    'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2.5, sm: 3 },
                }}
              >
                <Stack spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      fontFamily="inter"
                      sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                    >
                      How about having a quick conversation? Please fill out the
                      form below, and I&apos;ll reach out to you shortly.
                    </Typography>
                  </Grid>
                  <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)' }} />
                  <Grid size={{ xs: formGridSize.visitorName }}>
                    <TextField
                      id="name-field"
                      label="Name"
                      variant="filled"
                      type="text"
                      fullWidth
                      sx={{ backgroundColor: '#D1D5DB', borderRadius: 3 }}
                      value={contactMeRequest.visitorName}
                      onChange={event =>
                        handleTextFeildsChange(
                          'visitorName',
                          event.target.value
                        )
                      }
                      onMouseOver={() => handleGridOnFocus('visitorName', 12)}
                      onMouseOut={() => handleGridOnBlur('visitorName', 9)}
                    />
                  </Grid>
                  <Grid size={{ xs: formGridSize.visitorEmail }}>
                    <TextField
                      id="email-field"
                      label="Email"
                      variant="filled"
                      type="email"
                      fullWidth
                      sx={{ backgroundColor: '#D1D5DB', borderRadius: 3 }}
                      value={contactMeRequest.visitorEmail}
                      onChange={event =>
                        handleTextFeildsChange(
                          'visitorEmail',
                          event.target.value
                        )
                      }
                      onMouseOver={() => handleGridOnFocus('visitorEmail', 12)}
                      onMouseOut={() => handleGridOnBlur('visitorEmail', 12)}
                    />
                  </Grid>
                  <Grid size={{ xs: formGridSize.visitorPhone }}>
                    <TextField
                      id="contactNumber-field"
                      label="Contact Number(Optional)"
                      variant="filled"
                      type="text"
                      fullWidth
                      sx={{ backgroundColor: '#D1D5DB', borderRadius: 3 }}
                      value={contactMeRequest.visitorPhone}
                      onChange={event =>
                        handleTextFeildsChange(
                          'visitorPhone',
                          event.target.value
                        )
                      }
                      onMouseOver={() => handleGridOnFocus('visitorPhone', 12)}
                      onMouseOut={() => handleGridOnBlur('visitorPhone', 7)}
                    />
                  </Grid>
                  <Grid size={{ xs: formGridSize.visitorMessage }}>
                    <TextField
                      id="message-field"
                      label="Message"
                      variant="filled"
                      type="text"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ backgroundColor: '#D1D5DB', borderRadius: 3 }}
                      value={contactMeRequest.visitorMessage}
                      onChange={event =>
                        handleTextFeildsChange(
                          'visitorMessage',
                          event.target.value
                        )
                      }
                      onMouseOver={() =>
                        handleGridOnFocus('visitorMessage', 12)
                      }
                      onMouseOut={() => handleGridOnBlur('visitorMessage', 10)}
                    />
                  </Grid>
                  <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)' }} />
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      fullWidth
                      size="large"
                      onClick={() => handleContactFormSubmit()}
                      endIcon={<SendOutlined />}
                      sx={{
                        py: 1,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontFamily: 'inter',
                        fontWeight: 500,
                        color: '#d1d5db',
                        borderColor: 'rgba(209, 213, 219, 0.35)',
                        transition:
                          'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                          color: '#22d3ee',
                          borderColor: '#22d3ee',
                          backgroundColor: 'rgba(34, 211, 238, 0.06)',
                        },
                      }}
                    >
                      Send message
                    </Button>
                  </Grid>
                </Stack>
              </Box>
            </Grid>
          )}
          {/* Submit loading */}
          {serverHealthy === true && loading === true && success === null && (
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(34, 211, 238, 0.22)',
                    background:
                      'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 4, sm: 5 },
                  }}
                >
                  <Stack spacing={2.5} alignItems="center" textAlign="center">
                    <Typography
                      variant="overline"
                      fontFamily="inter"
                      sx={{
                        letterSpacing: '0.12em',
                        color: '#22d3ee',
                        fontWeight: 600,
                      }}
                    >
                      Sending
                    </Typography>
                    <CircularProgress size={isXs ? 52 : 60} color="info" />
                    <Stack spacing={0.75} sx={{ maxWidth: 420, mx: 'auto' }}>
                      <Typography
                        variant={isXs ? 'subtitle1' : 'h6'}
                        fontWeight={600}
                        fontFamily="inter"
                        sx={{ color: '#e2e8f0' }}
                      >
                        Submitting your message
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontFamily="inter"
                        sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                      >
                        Please wait a moment while we send your details.
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
          {/* Success */}
          {serverHealthy === true && loading === false && success === true && (
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(34, 211, 238, 0.22)',
                    background:
                      'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2.5, sm: 3 },
                  }}
                >
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      component="img"
                      src={SuccessLogo}
                      alt=""
                      sx={{
                        width: '100%',
                        maxWidth: 220,
                        height: 'auto',
                        maxHeight: { xs: 200, sm: 220 },
                        objectFit: 'contain',
                        display: 'block',
                        mx: 'auto',
                      }}
                    />
                    <Stack spacing={0.75} sx={{ maxWidth: 440 }}>
                      <Typography
                        variant={isXs ? 'subtitle1' : 'h6'}
                        fontWeight={600}
                        fontFamily="inter"
                        sx={{ color: '#e2e8f0' }}
                      >
                        Thank you for reaching out
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontFamily="inter"
                        sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                      >
                        Your message has been received. I&apos;ll get back to
                        you soon to continue the conversation.
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
          {/* Error */}
          {serverHealthy === true && loading === false && success === false && (
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(34, 211, 238, 0.22)',
                    background:
                      'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2.5, sm: 3 },
                  }}
                >
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      component="img"
                      src={ErrorLogo}
                      alt=""
                      sx={{
                        width: '100%',
                        maxWidth: 220,
                        height: 'auto',
                        maxHeight: { xs: 200, sm: 220 },
                        objectFit: 'contain',
                        display: 'block',
                        mx: 'auto',
                      }}
                    />
                    <Stack spacing={1.25} sx={{ maxWidth: 440 }}>
                      <Typography
                        variant={isXs ? 'subtitle1' : 'h6'}
                        fontWeight={600}
                        fontFamily="inter"
                        sx={{ color: '#e2e8f0' }}
                      >
                        Couldn&apos;t send your message
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontFamily="inter"
                        sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                      >
                        Something went wrong while submitting. Please try again
                        in a moment.
                      </Typography>
                      <Button
                        type="button"
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<ReplayOutlined />}
                        onClick={() => handleContactFormReset()}
                        sx={{
                          mt: 0.5,
                          py: 1,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontFamily: 'inter',
                          fontWeight: 500,
                          color: '#d1d5db',
                          borderColor: 'rgba(209, 213, 219, 0.35)',
                          transition:
                            'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
                          '&:hover': {
                            color: '#22d3ee',
                            borderColor: '#22d3ee',
                            backgroundColor: 'rgba(34, 211, 238, 0.06)',
                          },
                        }}
                      >
                        Try again
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
          {/* Server Unavailable State */}
          {serverHealthy === false && !healthLoading && (
            <Grid container size={{ xs: 12 }} rowSpacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(34, 211, 238, 0.22)',
                    background:
                      'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%)',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2.5, sm: 3 },
                  }}
                >
                  <Stack spacing={2}>
                    <Stack spacing={0.75}>
                      <Typography
                        variant={isXs ? 'subtitle1' : 'h6'}
                        fontWeight={600}
                        fontFamily="inter"
                        sx={{ color: '#e2e8f0' }}
                      >
                        Contact form is unavailable
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontFamily="inter"
                        sx={{ color: '#94a3b8', lineHeight: 1.65 }}
                      >
                        The messaging service is not responding right now. You
                        can still reach me directly using the links below.
                      </Typography>
                    </Stack>

                    <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)' }} />

                    <Typography
                      variant="overline"
                      fontFamily="inter"
                      sx={{
                        letterSpacing: '0.12em',
                        color: '#22d3ee',
                        fontWeight: 600,
                      }}
                    >
                      Other ways to connect
                    </Typography>

                    <Stack spacing={1.25}>
                      {mailToId && (
                        <MuiLink
                          href={`mailto:${mailToId}`}
                          underline="none"
                          sx={{
                            display: 'block',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            transition:
                              'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(34, 211, 238, 0.45)',
                              bgcolor: 'rgba(34, 211, 238, 0.06)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                            >
                              <Box sx={{ display: 'flex', color: '#22d3ee' }}>
                                <MailIcon />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{
                                    color: '#64748b',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  Email
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontFamily="inter"
                                  fontWeight={500}
                                  sx={{ color: '#f1f5f9' }}
                                  title={isXs ? mailToId : undefined}
                                  maxWidth={isXs ? 130 : 200}
                                  overflow={isXs ? 'hidden' : 'visible'}
                                  textOverflow={isXs ? 'ellipsis' : 'visible'}
                                  whiteSpace={isXs ? 'nowrap' : 'normal'}
                                >
                                  {mailToId}
                                </Typography>
                              </Box>
                            </Stack>
                            <LaunchOutlined
                              sx={{ color: '#64748b', fontSize: 18 }}
                            />
                          </Stack>
                        </MuiLink>
                      )}

                      {linkedInUrl && (
                        <MuiLink
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'block',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            transition:
                              'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(34, 211, 238, 0.45)',
                              bgcolor: 'rgba(34, 211, 238, 0.06)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                            >
                              <Box sx={{ display: 'flex', color: '#22d3ee' }}>
                                <LinkedInIcon />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{
                                    color: '#64748b',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  LinkedIn
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontFamily="inter"
                                  fontWeight={500}
                                  sx={{ color: '#f1f5f9' }}
                                >
                                  Profile & messages
                                </Typography>
                              </Box>
                            </Stack>
                            <LaunchOutlined
                              sx={{ color: '#64748b', fontSize: 18 }}
                            />
                          </Stack>
                        </MuiLink>
                      )}

                      {githubUrl && (
                        <MuiLink
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'block',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            transition:
                              'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(34, 211, 238, 0.45)',
                              bgcolor: 'rgba(34, 211, 238, 0.06)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                            >
                              <Box sx={{ display: 'flex', color: '#22d3ee' }}>
                                <GithubIcon />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{
                                    color: '#64748b',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  GitHub
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontFamily="inter"
                                  fontWeight={500}
                                  sx={{ color: '#f1f5f9' }}
                                >
                                  Repos & contributions
                                </Typography>
                              </Box>
                            </Stack>
                            <LaunchOutlined
                              sx={{ color: '#64748b', fontSize: 18 }}
                            />
                          </Stack>
                        </MuiLink>
                      )}

                      {twitterUrl && (
                        <MuiLink
                          href={twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'block',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            transition:
                              'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(34, 211, 238, 0.45)',
                              bgcolor: 'rgba(34, 211, 238, 0.06)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                            >
                              <Box sx={{ display: 'flex', color: '#22d3ee' }}>
                                <TwitterXIcon />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{
                                    color: '#64748b',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  X (Twitter)
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontFamily="inter"
                                  fontWeight={500}
                                  sx={{ color: '#f1f5f9' }}
                                >
                                  Updates & DMs
                                </Typography>
                              </Box>
                            </Stack>
                            <LaunchOutlined
                              sx={{ color: '#64748b', fontSize: 18 }}
                            />
                          </Stack>
                        </MuiLink>
                      )}

                      {discordUrl && (
                        <MuiLink
                          href={discordUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'block',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            transition:
                              'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(34, 211, 238, 0.45)',
                              bgcolor: 'rgba(34, 211, 238, 0.06)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                            >
                              <Box sx={{ display: 'flex', color: '#22d3ee' }}>
                                <DiscordIcon />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{
                                    color: '#64748b',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  Discord
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontFamily="inter"
                                  fontWeight={500}
                                  sx={{ color: '#f1f5f9' }}
                                >
                                  Community chat
                                </Typography>
                              </Box>
                            </Stack>
                            <LaunchOutlined
                              sx={{ color: '#64748b', fontSize: 18 }}
                            />
                          </Stack>
                        </MuiLink>
                      )}
                    </Stack>

                    <Typography
                      variant="caption"
                      fontFamily="inter"
                      sx={{ color: '#64748b', display: 'block', pt: 0.5 }}
                    >
                      Thank you for your patience, the form will be back online
                      when the service is restored.
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <AlertSlider
        alertSliderOpen={alertSliderOpen}
        alertType={alertType}
        alertMessage={alertMessage}
        handleAlertSliderClose={handleAlertSliderClose}
      />
    </div>
  );
};

export default ContactMe;
