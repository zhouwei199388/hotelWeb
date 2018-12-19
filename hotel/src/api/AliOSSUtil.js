// import OSS from 'ali-oss';
// 阿里云OSS库的问题，不能使用ES6的方式，只能使用require方式。
// import HttpClient from './HttpClient';

// import {message} from 'antd'
import {uploadAuth} from '../api/api';

const OSS = require('ali-oss/dist/aliyun-oss-sdk.min.js');

export default class AliOSSUtil {
    static region = 'oss-cn-shanghai';

    // 上传文件到OSS
    static uploadFileToOSS(client, file, key, domain, progressCallback, resultCallback) {
        client.multipartUpload(key, file, {
            progress: (progress) => {
                return (done) => {
                    progressCallback(progress);
                    done();
                };
            }
        }).then(function (res) {
            console.log(res);
            // 使用自定义的域名
            // const resultUrl = domain + res["name"];

            // console.log("resultUrl: " + resultUrl);
            // resultCallback(encodeURI(resultUrl));
        }).catch(function (err) {
            console.error(err);
        });
    };

    // 上传创客文件
    static uploadHotelFile(bucketName, file, fileOfOss, progressCallback, resultCallback) {
        if (bucketName === "" || bucketName === null) {
            console.log('bucket不能为空');
            return;
        }
        // // 获取上传参数
        // const request = {
        //     // header: HttpClient.buildRequestHeader(),
        //     course: course,
        //     grade: grade
        // };
        uploadAuth(bucketName).then(res => {
            console.log(res);
            let ossClient = new OSS.Wrapper({
                region: AliOSSUtil.region,
                accessKeyId: res.accessKeyId,
                accessKeySecret: res.accessKeySecret,
                stsToken: res.securityToken,
                bucket: 'hotelimage'
            });

            const key = res.bukerName + fileOfOss;
            console.log("key: " + key);
            AliOSSUtil.uploadFileToOSS(ossClient, file, key, "http://maker-oss.delightmom.com/", progressCallback, resultCallback);
        })

        // HttpClient.post(HttpClient.buildMakerUrl("admin/course/upload/param"), request,
        //     (uploadParam) => {
        //         // 使用上传参数，上传文件到OSS
        //         let ossClient = new OSS.Wrapper({
        //             region: AliOSSUtil.region,
        //             accessKeyId: uploadParam.accessKey,
        //             accessKeySecret: uploadParam.secretKey,
        //             stsToken: uploadParam.securityToken,
        //             bucket: uploadParam.bucketName
        //         });
        //
        //         const key = uploadParam.objectKey + '/' + fileOfOss;
        //         // console.log("key: " + key);
        //         AliOSSUtil.uploadFileToOSS(ossClient, file, key, "http://maker-oss.delightmom.com/", progressCallback, resultCallback);
        //     });
    };


    // 上传内容文件。
    // contentType，内容类型，0：独家干货，1：精彩活动，2：看视频，3：首页Banner
    static uploadContentFile(contentType, file, fileOfOss, progressCallback, resultCallback) {
        // 获取上传参数
        const request = {
            // header: HttpClient.buildRequestHeader(),
            contentType: contentType,
        };

        // HttpClient.post(HttpClient.buildDiLeMuManagementUrl("content/upload/param"), request,
        //     (uploadParam) => {
        //         // 使用上传参数，上传文件到OSS
        //         let ossClient = new OSS.Wrapper({
        //             region: AliOSSUtil.region,
        //             accessKeyId: uploadParam.accessKey,
        //             accessKeySecret: uploadParam.secretKey,
        //             stsToken: uploadParam.securityToken,
        //             bucket: uploadParam.bucketName
        //         });
        //
        //         const key = uploadParam.objectKey + '/' + fileOfOss;
        //         // console.log("key: " + key);
        //         AliOSSUtil.uploadFileToOSS(ossClient, file, key, "http://dilemu-app.oss-cn-shanghai.aliyuncs.com/", progressCallback, resultCallback);
        //     });
    };


    //上传APP的版本
    static uploadAppFile(file, fileOfOss, progressCallback, resultCallback) {
        // 获取上传参数
        // const request = HttpClient.buildEmptyRequest();

        // HttpClient.post(HttpClient.buildDiLeMuManagementUrl("appversion/uploadparam"), request,
        //     (uploadParam) => {
        //         // 使用上传参数，上传文件到OSS
        //         let ossClient = new OSS.Wrapper({
        //             region: AliOSSUtil.region,
        //             accessKeyId: uploadParam.accessKey,
        //             accessKeySecret: uploadParam.secretKey,
        //             stsToken: uploadParam.securityToken,
        //             bucket: uploadParam.bucketName
        //         });
        //
        //         const key = uploadParam.objectKey + '/' + fileOfOss;
        //         // console.log("key: " + key);
        //         AliOSSUtil.uploadFileToOSS(ossClient, file, key, "http://oss.delightmom.com/", progressCallback, resultCallback);
        //     });
    };

    //上传订单文件
    static uploadOrderFile(orderId, file, fileOfOss, progressCallback, resultCallback) {
        // 获取上传参数
        // HttpClient.orderGet(`/orders/${orderId}/upload-params`, null, (response) => {
        //     // 使用上传参数，上传文件到OSS
        //     let ossClient = new OSS.Wrapper({
        //         region: AliOSSUtil.region,
        //         accessKeyId: response.data.accessKey,
        //         accessKeySecret: response.data.secretKey,
        //         stsToken: response.data.securityToken,
        //         bucket: response.data.bucketName
        //     });
        //     const key = response.data.objectKey + '/' + fileOfOss;
        //     // console.log("key: " + key);
        //     AliOSSUtil.uploadFileToOSS(ossClient, file, key, "http://oss.delightmom.com/", progressCallback, resultCallback);
        // });
    };
}