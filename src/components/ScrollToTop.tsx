import React from "react";
import { IconButton } from "@mui/material";
import { KeyboardDoubleArrowUp } from "@mui/icons-material/";
import { useBreakpoints } from "../utils/Breakpoints";

interface Props {
    source: string;
    scrollToIdLarge: string;
    scrollToIdSmall: string;
}

const ScrollToTop: React.FC<Props> = (props) => {

    const { source, scrollToIdLarge, scrollToIdSmall } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

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
            {source === 'app' ?
                <>
                    {isXl || isLg || isMd ?
                        <IconButton sx={{ position: 'absolute', bottom: '4dvh', right: '4dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                            <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                        </IconButton>
                        :
                        <IconButton sx={{ position: 'absolute', bottom: '2dvh', right: '2dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                            <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                        </IconButton>

                    }
                </>
                : source === "admin" ?
                    <>
                        {isXl || isLg || isMd ?
                            <IconButton sx={{ position: 'fixed', bottom: '4dvh', right: '4dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                                <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                            </IconButton>
                            :
                            <IconButton sx={{ position: 'fixed', bottom: '2dvh', right: '4dvw', '&:hover': { backgroundColor: '#0F172A', } }} onClick={() => scrollToTop()} aria-label="scroll to top">
                                <KeyboardDoubleArrowUp className='text-cyan-300' fontSize='large' />
                            </IconButton>
                        }
                    </>
                    :
                    ""
            }
        </React.Fragment >
    )
}

export default ScrollToTop
