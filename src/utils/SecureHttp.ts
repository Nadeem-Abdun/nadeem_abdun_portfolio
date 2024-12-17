export const SecureHttp = (url: string): string => {
    if (!url) return url;
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol === "http:") {
            parsedUrl.protocol = "https:";
        }
        return parsedUrl.toString();
    } catch (error) {
        console.error("Invalid URL:", url, error);
        return url;
    }
};