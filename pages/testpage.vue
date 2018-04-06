<template><div>

  <meeting-header></meeting-header>
    <secretary_-forms></secretary_-forms>
</div>
</template>

<script>

    import Secretary_Forms from "../components/Secretary_Forms";
    import MeetingHeader from "../components/MeetingHeader";
    export default {
        name: "testpage",
      components: {MeetingHeader, Secretary_Forms}
    }
</script>

<style scoped>

</style>
