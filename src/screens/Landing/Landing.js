import React from 'react'
import './Landing.css'
import {ArrowForward as ArrowForwardIcon} from '@material-ui/icons'

import {ReactComponent as Gauntlet} from 'assets/svg/gauntlet.svg'
import logo from 'assets/svg/logo.svg'
import paystackLogo from 'assets/svg/paystack-grayscale.svg'
import flutterwaveLogo from 'assets/svg/flutterwave-grayscale.svg'
import flower from 'assets/svg/flower.svg'
import line from 'assets/svg/line.svg'
import quotemark from 'assets/svg/quotemark.svg'
import paysolution from 'assets/svg/payeee.svg'
import floating from 'assets/svg/floating.svg'
import arrowblue from 'assets/svg/arrowblue.svg'

const {REACT_APP_NAME, PUBLIC_URL} = process.env

const testimonials = [
  {
    description:
      'Switching payment providers with Payreflect is so easy. I can switch from one provider to the other and it just works.',
    testifier: 'Caleb Mathew',
    affiliation: 'Software Engineer, Kudi',
    avatarUrl: 'https://ca.slack-edge.com/TV2GDUVUZ-UVCK9FRRB-6460df44fc14-512',
  },
  {
    description: 'A central dashboard for managing stuff makes life easier.',
    testifier: 'Emmanuel Ogbiyoyo',
    affiliation: 'Software Engineer, Cowellness',
    avatarUrl:
      'https://ca.slack-edge.com/TV2GDUVUZ-U0100ERTVNK-561282ab68f9-512',
  },
]

const benefits = [
  {
    title: 'Time To Focus More On Your Business',
    description: `${REACT_APP_NAME} is here to make your payments super easy. Switch between payment solutions in one-click.`,
    callToAction: `Switch Payment Solutions`,
    artwork: paysolution,
  },
  {
    title: 'Time To Focus More On Your Business',
    description: `${REACT_APP_NAME} is here to make your payments super easy. Switch between payment solutions in one-click.`,
    callToAction: `Switch Payment Solutions`,
    artwork: floating,
  },
]

const features = [
  {
    title: 'Stay In Total Control',
    description: `${REACT_APP_NAME} is here to make your payments super easy. Switch between payment solutions in one-click.`,
    callToAction: `Take Control`,
  },
  {
    title: 'Stay In Total Control',
    description: `${REACT_APP_NAME} is here to make your payments super easy. Switch between payment solutions in one-click.`,
    callToAction: `Take Control`,
  },
]

const PromoButton = ({
  callToAction,
  href = `${PUBLIC_URL}/register`,
  gotDropShadow = false,
}) => (
  <a
    className={`bg-gradient-to-r text-xl from-brand-primary to-green-200 p-8 ${
      gotDropShadow && 'dropshadow'
    }`}
    href={href}
  >
    {callToAction}
    <ArrowForwardIcon className="ml-1" />
  </a>
)

