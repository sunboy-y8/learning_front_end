var superagent = require('superagent');

var cheerio = require('cheerio');

var eventproxy = require('eventproxy');

// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html

var url = require('url');

var cnodeUrl = "https://cnodejs.org/";

superagent.get(cnodeUrl).end(function(err,res){

	if(err){
		return console.error(err);
	}
	
	var topicUrls = [];

 	var $ = cheerio.load(res.text);
	
	// 获取首页所有的链接

	$('#topic_list .topic_title').each(function(idx,element){
		
		$element = $(element);

		var href = url.resolve(cnodeUrl,$element.attr('href'));

		topicUrls.push(href);
		

	});

	//console.log(topicUrls);

	// 得到 topicUrls 之后

// 得到一个 eventproxy 的实例
	
	var eq = new eventproxy();

	// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
	
	eq.after('topic_html',topicUrls.length,function(topics){
		
		// topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
		
		topics = topics.map(function(topicPair){
		
			var topicUrl = topicPair[0];

			var topicHtml = topicPair[1];

			var $ = cheerio.load(topicHtml);

			return ({
				
				title:$('.topic_full_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim(),
				author1:$('.user_name').eq(0).text().trim(),
				score1:$('.board').eq(0).text().trim()

			});
		});
	
		console.log('final:');
		console.log(topics);
	
	}); 
	
	
	

	topicUrls.forEach(function(topicUrl){
	
		superagent.get(topicUrl).end(function(err,res){

			//console.log('fetch '+topicUrl+" successful");

			eq.emit('topic_html',[topicUrl,res.text]);			

		});
	
	});



});