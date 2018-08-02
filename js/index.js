var move = document.getElementsByClassName('move')[0],
    dot = move.getElementsByTagName('div'),
    wrap = document.getElementsByClassName('wrap')[0],
    clip = document.getElementsByClassName('clip')[0];
//用于计算最大移动距离
var wrapHeight = wrap.clientHeight,
    wrapWidth = wrap.clientWidth,
    wrapTop = wrap.offsetTop,
    wrapLeft = wrap.offsetLeft;

move.addEventListener('mousedown', wrapHandler, false);

//点击拖动
function wrapHandler(ev) {

    var origX = this.offsetLeft,
        origY = this.offsetTop,
        mStartX = ev.clientX,
        mStartY = ev.clientY,
        deltaX = mStartX - origX,
        deltaY = mStartY - origY,
        moveStyle = this.getBoundingClientRect(),
        //宽度不是固定的，每次都需要获取，用于计算最大移动距离
        moveHeight = moveStyle.height,
        moveWidth = moveStyle.width,
        el = this;
    ev.stopPropagation()

    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);

    function mouseMoveHandler(ev) {
        var nowX = ev.clientX - deltaX,
            nowY = ev.clientY - deltaY,
            //最大移动距离
            maxLeft = wrapWidth - moveWidth,
            maxTop = wrapHeight - moveHeight,
            //限定移动区域
            moveTop = nowY < 0 ? 0 : (nowY > (maxTop)) ? (maxTop) : nowY,
            moveLeft = nowX < 0 ? 0 : (nowX > (maxLeft)) ? (maxLeft) : nowX;

        el.style.left = moveLeft + "px"
        el.style.top = moveTop + "px"
        //移动窗口和裁剪窗口图片位置
        el.style.backgroundPosition = `-${moveLeft}px -${moveTop}px`;
        clip.style.backgroundPosition = `-${moveLeft}px -${moveTop}px`;
        ev.stopPropagation();
        ev.preventDefault();
    }

    //鼠标抬起的时候取消鼠标移动
    function mouseupHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);
    }
}


//圆点监听事件
for (let i = 0; i < dot.length; i++) {
    const element = dot[i];
    element.index = i + 1;
    element.addEventListener('mousedown', childHandler, false);
}

