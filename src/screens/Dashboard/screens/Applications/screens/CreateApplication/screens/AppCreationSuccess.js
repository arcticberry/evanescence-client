import React from 'react'
import {Link} from 'react-router-dom'
import {StarHalf} from '@material-ui/icons'
import Card from 'components/Card'
import Button from 'components/Button'
import '../../../applications.css'

const AppCreationSuccess = () => {
  return (
    <div className="container h-screen mx-auto">
      <section className="mb-16 h-3/4 relative">
        <Card.Callout
          variant="beta"
          icon={<StarHalf size="md" fontSize="large" htmlColor="#fff" />}
          title="Application Successfully Created"
          message="Your application has been created"
          renderCenter={() => (
            <Link to="/dashboard/applications">
              <Button>View applications</Button>
            </Link>
          )}
        ></Card.Callout>
      </section>
    </div>
  )
}

export default AppCreationSuccess
