var Tweet = require("./tweet.js")

var Tweetlist = React.createClass({
	getInitialState: function() {
		return { tweets:[] };
	},	
	componentDidMount: function() {
		var url = "/api/tweets/";
		if (this.props && this.props.id)
			url += this.props.id;

		this.serverRequest = $.get(url, (data) => {
			console.log(data);
			this.setState({
				tweets : data
			});
		});

	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},	
	render: function() {
		return (
			<ul className="list-unstyled clearfix row">					
				{this.state.tweets.map( (tweetdata, index) => {
					return ( 
						<li key={index} className="margin-last clearfix">
							<Tweet {...tweetdata} />
						</li>
					);
				})}
			</ul>
		);
	}
});

module.exports = Tweetlist;