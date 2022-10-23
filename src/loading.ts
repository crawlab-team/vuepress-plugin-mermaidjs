import {h} from 'vue';
import './style.css';

const Loading = {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: '#409eff',
    },
  },
  render(props) {
    return h('div', {
      class: 'cl-mermaid-spinner',
      style: {
        background: props.color,
      }
    }, []);
  }
};

export {Loading};