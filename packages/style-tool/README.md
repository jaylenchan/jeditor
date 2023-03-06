# Style Tool

use style tool to apply style to elements

## reset

|             Mixin             |
| :---------------------------: |
|         `reset-style`         |
| `reset-style-for-old-browser` |

## color

|                 Mixin                 |                    Function                     |
| :-----------------------------------: | :---------------------------------------------: |
|     `define-color-vars($colors)`      |               `genVarName($list)`               |
| `extend-color-state($types, $states)` |         `genColorVarName($type, $num)`          |
|   `extend-color-prop($propColors)`    |             `getColor($type, $num)`             |
|                                       |      `getColorByState($colorType, $state)`      |
|                                       |             `getBrandState($state)`             |
|                                       |            `getWarningState($state)`            |
|                                       |            `getSuccessState($state)`            |
|                                       |             `getErrorState($state)`             |
|                                       |          `mapGetColors($color, $num)`           |
|                                       | `getColorByProp($propType, $colorType, $level)` |
|                                       |    `getBackgroundColor($colorType, $level)`     |
|                                       |       `getTextColor($colorType, $level)`        |
|                                       |       `getIconColor($colorType, $level)`        |
|                                       |       `getFillColor($colorType, $level)`        |
|                                       |      ` getBorderColor($colorType, $level)`      |
|                                       |       `getMaskColor($colorType, $level)`        |

## layout

|          Mixin          |
| :---------------------: |
| `full-page($selectors)` |
|   `full-in-father()`    |
|       `pos($val)`       |

## background

|       Mixin        |
| :----------------: |
|   `bg($vals...)`   |
|  `bg-color($val)`  |
|   `bg-img($val)`   |
| `bg-repeat($vals)` |
| `bg-attach($val)`  |
|  `bg-pos($vals)`   |

## border

|         Mixin         |
| :-------------------: |
|    `bd($vals...)`     |
| `bd-bottom($vals...)` |
|   `bd-color($val)`    |

## Box

|       Mixin       |
| :---------------: |
|  `height($val)`   |
|   `width($val)`   |
|  ` mg($vals...)`  |
|  `mg-top($val)`   |
| `mg-right($val)`  |
| `mg-bottom($val)` |
|  `mg-left($val)`  |
|  ` pd($vals...)`  |
|  `pd-top($val)`   |
| `pd-right($val)`  |
| `pd-bottom($val)` |
|  `pd-left($val)`  |

## text

|       Mixin        |
| :----------------: |
| `text-color($val)` |
