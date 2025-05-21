import { SourceCode } from "./SourceCode"
import { Orientation, SizeValue, useSourceCode } from "./useSourceCode"
import { useState } from "react"
import {
	ColorInput,
	Radio,
	Select,
	Stack,
	TextInput,
} from "@mantine/core"

import classes from "./index.module.css"

const root = document.documentElement
const initPrimaryColor = getComputedStyle(root)
	.getPropertyValue("--color-primary")
	.trim()
const initSecondaryColor = getComputedStyle(root)
	.getPropertyValue("--color-blue")
	.trim()

console.log("initPrimaryColor", initPrimaryColor)

export function Configure() {
	const [id, setID] = useState<string>("http://example.com/pknet/testWorkZF")
	const [orientation, setOrientation] = useState<Orientation>(
		Orientation.Landscape,
	)
	const [size, setSize] = useState<SizeValue>(SizeValue.large)
	const [primaryColor, setPrimaryColor] = useState<string>(initPrimaryColor)
	const [secondaryColor, setSecondaryColor] =
		useState<string>(initSecondaryColor)
	const source = useSourceCode(
		id,
		orientation,
		size,
		primaryColor,
		secondaryColor,
	)
	const [copied, setCopied] = useState(false)

	return (
		<div className={classes.container}>
			<TextInput
				className={classes.iriInput}
				label={<h2>Voer een IRI in</h2>}
				id="code"
				placeholder="Voer een IRI in"
				value={id}
				onChange={(e) => {
					setCopied(false)
					setID(e.target.value)
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
				value={id}
				onChange={(value) => {
					setCopied(false)
					setID(value || "")
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
							checked={option === size}
							onChange={() => {
								setCopied(false)
								setSize(option)
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
							checked={option === orientation}
							onChange={() => {
								setCopied(false)
								setOrientation(option)
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
						value={primaryColor}
						onChangeEnd={setPrimaryColor}
						format="rgb"
						swatchesPerRow={3}
					/>
					<ColorInput
						label="Ondersteunende kleur"
						value={secondaryColor}
						onChangeEnd={setSecondaryColor}
						format="rgb"
						swatchesPerRow={3}
					/>
				</Stack>
			</div>

			<div className={classes.sourceCode}>
				<label htmlFor="embedCode">
					<h2 className="mb-6">Embed code</h2>
				</label>
				<SourceCode
					copied={copied}
					disabled={!id}
					onCopy={() => setCopied(true)}
					source={source}
				/>
			</div>

			<div className={classes.preview} dangerouslySetInnerHTML={{ __html: source }} />
		</div>
	)
}
