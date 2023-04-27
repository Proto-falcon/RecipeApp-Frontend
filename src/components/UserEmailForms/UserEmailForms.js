import FormField from "../FormField/FormField";

/**
 * Renders a username and email field or just username for
 * sign up or login respectively.
 *
 * @param {{
 *      toLogin :boolean,
 *      usernameHandler: (newUsername: string) => void,
 *      emailHandler: (newEmail: string) => void,
 *      inputStyle: *,
 *      labelStyle: *,
 *      containerStyle: *,
 *  }} props
 *
 * @returns Username and Email fields for sign up or
 * only a username field for login
 */
export default function UserEmailForms(props) {
	if (props.toLogin) {
		return (
			<FormField
				label={"Username:"}
				placeholder={"Enter username:"}
				autoCapitalize="none"
				onChangeTextHandler={props.usernameHandler}
				containerStyle={props.containerStyle}
				labelStyle={props.labelStyle}
				inputStyle={props.inputStyle}
			/>
		);
	} else {
		return (
			<>
				<FormField
					label={"Username:"}
					placeholder={"Please enter username:"}
					autoCapitalize="none"
					onChangeTextHandler={props.usernameHandler}
					containerStyle={props.containerStyle}
					labelStyle={props.labelStyle}
					inputStyle={props.inputStyle}
				/>
				<FormField
					label={"Email:"}
					placeholder={"Please enter email:"}
					autoCapitalize="none"
					keyType="email-address"
					onChangeTextHandler={props.emailHandler}
					containerStyle={props.containerStyle}
					labelStyle={props.labelStyle}
					inputStyle={props.inputStyle}
				/>
			</>
		);
	}
}
