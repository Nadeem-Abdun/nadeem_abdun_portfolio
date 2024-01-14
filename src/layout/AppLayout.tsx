import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { KeyboardDoubleArrowUp } from '@mui/icons-material/';
import { useMediaQuery } from 'react-responsive';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

interface RightElementProps {
    children: React.ReactNode;
    id: string;
}

const RightElement: React.FC<RightElementProps> = ({ children, id }) => {
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });
    const minHeightStyle = !(isXs || isSm) ? { minHeight: '100dvh' } : {};
    return (
        <div id={id} style={{ ...minHeightStyle }}>
            {children}
        </div>
    );
}

interface Props {
    leftElement?: React.ReactNode;
    rightElements?: React.ReactNode[];
    mobileElement?: React.ReactNode;
}

const AppLayout: React.FC<Props> = (props) => {

    const { leftElement, rightElements, mobileElement } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const scrollToTop = () => {
        if (isXl || isLg || isMd) {
            const sectionElement = document.getElementById('section0');
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (isSm || isXs) {
            const sectionElement = document.getElementById('section-mobile-home');
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'auto' });
            }
        } else { }
    }

    return (
        <Grid container>
            {(isXl || isLg || isMd) &&
                <Grid container item xl={5} lg={5} md={5} sm={0} xs={0} className='pl-10 pr-5'>
                    {leftElement}
                </Grid>
            }
            {(isXl || isLg || isMd || isSm || isXs) &&
                <Grid container item xl={7} lg={7} md={7} sm={12} xs={12} style={{ overflowY: 'auto', height: '100vh' }} className={`pl-5 ${(isXs || isSm) ? 'pr-5' : 'pr-10'}`}>
                    <div className="flex flex-col justify-center items-center">
                        {(isXs || isSm) && mobileElement && <>{mobileElement}</>}
                        {rightElements && rightElements.map((element, index) => (
                            <RightElement key={index} id={`section${index}`} children={element} />
                        ))}
                    </div>
                </Grid>
            }
            <IconButton sx={{ position: 'absolute', bottom: '5dvh', right: '5dvh', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
            </IconButton>
        </Grid >
    );
};

export default AppLayout;