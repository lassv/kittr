import { useState, useEffect, Dispatch, SetStateAction } from "react"
import styled, { ThemeProvider } from "styled-components"

import { customOrderArray } from "@Utils/helpers/orderArrayByString"
import { warzoneSlotsOrder } from "@Utils/lookups/warzoneSlotsOrder"
import { asyncDelay } from "@Utils/helpers/asyncDelay"
import { header1, header2, montserrat, paragraph } from "@Styles/typography"

interface Props {
	_id: string
	previewWidth?: number
	data: any
	activeKit: IKit
	setActiveKit: Dispatch<SetStateAction<IKit>>
}

const DATA_SWITCH_TIMER = 5000
const OPTION_SWAP_INTERVAL = 500
const OPACITY_DURATION = 0.2

const BannerTicker = ({ _id, previewWidth, data, activeKit, setActiveKit }: Props) => {
	const [isOptionVisible, setIsOptionVisible] = useState(true)
	const [isBaseVisible, setIsBaseVisible] = useState(true)
	const [cursor, setCursor] = useState(0)

	const activeKitOptions =
		Object.keys(activeKit || {}).length > 0
			? customOrderArray<{ slotKey: string; displayName: string }>({
					sortingArray: warzoneSlotsOrder,
					keyToSort: "slotKey",
					array: activeKit.options || []
			  })
			: []

	const hasAnActiveKit = Object.keys(activeKit || {}).length

	useEffect(() => {
		let interval: any = null

		interval = setInterval(async () => {
			setIsOptionVisible(false)

			await asyncDelay(OPTION_SWAP_INTERVAL)

			if (hasAnActiveKit) {
				const length = activeKit.options.length - 1

				setCursor((cursor) => {
					if (cursor < length) {
						return cursor + 1
					} else {
						return 0
					}
				})
			}

			setIsOptionVisible(true)
		}, DATA_SWITCH_TIMER)

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKit])

	useEffect(() => {
		const switchKit = async () => {
			if (hasAnActiveKit) {
				if (cursor === 0) {
					const kitCount = [data.primaryKit, data.secondaryKit].filter(
						(kit) => !!kit && Object.keys(kit).length > 0
					).length

					if (kitCount > 1) {
						if (activeKit._id === data.primaryKit._id) {
							setActiveKit(data.secondaryKit)
						} else {
							setActiveKit(data.primaryKit)
						}
					}
				}

				setIsBaseVisible(true)
			}
		}

		switchKit()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursor])

	useEffect(() => {
		const resetEndofKitVisiblility = async () => {
			if (hasAnActiveKit) {
				const length = activeKit.options.length - 1
				if (cursor === length) {
					await asyncDelay(DATA_SWITCH_TIMER - OPTION_SWAP_INTERVAL)
					setIsBaseVisible(false)
				}
			}
		}

		resetEndofKitVisiblility()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursor])

	if (!data) return null

	const hasAKitSelected =
		Object.keys(data.primaryKit || {}).length > 0 || Object.keys(data.secondaryKit || {}).length > 0
	const isRendered = data.isOverlayVisible === "on" && hasAKitSelected
	const isOverlayVisible = !!previewWidth || isRendered

	return (
		<ThemeProvider
			theme={{
				...data,
				isOverlayVisible: isOverlayVisible && hasAKitSelected,
				previewWidth
			}}
		>
			<Wrapper>
				<Meta fadeDuration={OPACITY_DURATION}>
					<BaseName isVisible={isBaseVisible} fadeDuration={OPACITY_DURATION}>
						{activeKit?.base?.displayName}
					</BaseName>
					<CommandInfo isVisible={isBaseVisible} fadeDuration={OPACITY_DURATION}>
						!{activeKit?.base?.commandCodes[0]}
					</CommandInfo>
				</Meta>
				<OptionWrapper isVisible={isOptionVisible} fadeDuration={OPACITY_DURATION}>
					{activeKit && (
						<>
							<Option key={activeKitOptions[cursor]?.displayName}>
								<Slot>{activeKitOptions[cursor]?.slotKey}</Slot>
								<Selection>{activeKitOptions[cursor]?.displayName.toUpperCase()}</Selection>
							</Option>
						</>
					)}
				</OptionWrapper>
			</Wrapper>
		</ThemeProvider>
	)
}

export default BannerTicker

// Styled Components

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	width: 500px;
	height: 90px;
	background-image: url("${(props) => props.theme.customBackground}");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	top: ${(props) => (props.theme.isOverlayVisible ? "0px" : "32px")};
	opacity: ${(props) => (props.theme.isOverlayVisible ? 1 : 0)};
	transition: 0.4s;
	background-color: ${(props) =>
		props.theme.customBackground ? props.theme.customBackground : props.theme.backgroundColorPrimary};
	transform: ${(props) => (props.theme.previewWidth ? `scale(${Math.min(1, props.theme.previewWidth / 640)})` : "")};
`

const Meta = styled.div<{ fadeDuration: number }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 200px;
	transition: ${(props) => props.fadeDuration / 2}s;
	height: 100%;
	padding: 0 20px;
	white-space: nowrap;
	background-color: ${(props) =>
		props.theme.customBackground ? props.theme.customBackground : props.theme.backgroundColorSecondary};
	overflow: hidden;
`

const BaseName = styled.p<{ isVisible: boolean; fadeDuration: number }>`
	${header2};
	width: 100%;
	color: ${(props) => props.theme.textColorPrimary};
	opacity: ${(props) => (props.isVisible ? 1 : 0)};
	transition: ${(props) => props.fadeDuration}s;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
`

const CommandInfo = styled.p<{ isVisible: boolean; fadeDuration: number }>`
	${paragraph};
	width: 100%;
	color: ${(props) => props.theme.textColorAccent};
	font-weight: 700;
	opacity: ${(props) => (props.isVisible ? 1 : 0)};
	transition: ${(props) => props.fadeDuration}s;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
`

const OptionWrapper = styled.div<{ isVisible: boolean; fadeDuration: number }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 90px;
	text-align: center;
	opacity: ${(props) => (props.isVisible ? 1 : 0)};
	transition: ${(props) => props.fadeDuration}s;
`

const Option = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-around;
	width: 300px;
	height: 90px;
	padding: 12px 0;
	padding-left: 24px;
`

const Slot = styled.p`
	display: inline-block;
	color: ${(props) => props.theme.textColorSecondary};
	${montserrat};
	font-weight: 600;
	font-size: 18px;
	white-space: nowrap;
`

const Selection = styled.p`
	display: inline-block;
	width: 90%;
	color: ${(props) => props.theme.textColorPrimary};
	${header1};
	font-size: 24px;
	overflow: hidden;
	text-align: left;
	white-space: nowrap;
	text-overflow: ellipsis;
`
