import React, { useState } from "react";
import { Grid, Dialog, IconButton, Typography, Tooltip } from "@mui/material";
import { Close, OpenInNew } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import "../../styles/componentStyles.css";

interface Props {
  projectImgURL?: string,
  projectName?: string,
  projectDescription?: string,
  projectTechStack?: string[],
  projectLink?: string,
  githubRepoLink?: string,
}

const ProjectCard: React.FC<Props> = (props) => {

  const { projectImgURL, projectName, projectDescription, projectTechStack, projectLink, githubRepoLink } = props;

  const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

  const [iframeOpen, setIframeOpen] = useState(false);
  const handleProjectImageClick = () => {
    setIframeOpen(true);
  };
  const handleIframeDialog = () => {
    setIframeOpen(false);
  };

  return (
    <div className={`card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-1" : "py-4"} w-full`}>
      <Grid container justifyContent="center" alignItems="flex-start" columnSpacing={isXs ? 0 : 1} rowGap={isXs ? 2 : 0}>
        <Grid container xs={12} sm={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Tooltip title={`Open ${projectName} Page`} arrow>
              <img
                src={projectImgURL}
                alt={`${projectName} Preview`}
                style={{ width: (isXs ? "100%" : "90%"), height: (isXs ? "100%" : "90%"), objectFit: "cover", cursor: "pointer", marginTop: (isXs) ? "4px" : (isSm || isMd) ? "6px" : "0px", borderRadius: "10%" }}
                onClick={() => handleProjectImageClick()}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={9} justifyContent="flex-start" alignItems="center" rowGap={isXs ? 0 : 1}>
          <Grid container item xs={12} justifyContent="flex-start" alignItems="center" columnSpacing={1}>
            <Grid item>
              <Typography variant="h5" fontWeight={500} fontFamily="inter" className="hover:text-cyan-300">{projectName}</Typography>
            </Grid>
            <Grid item>
              <Tooltip title={`Open ${projectName} Repository`} arrow placement="right">
                <IconButton size="small" href={githubRepoLink || ""} target="_blank">
                  <OpenInNew fontSize="small" className="text-gray-300 hover:text-cyan-300" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight={400} fontFamily="inter">{projectDescription}</Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="flex flex-wrap gap-2 my-2">
              {projectTechStack && projectTechStack.map((tech, index) => (
                <span key={index} className="bg-teal-300 bg-opacity-15 text-teal-300 px-3 py-1 rounded-full text-sm hover:bg-teal-900 hover:text-teal-300 hover:bg-opacity-50 transition">{tech}</span>
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={iframeOpen} onClose={handleIframeDialog} fullWidth maxWidth="xl" sx={{ height: "95dvh", marginY: "auto", "& .MuiDialog-paper": { height: "100%", }, }}>
        <iframe
          title={projectName}
          width="100%"
          height="100%"
          src={projectLink}
          allowFullScreen
        />
        <IconButton sx={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(15,23,42,0.8)", color: "#fff", "&:hover": { backgroundColor: "rgba(15,23,42,0.8)", }, }} onClick={handleIframeDialog}>
          <Close fontSize="large" style={{ pointerEvents: "none" }} />
        </IconButton>
      </Dialog>
    </div>
  )
}

export default ProjectCard