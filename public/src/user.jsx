var Link = require("react-router").Link;
var Tweeter = require("./tweeter.js");
var Tweetlist = require("./tweetlist.js");

var User = React.createClass({
	getInitialState: function() {
		return {
			user : { 
				followers : [],
				following : []
			}
		};
	},	
	componentDidMount() {
		var url = "/api/users/";

		if (this.props.params && this.props.params.name)
			url += this.props.params.name;
		else if (this.props.id)
			url += this.props.id;
		
		this.serverRequest = $.get(url, (data) => {
			console.log(data);
			this.setState({
				user : data
			});
		});

	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},	
	render: function() {
		var followers = this.state.user.followers;
		var following = this.state.user.following;
		return (
			<section className="container">
					
				<ul className="list-unstyled clearfix row">
					<li className="button-block clearfix">
						<div className="col-xs-9 button-block-center">
							<button type="button" className="col-xs-1 btn btn-default" aria-label="Left Align">
							  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
							</button>
							<span className="col-xs-7 border btn pointer-none" aria-label="Left Align">
								<strong className="float-left pointer-auto"><Link to={"users/"+this.state.user.name}>{this.state.user.name}</Link></strong>
							</span>
						</div>
					</li>

					<li className="button-block clearfix">
						<div className="col-xs-9 button-block-center">
							<button type="button" className="col-xs-1 btn btn-default" aria-label="Left Align">
							  <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
							</button>
							<span className="col-xs-7 border btn pointer-none" aria-label="Left Align">
								<strong className="float-left">Followers</strong>&nbsp;<strong className="float-right">{followers.length}</strong>
							</span>
						</div>
					</li>

					<li className="button-block clearfix">
						<div className="col-xs-9 button-block-center">
							<button type="button" className="col-xs-1 btn btn-default" aria-label="Left Align">
							  <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
							</button>
							<span className="col-xs-7 border btn pointer-none" aria-label="Left Align">
								<strong className="float-left">Following</strong>&nbsp;<strong className="float-right">{following.length}</strong>
							</span>
						</div>
					</li>
				</ul>

				<Tweetlist id={this.props.id}/>
				
				<Tweeter id={this.props.id}/>

			</section>
		);
	}
});

module.exports = User;