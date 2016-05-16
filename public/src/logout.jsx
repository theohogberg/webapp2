var Logout = React.createClass({
 	handleClick: function(event) {
 		$.post( "/login", "", function(data){
 			console.log(data);
 		});
	},
	componentWillUnmount: function() {
		// this.serverRequest.abort();
	},		
	render: function() {
		return (
			<ul className="list-unstyled margin-last">
				<li className="clearfix">
					<form><button type="submit" className="btn btn-default col-xs-2 col-xs-offset-5" onClick={this.handleClick} type="submit"><strong>Logout</strong></button></form>
				</li>
			</ul>
		);
	}
});

module.exports = Logout;

