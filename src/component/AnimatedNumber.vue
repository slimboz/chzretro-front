<template>
  <img
    draggable="false"
    @contextmenu.prevent
    :alt="digit"
    v-for="digit in displayNumber.toString(10)"
    :key="digit.index"
    width="19"
    height="21"
    :src="require(`@/asset/img/number/${digit}.svg`)"
  />
</template>

<script>
export default {
  name: "AnimatedNumber",
  props: { number: { default: 0, type: Number } },

  data() {
    return {
      displayNumber: 0,
    };
  },

  mounted() {
    requestAnimationFrame(this.tween);
  },

  methods: {
    tween() {
      if (this.number == this.displayNumber) return;
      this.displayNumber++;
      if (this.displayNumber < this.number) requestAnimationFrame(this.tween);
    },
  },
};
</script>
