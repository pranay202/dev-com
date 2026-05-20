import axios from 'axios';

export const imageUpload = async (images) => {
    let imgArr = []
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET)
        formData.append("cloud_name", process.env.CLOUD_NAME)

        const res = await axios.post(process.env.CLOUD_API, formData, {
            validateStatus: () => true,
        })

        const data = res.data
        if (res.status !== 200 || !data.secure_url) {
            throw new Error(data.error?.message || 'Image upload failed. Please check your Cloudinary configuration.');
        }

        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}