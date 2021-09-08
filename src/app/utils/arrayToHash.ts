export const arrayToHash = <T>(
    array: any[],
    key: keyof T
): {
    [key: string]: T;
} => {
    const hash: {
        [k: string]: T;
    } = {};

    array.forEach((item) => {
        hash[item[key]] = item;
    });

    return hash;
};
