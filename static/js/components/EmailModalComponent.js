import React from "react";
import { Modal, Popover, Tooltip, Button, OverlayTrigger, FormGroup, ControlLabel, FormControl, FieldGroup, HelpBlock} from 'react-bootstrap';

import EmailModalActions from "../actions/EmailModalActions"



const EmailModal = React.createClass({
  /**
   * Modal class that is used to show Bootstrap modal for the email feedback submission purpose
   */    
    getInitialState() {
    return { showModal: false };
    },

    handleEmailChange: function(e) {
     this.setState({email: e.target.value});
     console.log(e.target.value);

    },
    handleMessageChange: function(e) {
     this.setState({body: e.target.value});
     console.log(e.target.value);
    },

    close() {
    this.setState({ showModal: false });
    },

    open() {
    this.setState({ showModal: true });
    },

    submit(e){
    console.log(this.state.email, this.state.body);
    EmailModalActions.post(this.state.email, this.state.body)
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
            <FormGroup controlId="formInlineEmail">
                <ControlLabel>Електронна адреса</ControlLabel>
                <FormControl onChange={this.handleEmailChange} type="email" placeholder="john.doe@radiobarmaglot.com" />
                <HelpBlock>Поле для Вашої електронної адреси.</HelpBlock>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Текст повідомлення</ControlLabel>
                <FormControl onChange={this.handleMessageChange} componentClass="textarea" placeholder="Привіт! Бармашлот дуже кльове радіо!" />
                <HelpBlock>Поле для Вашого відгуку.</HelpBlock>
            </FormGroup>
            </form>
            <hr />

            <h4>Дякуємо за Ваш відгук!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={this.submit}>
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