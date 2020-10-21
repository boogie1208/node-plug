import message from './message.vue'
// let MessageConstructor = Vue.extend(message); // 写插件需要用到的
// let instance;
// let instances = []; // 存放当前未close的message
// const Message = function(options) {
//   Vue.prototype.$message = message
//   // 当前 Vue 实例是否运行于服务器
//   if (Vue.prototype.$isServer) return;
//   options = options || {};
//   if (typeof options === 'string') {
//     options = {
//       message: options
//     };
//   }
//    // 创建message实例,此时数据还没有挂载呢，$el 属性目前不可见，无法访问到数据和真实的dom
//   instance = new MessageConstructor({
//     data: options
//   });
//   instance.id = id;
//   //判断instance.message是不是虚拟节点
//   // if (isVNode(instance.message)) {
//   //   instance.$slots.default = [instance.message];
//   //   instance.message = null;
//   // }
//    //手动地挂载一个未挂载的实例。$mount(param)中param不存在时，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
//   instance.vm = instance.$mount();
//   //用原生DOM API把它插入body中
//   document.body.appendChild(instance.vm.$el);
//   instance.vm.visible = true;
//   instance.dom = instance.vm.$el;
//   // css z-index层级叠加，覆盖之前已出现但还未close的message
//   // instance.dom.style.zIndex = PopupManager.nextZIndex();
//   instances.push(instance);
//   return instance.vm;
// };

// // 给Message增加四个直接调用的方法
// // 支持this.$message.success('xxx')方式调用，等同于this.$message({type: 'success',message: 'xxx'})
// ['success', 'warning', 'info', 'error'].forEach(type => {
//   Message[type] = options => {
//     if (typeof options === 'string') {
//       options = {
//         message: options
//       };
//     }
//     options.type = type;
//     return Message(options);
//   };
// });
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};
const Message = {
  install(Vue, options) {
    let MessageConstructor = Vue.extend(message); // 写插件需要用到的
    Vue.property.$message = message
    Vue.component(message.name, message)
    function buildProps (args) {
      let props = {}
      props.message = args.message
      props.title = typeMap[props.type]
      if (typeof options === 'string') {
        props = {
          message: options
        };
      }
      return props
    }

    function message () {
      if (!arguments[0]) return
      const propsData = buildProps(arguments)
      const instance = new MessageConstructor({propsData})
      document.body.appendChild(instance.$mount().$el)
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Message = Message
  Vue.use(Message)
}
// 给Message增加四个直接调用的方法
// 支持this.$message.success('xxx')方式调用，等同于this.$message({type: 'success',message: 'xxx'})
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});
export default Message