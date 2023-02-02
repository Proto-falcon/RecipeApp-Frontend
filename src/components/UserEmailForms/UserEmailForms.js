import FormField from "../FormField/FormField";

/**
 * Renders a username and email field or combination of both for
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
 * a combined field for login
 */
export default function UserEmailForms(props) {
	if (props.toLogin) {
		return (
			<FormField
				label={"Username/Email:"}
				placeholder={"Enter either username/email:"}
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
					onChangeTextHandler={props.usernameHandler}
					containerStyle={props.containerStyle}
					labelStyle={props.labelStyle}
					inputStyle={props.inputStyle}
				/>
				<FormField
					label={"Email:"}
					placeholder={"Please enter email:"}
					onChangeTextHandler={props.emailHandler}
					containerStyle={props.containerStyle}
					labelStyle={props.labelStyle}
					inputStyle={props.inputStyle}
				/>
			</>
		);
	}
}
