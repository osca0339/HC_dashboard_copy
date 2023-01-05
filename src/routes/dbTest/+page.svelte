<script lang="ts">
	import type { PageData } from "./$types";
    export let data: PageData

    const test = data.test //jeg mangler desperat bedre navne til mine properties

</script>

<h1>Query fetch from Mongodb</h1>

<table width="500" border="10"> 
    <tr> 
        <th>id</th> 
        <th>Message</th> 
    </tr> 
    {#each test as i} 
    <tr> 
        <td>{i.id}</td> 
        <td> {i.message}</td> 
    </tr> 
    {/each} 
</table>