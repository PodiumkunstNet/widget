import { useNavigate } from "react-router-dom"

export interface ExtendedDocument extends Document {
	startViewTransition: any
}

export default function useAnimatedRouter() {
	const navigate = useNavigate()

	function _navigate(url: string) {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			// return (window.location.href = url)
			navigate(url)
		} else {
			console.log('starting view transition')
			extendedDocument.startViewTransition(() => {
				// window.location.href = url
				navigate(url)
			})
		}
	}

	function back() {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			// return window.history.back()
			navigate(-1)
		} else {
			extendedDocument.startViewTransition(() => {
				// window.history.back()
				navigate(-1)
			})
		}
	}

	// // Navigate to the new route
	// const animatedRoute = (url: string) => {
	// 	const extendedDocument = document as ExtendedDocument
	// 	if (!extendedDocument.startViewTransition) {
	// 		return (window.location.href = url)
	// 	} else {
	// 		extendedDocument.startViewTransition(() => {
	// 			window.location.href = url
	// 		})
	// 	}
	// }

	// const animatedBackRoute = () => {
	// 	const extendedDocument = document as ExtendedDocument
	// 	if (!extendedDocument.startViewTransition) {
	// 		return window.history.back()
	// 	} else {
	// 		extendedDocument.startViewTransition(() => {
	// 			window.history.back()
	// 		})
	// 	}
	// }

	return { navigate: _navigate, back }
}

// export function viewTransitionsStatus() {
// 	const extendedDocument = document as ExtendedDocument
// 	let status = "Opss, Your browser doesn't support View Transitions API"
// 	if (extendedDocument?.startViewTransition) {
// 		status = "Yess, Your browser support View Transitions API"
// 	}
// 	return status
// }