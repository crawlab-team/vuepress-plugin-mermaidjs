import markdownItFence from './markdownItFence';

export default (md) => {
  return markdownItFence(md, 'mermaid-fence', {
    render: (tokens, idx, _options, env, self) => {
      const token = tokens[idx];
      const {content} = token;

      let encoded = encodeURIComponent(content);
      return `<cl-mermaid graph="${encoded}"></cl-mermaid>`;
    },
    validate: (params) => {
      return params.trim().split(' ').includes('mermaid');
    }
  });
};
