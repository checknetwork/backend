

/**
 * apply React like interpolation style for template expressions
 * @return  {Void}  none
 */
const applyTemplateSettings = () => {
  _.templateSettings = {
    interpolate: /\{(.+?)\}/g
  };
};



export default function () {
  applyTemplateSettings();
}
