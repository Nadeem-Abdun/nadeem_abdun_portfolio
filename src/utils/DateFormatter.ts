interface DateOptionType {
    month?: "numeric" | "2-digit" | "short" | "long" | "narrow",
    year?: "numeric" | "2-digit",
}

// interface InputDateType {
//     date?: Date | number | undefined,
// }

const formatDate = (date: any) => {
    const options: DateOptionType = { month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;