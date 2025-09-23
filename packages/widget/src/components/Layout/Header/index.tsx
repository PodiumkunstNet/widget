import { useContext, useEffect, useState } from "react"
import clsx from "clsx"

import { cn } from "../../../utils/cn"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { DispatchContext, GridDataContext, StateContext } from "../../../state"
import { Actions } from "../../../state/actions"

import classes from "./index.module.css"
import {
	IconCaretLeftFilled,
	IconCaretRightFilled,
} from "@tabler/icons-react"
import { useLocation } from "react-router-dom"

type Props = {
	staticPage?: boolean
}

export function Header({ staticPage = false }: Props) {
	const dispatch = useContext(DispatchContext)
	const { title, id, type, items } = useContext(GridDataContext)
	const { options } = useContext(StateContext)
	const { navigate } = useTransitionNavigate()

	const savedTitle = sessionStore.getTitle(id, type)
	const homeURL = sessionStore.getHomeURL()

	// Using location in the header is not a perf problem,
	// because the header is always re-rendered when the location changes
	const location = useLocation()
	const isSubCategoryView = location.pathname + location.search !== homeURL

	return (
		<header
			className={cn(classes.header, {
				[classes.staticPage]: staticPage,
			})}
		>
			<section className={classes.top}>
				<button
					className={clsx({ [classes.logoButton]: isSubCategoryView })}
					onClick={() => {
						if (!isSubCategoryView || homeURL == null) return
						navigate(homeURL)
					}}
				>
					<img
						src="/PodiumkunstLogo-Large.png"
						alt="Podiumkunst.net logo"
					/>
				</button>
				<nav>
					<ul>
						<li className={classes.buttonWrapper}>
							<button
								id="logo"
								onClick={() =>
									dispatch({
										type: Actions.ToggleAboutPage,
									})
								}
							>
								{/* <ArrowBack /> */}
								{/* <IconHomeFilled size={16} /> */}
								Over ons
							</button>
						</li>
						{/* {(staticPage || infoItem != null || isSubCategoryView) && (
							<li
								className={cn(
									classes.buttonWrapper,
									classes.backButtonWrapper,
								)}
							>
								<button
									className={classes.backButton}
									onClick={() => {
										if (infoItem) {
											dispatch({
												type: Actions.SetInfoItem,
												payload: { item: undefined },
											})
											return
										}

										back()
									}}
								>
									{infoItem == null ? (
										<>
											Terug
											<IconCaretLeftFilled size={18} />
										</>
									) : (
										<>
											Sluiten
											<IconX size={18} />
										</>
									)}
								</button>
							</li>
						)} */}
					</ul>
				</nav>
			</section>

			<section className={classes.main}>
				{!staticPage && (
					<h2>
						{savedTitle && isSubCategoryView ? (
							<span>{savedTitle}</span>
						) : (
							<span>
								<span className={classes.dimmed}>meer over</span>{" "}
								{title}
							</span>
						)}
					</h2>
				)}
			</section>

			<Paginator
				id={id}
				pages={
					Math.ceil(items.length / options.maxRows) - options.maxColumns
				}
			/>
		</header>
	)
}

function Paginator({ id, pages }: { id: string | undefined; pages: number }) {
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		setCurrentPage(0)
	}, [id])

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--current-page",
			currentPage.toString(),
		)
	}, [currentPage])

	if (pages < 1) return null

	const hasPrev = currentPage > 0
	const hasNext = currentPage < pages

	return (
		<ul className={cn(classes.paginator, {})}>
			<li
				className={clsx(classes.button, { [classes.disabled]: !hasPrev })}
				onClick={() => {
					if (!hasPrev) return
					setCurrentPage((p) => p - 1)
				}}
			>
				<IconCaretLeftFilled
					size={18}
					color={hasPrev ? "white" : "rgba(255, 255, 255, 0.33)"}
				/>
				<span className={classes.label}>prev</span>
			</li>
			<li
				className={clsx(classes.button, classes.next, {
					[classes.disabled]: !hasNext,
				})}
				onClick={() => {
					if (!hasNext) return
					setCurrentPage((p) => p + 1)
				}}
			>
				<span className={classes.label}>next</span>
				<IconCaretRightFilled
					size={18}
					color={hasNext ? "white" : "rgba(255, 255, 255, 0.33)"}
				/>
			</li>
		</ul>
	)
}
