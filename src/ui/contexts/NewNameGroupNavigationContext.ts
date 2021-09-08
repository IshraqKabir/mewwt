import { createContext } from "react";
import { INavContext } from "../../app/types/INavContext";

export const NewNameGroupNavigationContext = createContext<INavContext | null>(
    null
);
