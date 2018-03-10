// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import material_select from './components/inputs/material-select'

import '@/styles/client.less'
import '@/extensions.js'

Vue.config.productionTip = false

function waitForMaterialize() {
  return new Promise((resolve, reject) => {
    let iterations = 0;
    const handler = window.setInterval(() => {
      iterations++;
      let ma = (window).Materialize;
      if (
        ma.elementOrParentIsFixed &&
        ma.escapeHash &&
        ma.fadeInImage &&
        ma.guid &&
        ma.scrollFire &&
        ma.showStaggeredList &&
        ma.toast &&
        ma.updateTextFields
      ) {
        console.log(`waited `+iterations+` iterations for Materialize to finish loading`);
        window.clearInterval(handler);
        resolve();
      }
    }, 1);
  });
};

Vue.directive("select-selected-value", {
    bind: function(el, binding, vnode) {
      $(el).val(binding.value);
      el.addEventListener('DOMSubtreeModified', updateMaterializeEvent, false);
      $(function() {
        updateMaterializeEl(el);
      });

      $(el).on('change', function() {
        //console.log('v-select change', el.value, binding.expression);
        vnode.context.$set(vnode.context, binding.expression, el.value);
      });

    },
    update: function(el, binding, vnode, oldVnode){
      if(binding.oldValue != binding.value)
      {
        //console.log('old val != val. id:', $(el).attr('id'), binding.value);
        $(el).val(binding.value);
        updateMaterializeEl(el);
      }
      else{
      //$(el).material_select();
      //console.log('old val == val', binding);
      }
      
    },
    componentUpdated: function(el, binding, vnode, oldVnode){
      //$(el).material_select();
      //console.log('componentUpdated', binding.expression);
    },
    unbind: function(el) {
      $(el).off('change');
      el.removeEventListener('DOMSubtreeModified', updateMaterializeEvent);
      $(el).material_select("destroy");
    }
  });

  function updateMaterializeEvent(event){
    var el = event.srcElement;
    updateMaterializeEl(el);
  }
  function updateMaterializeEl(el){
    if($(el).data('material-updatind') != true)
    {
      $(el).data('material-updatind', true);
      $(el).material_select();
      $(el).data('material-updatind', false);
    } 
  }

  


//$(function() {
//   $('select').material_select(); 
//});
//

  waitForMaterialize().then(() => {
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
 } )
 .catch(error => console.log(error));