function childHandler(ev) {
    //不能取computedStyle，当设置Style.right = 0的时候，下一次用computedStyle取值的会后，right为0
    var moveRect = move.getBoundingClientRect(),
        origBottom = moveRect.bottom - wrapTop,
        origRight = moveRect.right - wrapLeft,
        origLeft = moveRect.left - wrapLeft,
        origTop = moveRect.top - wrapTop,
        origheight = moveRect.height,
        origwidth = moveRect.width,
        origX = ev.clientX,
        origY = ev.clientY,
        el = this,
        minWidth = 100,
        minHeight = 100,
        maxWidth = 500,
        maxHeight = 500;
    //最小宽度和最大宽度
    move.style['minWidth'] = minWidth + 'px'
    move.style['minHeight'] = minHeight + 'px'
    move.style['maxWidth'] = maxWidth + 'px'
    move.style['maxHeight'] = maxHeight + 'px'

    clip.style['minWidth'] = minWidth + 'px'
    clip.style['minHeight'] = minHeight + 'px'

    document.addEventListener('mousemove', childMoveHandler, false);
    document.addEventListener('mouseup', childUpHandler, false);

    function childMoveHandler(ev) {
        var nowX = ev.clientX,
            nowY = ev.clientY,
            changeX = nowX - origX,
            changeY = nowY - origY;
        switch (el.index) {
            case 1: //左上角
                //不能超出边界
                if (changeX <= -origLeft) {
                    changeX = -origLeft
                } else if (changeX >= origwidth - minWidth) {
                    changeX = origwidth - minWidth
                }

                if (changeY <= -origTop) {
                    changeY = -origTop
                } else if (changeY >= origheight - minWidth) {
                    changeY = origheight - minWidth
                }
                //达到最小宽度时不变

                //右下角固定
                move.style['bottom'] = origRight + 'px'
                move.style['right'] = origBottom + 'px'
                //top 和 left 值变动
                move.style['left'] = origLeft + changeX + 'px'
                move.style['top'] = origTop + changeY + 'px'

                move.style['width'] = origwidth - changeX + 'px'
                move.style['height'] = origheight - changeY + 'px'
                move.style.backgroundPosition = `-${origLeft + changeX}px -${origTop + changeY}px`;

                break;
            case 2: //右上角
                if (changeX >= wrapWidth - origRight) {
                    changeX = wrapWidth - origRight
                }
                if (changeY <= -origTop) {
                    changeY = -origTop
                } else if (changeY >= origheight - minHeight) {
                    changeY = origheight - minHeight
                }
                move.style['bottom'] = origBottom + 'px'
                move.style['top'] = origTop + changeY + 'px'
                move.style['width'] = origwidth + changeX + 'px'
                move.style['height'] = origheight - changeY + 'px'
                move.style['backgroundPositionY'] = ` -${origTop + changeY}px`;

                break;
            case 3:
                // 右下角
                if (changeX >= origRight) {
                    changeX = origRight
                }
                if (changeY >= origBottom) {
                    changeY = origBottom
                }
                move.style['width'] = origwidth + changeX + 'px'
                move.style['height'] = origheight + changeY + 'px'
                break;
            case 4:
                //左下角
                if (changeX <= -origLeft) {
                    changeX = -origLeft
                } else if (changeX >= origwidth - minWidth) {
                    changeX = origwidth - minWidth
                }
                if (changeY >= wrapHeight - origBottom) {
                    changeY = wrapHeight - origBottom
                }

                move.style['right'] = origRight + 'px'
                move.style['left'] = origLeft + changeX + 'px'
                move.style['width'] = origwidth - changeX + 'px'
                move.style['height'] = origheight + changeY + 'px'
                move.style['backgroundPositionX'] = ` -${origLeft + changeX}px`;
                break;
            case 5: //上

                if (changeY <= -origTop) {
                    changeY = -origTop
                } else if (changeY >= origheight - minHeight) {
                    changeY = origheight - minHeight
                }

                move.style['bottom'] = origBottom + 'px'
                move.style['top'] = origTop + changeY + 'px'
                move.style['height'] = origheight - changeY + 'px'
                move.style['backgroundPositionY'] = `-${origTop + changeY}px `;
                break;
            case 6: //右
                if (changeX >= wrapWidth - origRight) {
                    changeX = wrapWidth - origRight
                }
                move.style['width'] = origwidth + changeX + 'px'
                clip.style['width'] = origwidth + changeX + 'px'
                break;
            case 7: //下
                changeY = Math.min(changeY, wrapHeight - origBottom)
                move.style['height'] = origheight + changeY + 'px'
                break;
            case 8:
                //左
                if (changeX <= -origLeft) {
                    changeX = -origLeft
                } else if (changeX >= origwidth - minWidth) {
                    changeX = origwidth - minWidth
                }
                move.style['left'] = origLeft + changeX + 'px'
                move.style['right'] = origRight + 'px'
                move.style['width'] = origwidth - changeX + 'px'
                move.style['backgroundPositionX'] = `-${origLeft + changeX}px `;
                break;
        }

        clip.style['width'] = move.clientWidth + 'px'
        clip.style['height'] = move.clientHeight + 'px'
        clip.style['backgroundPosition'] = move.style['backgroundPosition']

    }

    function childUpHandler() {
        document.removeEventListener('mousemove', childMoveHandler);
        document.removeEventListener('mouseup', childUpHandler);
    }

    //阻止冒泡
    ev.stopPropagation();
    ev.preventDefault();
}