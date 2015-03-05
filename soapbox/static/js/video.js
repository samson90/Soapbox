function Video(id, name, post_date, pro, upvotes, topic, user){
	this.id = id;
	this.name = name;
	this.post_date = post_date;

	if (pro == "True")
		this.pro = true;
	else
		this.pro = false;

	this.upvotes = upvotes;
	this.topic = topic;
	this.user = user;
}
