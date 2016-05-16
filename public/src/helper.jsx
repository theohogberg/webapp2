function parseCookies(cookies){
	if (cookies == '')
		return;
	var o = {};
	cookies.split(';').forEach(function (c){
		c.split('=').forEach(function (v, i, a){
			if (!(i%2)){
				var next = decodeURIComponent(a[i+1]);
				if (next[0] === '{')
					o[v] = JSON.parse(next);
				else
					o[v] = next;
			}
		});
	});
	return o;
}

module.exports.parseCookies = parseCookies;