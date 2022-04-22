import { Avatar } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import defaultImage from '../../assets/images/image 3.jpg';

interface IImage {
    file: Blob | string | null;
    type: string;
}
const Image: FC<IImage> = ({ file, type }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        if (file && typeof file !== 'string') {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        } else if (typeof file === 'string') {
            setImage(file);
        }
    }, [file]);

    const showImage: any = (image: string | null) => {
        return type === 'avatar' ? (
            <Avatar src={image ?? ''} alt="Avatar" />
        ) : (
            <img src={image ?? defaultImage} alt="image" />
        );
    };

    if (typeof image !== 'string') return showImage();

    return showImage(image);
};

export default Image;
