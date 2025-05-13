import { useNavigate } from "react-router-dom"

export interface ExtendedDocument extends Document {
	startViewTransition: any
}

export default function useAnimatedRouter() {
	const reactRouterNavigate = useNavigate()

	function navigate(url: string) {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			reactRouterNavigate(url)
		} else {
			extendedDocument.startViewTransition(() => {
				reactRouterNavigate(url)
			})
		}
	}

	function back() {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			reactRouterNavigate(-1)
		} else {
			extendedDocument.startViewTransition(() => {
				reactRouterNavigate(-1)
			})
		}
	}

	return { navigate, back }
}
