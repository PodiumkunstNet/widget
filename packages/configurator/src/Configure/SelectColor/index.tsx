import { ColorInput, Stack } from "@mantine/core"
import { State } from "../../state"
import { Action, Actions } from "../../state/actions"
import { assessContrast } from "./asses-contrast"
import { useState } from "react"

import classes from "./index.module.css"

export function SelectColor({
	state,
	dispatch,
}: {
	state: State
	dispatch: React.Dispatch<Action>
}) {
	const [primaryColorContrast, setPrimaryColorContrast] = useState(
		assessContrast(state.primaryColor, "#ffffff"),
	)
	const [secondaryColorContrast, setSecondaryColorContrast] = useState(
		assessContrast(state.secondaryColor, "#ffffff"),
	)

	return (
		<div>
			<h2 className="mb-6">Kleuren</h2>
			<Stack gap="md">
				<ColorInput
					description={
						<ContrastMessage assessment={primaryColorContrast} />
					}
					label="Hoofdkleur"
					value={state.primaryColor}
					onChangeEnd={(primaryColor) => {
						setPrimaryColorContrast(
							assessContrast(primaryColor, "#ffffff"),
						)
						dispatch({
							type: Actions.SetColor,
							payload: { primaryColor },
						})
					}}
					format="rgb"
					swatchesPerRow={3}
				/>
				<ColorInput
					description={
						<ContrastMessage assessment={secondaryColorContrast} />
					}
					label="Ondersteunende kleur"
					value={state.secondaryColor}
					onChangeEnd={(secondaryColor) => {
						setSecondaryColorContrast(
							assessContrast(secondaryColor, "#ffffff"),
						)
						dispatch({
							type: Actions.SetColor,
							payload: { secondaryColor },
						})
					}}
					format="rgb"
					swatchesPerRow={3}
				/>
			</Stack>
		</div>
	)
}

function ContrastMessage({
	assessment,
}: {
	assessment: ReturnType<typeof assessContrast>
}) {
	const { passes, ratio } = assessment

	const content = passes.aaNormal
		? `WCAG AA${passes.aaaNormal ? "A" : ""}`
		: `Onvoldoende contrast: ${ratio}:1`

	return (
		<span className={passes.aaNormal ? classes.valid : classes.invalid}>
			{content}
		</span>
	)
}
