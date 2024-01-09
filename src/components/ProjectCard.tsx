import React, { useState } from 'react';
import { Grid, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ComponentStyles.css';
import { useMediaQuery } from 'react-responsive';

const ProjectCard = () => {

  const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
  const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
  const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
  const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
  const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

  const [iframeOpen, setIframeOpen] = useState(false);
  const handleProjectImageClick = () => {
    setIframeOpen(true);
  };
  const handleIframeDialog = () => {
    setIframeOpen(false);
  };

  return (
    <div className={`card ${(isXs) ? 'px-3' : 'px-6'} ${(isXs) ? 'py-2' : 'py-6'} w-full`}>
      <Grid container justifyContent={(isXs || isSm || isMd) ? 'flex-start' : 'center'} alignItems={(isXs || isSm || isMd) ? 'flex-start' : 'center'} columnSpacing={1}>
        <Grid item xs={3}>
          <img
            src="https://nadeem-abdun.github.io/find-my-chef/static/media/HeaderNavLogo.f796b4f86a0b2cb06f7e.png"
            alt="Project Preview"
            style={{ width: '90%', height: '90%', objectFit: 'cover', cursor: 'pointer', marginTop: (isXs || isSm || isMd) ? '9px' : '0px' }}
            onClick={() => handleProjectImageClick()}
          />
        </Grid>
        <Grid item xs={9}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni dignissimos quod sunt maxime inventore vitae neque modi, aliquid iure mollitia unde atque odit tempore, illum nihil sapiente voluptas hic perspiciatis! Omnis, assumenda tempora? Recusandae nemo reiciendis maiores autem, deserunt iure aliquid suscipit blanditiis ex aut atque cupiditate magni soluta perspiciatis?
        </Grid>
        <Dialog open={iframeOpen} onClose={handleIframeDialog} fullWidth maxWidth="xl" sx={{ height: '90vh', marginY: 'auto', '& .MuiDialog-paper': { height: '100%', }, }}>
          <iframe
            title="Find My Chef!"
            width="100%"
            height="100%"
            src="https://nadeem-abdun.github.io/find-my-chef/"
            frameBorder="0"
            allowFullScreen
          />
          <IconButton sx={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(15,23,42,0.8)', color: '#fff', '&:hover': { backgroundColor: 'rgba(15,23,42,0.8)', }, }} onClick={handleIframeDialog}>
            <CloseIcon fontSize='large' style={{ pointerEvents: 'none' }} />
          </IconButton>
        </Dialog>
      </Grid>
    </div>
  )
}

export default ProjectCard