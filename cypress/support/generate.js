import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
  email: fake((f) => f.internet.email()),
  password: fake((f) => f.internet.password()),
})

export {userBuilder}
