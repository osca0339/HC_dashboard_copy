<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
 <script lang="ts">
    import { getContext } from 'svelte';
    import Login from '../login.svelte';

    export let thresholds: [any]

    const { data, xGet, yGet, zGet } = getContext('LayerCake');
  
    $: path = values => {
      return 'M' + values
        .map(d => {
          return $xGet(d) + ',' + $yGet(d);
        })
        .join('L');
    }; 



    const formatThreshold =	[
    [
        {
            "value": thresholds[0][0].value ? thresholds[0][0].value : 15,
            "Date": new Date(thresholds[0][0].Date)
        },
        {
            "value": thresholds[0][0].value ? thresholds[0][0].value : 15,
            "Date": new Date(thresholds[0][1].Date)
        }
    ],
    [
        {
            "value": thresholds[1][0].value ? thresholds[1][0].value : 60,
            "Date": new Date(thresholds[1][0].Date)
        },
        {
            "value": thresholds[1][1].value ? thresholds[1][1].value : 60,
            "Date": new Date(thresholds[1][1].Date)
        }
    ]
]

    
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
  
  <g class="line-group">
    <path
        class='path-line'
        d="{path(formatThreshold[0])}"
        stroke-dasharray="8,5"
        stroke="#d95b5b"
      ></path>
  </g>
  
  <g class="line-group">
    <path
        class='path-line'
        stroke-dasharray="8,5"
        d="{path(formatThreshold[1])}"
        stroke="#92d95b"
      ></path>
  </g>
  
  <style>
    .path-line {
      fill: none;

      stroke-width: 2px;
    }
  </style>