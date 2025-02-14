<template>
    <div>

        <about></about>
        <side-projects></side-projects>
        </div>

</template>

<script>
import About from './about.vue';
import SideProjects from './../SideProjects/SideProjects.vue';

export default {
    components: {
        About,
        SideProjects
    }
};
</script>