import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Close, Launch, OpenInNew } from '@mui/icons-material';
import { Project } from '../../redux/project/projectSlice';
import '../../styles/componentStyles.css';

const ProjectCard: React.FC<Project> = props => {
  const {
    projectPicture,
    title,
    description,
    skillsInvolved,
    websiteUrl,
    repositoryUrl,
  } = props;

  const [iframeOpen, setIframeOpen] = useState(false);

  const openPreview = () => {
    if (websiteUrl) setIframeOpen(true);
  };

  return (
    <Box
      className="card"
      sx={{ width: 1, px: { xs: 1.5, sm: 2 }, py: { xs: 2, sm: 2.5 } }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2.5, sm: 3 }}
        alignItems="flex-start"
      >
        <Box
          sx={{
            width: 1,
            flexShrink: 0,
            maxWidth: { xs: 1, sm: 220, md: 260 },
          }}
        >
          <Tooltip
            title={
              websiteUrl ? 'Open live preview' : 'No live demo for this project'
            }
            arrow
          >
            <Button
              type="button"
              onClick={websiteUrl ? openPreview : () => {}}
              disableRipple
              sx={{
                p: 0,
                minWidth: 0,
                width: 1,
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                transition: 'box-shadow 0.2s ease, transform 0.3s ease',
                '&:hover:not(:disabled)': {
                  boxShadow: 'inset 0 0 0 1px rgba(34,211,238,0.35)',
                },
                '&:hover:not(:disabled) .project-card-thumb': {
                  transform: 'scale(1.03)',
                },
                '&:hover:not(:disabled) .project-card-overlay': {
                  opacity: 1,
                },
                '&:focus-visible': {
                  outline: '2px solid rgba(34,211,238,0.6)',
                  outlineOffset: 2,
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              <Box
                component="img"
                src={projectPicture}
                alt={title ? `${title} thumbnail` : 'Project thumbnail'}
                loading="lazy"
                className="project-card-thumb"
                sx={{
                  display: 'block',
                  width: 1,
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
              {websiteUrl ? (
                <Box
                  aria-hidden
                  className="project-card-overlay"
                  sx={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    background:
                      'linear-gradient(to top, rgba(15,23,42,0.6), transparent)',
                  }}
                />
              ) : null}
            </Button>
          </Tooltip>
        </Box>

        <Stack spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            columnGap={1}
            rowGap={0.5}
          >
            <Typography
              component="h3"
              variant="h5"
              fontWeight={500}
              fontFamily="inter"
              sx={{ color: 'grey.100' }}
            >
              {title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.25}
              flexShrink={0}
            >
              {repositoryUrl ? (
                <Tooltip title="View repository" arrow placement="top">
                  <IconButton
                    size="small"
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${title} repository`}
                    sx={{
                      color: 'grey.400',
                      '&:hover': { color: '#67e8f9' },
                    }}
                  >
                    <OpenInNew fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Stack>
          </Stack>

          {description ? (
            <Typography
              variant="body1"
              fontWeight={400}
              fontFamily="inter"
              sx={{ color: 'grey.300', lineHeight: 1.7 }}
            >
              {description}
            </Typography>
          ) : null}

          {skillsInvolved && skillsInvolved.length > 0 ? (
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1}
              sx={{ pt: 0.5 }}
            >
              {skillsInvolved.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(34, 211, 238, 0.25)',
                    bgcolor: 'rgba(34, 211, 238, 0.1)',
                    color: 'rgba(207, 250, 254, 0.9)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                    height: 'auto',
                    py: 0.5,
                    '&:hover': {
                      borderColor: 'rgba(34, 211, 238, 0.45)',
                      bgcolor: 'rgba(34, 211, 238, 0.15)',
                    },
                  }}
                />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Stack>

      <Dialog
        open={iframeOpen}
        onClose={() => setIframeOpen(false)}
        fullWidth
        maxWidth="xl"
        slotProps={{
          paper: {
            sx: {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: { xs: '88dvh', sm: '90dvh' },
              maxHeight: '900px',
              overflow: 'hidden',
              bgcolor: 'background.paper',
            },
          },
        }}
      >
        {websiteUrl ? (
          <>
            <Box
              component="iframe"
              title={title ? `${title} — live preview` : 'Project preview'}
              src={websiteUrl}
              allowFullScreen
              sx={{
                flex: 1,
                minHeight: 0,
                width: 1,
                border: 0,
              }}
            />
            <Tooltip title="Open site in new tab" arrow placement="bottom">
              <IconButton
                aria-label={`Open ${title} in new tab`}
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="medium"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 2,
                  bgcolor: 'rgba(15,23,42,0.85)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(15,23,42,0.95)' },
                }}
              >
                <Launch fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close preview" arrow placement="bottom">
              <IconButton
                aria-label="Close preview"
                onClick={() => setIframeOpen(false)}
                size="medium"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: 'rgba(15,23,42,0.85)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(15,23,42,0.95)' },
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
      </Dialog>
    </Box>
  );
};

export default ProjectCard;
