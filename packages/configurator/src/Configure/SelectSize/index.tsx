import { Radio, Stack, TextInput } from "@mantine/core"
import { SizeValue, State, sizes } from "../../state"
import { Action, Actions } from "../../state/actions"

import classes from "../index.module.css"

export function SelectSize({
	state,
	dispatch,
}: {
	state: State
	dispatch: React.Dispatch<Action>
}) {
	return (
		<div>
			<h2 className="mb-6">Selecteer formaat</h2>
			<Stack gap="md">
				{Object.values(SizeValue)
					.filter((option) => option !== SizeValue.Custom)
					.map((option) => (
						<Radio
							key={option}
							label={
								<span className={classes.radioLabel}>
									<span>{option}</span>
									<small>{sizes[option][0]}</small>
									<small>{sizes[option][1]}</small>
								</span>
							}
							checked={option === state.size}
							onChange={() => {
								dispatch({
									type: Actions.SetSize,
									payload: { size: option },
								})
							}}
						/>
					))}
				<Radio
					key={SizeValue.Custom}
					label={
						<span className={classes.radioLabel}>
							<span>{SizeValue.Custom}</span>
							<TextInput
								onChange={(e) => {
									dispatch({
										type: Actions.SetCustomSize,
										payload: { width: e.target.value },
									})
								}}
								placeholder="W"
								size="xs"
								value={state.customWidth}
							/>
							<TextInput
								onChange={(e) => {
									dispatch({
										type: Actions.SetCustomSize,
										payload: { height: e.target.value },
									})
								}}
								placeholder="H"
								size="xs"
								value={state.customHeight}
							/>
						</span>
					}
					checked={SizeValue.Custom === state.size}
					onChange={() => {
						dispatch({
							type: Actions.SetSize,
							payload: { size: SizeValue.Custom },
						})
					}}
				/>
			</Stack>
		</div>
	)
}
