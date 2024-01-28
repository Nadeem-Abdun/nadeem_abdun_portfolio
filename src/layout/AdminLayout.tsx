import React from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import ScrollToTop from '../components/ScrollToTop';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

interface Props {
    childElement?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = (props) => {

    const { childElement } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    return (
        <Grid container>
            <Grid container className={`${(isXs || isSm || isMd) ? 'mx-5 my-3' : 'mx-10 my-10'}`} id='section-admin-home'>
                {childElement}
            </Grid>
            <ScrollToTop scrollToIdLarge="section-admin-home" scrollToIdSmall="section-admin-home" />
        </Grid >
    );
};

export default AdminLayout;