import React from "react";
import { Grid, Typography } from "@mui/material";

interface Props {
    icon: JSX.Element,
    name: string
}

const SkillCard: React.FC<Props> = (props) => {
    const { icon, name } = props;
    return (
        <div className="skill-card px-1 py-1">
            <Grid container xs={12} justifyContent='center' alignItems='center'>
                <Grid item>
                    {icon}
                </Grid>
                <Grid item xs={12}>
                    <Typography className="text-center" variant="body1" fontWeight={400} fontFamily='inter'>{name}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default SkillCard