sGis.module('plugins.ZoomButtons', [
    'utils'
], (utils) => {

    "use strict";

    const TOP_CLASS = 'sGis-top';
    const BOTTOM_CLASS = 'sGis-bottom';
    const LEFT_CLASS = 'sGis-left';
    const RIGHT_CLASS = 'sGis-right';

    const WRAPPER_CLASS = 'sGis-zoomButtons';
    const ZOOM_IN_CLASS = 'sGis-zoomButtons-zoomIn';
    const ZOOM_OUT_CLASS = 'sGis-zoomButtons-zoomOut';

    class ZoomButtons {
        constructor(map, painter, properties) {
            this._map = map;
            this._painter = painter;

            let wrapper;
            // TODO: providing wrapper directly is depricated
            if (painter instanceof HTMLElement) {
                wrapper = painter;
            } else {
                wrapper = painter.innerWrapper;
            }

            this._setDom();

            if (wrapper) this._addToWrapper(wrapper);
            if (properties) Object.assign(this, properties);

            if (painter.on) {
                painter.on('wrapperChange', this._changeWrapper.bind(this));
            }
        }

        _changeWrapper() {
            if (this._container.parentNode) this._removeFromWrapper();
            if (this._painter.innerWrapper) this._addToWrapper(this._painter.innerWrapper);
        }

        _removeFromWrapper() {
            this._container.parentNode.removeChild(this._container);
        }

        _setDom() {
            let container = utils.createNode('div', this.wrapperClass, {}, [
                utils.createNode('div', ZOOM_IN_CLASS, { onclick: this._zoomIn.bind(this) }),
                utils.createNode('div', ZOOM_OUT_CLASS, { onclick: this._zoomOut.bind(this) })
            ]);

            this._container = container;
        }

        _addToWrapper(wrapper) {
            wrapper.appendChild(this._container);
        }

        _zoomIn() { this._map.zoom(1); }
        _zoomOut() { this._map.zoom(-1); }

        get position() { return this._position; }
        set position(position) {
            this._position = position;
            this._updateContainerClass();
        }

        _updateContainerClass() {
            this._container.className = this.wrapperClass;
        }

        get wrapperClass() {
            let className = WRAPPER_CLASS;
            className += ' ' + (this._position.indexOf('right') >= 0 ? RIGHT_CLASS : LEFT_CLASS);
            className += ' ' + (this._position.indexOf('bottom') >= 0 ? BOTTOM_CLASS : TOP_CLASS);
            return className;
        }
    }

    ZoomButtons.prototype._position = 'top left';

    return ZoomButtons
});