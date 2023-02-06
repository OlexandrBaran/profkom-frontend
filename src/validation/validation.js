import { useEffect, useState } from "react"


const useValidation = (value, validations) => {
    
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLength, setMinLength]  = useState(true)
    const [maxLength, setMaxLength]  = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isContainsNumber, setIsContainsNumber] = useState(true)
    const [isPhoneNumber, setIsPhoneNumber] = useState(true)
    const [inputValid, setInputValid] = useState(false)
    const [isUnique, setIsUnique] = useState(true)

    const errorMessages = {
        minLength:"minLength_err",
        isEmpty:"empty_field_err",
        maxLength:"maxLength_err",
        isEmail:"email_err",
        isContainsNumber:"isContainsNumber_err",
        isPhoneNumber:"isPhoneNumber_err",
        isUnique:"isUnique_err"
    }
    

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    value.length < validations[validation] ? setMinLength(true) : setMinLength(false);
                        break;
                case "maxLength":
                    value.length > validations[validation] ? setMaxLength(true) : setMaxLength(false);
                        break;
                case "isEmpty":
                    value ? setIsEmpty(false) : setIsEmpty(true);
                        break;
                case "isEmail":
                    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    reEmail.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true);
                        break;
                case "isContainsNumber":
                    (/\d/.test(value)) ? setIsContainsNumber(true) : setIsContainsNumber(false);
                        break;
                case "isPhoneNumber":
                    const rePhone = /\d{12}/;
                    rePhone.test(value) ? setIsPhoneNumber(false) : setIsPhoneNumber(true);
                        break;
                case "isUnique":
                    for (const key of validations[validation]) {
                        if (value === key) {
                            setIsUnique(true)
                            break;
                        }
                        else{
                            setIsUnique(false)
                        }
                    }
                    break;
                default:
                    break;
            }
            
        }
        // eslint-disable-next-line
    }, [value])

    useEffect(() => {
        if (isEmpty && minLength && maxLength && isEmail && isContainsNumber && isPhoneNumber && isUnique) {
            setInputValid(false) 
        } else {
            setInputValid(true) 
        };
        // eslint-disable-next-line
    }, [isEmpty, minLength, maxLength, isEmail, isContainsNumber, isPhoneNumber, isUnique, value])

    return {
        isEmpty,
        minLength,
        maxLength,
        isEmail,
        isContainsNumber,
        isPhoneNumber,
        errorMessages,
        isUnique,
        inputValid
    }
}


export const useInput = (intialValue, validations) => {
    const [value, setValue] = useState(intialValue)
    const [isDirty, setIsDirty] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    } 

    const onBlur = (e) => {
        setIsDirty(true)
    } 

    const clearState = () => {
        setValue(intialValue);
        setIsDirty(false)
    }

    const setData = (data) => {
        setValue(data)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        clearState,
        setData,
        ...valid
    }
}

