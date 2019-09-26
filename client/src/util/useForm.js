import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const useForm = ({
	initialValues = {},
	defaultValues = {},
	validate = () => {},
	asyncValidate = async () => {}
}) => {
	validate = useCallback(validate, []);
	asyncValidate = useCallback(asyncValidate, []);

	const [values, setValues] = useState(
		_.defaults(initialValues, defaultValues)
	);
	const [errors, setErrors] = useState({});
	const [asyncErrors, setAsyncErrors] = useState({});
	const [dirty, setDirty] = useState(false);

	const validateValues = useCallback(
		async values => {
			values = _.pickBy(values, e => e);
			setErrors(validate(values));
			const asyncErrors = await asyncValidate(values);
			setAsyncErrors(asyncErrors);
		},
		[validate, asyncValidate]
	);

	const onChange = useCallback(
		e => {
			let value = e.target.value || e.target.getAttribute("value");
			if (e.target.name) {
				if (values[e.target.name] === value) value = "";
				if (!dirty) setDirty(true);
				setValues({ ...values, [e.target.name]: value });
			}
		},
		[values, setValues, dirty, setDirty]
	);

	useEffect(() => {
		validateValues(values);
	}, [values, validateValues]);

	return { values, errors, asyncErrors, onChange, dirty };
};

export default useForm;
