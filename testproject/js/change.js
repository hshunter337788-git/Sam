/**
 * Created by HuangShan on 2019/10/15.
 */
function changepic() {
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("myimg");
    c.width=img.width;
    c.height=img.height;
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // 反转颜色
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}


///滤镜渲染
var kernels = {
    none: [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ],
    sharpen: [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ],
    sharpenless: [
        0, -1, 0,
        -1, 10, -1,
        0, -1, 0
    ],
    blur: [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ],
    shadow: [
        1, 2, 1,
        0, 1, 0,
        -1, -2, -1
    ],
    emboss: [
        -2, 1, 0,
        -1, 1, 1,
        0, 1, 2
    ],
    edge: [
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    ]
};

function normalize(kernel) {
    var len = kernel.length;
    var normal = new Array(len);
    var i, sum = 0;
    for (i = 0; i < len; ++i) {
        sum += kernel[i];
    }
    if (sum <= 0) {
        normal.normalized = false;
        sum = 1;
    } else {
        normal.normalized = true;
    }
    for (i = 0; i < len; ++i) {
        normal[i] = kernel[i] / sum;
    }
    return normal;
}

var filtertype = null;

function changefilter(){
    var item = document.getElementById('filter');
    filtertype = normalize(kernels[item.value]);

    var c = document.getElementById("mycanvas");
    var img = document.getElementById("myimg");

    convolve(c, img,filtertype);
}

function convolve(c,img, kernel) {
    var ctx = c.getContext("2d");

    c.width=img.width;
    c.height=img.height;
    ctx.drawImage(img, 0, 0);

    var width = c.width;
    var height = c.height;

    var size = Math.sqrt(kernel.length);
    var half = Math.floor(size / 2);

    var inputData = ctx.getImageData(0, 0, width, height).data;

    var output = ctx.createImageData(width, height);
    var outputData = output.data;

    for (var pixelY = 0; pixelY < height; ++pixelY) {
        var pixelsAbove = pixelY * width;
        for (var pixelX = 0; pixelX < width; ++pixelX) {
            var r = 0, g = 0, b = 0, a = 0;
            for (var kernelY = 0; kernelY < size; ++kernelY) {
                for (var kernelX = 0; kernelX < size; ++kernelX) {
                    var weight = kernel[kernelY * size + kernelX];
                    var neighborY = Math.min(
                            height - 1, Math.max(0, pixelY + kernelY - half));
                    var neighborX = Math.min(
                            width - 1, Math.max(0, pixelX + kernelX - half));
                    var inputIndex = (neighborY * width + neighborX) * 4;
                    r += inputData[inputIndex] * weight;
                    g += inputData[inputIndex + 1] * weight;
                    b += inputData[inputIndex + 2] * weight;
                    a += inputData[inputIndex + 3] * weight;
                }
            }
            var outputIndex = (pixelsAbove + pixelX) * 4;
            outputData[outputIndex] = r;
            outputData[outputIndex + 1] = g;
            outputData[outputIndex + 2] = b;
            outputData[outputIndex + 3] = kernel.normalized ? a : 255;
        }
    }
    ctx.putImageData(output, 0, 0);
}

//////////////////////////////////////////////////////////
var filtertypeII='none';
function changeslider1(aslider){
    $('#VSL1')[0].innerHTML = aslider.value;

    var c = document.getElementById("mycanvas");
    var img = document.getElementById("myimg");

    switch (filtertypeII){
        case 'gamma':
        case 'sharpen':
        case 'BrightnessContrast':{
            convolveII(c, img,filtertypeII);
            break;
        }
    }
}

function changeslider2(aslider){
    $('#VSL2')[0].innerHTML = aslider.value;

    var c = document.getElementById("mycanvas");
    var img = document.getElementById("myimg");

    switch (filtertypeII){
        case 'BrightnessContrast':{
            convolveII(c, img,filtertypeII);
            break;
        }
    }
}

function changefilterII(){
    var item = document.getElementById('filterII');
    filtertypeII = item.value;

    var c = document.getElementById("mycanvas");
    var img = document.getElementById("myimg");

    $('#SL1')[0].style.visibility='hidden';
    $('#SL2')[0].style.visibility='hidden';
    $('#VSL1')[0].innerHTML = '';
    $('#VSL2')[0].innerHTML = '';

    switch (filtertypeII){
        case 'gamma':{
            $('#SL1')[0].style.visibility='visible';
            $('#SL1')[0].min = 0;
            $('#SL1')[0].max = 3;
            $('#SL1')[0].value = 1;
            $('#SL1')[0].step=0.1;
            $('#VSL1')[0].innerHTML = '1';
            break;
        }
        case 'sharpen':{
            $('#SL1')[0].style.visibility='visible';
            $('#SL1')[0].min = 1;
            $('#SL1')[0].max = 10;
            $('#SL1')[0].value = 3;
            $('#SL1')[0].step=0.1;
            $('#VSL1')[0].innerHTML = '3';
            break;
        }
        case 'BrightnessContrast':{
            $('#SL1')[0].style.visibility='visible';
            $('#SL1')[0].min = -100;
            $('#SL1')[0].max = 100;
            $('#SL1')[0].value = 0;
            $('#SL1')[0].step=1;
            $('#VSL1')[0].innerHTML = '0';

            $('#SL2')[0].style.visibility='visible';
            $('#SL2')[0].min = -100;
            $('#SL2')[0].max = 100;
            $('#SL2')[0].value = 0;
            $('#SL2')[0].step=1;
            $('#VSL2')[0].innerHTML = '0';
            break;
        }
    }

    convolveII(c, img,filtertypeII);
}

function convolveII(c, img,filtertypeII){
    var ctx = c.getContext("2d");

    c.width=img.width;
    c.height=img.height;
    ctx.drawImage(img, 0, 0);

    var width = c.width;
    var height = c.height;
    var filtered = null;

    var inputData = ctx.getImageData(0, 0, width, height);

    switch (filtertypeII){
        case 'grayscale':{
            filtered = ImageFilters.GrayScale(inputData);
            break;
        }
        case 'enrich':{
            filtered = ImageFilters.Enrich(inputData);
            break;
        }
        case 'invert':{
            filtered = ImageFilters.Invert(inputData);
            break;
        }
        case 'gamma':{
            var v = parseFloat($('#SL1')[0].value);
            filtered = ImageFilters.Gamma(inputData,v);
            break;
        }
        case 'sharpen':{
            var v = parseFloat($('#SL1')[0].value);
            filtered = ImageFilters.Sharpen(inputData,v);
            break;
        }
        case 'BrightnessContrast':{
            var v1= parseInt($('#SL1')[0].value);
            var v2= parseInt($('#SL2')[0].value);
            filtered = ImageFilters.BrightnessContrastPhotoshop(inputData,v1,v2);
            break;
        }
    }

    if(filtered) {
        ctx.putImageData(filtered, 0, 0);
    }
}