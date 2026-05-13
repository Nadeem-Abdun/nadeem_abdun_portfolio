import React from 'react';
import {
  HtmlIcon,
  CssIcon,
  JavascriptIcon,
  TypescriptIcon,
  ReactIcon,
  ReactNativeIcon,
  JavaIcon,
  NodeJsIcon,
  ExpressJsIcon,
  MaterialUiIcon,
  MongoDbIcon,
  MySqlIcon,
  TailwindCssIcon,
  ReduxIcon,
  AngularIcon,
  VueIcon,
  SvelteIcon,
  SpringIcon,
  SpringBootIcon,
  PythonIcon,
  DjangoIcon,
  FlaskIcon,
  BootstrapIcon,
  PostgreSQLIcon,
  SASSIcon,
  GraphQLIcon,
  ChakraUIIcon,
  ShadcnIcon,
  PostmanIcon,
  InsomniaIcon,
  PlaywrightIcon,
  JestIcon,
  VitestIcon,
  CytoscapeIcon,
  ReactFlowIcon,
} from '../assets/svg/SvgIcons';

interface IconProps {
  iconReference?: string;
}

const SvgIconProvider: React.FC<IconProps> = ({ iconReference }) => {
  if (iconReference === 'HtmlIcon') {
    return <HtmlIcon aria-label="Html" />;
  } else if (iconReference === 'CssIcon') {
    return <CssIcon aria-label="Css" />;
  } else if (iconReference === 'JavascriptIcon') {
    return <JavascriptIcon aria-label="JavaScript" />;
  } else if (iconReference === 'TypescriptIcon') {
    return <TypescriptIcon aria-label="TypeScript" />;
  } else if (iconReference === 'ReactIcon') {
    return <ReactIcon aria-label="React_JS" />;
  } else if (iconReference === 'ReactNativeIcon') {
    return <ReactNativeIcon aria-label="React_Native" />;
  } else if (iconReference === 'AngularIcon') {
    return <AngularIcon aria-label="Angular_JS" />;
  } else if (iconReference === 'VueJsIcon') {
    return <VueIcon aria-label="Vue_JS" />;
  } else if (iconReference === 'SvelteIcon') {
    return <SvelteIcon aria-label="Svelte" />;
  } else if (iconReference === 'JavaIcon') {
    return <JavaIcon aria-label="Java" />;
  } else if (iconReference === 'SpringIcon') {
    return <SpringIcon aria-label="Spring" />;
  } else if (iconReference === 'SpringBootIcon') {
    return <SpringBootIcon aria-label="Spring_Boot" />;
  } else if (iconReference === 'PythonIcon') {
    return <PythonIcon aria-label="Python" />;
  } else if (iconReference === 'NodeJsIcon') {
    return <NodeJsIcon aria-label="Node_Js" />;
  } else if (iconReference === 'ExpressJsIcon') {
    return <ExpressJsIcon aria-label="Express_Js" />;
  } else if (iconReference === 'DjangoIcon') {
    return <DjangoIcon aria-label="Django" />;
  } else if (iconReference === 'FlaskIcon') {
    return <FlaskIcon aria-label="Flask" />;
  } else if (iconReference === 'MaterialUiIcon') {
    return <MaterialUiIcon aria-label="Material_UI" />;
  } else if (iconReference === 'BootstrapIcon') {
    return <BootstrapIcon aria-label="Bootstrap" />;
  } else if (iconReference === 'MongoDbIcon') {
    return <MongoDbIcon aria-label="Mongo_Db" />;
  } else if (iconReference === 'MySqlIcon') {
    return <MySqlIcon aria-label="My_SQL" />;
  } else if (iconReference === 'PostgreSqlIcon') {
    return <PostgreSQLIcon aria-label="PostgreSql" />;
  } else if (iconReference === 'TailwindCssIcon') {
    return <TailwindCssIcon aria-label="Tailwind_Css" />;
  } else if (iconReference === 'SassIcon') {
    return <SASSIcon aria-label="SASS_Css" />;
  } else if (iconReference === 'ReduxIcon') {
    return <ReduxIcon aria-label="Redux_Toolkit" />;
  } else if (iconReference === 'GraphqlIcon') {
    return <GraphQLIcon aria-label="GraphQL" />;
  } else if (iconReference === 'ChakraUIIcon') {
    return <ChakraUIIcon aria-label="Chakra_UI" />;
  } else if (iconReference === 'ShadcnIcon') {
    return <ShadcnIcon aria-label="shadcn_ui" />;
  } else if (iconReference === 'PostmanIcon') {
    return <PostmanIcon aria-label="Postman" />;
  } else if (iconReference === 'InsomniaIcon') {
    return <InsomniaIcon aria-label="Insomnia" />;
  } else if (iconReference === 'PlaywrightIcon') {
    return <PlaywrightIcon aria-label="Playwright" />;
  } else if (iconReference === 'JestIcon') {
    return <JestIcon aria-label="Jest" />;
  } else if (iconReference === 'VitestIcon') {
    return <VitestIcon aria-label="Vitest" />;
  } else if (iconReference === 'CytoscapeIcon') {
    return <CytoscapeIcon aria-label="Cytoscape" />;
  } else if (iconReference === 'ReactFlowIcon') {
    return <ReactFlowIcon aria-label="React_Flow" />;
  } else {
    return null;
  }
};

export default SvgIconProvider;
