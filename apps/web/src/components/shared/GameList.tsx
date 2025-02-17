import styled from "styled-components"

import { header2 } from "@Styles/typography"
import { FirebaseStorageResolver } from "@Components/shared/FirebaseStorageResolver"

interface Props {
	/** The array of games to render. */
	data: IGame[]
	/** Do you want the games to do a zoom-in animation when hovered? Defaults to true. */
	hoverScale?: boolean
	/** Function to run when the game is clicked on. */
	onClick?: (...args: any) => any
	/** Show visit text at the bottom of the game's art. */
	withVisitText?: true
}

/** List of all of the games on the platform. This component is only a fragment. Therefore, it needs a container or wrapper around it to be given proper alignment. */
export const GameList = ({ data, hoverScale = true, onClick, withVisitText }: Props) => {
	return (
		<>
			{data &&
				data.map((elem) => {
					return (
						<ListItem
							key={elem.displayName}
							active={elem.active}
							hoverScale={hoverScale}
							onClick={() => elem.active && onClick && onClick(elem)}
							data-cy={`${elem.urlSafeName}-button`}
						>
							<ImageContainer>
								<FirebaseStorageResolver
									noSpinner
									path={elem.titleImage}
									render={(data) => <img src={data} alt={`${elem.displayName} Cover Art`} style={{ width: "100%" }} />}
								/>
								{!elem.active && (
									<ComingSoon>
										<p>COMING</p>
										<p>SOON</p>
									</ComingSoon>
								)}
								{withVisitText && (
									<VisitTextContainer>
										<p>{"Visit >"}</p>
									</VisitTextContainer>
								)}
							</ImageContainer>
						</ListItem>
					)
				})}
		</>
	)
}

export default GameList

// Styled Components

interface IListItem {
	active: boolean
	hoverScale: boolean
	onClick: (...args: any) => any
}

const ListItem = styled.div<IListItem>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-radius: 20px;
	background-color: rgba(29, 29, 31, 0.5);
	opacity: ${(props) => (props.active ? 1 : 0.4)};
	transition: 0.2s;
	cursor: ${(props) => (props.active ? "pointer" : "initial")};

	@media (hover: hover) {
		&:hover {
			transform: ${(props) => (!props.hoverScale ? "initial" : "scale(1.1)")};
		}
	}
`

const ImageContainer = styled.div`
	position: relative;
	width: 200px;
	height: 270px;
	border-radius: 5px;
	overflow: hidden;
	text-align: center;

	@media (max-width: 500px) {
		width: 125px;
		height: 175px;
	}
`

const ComingSoon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transform-origin: 50% 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${header2};
	font-size: 18px;
	cursor: default;
`

const VisitTextContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	padding: 12px 0 4px;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0.8) 20%,
		rgba(0, 0, 0, 1) 80%,
		rgba(0, 0, 0, 1) 100%
	);
	${header2};
	font-size: 18px;
`
