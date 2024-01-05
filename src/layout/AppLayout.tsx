import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from 'react-responsive'

interface RightElementProps {
    children: React.ReactNode;
    id: string;
}

const RightElement: React.FC<RightElementProps> = ({ children, id }) => (
    <div id={id} style={{ height: '100vh' }}>
        {children}
    </div>
);

interface Props {
    leftElement: React.ReactNode;
    rightElements: React.ReactNode[];
}

const AppLayout: React.FC<Props> = (props) => {

    const { leftElement, rightElements } = props;

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const [activeSection, setActiveSection] = useState(0);

    const handleScroll = () => {
        const sectionHeight = window.innerHeight;
        const scrolledPixels = window.scrollY;
        const newActiveSection = Math.floor(scrolledPixels / sectionHeight);
        setActiveSection(newActiveSection);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Grid container>
            {(isXl || isLg || isMd) &&
                <Grid item xl={5} lg={5} md={5} sm={0} xs={0} className='pl-10 pr-5'>
                    {leftElement}
                </Grid>
            }
            {(isXl || isLg || isMd || isSm || isXs) &&
                <Grid item xl={7} lg={7} md={7} sm={12} xs={12} onScroll={handleScroll} style={{ overflowY: 'auto', height: '100vh' }} className='pl-5 pr-10'>
                    <div className="flex flex-col justify-center items-center">
                        {rightElements.map((element, index) => (
                            <RightElement key={index} id={`section${index}`} children={element} />
                        ))}
                    </div>
                </Grid>
            }
        </Grid >
    );
};

export default AppLayout;