import axios from 'axios'

// 导出数据


export function subjectUpload(formData) {
  return new Promise(function (resolve, reject) {
    axios.post("http://backend-api-8081-xd-tsp-dev.xd-dev.nxengine.com/v1.0/subjectDown/subjectUpload", formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
}
