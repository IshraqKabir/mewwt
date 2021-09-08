import moment from "moment";

export const getMomentTime = (timeString: string) => {
    const dateTime = moment(timeString);

    let time = dateTime.fromNow();

    if (time === "in a few seconds") {
        time = "just now";
    }

    return `${time}`;
};

export const getTimeDiff = (timeString: string) => {
    const dateTime = moment(timeString);

    const timeDiff = moment().diff(dateTime, "minutes");
    return timeDiff;
};
