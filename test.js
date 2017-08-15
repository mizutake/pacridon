const User = require('./src/models/user');

User.find(1).then((user) => {
  console.log(user);
  user.toots().where({ id: 2 }).then((toots) => {
    console.log(toots.length);
    console.log(toots);
  })
}).catch(console.error);