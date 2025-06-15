import randomColorGenerator from "./RandomColorGenerator";

const avatarInitialsGenerator = (name: string) => {
    return {
        sx: {
            bgcolor: randomColorGenerator(),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default avatarInitialsGenerator;
