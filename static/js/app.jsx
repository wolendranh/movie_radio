import {LoginForm} from "./login.jsx";
import {AdminComponent} from "./admin.jsx"

var App = React.createClass({
    render: function(){
        return (
                <ReactRouter.Router history={ReactRouter.browserHistory}>
                    <ReactRouter.Route  path="/" url='login' component={ LoginForm }>
                     </ReactRouter.Route>
                    <ReactRouter.Route  path="/login" url='login' component={ LoginForm }>
                    </ReactRouter.Route>
                    <ReactRouter.Route  path="/admin" component={ AdminComponent }>
                    </ReactRouter.Route>
                </ReactRouter.Router>
        )
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
