var move = document.getElementsByClassName('move')[0];
var wrapChild = move.getElementsByTagName('div');

move.addEventListener('mousedown', wrapHandler, false);

//点击拖动
function wrapHandler(ev) {
    console.log(ev.target)

    var origX = this.offsetLeft,
        origY = this.offsetTop,
        mStartX = ev.clientX,
        mStartY = ev.clientY,
        deltaX = mStartX - origX,
        deltaY = mStartY - origY,
        el = this;
    ev.stopPropagation()

    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);

    function mouseMoveHandler(ev) {
        var mNowX = ev.clientX,
            mNowY = ev.clientY;

        el.style.left = mNowX - deltaX + "px"
        el.style.top = mNowY - deltaY + "px"

        ev.stopPropagation();
        ev.preventDefault();

    }

    //鼠标抬起的时候取消鼠标移动
    function mouseupHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);
    }

}


for (let i = 0; i < wrapChild.length; i++) {
    const element = wrapChild[i];
    element.index = i + 1;
    element.addEventListener('mousedown', childHandler, false);
}

function childHandler(ev) {

    var target = this.parentNode,
        tgStyle = target.getBoundingClientRect(),
        origBottom = tgStyle.height + tgStyle.top,
        origRight = tgStyle.right,
        origLeft = tgStyle.left,
        origTop = tgStyle.top,
        origheight = target.clientHeight,
        origwidth = target.clientWidth,
        origX = ev.clientX,
        origY = ev.clientY,
        el = this,
        minWidth = 100,
        minHeight = 100,
        maxWidth = 500,
        maxHeight = 500;
    console.log(tgStyle)
    //最小宽度和最大宽度
    target.style['minWidth'] = minWidth + 'px'
    target.style['minHeight'] = minHeight + 'px'
    target.style['maxWidth'] = maxWidth + 'px'
    target.style['maxHeight'] = maxHeight + 'px'

    document.addEventListener('mousemove', childMoveHandler, false);
    document.addEventListener('mouseup', childUpHandler, false);

    function childMoveHandler(ev) {
        var nowX = ev.clientX,
            nowY = ev.clientY,
            changeX = nowX - origX,
            changeY = nowY - origY;
        switch (el.index) {
            case 1: //左上角
                var left = origLeft + changeX,
                    top = origTop + changeY;
                if (top > origBottom - minHeight) {
                    top = origBottom - minHeight
                } else if (top < origBottom - maxHeight) {
                    top = origBottom - maxHeight
                };
                if (left > origRight - minWidth) {
                    left = origRight - minWidth
                } else if (left < origRight - maxWidth) {
                    left = origRight - maxWidth
                };

                target.style['bottom'] = origRight + 'px'
                target.style['right'] = origBottom + 'px'
                target.style['left'] = left + 'px'
                target.style['top'] = top + 'px'
                target.style['width'] = origwidth - changeX + 'px'
                target.style['height'] = origheight - changeY + 'px'
                break;
            case 2: //右上角
                // top 和 bottom 变动， 当达到最小宽度的时候，top达到最大值origBottom - minHeight
                var top = origTop + changeY
                if (top > origBottom - minHeight) {
                    top = origBottom - minHeight
                } else if (top < origBottom - maxHeight) {
                    top = origBottom - maxHeight
                };
                target.style['bottom'] = origBottom + 'px'
                target.style['top'] = top + 'px'
                target.style['width'] = origwidth + changeX + 'px'
                target.style['height'] = origheight - changeY + 'px'
                break;
            case 3:
                // 右下角
                target.style['width'] = origwidth + changeX + 'px'
                target.style['height'] = origheight + changeY + 'px'
                break;
            case 4:
                //左下角
                var left = origLeft + changeX

                if (left > origRight - minWidth) {
                    left = origRight - minWidth
                } else if (left < origRight - maxWidth) {
                    left = origRight - maxWidth
                }

                target.style['right'] = origRight + 'px'
                target.style['left'] = left + 'px'
                target.style['width'] = origwidth - changeX + 'px'
                target.style['height'] = origheight + changeY + 'px'
                break;
            case 5:
                var top = origTop + changeY
                if (top > origBottom - minHeight) {
                    top = origBottom - minHeight
                } else if (top < origBottom - maxHeight) {
                    top = origBottom - maxHeight
                };
                target.style['bottom'] = origBottom + 'px'
                target.style['top'] = top + 'px'
                target.style['height'] = origheight - changeY + 'px'
                break;
            case 6:
                target.style['width'] = origwidth + changeX + 'px'
                break;
            case 7:
                target.style['height'] = origheight + changeY + 'px'
                break;
            case 8:

                var left = origLeft + changeX

                if (left > origRight - minWidth) {
                    left = origRight - minWidth
                } else if (left < origRight - maxWidth) {
                    left = origRight - maxWidth
                }
                target.style['right'] = origRight + 'px'
                target.style['left'] = left + 'px'
                target.style['width'] = origwidth - changeX + 'px'

                break;
        }

    }

    function childUpHandler() {
        document.removeEventListener('mousemove', childMoveHandler);
        document.removeEventListener('mouseup', childUpHandler);
    }

    //阻止冒泡
    ev.stopPropagation();
    ev.preventDefault();

}