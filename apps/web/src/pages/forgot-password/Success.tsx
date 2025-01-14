import BackToLogin from "./BackToLogin"
import styled from "styled-components"
import { paragraph } from "@Styles/typography"

/** Forgotten password successful request message */
const Success = ({ ...props }) => {
	return (
		<>
			<Paragraph>A message was sent to your email to help you reset your password.</Paragraph>
			<Paragraph>Once you've done that, head back to the login and use your brand spankin' new password.</Paragraph>
			<BackToLogin />
		</>
	)
}

export default Success

// Styled Components

const Paragraph = styled.p`
	${paragraph}

	&:first-of-type {
		margin-bottom: 24px;
	}
`
