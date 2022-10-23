import {h} from 'vue';
import mermaid from 'mermaid';
import {Loading} from './loading';

const MermaidComponent = {
  name: 'Mermaid',
  props: {
    id: {
      type: String,
      required: false,
      default() {
        return 'diagram_' + Date.now();
      }
    },
    graph: {
      type: String,
      required: true
    },
    style: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    theme: {
      type: String,
      default: 'base',
    },
  },
  render(props) {
    const style = {
      width: '100%',
      ...props.style
    };

    return h('div', {
      style,
      class: 'cl-mermaid',
    }, []);
  },
  mounted() {
    const element = this.$el;
    mermaid.initialize({startOnLoad: true});
    mermaid.render(this.id, decodeURIComponent(this.graph), (svgCode) => {
      element.innerHTML = svgCode;
    });
  },
  components: {
    // VueMermaidString,
    Loading,
  }
};

export {MermaidComponent};
