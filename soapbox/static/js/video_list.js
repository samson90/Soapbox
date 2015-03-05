function VideoList(videos){
	this.videos = [];
	for (var i = 0; i < videos.length; i++)
	{
		// add each video to the video list if it can be accessed.
		$.ajax({
			async: false,
			type: 'GET',
			url: "http://gdata.youtube.com/feeds/api/videos/" + videos[i].id,
			context: this,
			success: function(){
				this.videos.push(videos[i]);
			}
		});
	}

	this.length = this.videos.length;

	this.sort_rated = function(){
		this.videos.sort(function(v1, v2){
			return v2.upvotes - v1.upvotes;
		});
	}

	this.sort_recent = function(){
		this.videos.sort(function(v1, v2){
			return v2.post_date - v1.post_date;
		});
	}

	this.get = function(i){
		return this.videos[i];
	}

	this.get_by_id = function(ID){
		for (var i = 0; i < videos.length; i++)
		{
			if (this.videos[i].id == ID)
				return this.videos[i]
		}
	}
}
