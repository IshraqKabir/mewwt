import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useSearch = (search: Function, defaultText = "") => {
    const [text, setText] = useState(defaultText);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!text) {
            return;
        }

        const timeout = setTimeout(() => {
            dispatch(search(text));
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [text]);

    const handleChange = (text: string) => {
        setText(text);
    };

    return {
        text,
        handleChange,
    };
};
