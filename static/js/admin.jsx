import {QuoteBox} from "./quote.jsx";
import {React} from "react";

var AdminComponent = React.createClass({
   render: function(){
       return (<QuoteBox url="/api/quotes" pollInterval={2000} />)
   }
});

export { AdminComponent };