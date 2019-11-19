import axios from 'axios'

// 导出数据


export function subjectUpload(url, formData) {
  return new Promise(function (resolve, reject) {
    axios.post(url, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
}
