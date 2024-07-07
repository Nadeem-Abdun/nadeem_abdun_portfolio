import { useState, useEffect } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { submitGetUser, getUserSuccess, getUserFailure, resetGetUser } from "../../redux/users/usersSlice";
import { GetUserDetails } from "../../services/ServiceControllers";
import AlertSlider from "../../components/AlertSlider";
import "../../styles/screenStyles.css";

const AdminProfile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const { _id, username, email, profiles, loading, success } = useSelector((state: RootState) => state.user);

    // Api Calls
    const userDetailsApiCall = async () => {
        try {
            const response = await GetUserDetails();
            if (response.success === true) {
                handleAlertSliderOpen("success", response.message);
            } else {
                handleAlertSliderOpen("error", response.message);
            }
            return response;
        } catch (error) {
            console.error("Unexpected error: " + error);
            handleAlertSliderOpen("error", "Unexpected error encountered");
        }
    };

    // User Details Fetch Submit Function
    const handleFetchUserDetails = async () => {
        dispatch(submitGetUser());
        const response = await userDetailsApiCall();
        if (response.success) {
            const userData = response?.data;
            dispatch(getUserSuccess(userData));
            dispatch(resetGetUser());
        } else {
            dispatch(getUserFailure());
        }
    };

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
        document.title = "Admin - Profile";
    }, []);
    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item>
                <Typography variant="h4" fontWeight={500} fontFamily='inter'>Admin Profile</Typography>
            </Grid>
            <Grid container item xl={6} lg={6} md={8} sm={10} xs={10} justifyContent='center' alignItems='center' rowSpacing={2}>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>User ID:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={500} fontFamily='inter'>{_id === "" ? "-" : _id}</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>User Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={500} fontFamily='inter'>{username === "" ? "-" : username}</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>Email:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={500} fontFamily='inter'>{email === "" ? "-" : email}</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>Profiles:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={500} fontFamily='inter'>
                            <div className="flex flex-wrap gap-2">
                                {profiles && profiles.map((item, index) => (
                                    <span key={index}>
                                        {item}{index < profiles.length - 1 && ','}
                                    </span>
                                ))}
                            </div>
                            {profiles?.length === 0 && "None"}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <IconButton onClick={() => handleFetchUserDetails()} disabled={loading}>
                    <RefreshRounded className="text-cyan-300" />
                </IconButton>
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

export default AdminProfile