import {defineComponent, h} from 'vue';
import mermaid from 'mermaid';

const MermaidComponent = defineComponent({
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
    themeVariables: {
      type: Object,
      default: () => {
        return {
          primaryColor: '#409eff',
          darkMode: false,
        };
      }
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
  data() {
    return {
      observer: undefined as MutationObserver,
      darkMode: false,
    };
  },
  methods: {
    updateDarkMode() {
      const html = document.querySelector('html');
      if (!html) return;
      if (
        html.getAttribute('class')?.indexOf('dark') > -1 ||
        html.getAttribute('data-theme')?.indexOf('dark') > -1
      ) {
        this.darkMode = true;
        return;
      }
      this.darkMode = false;
    },
    renderGraph() {
      const element = this.$el;
      mermaid.initialize({
        startOnLoad: true,
        theme: this.theme,
        themeVariables: {
          ...this.themeVariables,
          darkMode: this.darkMode,
        },
      });
      mermaid.render(this.id, decodeURIComponent(this.graph), (svgCode) => {
        element.innerHTML = svgCode;
      });
    },
  },
  mounted() {
    this.observer = new MutationObserver(() => {
      this.updateDarkMode();
      this.renderGraph();
    });
    this.observer.observe(document.querySelector('html'), {attributes: true});

    setTimeout(() => {
      this.updateDarkMode();
      this.renderGraph();
    }, 0);
  },
  unmounted() {
    this.observer.disconnect();
  },
});

export {MermaidComponent};
