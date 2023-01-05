<!--
  @component
  Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
 <script>
  import { getContext } from 'svelte';
  import { max } from 'd3-array';

  const { data, x, y, xScale, yScale, xRange, yRange, z } = getContext('LayerCake');

  /* --------------------------------------------
   * Title case the first letter
   */
  const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  /* --------------------------------------------
   * Put the label on the highest value
   */
  $: left = values => $xScale(max(values, $x)) /  Math.max(...$xRange);



  var colors = [
    "#e67373",
    "#e69973",
    "#e6da73",
    "#73e67e",
    "#73e6d4",
    "#73b4e6",
    "#7a73e6",
    "#b873e6",
    "#e673d0",
    "#e6da73",
    "#73e67e",
  ]
</script>

{#each $data as group, i}
  <div
    class="label"
    style="
      color: {colors[i]};
      bottom:{group.values[group.values.length - 1].value }%;
      left:{left(group.values) * 100}%;
    "
  >{cap($z(group))}</div>
{/each}

<style>
  .label {
    background-color:rgb(255, 255, 255);
    position: absolute;
    transform: translate(-100%, -100%)translateY(1px);
    font-size: 13px;
  }
</style>