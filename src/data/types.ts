import { IonInput } from "@ionic/react";

export interface ErrorMessage {
    id:string,
    message:string
}

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput>{
    state: {
        value: any;
        reset: (newValue: React.SetStateAction<any>) => void;
        onIonChange: any;
        onKeyUp: any;
    }
}