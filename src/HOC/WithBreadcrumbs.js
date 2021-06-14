import React from 'react'
import {matchPath, withRouter} from 'react-router'

const renderer = ({breadcrumb, match}) => {
  if (typeof breadcrumb === 'function') {
    return breadcrumb({match})
  }
  return breadcrumb
}

export const getBreadcrumbs = ({routes, pathname}) => {
  const matches = []

  pathname
    .replace(/\/$/, '')
    .split('/')
    .reduce((previous, current) => {
      const pathSection = `${previous}/${current}`

      let breadcrumbMatch

      routes.some(({label: breadcrumb, path}) => {
        const match = matchPath(pathSection, {exact: true, path})

        if (match) {
          breadcrumbMatch = {
            label: renderer({breadcrumb, match}),
            path,
            match,
          }
          return true
        }

        return false
      })

      if (breadcrumbMatch) {
        matches.push(breadcrumbMatch)
      }

      return pathSection
    })

  return matches
}

const withBreadcrumbs = (routes) => (Component) =>
  withRouter((props) => (
    <Component
      {...props}
      breadcrumbs={getBreadcrumbs({
        pathname: props.location.pathname,
        routes,
      })}
    />
  ))

export default withBreadcrumbs
