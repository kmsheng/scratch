/*global window, Image*/
(function (window) {

    'use strict';

    var ScratchBox = (function () {

        function ScratchBox(box) {

            var self = this,
                image = new Image();

            self.box = box;
            self.layer = {};
            self.previousX = undefined;
            self.previousY = undefined;

            self.mousemove = function (e) {

                var ctx = self.layer.ctx,
                    canvas = self.layer.canvas,
                    currentX = e.clientX - canvas.offsetLeft,
                    currentY = e.clientY - canvas.offsetTop;

                ctx.beginPath();

                ctx.moveTo(currentX, currentY);
                ctx.lineTo(self.previousX, self.previousY);

                ctx.globalCompositeOperation = 'copy';
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineWidth = 20;
                ctx.stroke();
                ctx.closePath();

                self.previousX = currentX;
                self.previousY = currentY;
            };

            image.onload = function () {

                var canvas = window.document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                canvas.style.position = 'absolute';

                self.layer.canvas = canvas;
                self.layer.ctx = canvas.getContext('2d');
                self.layer.ctx.fillStyle = '#999999';
                self.layer.ctx.fillRect(0, 0, this.width, this.height);

                if (window.hasOwnProperty('ontouchstart')) {
                    canvas.addEventListener('touchmove', self.mousemove);
                } else {
                    canvas.addEventListener('mousemove', self.mousemove);
                }

                self.box.appendChild(canvas);
                self.box.appendChild(this);
            };

            image.src = box.getAttribute('data-src');
        }

        return ScratchBox;
    }()),

        PixScratchBox = (function () {

            function PixScratchBox(selector) {

                var boxes = window.document.querySelectorAll(selector),
                    scratchBoxes = [],
                    length = boxes.length,
                    i;

                for (i = 0; i < length; i += 1) {
                    scratchBoxes.push(new ScratchBox(boxes[i]));
                }
            }
            return PixScratchBox;
        }());

    window.PixScratchBox = PixScratchBox;
}(window));
