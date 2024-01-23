import React from 'react';
import { IconButton } from '@mui/material';
import { KeyboardDoubleArrowUp } from '@mui/icons-material/';
import { useMediaQuery } from 'react-responsive';

interface Props {
    scrollToIdLarge: string;
    scrollToIdSmall: string;
}

const ScrollToTop: React.FC<Props> = (props) => {

    const { scrollToIdLarge, scrollToIdSmall } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const scrollToTop = () => {
        if (isXl || isLg || isMd) {
            const sectionElement = document.getElementById(scrollToIdLarge);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (isSm || isXs) {
            const sectionElement = document.getElementById(scrollToIdSmall);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'auto' });
            }
        } else { }
    }

    return (
        <React.Fragment>
            {isXl || isLg || isMd ?
                <IconButton sx={{ position: 'absolute', bottom: '4dvh', right: '4dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                    <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                </IconButton>
                :
                <IconButton sx={{ position: 'absolute', bottom: '2dvh', right: '2dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                    <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                </IconButton>
            }
        </React.Fragment>
    )
}

export default ScrollToTop