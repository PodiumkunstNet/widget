import { SourceCode } from "./SourceCode"
import { useReducer } from "react"
import { ColorInput, Radio, Select, Stack, TextInput } from "@mantine/core"

import classes from "./index.module.css"
import { initialState, Orientation, SizeValue } from "../state"
import { stateReducer } from "../state/reducer"
import { Actions } from "../state/actions"

export function Configure() {
	const [state, dispatch] = useReducer(stateReducer, initialState)

	return (
		<div className={classes.container}>
			<TextInput
				className={classes.iriInput}
				label={<h2>Voer een IRI in</h2>}
				id="code"
				placeholder="Voer een IRI in"
				value={state.iri}
				onChange={(e) => {
					dispatch({
						type: Actions.SetIRI,
						payload: { iri: e.target.value },
					})
				}}
			/>
			<Select
				className={classes.iriSelect}
				label={<h2>Voorbeeld IRIs</h2>}
				placeholder="Selecteer een werk"
				data={[
					{
						value: "http://example.com/pknet/testWorkZF",
						label: "Die Zauberflote",
					},
					{
						value: "https://data.muziekschatten.nl/som/work/82b52a5dbd3d377825ebc3901652e09d",
						label: "Abramsz, Simon. Dansliedje",
					},
					{
						value: "https://data.muziekschatten.nl/som/work/7b1590f2b7c54c7a7c8e36eef531b2af",
						label: "Andriessen, Louis. De Materie",
					},
					{
						value: "http://data.beeldengeluid.nl/id/program/2101608140126825331_work",
						label: "Programma Concertgebouworkest - Furtwaengler; Wilhelm",
					},
				]}
				value={state.iri}
				onChange={(value) => {
					if (!value) return
					dispatch({
						type: Actions.SetIRI,
						payload: { iri: value },
					})
				}}
			/>

			<div>
				<h2 className="mb-6">Selecteer formaat</h2>
				<Stack gap="md">
					{[
						SizeValue.small,
						SizeValue.medium,
						SizeValue.large,
						SizeValue.fill,
					].map((option) => (
						<Radio
							key={option}
							label={option}
							checked={option === state.size}
							onChange={() => {
								dispatch({
									type: Actions.SetSize,
									payload: { size: option },
								})
							}}
						/>
					))}
				</Stack>
			</div>
			<div>
				<h2 className="mb-6">Selecteer orientatie</h2>
				<Stack gap="md">
					{[Orientation.Landscape, Orientation.Portrait].map((option) => (
						<Radio
							key={option}
							label={option}
							checked={option === state.orientation}
							onChange={() => {
								dispatch({
									type: Actions.SetOrientation,
									payload: { orientation: option },
								})
							}}
						/>
					))}
				</Stack>
			</div>
			<div>
				<h2 className="mb-6">Selecteer kleuren</h2>
				<Stack gap="md">
					<ColorInput
						label="Hoofdkleur"
						value={state.primaryColor}
						onChangeEnd={(primaryColor) => {
							dispatch({
								type: Actions.SetColor,
								payload: { primaryColor },
							})
						}}
						format="rgb"
						swatchesPerRow={3}
					/>
					<ColorInput
						label="Ondersteunende kleur"
						value={state.secondaryColor}
						onChangeEnd={(secondaryColor) => {
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

			<div className={classes.sourceCode}>
				<label htmlFor="embedCode">
					<h2 className="mb-6">Embed code</h2>
				</label>
				<SourceCode disabled={!state.iri} source={state.source} />
			</div>

			<div
				className={classes.preview}
				dangerouslySetInnerHTML={{ __html: state.source }}
			/>
		</div>
	)
}
