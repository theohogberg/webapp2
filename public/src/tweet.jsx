var Tweet = React.createClass({
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},	
	render: function() {
		var likes = this.props.likes || [];
		return (
			<ul className="list-unstyled">
				<li className="button-block clearfix">
					<div className="col-xs-9 button-block-center">
						<button type="button" className="col-xs-1 btn btn-default" aria-label="Left Align">
						  <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
						</button>
						<span className="col-xs-7 border btn pointer-none" aria-label="Left Align">
							<strong className="float-left">Likes</strong>&nbsp;<strong className="float-right">{likes.length}</strong>
						</span>
					</div>
				</li>
				<li className="button-block clearfix">
					<div className="col-xs-9 button-block-center">
						<p>{this.props.text}</p>
						<p><i>{(new Date(this.props.date)).toISOString().substring(0, 10)}</i></p>
					</div>
				</li>
			</ul>
		);
	}
});

module.exports = Tweet;

// _id: "57399b6f0db6bdc64f61fa9c", user: "5738454babf15cb57b1ea162", text: "qdwwqdqwdwqdq", date: "2016-05-16T10:05:35.904Z", likes: Array[0]
