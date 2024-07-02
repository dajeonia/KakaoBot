const scriptName = "kakaobot";

var start = 0;
var bot_room = "";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
	if (msg == "!알림봇시작" && start == 0) {
		start = start + 1;
		bot_room = room;
	}
}

const executeTask = (room) => {
	if (start == 1) {
		doc = org.jsoup.Jsoup.connect("http://localhost:8000/api/url?id=test").get();
		link = doc.body().text();
		if (link != "NULL")
			Api.replyRoom(room, link);
	}
}

const scheduleTask = (hour, minute) => {
	const now = new Date();
	const firstExecution = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
	if (now > firstExecution) {
		firstExecution.setDate(firstExecution.getDate() + 1);
	}
	const timeUntilFirstExecution = firstExecution - now;

	setTimeout(() => {
		executeTask(bot_room);
		setInterval(executeTask, 24 * 60 * 60 * 1000, bot_room);
	}, timeUntilFirstExecution);
}

scheduleTask(10, 00);
scheduleTask(14, 00);
scheduleTask(18, 00);
