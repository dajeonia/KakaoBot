const scriptName = "cronbot";

var start = 0;
var cron_room = "";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
	if (msg == "!cron") {
		if (start != 0)
			Log.d("알림봇이 이미 활성화 상태입니다.");
		else {
			start = 1;
			cron_room = room;
			Log.d("알림봇이 동작합니다.");
		}
	}
}

const executeTask = () => {
	text = "안녕하세요. 크론봇입니다.";
	Api.reply(cron_room, text);
};

const scheduleTask = (hour, minute) => {
	const now = new Date();
	const firstExecution = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
	if (now > firstExecution) {
		firstExecution.setDate(firstExecution.getDate() + 1);
	}
	const timeUntilFirstExecution = firstExecution - now;

	setTimeout(() => {
		executeTask();
		setInterval(executeTask, 24 * 60 * 60 * 1000);
	}, timeUntilFirstExecution);
};

