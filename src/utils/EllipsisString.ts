const ellipsisString = (input: string | undefined, trimValue: number): string => {
    if (input && input.length > trimValue) {
        return input.substring(0, trimValue) + '...';
    }
    return input || '';
}

export default ellipsisString;
