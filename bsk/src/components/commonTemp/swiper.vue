<template>
    <div class="swiper-container swiper-container-horizontal swiper-container-free-mode">
        <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
            <slot>
            </slot>

        </div>
        <!-- Add Pagination -->
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.pageInit()
        },
        methods: {
            pageInit() {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 2,
                    paginationClickable: true,
                    spaceBetween: 10,
                    freeMode: true
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .swiper-container {
        /*width:r(156) ;*/
        height: r(190);
    }

</style>
