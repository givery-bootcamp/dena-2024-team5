package zombie

import (
	"math/rand"
	"time"
)

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

	rand.New(rand.NewSource(time.Now().UnixNano()))
	comment := zombieComments[rand.Intn(len(zombieComments))]
	return comment
}
