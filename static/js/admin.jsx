import {QuoteBox} from "./quote.jsx";

var AdminComponent = React.createClass({
   render: function(){
       return (<QuoteBox url="/api/quotes" pollInterval={2000} />)
   }
});

export { AdminComponent };