import cx from "clsx"
// import ArrowBack from "../../../public/visuals/icons/arrow-back.svg?react"
import ArrowBack from "../../../public/visuals/icons/arrow-back.svg?react"

import styles from "./index.module.css"

type ErrorProps = {
	error?: string
}

export const ErrorPreview = ({
	error = "Helaas is de widget op dit moment niet beschikbaar.",
}: ErrorProps) => {
	return (
		<div className={cx(styles.error)}>
			<span>{error}</span>
		</div>
	)
}

type EmptyProps = {
	handleBack?: () => void
}

export const EmptyState = ({
	handleBack = () => window.history.back(),
}: EmptyProps) => {
	return (
		<div className={cx(styles.error, styles.empty)}>
			<span>
				Er is geen informatie beschikbaar
			</span>
			<button onClick={handleBack}>
				<ArrowBack />
				Terug
			</button>
		</div>
	)
}
