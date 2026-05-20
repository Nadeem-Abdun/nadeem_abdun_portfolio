import { Box, Stack, Typography } from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import PdfViewer from '../../components/PdfViewer';
import '../../styles/screenStyles.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const Resume = () => {
  const { isMd, isSm, isXs } = useBreakpoints();
  const isCompact = isXs || isSm || isMd;

  const { activeResume } = useSelector((state: RootState) => state.resume);
  const resumeURL = activeResume?.resumeURL;

  return (
    <Box
      id="section-resume"
      sx={{
        mx: 'auto',
        width: 1,
        maxWidth: '72rem',
        my: isCompact ? 1.5 : 5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          fontWeight={500}
          fontFamily="inter"
          sx={{ letterSpacing: '-0.02em', color: 'grey.100' }}
        >
          Resume
        </Typography>

        {resumeURL ? (
          <Box
            className={isXs ? undefined : 'card'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(34, 211, 238, 0.1)',
              px: 0,
              py: 0,
              ...(isXs ? { bgcolor: 'rgba(255,255,255,0.04)' } : {}),
            }}
          >
            <Box
              sx={{
                height: { xs: '85dvh', sm: '82dvh' },
                minHeight: { xs: 480, sm: 560 },
                maxHeight: 960,
                bgcolor: 'rgba(0,0,0,0.25)',
                '& iframe': {
                  display: 'block',
                  border: 0,
                },
              }}
            >
              <PdfViewer pdfUrl={resumeURL} height="100%" width="100%" />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: 2,
              border: '1px dashed rgba(255,255,255,0.12)',
              bgcolor: 'rgba(255,255,255,0.03)',
              px: 3,
              py: 5,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body1"
              fontFamily="inter"
              sx={{ color: 'grey.500' }}
            >
              No resume file is available yet.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Resume;
