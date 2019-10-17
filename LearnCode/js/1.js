///
///创建不包含任何图层的地图对象
///
var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(), //全屏控件
        new ol.control.ScaleLine(), //比例尺
        new ol.control.OverviewMap(), //鹰眼控件
       ]),
    target: 'map', //div#id='map'
 });
///
///创建地图显示范围View对象
///
var view = new ol.View({
center: ol.proj.fromLonLat([125.238647460938,46.2406519550017]),
zoom:9
 }); //map.view的变量
///
///设置地图显示范围
///
 map.setView(view);
///
///创建用于存放图层的数组,该数组用于控制图层可视性及其它设置
///
var mapLayers = new Array();
///
///创建图层
///
  var layer0= new ol.layer.Tile({ 
 title: "中国卫星影像",
source: new ol.source.XYZ({
url: "http://10.122.156.28///MapService/WebForm1.aspx?request=GetTile&dataset=200&tileMatrix={z}&tileRow={y}&tileCol={x}"
  })
});
///
///设置图层可视状态
///
layer0.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer0);
mapLayers[0]=layer0;
///
///创建图层
///
  var layer1= new ol.layer.Tile({ 
 title: "大庆地区谷歌高分影像",
source: new ol.source.XYZ({
url: "http://10.122.156.28///MapService/WebForm1.aspx?request=GetTile&dataset=3&tileMatrix={z}&tileRow={y}&tileCol={x}"
  })
});
///
///设置图层可视状态
///
layer1.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer1);
mapLayers[1]=layer1;
///
///创建图层
///
  var layer2= new ol.layer.Tile({ 
 title: "大庆地区SPOT假彩色影像",
source: new ol.source.XYZ({
url: "http://10.122.156.28///MapService/WebForm1.aspx?request=GetTile&dataset=1&tileMatrix={z}&tileRow={y}&tileCol={x}"
  })
});
///
///设置图层可视状态
///
layer2.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer2);
mapLayers[2]=layer2;
///
///创建图层
///
  var layer3= new ol.layer.Tile({ 
 title: "大庆地区SPOT真彩色影像",
source: new ol.source.XYZ({
url: "http://10.122.156.28///MapService/WebForm1.aspx?request=GetTile&dataset=2&tileMatrix={z}&tileRow={y}&tileCol={x}"
  })
});
///
///设置图层可视状态
///
layer3.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer3);
mapLayers[3]=layer3;
///
///创建图层
///
  var layer4= new ol.layer.Tile({ 
 title: "中国路网",
source: new ol.source.XYZ({
url: "http://10.122.156.28///MapService/WebForm1.aspx?request=GetTile&dataset=201&tileMatrix={z}&tileRow={y}&tileCol={x}"
  })
});
///
///设置图层可视状态
///
layer4.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer4);
mapLayers[4]=layer4;
///
///创建图层
///
  var layer5= new ol.layer.Vector({
source: new ol.source.Vector({
url: "http://10.122.156.28//pages/kmlData/2018_DaQing_Kancha.kml",
  format: new ol.format.KML()
  })
});
layer5.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer5);
mapLayers[5]=layer5;
///
///创建图层
///
  var layer6= new ol.layer.Vector({
source: new ol.source.Vector({
url: "http://10.122.156.28//pages/kmlData/2018_DaQing_Kaicai.kml",
  format: new ol.format.KML()
  })
});
layer6.setVisible(true);


///
///加入到图层数组
///
map.addLayer(layer6);
mapLayers[6]=layer6;
///
///控制面板展开与关闭方法
///
function toggle(targetid)
{
    if (document.getElementById)
     {
       target=document.getElementById(targetid);
       if (target.style.display=="block")
         {
           target.style.display="none";
          }
       else
          {
             target.style.display="block";
          }
      }
}
///
///界面图层checkbox操作图层可视化状态
///
function clickCheckbox(index,acheckbox)
{
    mapLayers[index].setVisible(acheckbox.checked);
    var boxes = document.getElementsByName("layervisible");
}

