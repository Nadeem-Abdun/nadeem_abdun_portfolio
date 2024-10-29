import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AnalyticsCard from "../../components/AdminComponents/AnalyticsCard";
import AboutMeCard from "../../components/AdminComponents/AboutMeCard";
import ExperienceCard from "../../components/AdminComponents/ExperienceCard";
import ResumeCard from "../../components/AdminComponents/ResumeCard";
import WallOfCodeCard from "../../components/AdminComponents/WallOfCodeCard";
import ProjectCard from "../../components/AdminComponents/ProjectCard";
import ContactMeCard from "../../components/AdminComponents/ContactMeCard";
import AlertSlider from "../../components/AlertSlider";
import "../../styles/screenStyles.css";

const AdminHome = () => {
    const history = useNavigate();
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    // Redux States
    const { profile } = useSelector((state: RootState) => state.user);
    const { _id, fullName, professionalRoles, introducingLine, profilePicture, primaryDescription, secondaryDescription, githubUrl, linkedInUrl, discordUrl, twitterUrl, mailToId, } = useSelector((state: RootState) => state.profile)
    const { experiences } = useSelector((state: RootState) => state.experience);
    const { resumes } = useSelector((state: RootState) => state.resume);
    const { wallOfCodeList, availableSkillsList } = useSelector((state: RootState) => state.wallOfCode);
    const { projects } = useSelector((state: RootState) => state.project);
    const { contactMeForms } = useSelector((state: RootState) => state.contactMe);

    // Alert Slider Functions
    const [alertSliderOpen, setAlertSliderOpen] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const handleAlertSliderOpen = (type: string, message: string) => {
        setAlertType(type)
        setAlertMessage(message)
        setAlertSliderOpen(true)
    };
    const handleAlertSliderClose = () => {
        setAlertSliderOpen(false)
    };

    useEffect(() => {
        document.title = "Admin - Home"
    }, []);
    return (
        <Grid container justifyContent="center" alignItems="center" flexDirection="column" rowGap={4} wrap="nowrap">
            <Grid item>
                <Typography variant="h4" fontWeight={500} fontFamily="inter">Admin Home</Typography>
            </Grid>
            <Grid container item xl={10} lg={10} md={11} sm={11} xs={11} justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <AnalyticsCard
                        experiences={experiences}
                        projects={projects}
                        contactMeForms={contactMeForms}
                    />
                </Grid>
                <Grid container item xs={12} justifyContent="flex-start" alignItems="flex-start" rowGap={2} columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                        <AboutMeCard
                            profile={profile}
                            _id={_id}
                            fullName={fullName}
                            professionalRoles={professionalRoles}
                            introducingLine={introducingLine}
                            profilePicture={profilePicture}
                            primaryDescription={primaryDescription}
                            secondaryDescription={secondaryDescription}
                            githubUrl={githubUrl}
                            linkedInUrl={linkedInUrl}
                            discordUrl={discordUrl}
                            twitterUrl={twitterUrl}
                            mailToId={mailToId}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <ExperienceCard
                            profile={profile}
                            experiences={experiences}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <ResumeCard
                            profile={profile}
                            resumes={resumes}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <WallOfCodeCard
                            profile={profile}
                            wallOfCodeList={wallOfCodeList}
                            availableSkillsList={availableSkillsList}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <ProjectCard
                            profile={profile}
                            projects={projects}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <ContactMeCard
                            profile={profile}
                            contactMeForms={contactMeForms}
                            handleAlertSliderOpen={handleAlertSliderOpen}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <AlertSlider
                alertSliderOpen={alertSliderOpen}
                alertType={alertType}
                alertMessage={alertMessage}
                handleAlertSliderClose={handleAlertSliderClose}
            />
        </Grid>
    )
}

export default AdminHome