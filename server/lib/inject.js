
export default function (res, data = {}) {
  res._injectData = _.extend({}, res._injectData, data);

  if (!res._originalWrite) {
    const _originalWrite = res.write;

    res.write = function (chunk, encoding) {
      const shouldReplace = res._injectData && !res._injected && encoding === undefined && /<!DOCTYPE html>/.test(chunk);

      if (shouldReplace) {

        if (res._headers['access-control-allow-origin']) {
          _originalWrite.call(res, chunk, encoding);
          return;
        }

        const tmplData = encodeURIComponent(JSON.stringify(res._injectData));
        const tmplText = `<script type="text/javascript">_INITIAL_STATE_ = JSON.parse(decodeURIComponent("${tmplData}"));</script>`;

        const parsedChunk = chunk.toString().replace('<script', `${tmplText}<script`);
        _originalWrite.call(res, parsedChunk, encoding);
        return;
      }

      _originalWrite.call(res, chunk, encoding);
    };
  }
}
