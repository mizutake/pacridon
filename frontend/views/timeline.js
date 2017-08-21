const domready = require('domready');
const Vue = require('vue').default;

domready(function() {
  let timeline = document.getElementById('timeline');
  if(!timeline) {
    return;
  }

    let vm = new Vue({
      el: "#timeline",
      data: {
        newToot: { body: '' },
        toots: []
      }
    });

    fetch('/api/toots').then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
})