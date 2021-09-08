import React from "react";
import { Svg, Path } from "react-native-svg";

export const SeenIcon = ({ fill }: { fill: string; }) => {
    return (
        <Svg viewBox="0 0 14 8" width={14} height={14} fill="none">
            <Path
                d="M13.501 0.108955L14 0.59573L8.60042 8L6.41166 5.83835L7.33857 4.56645L8.60042 5.30239L13.501 0.108955ZM9.11925 0L9.61822 0.486775L4.21865 7.89105L0.5 4.23358L1.33033 3.42354L4.21865 5.19343L9.11925 0Z"
                fillRule="evenodd"
                clipRule="evenodd"
                // fill="#3497F9"
                fill={fill}
            />
        </Svg>
    );
};
