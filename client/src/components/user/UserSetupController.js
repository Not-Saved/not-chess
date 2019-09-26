import React, { useContext } from "react";

import { UserContext } from "context";
import useForm from "util/useForm";
import UserSetup from "./UserSetup";

const UserSetupController = () => {
	const { user, postUser } = useContext(UserContext);
	const userForm = useForm({
		initialValues: {
			userName: user.userName,
			icon: user.icon
		},
		defaultValues: {
			userName: "",
			icon: "patrick.png"
		},
		validate: validate,
		asyncValidate: asyncValidate
	});

	return <UserSetup {...userForm} user={user} postUser={postUser} />;
};

const validate = values => {
	let errors = {};
	if (!values.userName) errors.userName = "Username can't be empty";
	if (values.userName && values.userName.length < 4)
		errors.userName = "Username too short";
	if (values.userName && values.userName.length > 10)
		errors.userName = "Username too long";
	if (!/^[a-zA-Z0-9_]*$/.test(values.userName))
		errors.userName = "Can't contain symbols";
	if (!/^[a-zA-Z]/.test(values.userName))
		errors.userName = "Must start with a letter";
	return errors;
};

const asyncValidate = values => {
	let errors = {};
	return errors;
};

export default UserSetupController;
