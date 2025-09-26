import { SourceCode } from "./SourceCode"
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import {
	Button,
	NumberInput,
	Radio,
	Select,
	Stack,
	TextInput,
} from "@mantine/core"

import { initialState, Orientation, SizeValue } from "../state"
import { stateReducer } from "../state/reducer"
import { Actions } from "../state/actions"
import { SelectSize } from "./SelectSize"

import classes from "./index.module.css"
import { extractIriAndType } from "../utils/iri"
import { SelectColor } from "./SelectColor"

export function Configure() {
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const navigate = useNavigate()

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
			<div className={classes.iriSelectContainer}>
				<Select
					className={classes.iriSelect}
					label={<h2>Voorbeeld IRIs</h2>}
					placeholder="Selecteer een werk"
					data={[
						{
							group: "Werk (work)",
							items: [
								{
									value: "http://example.com/pknet/work21_Thron&type=work",
									label: "Der Thronfolger",
								},
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
								// {
								// 	value: "http://data.beeldengeluid.nl/id/program/2101608140126825331_work",
								// 	label: "Programma Concertgebouworkest - Furtwaengler; Wilhelm",
								// },
							],
						},
						{
							group: "Persoon (agent)",
							items: [
								{
									value: "http://example.com/pknet/agentKrisztinaDeCh%C3%A2tel&type=agent",
									label: "Krisztina de Châtel",
								},
							],
						},
						{
							group: "Organisatie (agent)",
							items: [
								{
									value: "http://example.com/pknet/agentDansgroepKrisztinaDeCh%C3%A2tel&type=agent",
									label: "Dansgroep Krisztina de Châtel",
								},
							],
						},
						{
							group: "Registratie (work)",
							items: [
								{
									value: "http://example.com/pknet/recording01_TheaterkrantRecensie&type=work",
									label: "Thron recensie Theaterkrant 2017",
								},
							],
						},
					]}
					maxDropdownHeight={600}
					value={state.iri}
					onChange={(value) => {
						if (!value) return
						dispatch({
							type: Actions.SetIRI,
							payload: { iri: value },
						})
					}}
				/>
				<Button
					disabled={!state.iri}
					onClick={() => {
						if (!state.iri) return
						const { cleanIri, type } = extractIriAndType(state.iri)
						const typeParam = (type ?? "work").toLowerCase()
						navigate(
							`/validate?id=${encodeURIComponent(
								cleanIri,
							)}&type=${encodeURIComponent(typeParam)}&maxTiles=${
								state.maxTiles
							}`,
						)
					}}
				>
					Bekijk brondata
				</Button>
			</div>

			<SelectSize state={state} dispatch={dispatch} />

			<div>
				<h2 className="mb-6">Orientatie</h2>
				<Stack gap="md">
					{[Orientation.Landscape, Orientation.Portrait].map((option) => (
						<Radio
							disabled={
								state.size === SizeValue.Fill ||
								state.size === SizeValue.Custom
							}
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

			<SelectColor state={state} dispatch={dispatch}  />

			<div>
				<h2 className="mb-6">Aantal rijen en kolommen</h2>
				<Stack gap="md">
					<NumberInput
						label="Rijen"
						value={state.maxRows}
						onChange={(n) => {
							dispatch({
								type: Actions.SetGrid,
								payload: { maxRows: n ?? 0 },
							})
						}}
						min={0}
						max={6}
					/>
					<NumberInput
						label="Kolommen"
						value={state.maxColumns}
						onChange={(n) => {
							dispatch({
								type: Actions.SetGrid,
								payload: { maxColumns: n ?? 0 },
							})
						}}
						min={0}
						max={6}
					/>
				</Stack>
			</div>

			<div>
				<h2 className="mb-6">Randbreedte</h2>
				<Stack gap="md">
					<NumberInput
						label=" "
						value={state.borderWidth}
						onChange={(n) => {
							dispatch({
								type: Actions.SetBorderWidth,
								payload: { borderWidth: n ?? 1 },
							})
						}}
						min={1}
						max={50}
					/>
				</Stack>
			</div>

			<div>
				<h2 className="mb-6">Maximaal aantal tegels</h2>
				<Stack gap="md">
					<NumberInput
						label=" "
						value={state.maxTiles}
						onChange={(n) => {
							dispatch({
								type: Actions.SetMaxTiles,
								payload: { maxTiles: n ?? 0 },
							})
						}}
						min={0}
						max={50}
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
