import { RNS3 } from 'react-native-s3-upload';



// const options = {
//     keyPrefix: "/delivery",
//     bucket: "file-tikatika-et",
//     region: "ap-southeast-2",
//     accessKey: 'AKIAS6XZBBIMRMOZU6WM',
//     // secretKey: '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',
//     secretKey:'B8wppwp77CMMZ6Jxo5YPSuFgVlKnwtQT0e5XWlJ5'
//     // successActionStatus: 201
// }

// fclass config
const options = {
    keyPrefix: "customer/",
    bucket: "file-tikatika-et",
    region: "ap-northeast-2",
    accessKey: 'AKIAS6XZBBIMRMOZU6WM',
    secretKey: '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',
    successActionStatus: 201
}

export const uploadToS3 = async (filePath: string, filename = 'image.png', type = 'image/jpg'): Promise<string> => {
    const file = {
        uri: filePath,
        name: filename,
        type
    }
    try {
        const response = await RNS3.put(file, options)
        console.log(response.body);
        if (response.status !== 201) {
            return '';
        }

        const url = response.body.postResponse.location.replace('https://s3.ap-northeast-2.amazonaws.com/file-tikatika-et', 'https://d1crgu5s6nzfmv.cloudfront.net')
        return (url)
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */

    } catch (error) {
        console.log('error upload s3', error);

    }

}