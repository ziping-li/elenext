import { App, computed, defineComponent, PropType } from 'vue'

import { Popper } from '../Popper'

// import './Popover.scss'
import { mergeCls } from '@/utils/tools'
import { getBlockCls, getCompName } from '@/config'

const blockCls = getBlockCls('Popover')
const Popover = defineComponent({
  name: getCompName('Popover'),
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click'
    },
    popperClass: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const classes = computed(() => mergeCls(blockCls, props.popperClass, props.content && 'el-popover--plain'))
    return () => (
      <Popper
        popperClass={classes.value}
        trigger={props.trigger}
        v-slots={{
          popper: () => (
            <div ref="popper" style={{ width: props.width + 'px' }} role="tooltip" id="tooltipId">
              {props.title && <div class="el-popover__title">{props.title}</div>}
              {slots.popper ? slots.popper() : props.content}
            </div>
          ),
          default: slots.default
        }}
      ></Popper>
    )
  }
})

Popover.install = (app: App): void => {
  app.component(Popover.name, Popover)
}

export default Popover