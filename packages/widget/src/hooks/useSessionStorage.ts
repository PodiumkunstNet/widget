import { GridDataState } from "../state"

export const HOME_URL = 'WidgetHomeURL'

type ID = GridDataState["id"]
type Type = GridDataState["type"]

function createUniqueID(id: ID, type: Type) {
	return `${id}-${type}`
}

class SessionStorageManager {
	setHomeURL(id: ID, type: Type) {
		const url = `/widget?id=${id}&type=${type}`
		console.log("Setting home URL in sessionStorage:", url)
		sessionStorage.setItem(HOME_URL, url)
	}

	getHomeURL(): string | null {
		return sessionStorage.getItem(HOME_URL)
	}

	setTitle(id: ID, type: Type, title: string | undefined) {
		console.log("Setting title in sessionStorage:", id, title)
		sessionStorage.setItem(createUniqueID(id, type), title ?? "")
	}

	getTitle(id: ID, type: Type) {
		return sessionStorage?.getItem(createUniqueID(id, type)) ?? ""
	}
}

export const sessionStore = new SessionStorageManager()
