import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
  email: fake((f) => f.internet.email()),
  password: fake((f) => f.internet.password()),
  businessName: fake((f) => f.company.companyName()),
  countryId: "1",
  phonePrefixId: "1",
  phone: fake((f) => f.phone.phoneNumber()),
})

export {userBuilder}
