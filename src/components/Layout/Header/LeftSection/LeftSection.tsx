import ArrowBack from "../../../../../public/visuals/icons/arrow-back.svg?react"

import { cn } from "../../../../utils/cn"
import { ariaLabels } from "../../../../constants/ariaLables"

import { Logo } from "../../../Logo"
// import { Text } from "../../../Text"
// import { Button } from "../../../Button"
import useAnimatedRouter from "../../../../hooks/useAnimatedRouter"

import classes from './LeftSection.module.css'
// import { IconHomeFilled } from "@tabler/icons-react"
import { DispatchContext, GridDataContext, StateContext } from "../../../../state"
import { useContext } from "react"
import { Actions } from "../../../../state/actions"

type Props = {
	isSubCategoryView: boolean
	showBackButton?: boolean
	showBorder?: boolean
	handleBack: () => void
	handleBackHome?: () => void
	handleViewAboutOverlay: () => void
	savedTitle: string
	showBackHomeButton?: boolean
	staticPage?: boolean
}

export const LeftSection = ({
	staticPage,
	isSubCategoryView,
	// showBackButton,
	// handleBack,
	savedTitle,
	// handleBackHome,
	// showBackHomeButton,
}: Props) => {
	const dispatch = useContext(DispatchContext)
	const { title } = useContext(GridDataContext)
	const { infoItem } = useContext(StateContext)
	const { navigate, back } = useAnimatedRouter()

	return (
		<header
			className={cn(
				classes.header,
				{
					[classes.staticPage]: staticPage,
				}
			)}
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
							(staticPage || infoItem != null) &&
							<li className={classes.buttonWrapper}>
								<button onClick={() => {
									if (staticPage) {
										back()
									} else if (infoItem) {
										dispatch({
											type: Actions.SetInfoItem,
											payload: { item: undefined }
										})
									}
								}}>
									<ArrowBack />
									Terug
								</button>
							</li>
						}
					</ul>
				</nav>
			</section>

			<section className={classes.main}>
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
			</section>
		</header>
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
