const scriptName = "kakaobot";

var start = 0;
var bot_room = "";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
	if (msg == "!알림봇시작") {
		if (start != 0)
			replier.reply("알림봇이 이미 활성화 상태입니다.");
		else {
			start = start + 1;
			bot_room = room;
			replier.reply("알림봇이 동작합니다.");
		}
	}
}

const executeTask = (room) => {
	if (start == 1) {
		try {
			doc = org.jsoup.Jsoup.connect("http://52.79.233.30:8000/api/url?id=kuz_test98").get();
			link = doc.body().text();
			if (link != "NULL")
				Api.replyRoom(room, link);
		} catch (e) {
			;
		}
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

scheduleTask(22, 00);
scheduleTask(00, 00);
scheduleTask(02, 00);
scheduleTask(04, 00);
scheduleTask(06, 00);
scheduleTask(08, 00);
scheduleTask(10, 00);
scheduleTask(12, 00);
scheduleTask(14, 00);
scheduleTask(16, 00);

/*
scheduleTask(10, 00);
scheduleTask(14, 00);
scheduleTask(18, 00);
*/
