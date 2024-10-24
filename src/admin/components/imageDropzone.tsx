import React, { useState } from 'react';
import { Button } from '@mui/material';

const ImageDropzone = (props: any) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(props.image || ''); // Thêm trạng thái cho URL hình ảnh

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Lấy URL của hình ảnh
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            props.passImageUrl(url)
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImageUrl('');
        props.passImageUrl('')
    };

    return (
        <div>
            <input
                // required
                name='image'
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: props.isEditing ? 'block' : 'none' }}
                id="image-upload-input"
            />
            {props.isEditing ? null : <label htmlFor="image-upload-input">
                <Button variant="outlined" component="span">
                    {selectedFile ? 'Image Selected' : 'Select Image'}
                </Button>
            </label>}
            {/* Hiển thị hình ảnh đã chọn (nếu có) */}
            {imageUrl && (
                <div>
                    {props.isEditing ? <img src={imageUrl} width={60} height={70} style={{ marginTop: 16 }}/>
                        : <img src={imageUrl} alt="Selected Product" style={{ maxWidth: '100%', marginTop: 16 }} />}
                    {/* <Button sx={{mt: 2, float: 'right'}} variant='outlined' color='error' onClick={handleRemoveImage}>Remove Image</Button> */}
                </div>
            )}
        </div>
    );
};

export default ImageDropzone;
// const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//         // Upload the file and get the image URL
//         const imageUrl = URL.createObjectURL(file);;
//         setProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
//     }
// };