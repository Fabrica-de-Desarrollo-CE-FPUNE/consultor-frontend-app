import { ChangeEvent, SetStateAction, useState } from "react";
import { CustomInputHTMLAttributes, ErrorMessage } from "./types";

export const useFormInput = (initialValue?: any ) => {

    const [ value, setValue ] = useState<any>(initialValue);
    
    const handleChange = async (e:ChangeEvent<HTMLIonInputElement>) => {

        const tempValue = await e.currentTarget.value
        setValue(tempValue);
    }

    return {
        value,
        reset: (newValue: SetStateAction<any>) => setValue(newValue),
        onIonChange: handleChange,
        onKeyUp: handleChange
    };
}

export const validateForm = (fields: CustomInputHTMLAttributes[]) => {

	let errors: ErrorMessage[] = [];

	fields.forEach(field => {

		if (field.required) {

			const fieldValue = field.state.value;

			if (fieldValue === "") {

				const error:ErrorMessage = {

					id: field.id??'',
					message: `Por favor revisa su ${ field.id }`,
				};

				errors.push(error);
			}
		}
	});

	return errors;
}

export const getValues = (fields: CustomInputHTMLAttributes[]) => {
    const values = fields.reduce((acc, field) => {
        acc[field.id!] = field.state.value;
        return acc;
    }, {} as { [key: string]: string });  
    return values; 
}