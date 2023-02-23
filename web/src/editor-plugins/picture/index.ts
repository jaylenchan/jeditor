import PictureView from './view/index.vue'
import { injectable, inject } from 'inversify'
import type { IPlugin, IEditor } from '../../editor-kernel/type'
import { TYPES } from '../../editor-kernel/type'
@injectable()
class Picture implements IPlugin {
  view: any = PictureView
  id = 'Picture'
  jeditor: IEditor

  constructor(@inject(TYPES.JEditor) jeditor: IEditor) {
    this.jeditor = jeditor
  }
}

export default Picture
