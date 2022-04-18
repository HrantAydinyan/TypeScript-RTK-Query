import React, { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    OutlinedInput,
    Select,
} from '@material-ui/core';
import { postAPI } from '../../services/PostService';

interface ICategoryDropProps {
    setCategory: (value: number) => void;
    value: number;
}

const CategoryDrop: FC<ICategoryDropProps> = ({ setCategory, value }) => {
    const { data: categories } = postAPI.useGetCategoriesQuery();
    // const [category, setCategory] = useState<string>('');

    useEffect(() => {
        if (categories) setCategory(categories?.[0].id);
    }, [categories]);

    const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
        setCategory(e.target.value as number);
    };
    return (
        <>
            <FormControl variant="outlined">
                <Select
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput name="category" id="outlined-age-simple" />}
                >
                    {categories?.map((category) => (
                        <MenuItem value={category.id} key={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
);
};

export default CategoryDrop;
