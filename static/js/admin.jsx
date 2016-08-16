import {QuoteBox} from "./quote.js"

var AdminComponent = React.createClass({
   render: function(){
       return (<QuoteBox url="/api/quotes" pollInterval={2000} />)
   }
});

export { AdminComponent };