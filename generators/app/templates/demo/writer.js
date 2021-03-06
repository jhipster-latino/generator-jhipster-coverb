const _ = require("lodash");
const core = require("../../core");
const constant = core.constant;
const util = core.util;
const COVER_TYPE = constant.COVER_TYPE.ANGULAR.COMPANY;
const CLIENT_MAIN_SRC_DIR = constant.PATH.CLIENT_MAIN_SRC_DIR;
const CLIENT_TEST_SRC_DIR = constant.PATH.CLIENT_TEST_SRC_DIR;

module.exports = {
  COVER_TYPE,
  CLIENT_MAIN_SRC_DIR,
  CLIENT_TEST_SRC_DIR,
  preWrite,
  writeFiles,
  postWrite,
  run
};
/**
 * Start writer
 * @param {*} generator
 */
function run(generator) {
  switch (generator.CLIENT_FRAMEWORK) {
    case constant.CLIENT_FRAMEWORK.ANGULAR:
      // Add menu nav bar
      util.addNavBarItem(
        constant.NAV_BAR_TYPE.MENU,
        constant.NEEDLE.ADD_ELEMENT_TO_MENU,
        _.kebabCase(generator.ROOT_ROUTE),
        null,
        generator
      );
      break;
    case constant.CLIENT_FRAMEWORK.REACT:
      // Write required files
      util.copyFiles(getFiles(generator), generator);
      updateRoute(generator);
      updateHeader(generator);
      util.excludeIcons(generator);
      break;
  }
  // Add i18n support to menu nav bar
  generator.getAllInstalledLanguages().forEach(language => {
    // Add menu to global.json
    util.updateFile(
      `${CLIENT_MAIN_SRC_DIR}i18n/${language}/global.json`,
      `"${_.kebabCase(generator.ROOT_ROUTE)}": "${_.startCase(
        generator.ROOT_ROUTE
      )}",`,
      constant.NEEDLE.MENU_ADD_ELEMENT,
      generator
    );
  });
  // For each cover generate a page
  _.forEach(util.getCoverList(generator.CLIENT_FRAMEWORK), function(COVER) {
    generator.COVER_TYPE = COVER;
    generator.COVER_NAME = generator.COVER_TYPE;
    // Prepare to write
    preWrite(generator);
    // Write files
    writeFiles(generator);
    // Add another data
    postWrite(generator);
  });
}
/**
 * Pre write: Add menu nav bar and call Cover preWrite()
 *
 * @param {*} generator
 */
function preWrite(generator) {
  require(`../${generator.COVER_TYPE}/writer`).preWrite(generator);
}
/**
 * Write cover files
 */
function writeFiles(generator) {
  require(`../${generator.COVER_TYPE}/writer`).writeFiles(generator);
}
/**
 * Post write: add nav bar menu item
 *
 * @param {*} generator
 */
function postWrite(generator) {
  switch (generator.CLIENT_FRAMEWORK) {
    case constant.CLIENT_FRAMEWORK.ANGULAR:
      util.addNavBarItem(
        constant.NAV_BAR_TYPE.MENU_ITEM,
        `jhipster-needle-add-item-to-${_.kebabCase(generator.ROOT_ROUTE)}-menu`,
        generator.COVER_TYPE,
        generator.ROOT_ROUTE,
        generator
      );
      break;
    case constant.CLIENT_FRAMEWORK.REACT:
      updateRouteByCover(generator);
      updateMenu(generator);
      break;
    default:
      return null; // Not supported
  }
}

/**
 * Get files to copy
 *
 * @param {string} ROOT_ROUTE kebabCase and lowerCase
 */
function getFiles(generator) {
  const ROOT_ROUTE = generator.ROOT_ROUTE;
  const CLIENT_FRAMEWORK = generator.CLIENT_FRAMEWORK;
  const COVER_NAME = _.kebabCase(generator.COVER_NAME);
  switch (CLIENT_FRAMEWORK) {
    case constant.CLIENT_FRAMEWORK.ANGULAR:
      return null;
    case constant.CLIENT_FRAMEWORK.REACT:
      return [
        {
          NAME: "ICON_LOADER",
          FROM: `demo/${CLIENT_FRAMEWORK}/icon-loader.tsx.ejs`,
          TO: `${CLIENT_MAIN_SRC_DIR}app/${ROOT_ROUTE}${COVER_NAME}/icon-loader.tsx`,
          METHOD: "TEMPLATE"
        },
        {
          NAME: "INDEX",
          FROM: `demo/${CLIENT_FRAMEWORK}/index.tsx.ejs`,
          TO: `${CLIENT_MAIN_SRC_DIR}app/${ROOT_ROUTE}${COVER_NAME}/index.tsx`,
          METHOD: "TEMPLATE"
        },
        {
          NAME: "MENU",
          FROM: `demo/${CLIENT_FRAMEWORK}/navbar.menu.tsx.ejs`,
          TO: `${CLIENT_MAIN_SRC_DIR}app/${ROOT_ROUTE}${COVER_NAME}/navbar.menu.tsx`,
          METHOD: "TEMPLATE"
        }
      ];
    default:
      return null; // Not supported
  }
}
/**
 * Add nav item
 * @param {*} generator 
 */
