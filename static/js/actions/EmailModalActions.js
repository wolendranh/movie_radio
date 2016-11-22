import AppDispatcher from "../dispatcher/AppDispatcher.js"
import EmailModalConstants from "../constants/EmailModalConstants"

var EmailModalActions = {

  /**
   * Dispatch post action that should invoke call to server for email sending
   * @param {string} senderEmail - email address of sender ( yes, Cap!)
   * @param {string} body - text body of email to be sent
   */
  post: function(senderEmail, body) {
    AppDispatcher.dispatch({
        actionType: EmailModalConstants.SUBMIT_MAIL,
        senderEmail: senderEmail,
        body: body
    });
  }
};


export default EmailModalActions;