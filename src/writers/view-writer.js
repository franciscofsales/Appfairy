import cheerio from "cheerio";
import HTMLtoJSX from "htmltojsx";
import path from "path";
import statuses from "statuses";
import uglify from "uglify-js";
// import ServerIndex from '../static/server';
// import ServerLoader from '../static/server/loader';
// import ServerServer from '../static/server/server';
import { fs, mkdirp } from "../libs";
import raw from "../raw";
import Writer from "./writer";

const writingFiles = []

// attempt at supporting windows by monkey patching path.relative
// to prevent backslashes
const orPathRel = path.relative;
path.relative = (from, to) =>
  orPathRel(from, to).replace(/\\/gi, '/')

import {
  encapsulateCSS,
  importantizeCSS,
  escape,
  freeLint,
  freeScope,
  freeText,
  Internal,
  splitWords,
  upperFirst
} from "../utils";

const _ = Symbol("_ViewWriter");
const htmltojsx = new HTMLtoJSX({ createClass: false });

const flattenChildren = (children = [], flatten = []) => {
  children.forEach(child => {
    flattenChildren(child[_].children, flatten);
  });

  flatten.push(...children);

  return flatten;
};

const adjustImagesToRoot = (html) => html.replace(/src="/ig, 'src="/');
const removeHtmlFromLinks = (html) => adjustImagesToRoot(html.replace('index.html', '').replace(/\.html/ig, '').replace(/href="/ig, 'href="/'))

@Internal(_)
class ViewWriter extends Writer {
  static async writeAll(viewWriters, dir, componentDir, metaDir, stylesDir, ctrlsDir) {
    await mkdirp(dir);
    await mkdirp(componentDir);
    await mkdirp(stylesDir);
    await mkdirp(metaDir);
    // await mkdirp(`${dir}/../../server`);

    // const serverPromises = [
    //   fs.writeFile(`${dir}/../../server/index.js`, freeLint(ServerIndex)),
    //   fs.writeFile(`${dir}/../../server/server.js`, freeLint(ServerServer)),
    //   fs.writeFile(`${dir}/../../server/loader.js`, freeLint(ServerLoader))
    // ]

    // await Promise.all(serverPromises);


    const indexFilePath = `${dir}/index.js`;
    const helpersFilePath = `${dir}/../helpers.js`;
    const routesFilePath = `${dir}/../routes.js`;
    const childFilePaths = [indexFilePath, helpersFilePath, routesFilePath];
    ctrlsDir = path.relative(dir, ctrlsDir);
    const routes = `
import React from 'react';
import { Route } from 'react-router-dom';
import * as Views from './views';

export default () => [
  <Route key="route_index" path="/" component={Views.IndexView} exact />,
  ${viewWriters
    .map(
      viewWriter => `<Route key="route_${viewWriter.className.replace(/view/gi, '')}" path="${viewWriter.parent ? `/${viewWriter.parent}` : ''}/${viewWriter.className.replace(/view/gi, '').split(/(?=[A-Z])/).join('-').toLowerCase()}" component={Views.${viewWriter.className}} exact />`
    )
    .join(",\n  ")}
]`;
    const index = viewWriters
      .map(viewWriter => {
        return `export { default as ${viewWriter.className} } from './${
          viewWriter.className
        }'`;
      })
      .join("\n");

    const leanViewWriters = []
    viewWriters = flattenChildren(viewWriters);

    for(const viewWriter of viewWriters) {
      if(!leanViewWriters.find(vw => vw.className === viewWriter.className)) {
        leanViewWriters.push(viewWriter);
      }
    }
    leanViewWriters.forEach( async viewWriter => {
      const filePaths = await viewWriter.write(dir, componentDir, metaDir, stylesDir, ctrlsDir);
      childFilePaths.push(...filePaths);
    })



    const writtingRoutes = fs.writeFile(routesFilePath, freeLint(routes));
    const writingIndex = fs.writeFile(indexFilePath, freeLint(index));
    const writingHelpers = fs.writeFile(helpersFilePath, raw.viewHelpers);

    await Promise.all([writingIndex, writingHelpers, writtingRoutes]);
    return childFilePaths;
  }

  get baseUrl() {
    return this[_].baseUrl;
  }

  set baseUrl(baseUrl) {
    this[_].baseUrl = String(baseUrl);
  }

  set isComponent(comp) {
    this[_].isComponent = comp;
  }

  get isComponent() {
    return this[_].isComponent;
  }

  get children() {
    return this[_].children.slice();
  }

  set name(name) {
    if (!isNaN(Number(name))) {
      name = statuses[name];
    }

    const words = splitWords(name);
    Object.assign(this[_], {
      ctrlClassName: words
        .concat("controller")
        .map(upperFirst)
        .join(""),
      metaClassName: words
        .concat("meta")
        .map(upperFirst)
        .join(""),
      className: words
        .concat("view")
        .map(upperFirst)
        .join(""),
      elName: words.map(word => word.toLowerCase()).join("-"),
      name: words
        .concat("view")
        .map(word => word.toLowerCase())
        .join("-")
    });
  }

  get name() {
    return this[_].name;
  }

  get ctrlClassName() {
    return this[_].ctrlClassName;
  }

  get metaClassName() {
    return this[_].metaClassName;
  }

  get className() {
    return this[_].className;
  }

  get elName() {
    return this[_].elName;
  }

  set html(html) {
    if (!html) {
      this[_].html = "";
      this[_].children = [];
      return;
    }

    const children = (this[_].children = []);
    const $ = cheerio.load(html);

    // Encapsulate styles
    $("style").each((i, el) => {
      const $el = $(el);
      const html = $el.html();

      let css = encapsulateCSS(html, this.source);
      css = importantizeCSS(css);
      $el.html(css);
    });

    $("*").each((i, el) => {
      const $el = $(el);
      let className = $el.attr("class");

      if (className && !/af-class-/.test(className)) {
        className = className.replace(/([\w_-]+)/g, "af-class-$1");

        switch (this.source) {
          case "webflow":
            className = className.replace(/af-class-w-/g, "w-");
            break;
          case "sketch":
            className = className
              .replace(/af-class-anima-/g, "anima-")
              .replace(
                /af-class-([\w_-]+)an-animation([\w_-]+)/g,
                "$1an-animation$2"
              );
            break;
          default:
            className = className
              .replace(/af-class-w-/g, "w-")
              .replace(/af-class-anima-/g, "anima-")
              .replace(
                /af-class-([\w_-]+)an-animation([\w_-]+)/g,
                "$1an-animation$2"
              );
        }

        $el.attr("class", className);
      }
    });

    // console.log(this[_].className, ($("[af-el]") || []).length)

    let el = $("[af-el]")[0];
    while (el) {

      const $el = $(el);
      const elName = $el.attr("af-el");
      const $afEl = $(`<af-${elName}></af-${elName}>`);
      // const sock = $el.attr("af-sock");
      // $afEl.attr("af-sock", $el.attr("af-sock"));
      $el.attr("af-el", null);
      // $el.attr("af-sock", null);
      $afEl.insertAfter($el);
      // if (sock !== null && sock !== undefined) {
      //   $el.prepend(`<span af-sock="${sock}">`);
      //   $el.append('</span>');
      // }
      $el.remove();

      const child = new ViewWriter({
        name: elName,
        html: $.html($el),
        baseUrl: this.baseUrl,
        styles: this.styles,
        isComponent: true
      });

      children.push(child);
      el = $("[af-el]")[0];
    }

    // Apply ignore rules AFTER child elements were plucked
    $("[af-ignore]").remove();
    // Empty inner HTML
    $("[af-empty]")
      .html("")
      .attr("af-empty", null);

    this[_].scripts = [];

    // Set inline scripts. Will be loaded once component has been mounted
    $("script").each((i, script) => {
      const $script = $(script);
      const src = $script.attr("src");
      const type = $script.attr("type");

      // We're only interested in JavaScript script tags
      if (type && !/javascript/i.test(type)) return;

      if (src) {
        this[_].scripts.push({
          type: "src",
          body: src
        });
      } else {
        this[_].scripts.push({
          type: "code",
          body: $script.html()
        });
      }

      $script.remove();
    });

    // Wrapping with .af-view will apply encapsulated CSS
    const $body = $("body");
    const $afContainer = $('<span class="af-view" style="width:100%;height:100%;"></span>');

    $afContainer.append($body.contents());
    $afContainer.prepend("\n  ");
    $afContainer.append("\n  ");
    $body.append($afContainer);

    html = $body.html();

    this[_].html = html;

    const sockets = (this[_].sockets = []);

    // Find root sockets
    $("[af-sock]").each((i, el) => {
      const $el = $(el);
      const socketName = $el.attr("af-sock");
      sockets.push(socketName);

      $el.attr("af-sock", null);
      // Workaround would help identify the closing tag
      el.tagName += `-af-sock-${socketName}`;
    });

    // Refetch modified html
    html = $body.html();



    // Transforming HTML into JSX
    let jsx = htmltojsx.convert(removeHtmlFromLinks(html)).trim();

    // DETECT LIST
    children.forEach((child, index) => {
      const isList = (new RegExp(`(<af-${child.elName} />\\s+){2,}`, "")).exec(jsx);
      if (isList) {
        this[_].sockets.push(`${camelize(child.className)}List${index}`)
        jsx = jsx.replace(
          new RegExp(`(<af-${child.elName} />\\s+){2,}`, ""),
          `{map(proxies['${camelize(child.className)}List${index}'], props => <React.Fragment ${mergeProps(
            ''
          )}>{props.children ? props.children : null}</React.Fragment>)}`

        );
      } else {
        jsx = jsx.replace(
          new RegExp(`(<af-${child.elName} />\\s*)+`, !this[_].isComponent ? "g" : ""),
          !this[_].isComponent ? `<${child.className}.Controller {...this.props}/>` :
          `{map(proxies['${child.className}-${index}'], props => <${child.className}.Controller ${mergeProps(
            ''
          )}>{props.children ? props.children : null}</${child.className}.Controller>)}`

        );
      }
    });

    // Bind controller to view
    this[_].jsx = bindJSX(jsx, children);
  }

  get scripts() {
    return this[_].scripts ? this[_].scripts.slice() : [];
  }

  get styles() {
    return this[_].styles.slice();
  }

  get html() {
    return this[_].html;
  }

  get jsx() {
    return this[_].jsx;
  }

  get sockets() {
    return this[_].sockets && [...this[_].sockets];
  }

  get source() {
    return this[_].source;
  }

  set source(source) {
    this[_].source = String(source);
  }

  constructor(options) {
    super();

    this[_].children = [];
    this[_].styles = options.styles || [];

    this.name = options.name;
    this.parent = options.parent;
    this.isComponent = options.isComponent;
    this.html = options.html;
    this.source = options.source;
  }

  async write(dir, componentDir, metaDir, stylesDir, ctrlsDir) {
    const filePath = `${dir}/${this.className}.js`;
    const childFilePaths = [filePath];
    const writingChildren = this[_].children.map(async child => {
      if(!writingFiles.includes(child.className)){
        writingFiles.push(child.className);
        const filePaths = await child.write(componentDir, componentDir, metaDir, stylesDir, ctrlsDir);
        childFilePaths.push(...filePaths);
      }
    });
    const isNestedComponent = dir === componentDir;
    let writingSelf

    if (!writingFiles.includes(`${this.className}.js`)) {
      try {
        await fs.readFile(`${dir}/${this.className}.js`);
      } catch(e) {
        // pass
        writingSelf = fs.writeFile(
          `${dir}/${this.className}.js`,
          this[_].compose(
            path.relative(dir, componentDir),
            path.relative(dir, metaDir),
            path.relative(dir, stylesDir),
            ctrlsDir,
            !isNestedComponent
          )
        )
      }
    }


    try {
      await Promise.all([...writingChildren, writingSelf]);
    } catch(e) {
      console.log(e);
    }
    return childFilePaths;
  }

  async setStyle(href, content, stylesDir) {
    let type;
    let body;

    if (href) {
      type = "href";
      body = /^\w+:\/\//.test(href) ? href : path.resolve("/", href);
    } else {
      type = "sheet";
      body = content;
    }

    const exists = this[_].styles.some(style => {
      return style.body == body;
    });

    if (!exists) {
      this[_].styles.push({ type, body });
    }

    const sheets = this[_].styles
      .map(({ type, body }) => {
        return type == "sheet" && body;
      })
      .filter(Boolean);

    let css = "";

    // css += hrefs.map((href) => {
    //   return `@import url(${href});`
    // }).join('\n')


    css += "\n\n";

    css += sheets
      .map(sheet => {
        return sheet;
      })
      .join("\n\n");
    if(!stylesDir || !css.length) return true;
    try {
      await mkdirp(stylesDir);
      await fs.writeFile(`${stylesDir}/${this.className}.css` , escape(css.trim()));
    } catch(e) {
      console.log(e);
    }
  }

  _compose(compDir, metaDir, stylesDir, ctrlsDir, shouldHaveStyles = true) {
    return freeLint(`
      import React from 'react'
      import { createScope, map, transformProxies } from '../helpers'
      ${shouldHaveStyles ? `import "${stylesDir}/${this.className}.css"` : ''}
      ==>${this[_].composeChildImports(compDir)}<==

      let Controller

      class ${this.className} extends React.Component {
        static get Controller() {
          if (Controller) return Controller

          try {
            Controller = require('${ctrlsDir}/${this.ctrlClassName}')
            Controller = Controller.default || Controller

            return Controller
          }
          catch (e) {
            if (e.code == 'MODULE_NOT_FOUND') {
              Controller = ${this.className}

              return Controller
            }

            throw e
          }
        }

        render() {
          const proxies = Controller !== ${
            this.className
          } ? transformProxies(this.props.children) : {
            ==>${this[_].composeProxiesDefault()}<==
          }

          ${this[_].isComponent ? '' : `
          let Metadata
          try {
            Metadata = require("${metaDir}/${this.metaClassName}")
            Metadata = Metadata.default || Metadata
          } catch (e) {
            // pass
            Metadata = null;
          }
          try {
            Metadata = require("${metaDir}/defaultMeta")
            Metadata = Metadata.default || Metadata
          } catch (e) {
            // pass
            Metadata = null;
          }
          `}


          return (
            <React.Fragment>
              ${!this[_].isComponent ? '{Metadata ? <Metadata {...this.props} /> : null}' : ''}
              ==>${this.jsx}<==
            </React.Fragment>
          )
        }
      }

      export default ${this.className}
    `);
  }

  _composeStyleImports() {
    // const hrefs = this[_].styles.map(({ type, body }) => {
    //   return type == 'href' && body
    // }).filter(Boolean)

    const sheets = this[_].styles
      .map(({ type, body }) => {
        return type == "sheet" && body;
      })
      .filter(Boolean);

    let css = "";

    // css += hrefs.map((href) => {
    //   return `@import url(${href});`
    // }).join('\n')

    css += "\n\n";

    css += sheets
      .map(sheet => {
        return sheet;
      })
      .join("\n\n");

    return escape(css.trim());
  }

  _composeProxiesDefault() {
    return this[_].sockets
      .map(socket => {
        return `'${socket}': [],`;
      })
      .join("\n");
  }

  _composeChildImports(compDir) {
    if (!compDir) {
      compDir = '.';
    }
    const imported = [];

    const imports = this[_].children.map(child => {
      if (!imported.includes(child.className)) {
        imported.push(child.className);
        return `import ${child.className} from '${compDir}/${child.className}'`;
      }
    }).filter(imp => !!imp && imp.length);

    // Line skip
    imports.push("");

    return imports.join("\n");
  }

  _composeScriptsDeclerations() {
    return this[_].scripts
      .map(script => {
        if (script.type == "src") {
          return `fetch("${script.body}").then(body => body.text()),`;
        }

        const minified = uglify.minify(script.body).code;
        // Unknown script format ??? fallback to maxified version
        const code = minified || script.body;

        return `Promise.resolve("${escape(code)}"),`;
      })
      .join("\n");
  }

  _composeScriptsInvocations() {
    if (!this[_].scripts) return "";

    const invoke = freeScope("eval(arguments[0])", "window", {
      script: null
    });

    return freeText(`
      scripts.concat(Promise.resolve()).reduce((loaded, loading) => {
        return loaded.then((script) => {
          ==>${invoke}<==

          return loading
        })
      })
    `);
  }
}

function camelize(text) {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function bindJSX(jsx, children = []) {
  children.forEach(child => {
    jsx = jsx.replace(
      new RegExp(`af-${child.elName}`, "g"),
      `${child.className}.Controller`
    );
  });

  // ORDER MATTERS
    // Open close
  return (
    jsx
      // Open close
      .replace(
        /<([\w_-]+)-af-sock-([\w_-]+)(.*?)>([^]*)<\/\1-af-sock-\2>/g,
        (match, el, sock, attrs, children) =>
          // If there are nested sockets
          /<[\w_-]+-af-sock-[\w_-]+/.test(children)
            ? `{map(proxies['${sock}'], props => <${el} ${mergeProps(
                attrs
              )}>{createScope(props.children, proxies => <React.Fragment>${bindJSX(
                children
              )}</React.Fragment>)}</${el}>)}`
            : `{map(proxies['${sock}'], props => <${el} ${mergeProps(
                attrs
              )}>{props.children ? props.children : <React.Fragment>${children}</React.Fragment>}</${el}>)}`
      )
      // Self closing
      .replace(
        /<([\w_-]+)-af-sock-([\w_-]+)(.*?) \/>/g,
        (match, el, sock, attrs) =>
          `{map(proxies['${sock}'], props => <${el} ${mergeProps(
            attrs
          )}>{props.children}</${el}>)}`
      )
  );
}

// Merge props along with class name
function mergeProps(attrs) {
  attrs = attrs.trim();

  if (!attrs) {
    return "{...props}";
  }

  let className = attrs.match(/className="([^"]+)"/);

  if (!className) {
    return `${attrs} {...props}`;
  }

  className = className[1];
  attrs = attrs.replace(/ ?className="[^"]+"/, "");

  return `${attrs} {...{...props, className: \`${className} $\{props.className || ''}\`}}`.trim();
}

export default ViewWriter;
