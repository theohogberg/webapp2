var Tweeter = React.createClass({
	getInitialState: function() {
		return {
			text : ""
		};
	},
	handleChange: function(event){
		this.setState({ text : event.target.value });  
	},
 	handleSubmit: function(event) {
 		event.preventDefault();
 		var s = "/api/tweets/"+this.props.id+"/"+escape(this.state.text);

 		this.serverRequest = $.post( s, (data) => {
 			console.log(data);
 		});

 		this.setState({ text : "" });
	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},	
	render: function() {
		return (
			<ul className="list-unstyled form-group table">
				<li className="clearfix">
					<textarea className="border-drk max-width form-control text-lg noresize" maxLength="200" value={this.state.text} onChange={this.handleChange} rows="4"></textarea>
				</li>
				<li className="clearfix margin-last">
					<form className="margin-last-lg" role="form" onSubmit={this.handleSubmit}>
						<button type="submit" className="col-xs-2 btn btn-default float-right">
						  <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
						</button>					
					</form>
				</li>
			</ul>
		);
	}
});

module.exports = Tweeter;