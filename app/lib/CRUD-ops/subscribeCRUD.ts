import { url } from "../tempURL";

export async function mutateSubscribeList(method: HTTP, content: UserReqObj): Promise<void> {
    const res = await fetch(`${url}/api/subscriptions`, {
        method: method,
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(content)
    })
    if (!res.ok) {
        console.log(await res.json())
    }
}