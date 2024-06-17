import { aspidaClient } from "@/lib/aspidaClient";
export async function loginApiMiddleware(username: string, password: string) {
  const loggedIn = await aspidaClient.signin.post({
    body: {
      password: password,
      username: username,
    },
  });
  // 上のものをfetchでも同様に行う
  const method = "POST";
  const body = JSON.stringify({
    password: password,
    username: username,
  });
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  fetch("http://localhost:9000/signin", { method, headers, body })
    .then((res) => res.headers)
    .then(console.log)
    .catch(console.error);
}
