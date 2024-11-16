interface DateOptionType {
    month?: "numeric" | "2-digit" | "short" | "long" | "narrow",
    year?: "numeric" | "2-digit",
}
export const formatToLocaleString = (date: any) => {
    date = new Date(date);
    const options: DateOptionType = { month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatToStringYYYYMMDD = (date: any) => {
    if (date === "") {
        return new Date();
    }
    date = new Date(date);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
};
