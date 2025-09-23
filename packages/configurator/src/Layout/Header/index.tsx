import classes from './index.module.css'

export function Header() {
	return (
		<header className={classes.header}>
			<img
				id="logo"
				src="/PodiumkunstLogo-Large-Black.png"
				alt="Podiumkunst.net logo"
			/>
		</header>
	)
}
