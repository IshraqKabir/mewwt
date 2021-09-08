import React from "react";
import { Svg, Path } from "react-native-svg";

export const SentIcon = ({ fill }: { fill: string; }) => {
    return (
        <Svg viewBox="0 0 14 8" width={14} height={14} fill="none">
            <Path
                d="M13.501 0.108955L14 0.59573L8.60042 8L6.41166 5.83835L7.33857 4.56645L8.60042 5.30239L13.501 0.108955Z"
                fillRule="evenodd"
                clipRule="evenodd"
                // fill="#3497F9"
                fill={fill}
            />
        </Svg>
    );
};
