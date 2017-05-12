import React from 'react';
import {ControlLabel} from 'react-bootstrap';

const ERROR_MAPPING = {
    'email': 'Ввeдіть коректну електронну адресу!',
    'body': 'Текст повідомлення занадто короткий!(коротше за 20 символів)'
};


export default function ErrorMessage(props){
    /**
     * Base on props passed (see props param for possible input) show or hide error message on form.
     * @param {object} props - possible fields of this object are 'error' and 'field'. Error - indicate weather field
     * is valid or in current moment of time. Field - field for which error will/not be shown
     */
    var errorMessage;
    if (props.error == null || props.error == true) {
        return null;
    }
    errorMessage = ERROR_MAPPING[props.field];

    return (
        <ControlLabel>{ errorMessage }</ControlLabel>
    );
}
