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
      console.log(data[j][key],data[i][key],is_check.indexOf(j))
    }
    if (is_repeat) {
      cb(i, data[i])
    }
  }
}
