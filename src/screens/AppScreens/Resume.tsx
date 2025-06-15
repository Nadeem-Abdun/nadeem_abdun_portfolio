import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { GetActiveResumeData, GetDownloadResume } from "../../services/ServiceControllers";
import PdfViewer from "../../components/PdfViewer";
import "../../styles/screenStyles.css";

const Resume = () => {
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    // Local State
    const [currentResume, setCurrentResume] = useState({
        _id: "",
        resumeURL: "",
        resumeStatus: "",
    });

    // Api Calls
    const getActiveResumeDataApiCall = async () => {
        try {
            const profileId = '6692a6e7a7900e23064b7c75';
            const response = await GetActiveResumeData(profileId);
            if (response.success === true) {
                setCurrentResume({
                    _id: response.data._id,
                    resumeURL: response.data.resumeURL,
                    resumeStatus: response.data.resumeStatus,
                })
            } else {
                setCurrentResume({
                    _id: "",
                    resumeURL: "",
                    resumeStatus: "",
                })
            }
            return response;
        } catch (error) {
            console.error("Unexpected error: " + error);
        }
    };

    const getDownloadResumeApiCall = async () => {
        try {
            const id = currentResume._id || "";
            const response = await GetDownloadResume(id);
            if (response) {
                const pdfUrl = URL.createObjectURL(response);
                window.open(pdfUrl);
            } else {
                console.error("Failed to download resume, Please try again later."); // Need to work on interactive user message method in future
            }
            return response;
        } catch (error) {
            console.error("Unexpected error: " + error);
        }
    };

    // Submit Functions
    const handleDownloadResumeSubmit = () => {
        if (currentResume._id) {
            getDownloadResumeApiCall();
        } else {
            console.error("Resume Id Missing or Invalid");
        }
    };

    useEffect(() => {
        getActiveResumeDataApiCall();
    }, []);
    return (
        <div id='section-resume' className={`flex flex-col justify-center items-start ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'} h-[90%]`}>
            <Grid container justifyContent='flex-start' rowGap={2} className="h-full">
                <Grid item xs={12} className="h-[5%]">
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Resume</Typography>
                </Grid>
                <Grid container item rowGap={2} className={`${(!isXs) && 'card'} ${(!isXs) && 'px-3'} ${(!isXs) && 'py-3'} h-[95%]`}>
                    <Grid
                        item
                        xs={12}
                        // className={`${(isXs) ? "h-[75%]" : (isSm) ? "h-[93%]" : "h-[90%]"}`}
                    >
                        {/* <iframe
                            src="https://drive.google.com/file/d/1Df_7kkdNqnadwSUrBAFTM2JMTUB8179E/preview"
                            frameBorder="0"
                            scrolling="auto"
                            height="100%"
                            width="100%"
                        /> */}
                        {currentResume.resumeURL && (
                            <PdfViewer
                                pdfUrl={currentResume.resumeURL}
                                height="100%"
                                width="100%"
                            />
                        )}
                    </Grid>
                    {/* <Grid item xs={12} className={`${(isXs) ? "h-[25%]" : (isSm) ? "h-[7%]" : "h-[10%]"}`}>
                        <Button variant="contained" color="info" fullWidth onClick={() => handleDownloadResumeSubmit()}>Download</Button>
                    </Grid> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default Resume
