import React from "react";
import { Grid, Typography } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { HtmlIcon, CssIcon, JavascriptIcon, TypescriptIcon, ReactIcon, ReactNativeIcon, JavaIcon, NodeJsIcon, ExpressJsIcon, MaterialUiIcon, MongoDbIcon, MySqlIcon, TailwindCssIcon, ReduxIcon } from "../../assets/SvgIcons";
import SkillCard from "../../components/AppComponents/SkillCard";
import "../../styles/screenStyles.css";

const WallOfCode = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const skillData = [
        {
            icon: <HtmlIcon aria-label="Html" />,
            name: "HTML"
        },
        {
            icon: <CssIcon aria-label="Css" />,
            name: "CSS"
        },
        {
            icon: <JavascriptIcon aria-label="JavaScript" />,
            name: "JavaScript"
        },
        {
            icon: <TypescriptIcon aria-label="TypeScript" />,
            name: "TypeScript"
        },
        {
            icon: <ReactIcon aria-label="React_JS" />,
            name: "ReactJS"
        },
        {
            icon: <ReactNativeIcon aria-label="React_Native" />,
            name: "React Native"
        },
        {
            icon: <JavaIcon aria-label="Java" />,
            name: "Java"
        },
        {
            icon: <NodeJsIcon aria-label="Node_Js" />,
            name: "Node Js"
        },
        {
            icon: <ExpressJsIcon aria-label="Express_Js" />,
            name: "Express Js"
        },
        {
            icon: <MaterialUiIcon aria-label="Material_UI" />,
            name: "Material UI"
        },
        {
            icon: <MongoDbIcon aria-label="Mongo_Db" />,
            name: "MongoDb"
        },
        {
            icon: <MySqlIcon aria-label="My_SQL" />,
            name: "MySQL"
        },
        {
            icon: <TailwindCssIcon aria-label="Tailwind_Css" />,
            name: "Tailwind Css"
        },
        {
            icon: <ReduxIcon aria-label="Redux_Toolkit" />,
            name: "Redux Toolkit"
        },
    ];

    return (
        <div id='section-wallofcode' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowGap={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Wall of Code</Typography>
                </Grid>
                <Grid container xs={12} justifyContent='flex-start' alignItems='center' spacing={1}>
                    {skillData && skillData.map((skill, index) => {
                        const { icon, name } = skill
                        return (
                            <Grid key={index} item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <SkillCard icon={icon} name={name} />
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Grid>
        </div >
    )
}

export default WallOfCode