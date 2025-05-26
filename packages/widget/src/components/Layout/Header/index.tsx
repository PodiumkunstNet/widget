import { ReactNode, useContext, useEffect, useState } from "react"

// import ArrowBack from "../../../../public/visuals/icons/arrow-back.svg?react"

import { cn } from "../../../utils/cn"
import { ariaLabels } from "../../../constants/ariaLables"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { DispatchContext, GridDataContext, StateContext } from "../../../state"
import { Actions } from "../../../state/actions"
import { Logo } from "../../Logo"

import classes from './index.module.css'
import { IconCaretLeftFilled, IconCaretRightFilled, IconX } from "@tabler/icons-react"
import { useLocation } from "react-router-dom"

type Props = {
	// isSubCategoryView?: boolean
	staticPage?: boolean
	small?: boolean
}

export function Header({
	staticPage = false,
	small = true
}: Props) {
	const dispatch = useContext(DispatchContext)
	const { title, id, type, items } = useContext(GridDataContext)
	const { infoItem } = useContext(StateContext)
	const { navigate, back } = useTransitionNavigate()

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
				<Logo
					aria-hidden={true}
					aria-label={ariaLabels.logo}
					onClick={() => navigate("/about")}
				/>
				<nav>
					<ul>
						{
							!staticPage &&
							isSubCategoryView &&
							homeURL &&
							<li className={classes.buttonWrapper}>
								<button
									onClick={() => {
										navigate(homeURL)
										dispatch({
											type: Actions.SetInfoItem,
											payload: { item: undefined }
										})
									}}
								>
									{/* <ArrowBack /> */}
									{/* <IconHomeFilled size={16} /> */}
									Start
								</button>
							</li>
						}
						{
							(
								staticPage ||
								infoItem != null ||
								isSubCategoryView
							) &&
							<li className={cn(classes.buttonWrapper, classes.backButtonWrapper)}>
								<button
									className={classes.backButton}
									onClick={() => {
										if (infoItem) {
											dispatch({
												type: Actions.SetInfoItem,
												payload: { item: undefined }
											})
											return
										}

										back()
									}}
								>
									{
										infoItem == null
										? <>
											Terug
											<IconCaretLeftFilled size={18} />
										</>
										: <>
											Sluiten
											<IconX size={18} />
										</>
									}
								</button>
							</li>
						}
					</ul>
				</nav>
			</section>
			<section className={classes.main}>
				<Paginator items={items} small={small}>
					{
						!staticPage && (
							<div className={classes.h2Container}>
								<div className={classes.h2Top} />
								<h2>
									{savedTitle && isSubCategoryView
										? savedTitle
										: `Meer over ${title}`}
								</h2>
								<div className={classes.h2Bottom}>
									<div />
									<div />
								</div>
							</div>
						)
					}
				</Paginator>
			</section>
		</header>
	)
}

function Paginator({
	items,
	small,
	children
}: {
	items: any[]
	small?: boolean
	children?: ReactNode	
}) {
	const pages = Math.ceil(items.length / 2)
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--current-page',
			(currentPage).toString()
		)
	}, [currentPage])

	if (!small) return children

	return (
		<ul
			className={cn(classes.paginator, {		
				[classes.small]: small,
			})}
		>
			{
				currentPage > 0
				? <li onClick={() => setCurrentPage(p => p - 1)}>
						<IconCaretLeftFilled size={18} color="white" />
					</li>
				: <li></li>
			}
			<li>{children}</li>
			{
				currentPage < pages - 1
				? <li onClick={() => setCurrentPage(p => p + 1)}>
						<IconCaretRightFilled size={18} color="white" />
					</li>
				: <li></li>
			}
		</ul>
	)
}

// {/* Md block */}
// <div className="absolute inset-0  hidden items-center justify-center md:flex lg:hidden">
//   <div className="relative top-6 max-w-[191px]">
//     <OutliningTopMd width={190} height={13} className={'relative'} />
//     <div className={mediumClasses}>
//       <Text
//         as={'h1'}
//         intent={'h1'}
//         className={
//           'relative left-[-11.5px] break-words uppercase text-primary-white'
//         }
//       >
//         {savedTitle && isSubCategoryView
//           ? savedTitle
//           : `Meer over ${title}`}
//       </Text>
//       <OutliningRight
//         className="absolute right-0 top-[-1px]"
//         // this is a hack to make the outlining right align with the outlining top
//         height={'101%'}
//       />
//     </div>
//     <OutliningBottomMd
//       width={190}
//       height={47}
//       className={'relative top-[-1px]'}
//     />
//   </div>
// </div>

// {/* Sm block */}
// <div className="absolute inset-0 flex items-center justify-center md:hidden lg:hidden">
//   <div className="relative top-6 max-w-[312.5px]">
//     <OutliningTopSm width={307} height={13} className={'relative '} />
//     <div className="relative left-[-0.35em] min-w-[312px] pt-4">
//       <Text
//         as={'h1'}
//         intent={'h1'}
//         className={
//           'relative left-[-4px] break-words uppercase text-primary-white'
//         }
//       >
//         {savedTitle && isSubCategoryView
//           ? savedTitle
//           : `Meer over ${title}`}
//       </Text>
//       <OutliningRight
//         className="absolute right-0 top-[-0.8px]"
//         // this is a hack to make the outlining right align with the outlining top
//         height={'101%'}
//       />
//     </div>
//     <OutliningBottomSm
//       width={307}
//       height={47}
//       className={'relative top-[-1px]'}
//     />
//   </div>
// </div>
