import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { nameFieldValidations, emailFieldValidations } from '../../helpers'
import './styles.scss';

const UserDataForm = ({ closeModal }) => {
    const [errors, setErrors] = useState({ name: false, email: false });

    const handleSubmit = (event) => {
        event.preventDefault();

        const nameResult = nameFieldValidations(event.target.user_name.value);
        const emailResult = emailFieldValidations(event.target.user_email.value);

        if(nameResult && emailResult)
        {
            emailjs.sendForm('contact_service', 'contact_form', event.target, 'user_iHcAhH2HFpHfkspecFfaT')
            .then(() => {
                closeModalHandler();
            }, (error) => {
                console.error(error.text);
            });
        }
        else
        {
            if(!nameResult)
            {
                setErrors(prevState => {
                    return { ...prevState, name: true }
                });
            }

            if(!emailResult)
            {
                setErrors(prevState => {
                    return { ...prevState, email: true }
                });
            }
        }
      };

      const handleOnChange = () => {
        setErrors({ name: false, email: false });
      }

      const closeModalHandler = () => {
        closeModal(false);
      }

    return (
    <div id="modal" className="modal-window">
        <div className="modal_content">
            <div className="modal-header">
                <h1 className="header-title">¡Hagamos algo grande juntos!</h1>
                <span className="header-close" id="close" onClick={closeModalHandler}>&times;</span>
            </div>
            <form id="contact_form" className="contact-form" onSubmit={handleSubmit}>
                <div className="contactFormField">
                    <label>Nombre</label>
                    <input type="text" name="user_name" id="user_name" onChange={handleOnChange} />
                    {errors.name && <span className="error-label">Revisa este campo</span>}
                </div>
                <div className="contactFormField">
                    <label>Email</label>
                    <input type="text" name="user_email" id="user_email" onChange={handleOnChange} />
                    {errors.email && <span className="error-label">Revisa este campo</span>}
                </div>
                <div className="contactFormField">
                    <label>Mensaje<span className="textarea-label-span"> - opcional</span></label>
                    <textarea cols="20" rows="2" name="message" id="message"/>
                </div>
                <input type="submit" id="button" value="Enviar" />
            </form>
        </div>
    </div>
    )
};

export default UserDataForm;