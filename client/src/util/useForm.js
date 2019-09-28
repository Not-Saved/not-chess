import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const useForm = ({
	initialValues = {},
	defaultValues = {},
	validate = () => {},
	asyncValidate = () => {}
}) => {
	validate = useCallback(validate, []);
	asyncValidate = useCallback(asyncValidate, []);

	const [values, setValues] = useState(
		_.defaults(initialValues, defaultValues)
	);
	const [errors, setErrors] = useState({});
	const [asyncErrors, setAsyncErrors] = useState({});
	const [dirty, setDirty] = useState(false);
	const [validating, setValidating] = useState(false);

	const validateValues = useCallback(
		_.debounce(async values => {
			setValidating(true);
			values = _.pickBy(values, e => e);
			setErrors(validate(values));
		}, 400),
		[]
	);

	const asyncValidateValues = useCallback(
		_.debounce(async values => {
			setValidating(true);
			values = _.pickBy(values, e => e);
			const asyncErrors = await asyncValidate(values);
			setAsyncErrors(asyncErrors);
			setValidating(false);
		}, 400),
		[]
	);

	const onChange = useCallback(
		e => {
			let value =
				e.target.tagName === "INPUT"
					? e.target.value
					: e.target.getAttribute("value");

			if (e.target.name) {
				if (!dirty) setDirty(true);
				setValues({ ...values, [e.target.name]: value });
			}
		},
		[values, dirty]
	);

	useEffect(() => {
		if (dirty) {
			setValidating(true);
			validateValues(values);
			asyncValidateValues(values);
		}
	}, [values, dirty, validateValues, asyncValidateValues]);

	return {
		values,
		errors: { ...errors, ...asyncErrors },
		onChange,
		dirty,
		validating
	};
};

export default useForm;
