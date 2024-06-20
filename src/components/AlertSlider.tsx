import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface Props {
    alertSliderOpen: boolean;
    alertType: string;
    alertMessage: string;
    handleAlertSliderClose: () => void;
}

const AlertSlider: React.FC<Props> = (props) => {
    const { alertSliderOpen, alertType, alertMessage, handleAlertSliderClose } = props;
    return (
        <div>
            <Snackbar open={alertSliderOpen} autoHideDuration={4000} onClose={handleAlertSliderClose}>
                <Alert
                    onClose={handleAlertSliderClose}
                    severity={alertType === "success" ? "success" : alertType === "error" ? "error" : "info"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default AlertSlider