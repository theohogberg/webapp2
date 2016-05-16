var Login = require("./login.js");
var Logout = require("./logout.js");
var User = require("./user.js");

var Router = require("react-router").Router;
var Route = require("react-router").Route;
var browserHistory = require("react-router").browserHistory;
var parseCookies = require("./helper.js").parseCookies;

var App = React.createClass({
	getInitialState: function() {
		return {};
	},		
	componentDidMount: function() {
		var parsedcookies = parseCookies(document.cookie);
		if (parsedcookies && parsedcookies.auth)
			this.setState({
				id:parsedcookies.auth
			});
	},
	render: function() {
		var start = null;
		
		if (this.state.id)
			start = ( 
				<div className="container">
					<div className="container-fluid">
						<h1 className="page-header">Welcome to Simple Twitter</h1>
						<Logout/>
					</div>
					<User id={this.state.id}/>
				</div>
			);
		else
			start = ( 
				<div className="container">
					<div className="container-fluid">
						<h1 className="page-header">Login to Simple Twitter</h1>
						<Login/> 
					</div>
				</div>
			);

		return ( 
			<div>
				{start}	
			</div> 
		);
	}
});

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}></Route>
		<Route path="/login" component={Login}></Route>
		<Route path="/users/:name" component={User}></Route>
	</Router>
), document.getElementById("appcontent"));