function Navbar({title, description, callToAction}) {
  return (
    <nav className="w-full pt-16 flex px-8 md:px-32 bg-gray-100">
      <a
        className="text-sm font-bold inline-block w-40 mr-4 py-2 whitespace-nowrap uppercase text-blueGray-700"
        href="/"
      >
        <img src={logo} alt="" />
      </a>
      <ul className="flex list-none ml-32">
        <li className="nav-item">
          <a
            href={`${PUBLIC_URL}/register`}
            className="px-3 py-2 flex items-center"
          >
            Sign Up <img src={arrowblue} className="w-6 ml-4" alt="" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href={`${PUBLIC_URL}/login`}
            className="px-3 py-2 flex items-center"
          >
            {'Login'}
            <img src={arrowblue} className="w-6 ml-4" alt="" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

function Hero({title, description, callToAction}) {
  return (
    <>
      <section className="grid md:grid-cols-3 gap-4 px-8 md:px-32 bg-gray-100">
        <div className="col-span-2 md:w-9/12 xs:w-full">
          <h1 className="text-4xl lg:text-6xl lg:leading-snug font-extrabold md:tracking-wide text-gray-700 mt-10 mb-6 sm:mt-14">
            {title}
          </h1>
          <p className="text-2xl text-gray-500 mb-16 leading-10">
            {description}
          </p>
          <PromoButton gotDropShadow callToAction={callToAction} />
        </div>

        <div className="w-10/12">
          <Gauntlet />
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <ul className="flex justify-center">
          <li>
            <img className="w-48 mr-8" src={paystackLogo} alt=""></img>
          </li>
          <li>
            <img className="w-48" src={flutterwaveLogo} alt=""></img>
          </li>
        </ul>
      </section>
    </>
  )
}

function Banner({title, description, callToAction}) {
  return (
    <section className="banner dropshadow clearfix">
      <h2>{title}</h2>
      <p>{description}</p>

      <PromoButton gotDropShadow={false} callToAction={callToAction} />
    </section>
  )
}

function Benefits({benefits}) {
  return (
    <section className="bg-white">
      {benefits.map(({title, description, callToAction, artwork}, key) => (
        <div
          className="items-center grid md:grid-cols-2 gap-4 mb-32 px-16"
          key={key}
        >
          <div className="benefit-content w-10/12">
            <h2 className="text-5xl mb-8">{title}</h2>
            <p className="mb-8 text-2xl">{description}</p>
            <a className="primarybtn primarybtn-border" href="/hello">
              {callToAction}
              <ArrowForwardIcon className="ml-1" />
            </a>
          </div>
          <img
            className="dropshadow-lighter rounded"
            alt=""
            src={artwork}
          ></img>
        </div>
      ))}
    </section>
  )
}

function Features({features}) {
  return (
    <section className="features clearfix">
      {features.map(({title, description, callToAction}, key) => (
        <div className="feature dropshadow-lighter" key={key}>
          <img
            className="features-icon dropshadow-lighter"
            src={flower}
            alt=""
          />
          <img className="features-image" src={line} alt="" />
          <div className="features-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="/" className="primarybtn primarybtn-border">
              {callToAction}
              <ArrowForwardIcon className="ml-4" />
            </a>
          </div>
        </div>
      ))}
    </section>
  )
}

function Testimonials({testimonials}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 px-8 my-16">
      {testimonials.map(
        ({description, testifier, affiliation, avatarUrl}, key) => (
          <section className="testimonial p-8 filter drop-shadow-lg" key={key}>
            <img
              className="filter drop-shadow-md w-8 mb-8"
              alt=""
              src={quotemark}
            ></img>
            <p className="text-2xl mb-8">{description}</p>
            <div className="flex align-center">
              <img
                className="inline-block w-12 h-12 rounded-full mr-4 filter drop-shadow-lg"
                alt=""
                src={avatarUrl}
              ></img>
              <div className="">
                <h3 className="text-xl font-bold text-gray-700">{testifier}</h3>
                <p className="text-base text-gray-500">{affiliation}</p>
              </div>
            </div>
          </section>
        ),
      )}
    </div>
  )
}

function Footer({description, copyright}) {
  return (
    <section className="dropshadow-lighter grid grid-cols-2 py-32 px-16">
      <div className="">
        <img src={logo} className="w-48" alt="" />
      </div>
      <div className="">
        <p className="text-2xl w-10/12 mb-8">{description}</p>
        {/* <ul>
                  <li><a href=""><img src={github}></img></a></li>
                  <li><a href=""><img src={facebook}></img></a></li>
                  <li><a href=""><img src={twitter}></img></a></li>
              </ul> */}
        <p>{copyright}</p>
      </div>
    </section>
  )
}

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero
        title={`Seamless Payment Integration Using ${REACT_APP_NAME}.`}
        description={`${REACT_APP_NAME} is here to make your payments super easy. Switch between payment solutions in one-click.`}
        callToAction={`Start using ${REACT_APP_NAME}`}
      />
      <Testimonials testimonials={testimonials} />
      <Benefits benefits={benefits} />
      <Features features={features} />
      <Banner
        title={'Time To Focus More On Your Business'}
        description={`Start Using ${REACT_APP_NAME} For Free Today!`}
        callToAction={`Start Using ${REACT_APP_NAME}`}
      />
      <Footer
        description={`${REACT_APP_NAME} is the easiest way to seamlessly switch between payment solution providers.`}
        copyright={'2021. All rights reserved.'}
      />
    </>
  )
}

export default LandingPage
