package zombie

import (
	"math/rand/v2"
)

func RandomZombieName() string {
	var zombieNames = []string{
		"zombie_user1",
		"zombie_user2",
		"zombie_user3",
		"zombie_user4",
		"zombie_user5",
		"zombie_user6",
		"zombie_user7",
		"zombie_user8",
		"zombie_user9",
		"zombie_user10",
	}
	name := zombieNames[rand.IntN(len(zombieNames))]
	return name
}

func RandomZombieComment() string {
	var zombieComments = []string{
		"هذا رائع!",
		"أحب هذا!",
		"شكرا لك على المشاركة.",
		"معلومات مفيدة جدا.",
		"أوافق بشدة.",
		"لا أستطيع الانتظار لرؤية المزيد!",
		"أحسنت!",
		"هذا مثير للإعجاب!",
		"أنت على حق تماما.",
		"رائع!",
		"هذا يجعلني سعيدا.",
		"أنت مصدر إلهام.",
		"شكرا لك على كل شيء.",
		"أنت الأفضل!",
		"أنا فخور بك.",
		"لا تستسلم أبدا!",
		"يمكنك فعلها!",
		"أنا أؤمن بك.",
		"استمر في العمل الجيد!",
		"أنت بطل!",
	}
	return zombieComments[rand.IntN(len(zombieComments))]
}
