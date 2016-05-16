var Login = React.createClass({
  getInitialState: function() {
    return {name:""};
  },
  handleChange: function(event) {
		this.setState({name: event.target.value});  
	},
 	handleSubmit: function(event) {
 		$.post( "/login", this.state, function(data){
 			console.log(data);
 		});
	},
	componentWillUnmount: function() {
		// this.serverRequest.abort();
	},		
	render: function() {
		return (
			<form role="form" onSubmit={this.handleSubmit}>
				<h4 className="margin-last">Login details</h4>
				<div className="input-group">
	 				<span className="input-group-addon" id="basic-addon1">@</span>				
	 				<input value={this.state.name} onChange={this.handleChange} type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"></input>
				</div>
				<button type="submit" className="btn btn-default margin-last col-xs-2"><strong>Login</strong></button>
			</form>
		);
	}
});

module.exports = Login;

