import React from 'react';
import { HtmlIcon, CssIcon, JavascriptIcon, TypescriptIcon, ReactIcon, ReactNativeIcon, JavaIcon, NodeJsIcon, ExpressJsIcon, MaterialUiIcon, MongoDbIcon, MySqlIcon, TailwindCssIcon, ReduxIcon } from "../assets/SvgIcons";

interface IconProps {
    iconReference?: string;
}

const SvgIconProvider: React.FC<IconProps> = ({ iconReference }) => {
    if (iconReference === "HtmlIcon") {
        return <HtmlIcon aria-label="Html" />;
    }
    else if (iconReference === "CssIcon") {
        return <CssIcon aria-label="Css" />;
    }
    else if (iconReference === "JavascriptIcon") {
        return <JavascriptIcon aria-label="JavaScript" />;
    }
    else if (iconReference === "TypescriptIcon") {
        return <TypescriptIcon aria-label="TypeScript" />;
    }
    else if (iconReference === "ReactIcon") {
        return <ReactIcon aria-label="React_JS" />;
    }
    else if (iconReference === "ReactNativeIcon") {
        return <ReactNativeIcon aria-label="React_Native" />;
    }
    else if (iconReference === "JavaIcon") {
        return <JavaIcon aria-label="Java" />;
    }
    else if (iconReference === "NodeJsIcon") {
        return <NodeJsIcon aria-label="Node_Js" />;
    }
    else if (iconReference === "ExpressJsIcon") {
        return <ExpressJsIcon aria-label="Express_Js" />;
    }
    else if (iconReference === "MaterialUiIcon") {
        return <MaterialUiIcon aria-label="Material_UI" />;
    }
    else if (iconReference === "MongoDbIcon") {
        return <MongoDbIcon aria-label="Mongo_Db" />;
    }
    else if (iconReference === "MySqlIcon") {
        return <MySqlIcon aria-label="My_SQL" />;
    }
    else if (iconReference === "TailwindCssIcon") {
        return <TailwindCssIcon aria-label="Tailwind_Css" />;
    }
    else if (iconReference === "ReduxIcon") {
        return <ReduxIcon aria-label="Redux_Toolkit" />;
    }
    else {
        return null;
    }
}

export default SvgIconProvider;
