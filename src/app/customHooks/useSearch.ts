import { useDispatch } from "react-redux";
import { useDebounce } from "./useDebounce";

export const useSearch = (search: Function, defaultText = "") => {
    const { value: text, setValue: setText } = useDebounce<string>(defaultText, () => { }, () => {
        dispatch(search(text));
    }, 500);

    const dispatch = useDispatch();

    const handleChange = (text: string) => {
        setText(text);
    };

    return {
        text,
        handleChange,
    };
};
