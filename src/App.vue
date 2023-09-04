<script setup lang="ts">
import { reactive } from "vue";
import { deepClone } from "../lib/main";
import shallowClone from "../lib/tools/shallowClone";
import { HButton } from "../lib/components";
import { HButton as HsfButton } from "tribiani-vue-tools";
import "tribiani-vue-tools/dist/style.css";

const state = reactive({
  origin: { person: { name: "hanshufei", age: 18 } },
  cloned: {},
});

const handleDeepClone = () => (state.cloned = deepClone(state.origin));
const handleShallowClone = () => (state.cloned = shallowClone(state.origin));

const handleAddAge = () => state.origin.person.age++;
</script>

<template>
  <p>{{ state.origin }}</p>
  <HButton>HanShufei</HButton>
  <h-button @click="handleAddAge">Add Age</h-button>
  <hr />
  <p>{{ state.cloned }}</p>
  <h-button @click="handleDeepClone">Deep Clone</h-button>
  <h-button @click="handleShallowClone">Shallow Clone</h-button>
  <hr />
  <HsfButton>HsfButton</HsfButton>
</template>

<style scoped></style>
