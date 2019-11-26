export const lazy = (ii, path) => {
  if (ii == 0) {
    return () => import(`@/components${path}/main.vue`);
  } else if (ii == 1) {
    return () => import(`@/pages${path}/index.vue`);
  } else if (ii == 2) {
    return () => import(`@/pages${path}.vue`);
  }
};

export const joinRouter = (data, arr) => {
  for (let i = 0; i < data.length; i++) {
    let arrChild = [];
    arr.push({
      path: data[i].path,
      name: data[i].path,
      title: data[i].title,
      // name: data[i].path.replace(/\//, '').replace(/\//, '_'),
      meta: {
        title: data[i].title,
        actions: data[i].actions
      },
      component: lazy(1, data[i].path),
      children: arrChild
    });

    if (data[i].children.length > 0) {

      for (let j = 0; j < data[i].children.length; j++) {
        arrChild.push({
          path: data[i].children[j].path,
          name: data[i].children[j].path,
          title: data[i].children[j].title,
          //  name: data[i].children[j].path.replace(/\//, '').replace(/\//, '_'),
          meta: {
            title: data[i].children[j].title,
            actions: data[i].children[j].actions
          },
          component: lazy(2, data[i].children[j].path)
        });
      }
    }
  }

  arr.splice(0, 0, {
    path: '/welcome',
    name: 'welcome',
    title: 'welcome',
    component: () => import('@/components/defaut/welcome')
  });

  return arr;
}

export const generaMenu = (routerInfo) => {
  let addRouterDeafeut = [{
    path: '/',
    name: 'home',
    title: '首页',
    component: lazy(0, '/defaut'),
    children: joinRouter(routerInfo, [])
  }];
  return addRouterDeafeut
}

//  获取指定对象的数据 生成新数组（删除数组）
export const restArr = (obj, _type) => {
  let arr = [];
  for (let i in obj) {
    arr.push(obj[i][_type])
  }
  return arr
}

//  数组去重动作
export const unique = (arr) => {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// 筛选重复的数据
export const find_repeat = (key, data, cb) => {
  let is_check = [];
  for (let i = 0; i < data.length; i++) {
    let is_repeat = false;
    for (let j = i + 1; j < data.length; j++) {
      if (Number(data[j][key]) === Number(data[i][key]) && is_check.indexOf(j) < 0) {
        is_check.push(+j);
        is_repeat = true;
        cb(j, data[j])
      }
      // console.log(data[j][key],data[i][key],is_check.indexOf(j))
    }
    if (is_repeat) {
      cb(i, data[i])
    }
  }
}

//  时分秒转化时间戳
export const time_to_sec = (time) => {
  var s = '';
  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];
  s = Number(hour * 3600) + Number(min * 60) + Number(sec);
  return s;
}


//  获取当前日期时分秒加n分钟
export const MinutesTest = (n) => {
  var sdate1 = new Date();
  sdate1.setMinutes(sdate1.getMinutes() + n);
  var now = sdate1.getHours() + ":" + sdate1.getMinutes();
  return now;
}

//  时间戳转 日期格式
export const formatDate = (now, type) => {
  var now=new Date(now);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (type == 0) {
    return year + "-" + month + "-" + date;
  } else {
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
}