async function updateMenu(generator) {
  addItem(generator); // Then wait for that
  await addItemImport(generator); // Wait for this
}
/**
 * Add nav item
 * @param {*} generator 
 */
function addItem(generator) {
  const file = `${CLIENT_MAIN_SRC_DIR}app/${
    generator.ROOT_ROUTE
  }/navbar.menu.tsx`;
  const pattern = `{/* jhipster-needle-add-item-to-menu - JHipster will add entities to the menu here */}`;
  const content = `<DropdownItem tag={Link} to="/${
    generator.ROOT_ROUTE
  }${_.kebabCase(generator.COVER_NAME)}">
      <FontAwesomeIcon icon="cube" />
      &nbsp;${_.startCase(generator.COVER_NAME)}
    </DropdownItem>
    {/* jhipster-needle-add-item-to-menu - JHipster will add entities to the menu here */}`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add nav item import
 * @param {*} generator 
 */
function addItemImport(generator) {
  switch (generator.CLIENT_FRAMEWORK) {
    case constant.CLIENT_FRAMEWORK.ANGULAR:
        const file = `${CLIENT_MAIN_SRC_DIR}app/${
          generator.ROOT_ROUTE
        }/navbar.menu.tsx`;
        const pattern = `// jhipster-needle-add-import-to-menu - JHipster will add entities to the menu here`;
        const content = `import ${_.startCase(generator.COVER_NAME)} from 'app/${
          generator.ROOT_ROUTE
        }${_.kebabCase(generator.COVER_NAME)}/component';
      // jhipster-needle-add-import-to-menu - JHipster will add entities to the menu here`;
        util.replaceContent(
          {
            file: file,
            pattern,
            content
          },
          generator
        );
        break;
    case constant.CLIENT_FRAMEWORK.REACT:
        // TODO:
        break;
    default:
        break;
}

 
}
/**
 * Add route
 * @param {*} generator 
 */
async function updateRoute(generator) {
  addRouteImport(generator); 
  await addRoute(generator); // Wait for this
}
/**
 * Add route
 * @param {*} generator 
 */
function addRoute(generator) {
  const file = constant.PATH.ROUTE_REACT + `routes.tsx`;
  const pattern = `<Switch>`;
  const content = `<Switch>
      <ErrorBoundaryRoute path="/${_.kebabCase(
    generator.ROOT_ROUTE
  )}" component={${_.startCase(generator.ROOT_ROUTE)}} />`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add route import
 * @param {*} generator 
 */
function addRouteImport(generator) {
  const file = constant.PATH.ROUTE_REACT + `routes.tsx`;
  const pattern = `import { AUTHORITIES } from 'app/config/constants';`;
  const content = `import { AUTHORITIES } from 'app/config/constants';
import ${_.startCase(generator.ROOT_ROUTE)} from 'app/${_.kebabCase(
    generator.ROOT_ROUTE
  )}';`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add route by cover
 * @param {*} generator 
 */
async function updateRouteByCover(generator) {
  addRouteImportByCover(generator); 
  await addRouteByCover(generator); // Wait for this
}
/**
 * Add route by cover
 * @param {*} generator 
 */
function addRouteByCover(generator) {
  const file = `${CLIENT_MAIN_SRC_DIR}app/${generator.ROOT_ROUTE}/index.tsx`;
  const pattern = `{/* jhipster-needle-add-route-path - JHipster will routes here */}`;
  const content = `<ErrorBoundaryRoute path={\`\${match.url}/${_.kebabCase(
    generator.COVER_NAME
  )}\`} component={${_.startCase(generator.COVER_NAME)}} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add route import
 * @param {*} generator 
 */
function addRouteImportByCover(generator) {
  const file = `${CLIENT_MAIN_SRC_DIR}app/${generator.ROOT_ROUTE}/index.tsx`;
  const pattern = `/* jhipster-needle-add-route-import - JHipster will add routes here */`;
  const content = `import ${_.startCase(generator.COVER_NAME)} from 'app/${
    generator.ROOT_ROUTE
  }${_.kebabCase(generator.COVER_NAME)}/component';
/* jhipster-needle-add-route-import - JHipster will add routes here */`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add nav menu
 * @param {*} generator 
 */
async function updateHeader(generator) {
  addHeaderImport(generator);
  await addHeader(generator); // Wait for this
}
/**
 *  Add nav menu
 * @param {*} generator 
 */
function addHeader(generator) {
  const file = constant.PATH.HEADER_REACT + `header.tsx`;
  const pattern = `<Home />`;
  const content = `<Home />
              <${_.startCase(generator.ROOT_ROUTE)} />`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
/**
 * Add nav menu import
 * @param {*} generator 
 */
function addHeaderImport(generator) {
  const file = constant.PATH.HEADER_REACT + `header.tsx`;
  const pattern = `import React from 'react';`;
  const content = `import React from 'react';
import ${_.startCase(generator.ROOT_ROUTE)} from 'app/${
    generator.ROOT_ROUTE
  }/navbar.menu';`;
  util.replaceContent(
    {
      file: file,
      pattern,
      content
    },
    generator
  );
}
