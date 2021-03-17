/**
 * Generates crumbs for a particular route
 *
 * @param {Array} routesList
 * @param {Object} route
 *
 * @returns {Array}
 */
export function generateCrumbsForRoute({ routes, route }) {
  // Get all routes that contain the current one.
  // const getMatchingRoutes = ({ path }) => route.path.includes(path);

  const routeHasParams = Object.keys(route.params).length;

  const replaceParams = (path, param) =>
    path.replace(`:${param}`, route.params[param]);

  const createCrumbEntry = ({ path, ...rest }) => ({
    path: routeHasParams
      ? Object.keys(route.params).reduce(replaceParams, path)
      : path,
    active: route.pathname === path,
    href: path,
    ...rest,
  });

  // Swap out any dynamic routes with their param values so "/app/:appId" becomes "/app/1"
  return routes.map(createCrumbEntry);
}
