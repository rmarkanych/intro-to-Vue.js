import 'vue-router'
import { routeNames } from '@/router'
import {globalProperties} from '@/plugins' 
import type { EpPropFinalized, EpPropMergeType } from 'element-plus/es/utils'

declare module 'vue-router' {
  interface RouteMeta {
    // todo: this is just an example. Please setup your own route meta params.
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // todo: Here you define you global vue definitions.
    $routeNames: typeof routeNames
       // todo: These ones are used only for element library for size and type props;
       $elComponentSize: Record<keyof typeof globalProperties.$elComponentSize, EpPropMergeType<StringConstructor, keyof typeof globalProperties.$elComponentSize>>
       $elComponentType: Record<keyof typeof globalProperties.$elComponentType, EpPropFinalized<StringConstructor, keyof typeof globalProperties.$elComponentType>>
  }
}

export { }