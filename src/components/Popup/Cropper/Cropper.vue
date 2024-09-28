<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="cropper"
        v-if="props.index !== -1 && data.img"
        :style="{ zIndex: 10 + index }"
        @click.stop
      >
        <VuePictureCropper
          :img="data.img"
          :options="{
            viewMode: 1,
            movable: false,
            scalable: false,
            zoomOnWheel: false,
            autoCrop: data.aspectRatio !== undefined,
            autoCropArea: 1,
            aspectRatio: data.aspectRatio
          }"
        />
        <div
          class="footer"
          :style="{
            transform: `scale(${scale ?? 1}) translateX(-50%)`
          }"
        >
          <Btn
            name="确认"
            opaque
            @click.stop="onCropper"
          />
          <Btn
            name="取消"
            opaque
            @click.stop="close"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import Btn from '@/components/Common/Btn.vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { callback, data, imageCropper } from './data'

const scale = inject<ComputedRef<number> | undefined>('scale')

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const onCropper = async () => {
  if (cropper && data.fn) {
    data.fn(
      (await imageCropper.crop({
        cropperInstance: cropper,
        src: data.img,
        outputType: 'base64'
      })) as string
    )
  }
  close()
  return true
}

const reset = () => {
  cropper?.reset()
}

watch(
  () => props.index,
  () => {
    if (props.index === -1) {
      window.removeEventListener('resize', reset)
    } else {
      window.addEventListener('resize', reset)
    }
  }
)

callback.confirm = onCropper
</script>

<style lang="stylus" scoped>
:deep(.vue--picture-cropper__wrap)
  display flex
  justify-content center
  align-items center
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')

.cropper
  position fixed
  top 0
  right 0
  bottom 0
  left 0

.footer
  position fixed
  bottom 15px
  left 50%
  display flex
  width auto
  transform-origin 0 bottom 0px
  background rgb(29, 29, 29)
</style>
