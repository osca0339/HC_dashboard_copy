<script lang="ts">
	import RegisterUser from "../../../routes/Components/registerUser.svelte"
  import type { PageData } from './$types';
  export let data: PageData;
</script>
<RegisterUser display={data}></RegisterUser>