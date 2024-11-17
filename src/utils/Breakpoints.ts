import { useMediaQuery } from 'react-responsive';

export const useBreakpoints = () => {
    return {
        isXl: useMediaQuery({ query: '(min-width: 1920px)' }),
        isLg: useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' }),
        isMd: useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' }),
        isSm: useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' }),
        isXs: useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' })
    };
};
