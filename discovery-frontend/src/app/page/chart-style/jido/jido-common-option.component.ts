/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, ElementRef, Injector, Input, NgZone } from '@angular/core';
import { BaseOptionComponent } from '../base-option.component';
import * as _ from 'lodash';
import { UIOption } from '../../../common/component/chart/option/ui-option';
import { MapType } from '../../../common/component/chart/option/define/jido/jido-common';
import { UIJidoOption } from '../../../common/component/chart/option/ui-option/jido/ui-jido-chart';

@Component({
  selector: 'jido-common-option',
  templateUrl: './jido-common-option.component.html'
})
export class JidoCommonOptionComponent extends BaseOptionComponent {

  @Input('uiOption')
  public uiOption: UIJidoOption;

  // map service list
  public mapServiceList = [{name : this.translateService.instant('msg.page.common.map.layer.service.openstreet'), value : MapType.OSM}];

  // map style list
  public mapStyleList = [{name : this.translateService.instant('msg.page.common.map.layer.map.style.light'), value : 'Light'},
                         {name : this.translateService.instant('msg.page.common.map.layer.map.style.dark'), value : 'Dark'},
                         {name : this.translateService.instant('msg.page.common.map.layer.map.style.colored'), value : 'Colored'}];


  constructor(protected elementRef: ElementRef,
              protected injector: Injector) {

    super(elementRef, injector);
  }

  /**
   * set license
   */
  public setLicense() {

    this.uiOption = <UIJidoOption>_.extend({}, this.uiOption, {
      licenseNotation: this.uiOption.licenseNotation
    });

    this.update();
  }

  /**
   * set map style
   * @param data
   */
  public setMapStyle(data: Object) {

    this.uiOption = <UIJidoOption>_.extend({}, this.uiOption, {
      style: data['value']
    });

    this.update();
  }

  /**
   * set map service
   * @param data
   */
  public setMapService(data: Object) {

    this.uiOption = <UIJidoOption>_.extend({}, this.uiOption, {
      map: data['value']
    });

    this.update();
  }

  /**
   * return service default index
   * @returns {number}
   */
  public findServiceDefaultIndex() {
    return _.findIndex(this.mapServiceList, {value : this.uiOption.map});
  }

  /**
   * return style default index
   * @returns {number}
   */
  public findStyleDefaultIndex() {
    return _.findIndex(this.mapStyleList, {value : this.uiOption.style});
  }

  /**
   * toggle show map layer
   */
  public toggleShowMapLayer(showMapLayer: boolean) {

    this.uiOption = <UIJidoOption>_.extend({}, this.uiOption, {
      showMapLayer: showMapLayer
    });

    this.update();
  }
}