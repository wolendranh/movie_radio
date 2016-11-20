import React from "react";
import $ from 'jquery';
import { Modal, Popover, Tooltip, Button, OverlayTrigger, FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';

const EmailModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  submit(e){
    console.log(e);
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <img
            onClick={this.open}
            src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/mail.png" className="img-responsive center-block"
        >
        </img>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Введіть ваш відгук у форму!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Введіть Ваше повідомлення,</h4>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Текст повідомлення</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>
            <hr />

            <h4>Дякуємо за Ваш відгук</h4>
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