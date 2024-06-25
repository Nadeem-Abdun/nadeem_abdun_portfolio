import React from 'react';
import { HtmlIcon, CssIcon, JavascriptIcon, TypescriptIcon, ReactIcon, ReactNativeIcon, JavaIcon, NodeJsIcon, ExpressJsIcon, MaterialUiIcon, MongoDbIcon, MySqlIcon, TailwindCssIcon, ReduxIcon, AngularIcon, VueIcon, SvelteIcon, SpringIcon, SpringBootIcon } from "../assets/SvgIcons";

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
    else if (iconReference === "AngularIcon") {
        return <AngularIcon aria-label="Angular_JS" />;
    }
    else if (iconReference === "VueJsIcon") {
        return <VueIcon aria-label="Vue_JS" />;
    }
    else if (iconReference === "SvelteIcon") {
        return <SvelteIcon aria-label="Svelte" />;
    }
    else if (iconReference === "JavaIcon") {
        return <JavaIcon aria-label="Java" />;
    }
    else if (iconReference === "SpringIcon") {
        return <SpringIcon aria-label="Spring" />;
    }
    else if (iconReference === "SpringBootIcon") {
        return <SpringBootIcon aria-label="Spring_Boot" />;
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
