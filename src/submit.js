import { h, ref, onMounted } from "vue";

const v = ref("Submit");
function useText() {
  return {
    text: v,
  };
}

export default {
  setup(props) {
    const { text } = useText();
    return () =>
      h(
        "button",
        {
          onClick: () => {
            text.value += "1";
          },
        },
        text.value
      );
  },
};
