import {getDirname, path} from '@vuepress/utils';
import markdownItPlugin from './markdownItPlugin';

// @ts-ignore
const __dirname = getDirname(import.meta.url);
const clientConfigFile = path.resolve(__dirname, './clientConfig.ts');

export default (options, ctx) => {
  return {
    name: 'crawlab-vuepress-plugin-mermaidjs',
    define: {
      // MERMAID_OPTIONS: options
    },
    extendsMarkdown(md, app) {
      md.use(markdownItPlugin);
    },
    clientConfigFile,
  };
}
