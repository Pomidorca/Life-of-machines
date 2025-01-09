<template>
    <div class="modal-backdrop">
        <div class="modal-body">
            <header class="modal-header">
                <slot name="header"></slot>
            </header>
            <main class="modal-content">
                <slot name="main"></slot>
            </main>
            <footer class="modal-footer">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="css">
.modal-backdrop {
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    z-index: 5000;
    position: fixed;
    left: 0;
    top: 0;
    align-content: center;
    backdrop-filter: blur(3px);
}

.modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: none;
    max-width: 80vw;
    width: 45vmax;
    max-height: 30vmin;
    height: auto;
    z-index: 5001;
    position: relative;
    background-color: #fff;
    border-radius: 15px;
    margin: auto;
    padding: 2%;
}
</style>