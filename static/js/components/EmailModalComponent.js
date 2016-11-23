import React from "react";
import {
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import validator from 'validator';

//TODO: investigate why Actions are not properly dispatched without this redundand import
import EmailModalStore from "../stores/EmailModalStore"


import EmailModalActions from "../actions/EmailModalActions"


const ERROR_MAPPING = {
    'email': 'Ввeдіть коректну електронну адресу!',
    'body': 'Текст повідомлення занадто короткий!(коротше за 20 символів)'
};


function ErrorMessage(props){
    /**
     * Base on props pased (see props param for possible input) show or hide error message on form.
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



const EmailModal = React.createClass({
  /**
   * Modal class that is used to show Bootstrap modal for the email feedback submission purpose
   */    
    getInitialState() {
        return { showModal: false , emailValid: null, textValid: null};
    },

    handleEmailChange: function(e) {
        this.setState({email: e.target.value});
        this.validateInput('emailValid', e.target.value, validator.isEmail);

    },
    handleMessageChange: function(e) {
        this.setState({body: e.target.value});
        this.validateInput('textValid', e.target.value, validator.isLength, {min: 20, max: 300});
    },

    sendButtonDisabled: function(){
        return !(this.state.emailValid && this.state.textValid);
    },

    getEmailValidationState: function(){
        var valid = this.state.emailValid;
        if(valid == true) return 'success';
        else if(valid == null) return null;
        else return 'error'
    },

    getTextValidationState: function(){
        var valid = this.state.textValid;
        if(valid == true) return 'success';
        else if(valid == null) return null;
        else return 'error'
    },

    validateInput: function(stateItem, value, validator, options){
        var _getStateObject = function(stateItem, value, validator, options) {
            /**
             * Helper method to construct state property from passed values
             */
          var returnObj = {};
          if(options) returnObj[stateItem] = validator(value, options);
          else returnObj[stateItem] = validator(value);
          return returnObj;
        };
        this.setState(_getStateObject(stateItem, value, validator, options));
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    submit(){
        EmailModalActions.post(this.state.email, this.state.body);
        // close modal as user does'nt have any clue about errors and so on
        this.close();
    },

    render() {
    return (
      <div>
        <img
            onClick={this.open}
            src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/mail.png" className="img-responsive center-block"
        >
        </img>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Введіть Ваш відгук у форму!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submit}>
            <FormGroup controlId="formInlineEmail" validationState={this.getEmailValidationState()}>
                <ErrorMessage error={this.state.emailValid} field="email"/>
                <FormControl onChange={this.handleEmailChange} type="email" placeholder="john.doe@radiobarmaglot.com" />
                <HelpBlock>Поле для Вашої електронної адреси.</HelpBlock>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea" validationState={this.getTextValidationState()}>
                <ErrorMessage error={this.state.textValid} field="body"/>
                <FormControl onChange={this.handleMessageChange} componentClass="textarea" placeholder="Привіт! Бармашлот дуже кльове радіо!" />
                <HelpBlock>Поле для Вашого відгуку.</HelpBlock>
            </FormGroup>
            </form>
            <hr />

            <h4>Дякуємо за Ваш відгук!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={this.submit} disabled={ this.sendButtonDisabled() }>
              Надіслати
            </Button>
            <Button onClick={this.close}>Закрити</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    }
});

module.exports =  EmailModal;