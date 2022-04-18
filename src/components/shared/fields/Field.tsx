import { FormControl, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React, { FC } from 'react';

interface InputProps {
    [x: string]: any;
    name: string;
    type?: string;
    multiple?: boolean | undefined;
    value?: string;
    checked?: boolean;
    className?: string;
    placeholder?: string;
    onBlur?: (e: any) => any;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const Field: FC<InputProps> = (props) => {
    const { ...attr } = props;
    const [field, form] = useField(props);
    return (
        <div>
            <FormControl>
                <TextField
                    variant="outlined"
                    fullWidth
                    error={form.touched && Boolean(form.error)}
                    helperText={form.touched && form.error}
                    {...field}
                    {...attr}
                />
            </FormControl>
        </div>
    );
};

export default Field;
