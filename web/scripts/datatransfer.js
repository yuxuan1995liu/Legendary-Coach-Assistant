// Parameters for updating speed
let readInterval = 500;
let stopTime = 1000;
let num_players = 6;

// Parameters for css styles
var globalCounter = 0;
var emotionAll = [];
var barWidth = 5;
var barGap = 1;
var barHeight = 30;

d3.select('#counter').html("time counter:")
var timerDiv = d3.select('#counter').append("div");

// var emotionDivP1 = d3.select('#emotionDivP1')
//   .attr("class","plotDiv");
var emotionSvgP1 = d3.select('#emotionDivP1').append('svg')
  .attr('class','emotionSvg')
  .attr('id','emotionSvgP1');

var faceSvgP1 = d3.select('#emotionDivP1').append('svg')
  .attr('class','faceSvg')
  .attr('id','faceSvgP1');

// plotting earphone volumn info
var volumnDiv1 = d3.select("#volumnDivP1");

var volSvgContainer1 = volumnDiv1.append("svg")
  .attr("class","volSvg")
  .attr("id","volSvgP1")
  .attr("width", '95%')
  .attr("height", barHeight + 'px');

var volMark = volSvgContainer1.append("rect")
  .attr("class","stopmark")
  .attr("id","volMarkP1")
  .attr("height",barHeight)
  .attr("y",0)
  .attr("width",barWidth)
  .attr("fill","#B8B8B8");

// plotting gaze speend info
var gazeSvgP1 = d3.select('#gazeSpeedP1').append('svg')
    .attr("class","gazeSvg")
    .attr("id","gazeSvgP1");

var gazeMark = gazeSvgP1.append("rect")
  .attr("class","stopmark")
  .attr("id","gazeMarkP1")
  .attr("height",barHeight)
  .attr("y",0)
  .attr("width",barWidth)
  .attr("fill","#B8B8B8");

var gameSvgP1 = d3.select("#gameVolumnP1").append("svg")
    .attr("id","gameSvgP1")
    .attr("class","gameSvg");

var gameVolMark = gameSvgP1.append("rect")
  .attr("class","stopmark")
  .attr("id","gameVolMarkP1")
  .attr("height",barHeight)
  .attr("y",0)
  .attr("width",barWidth)
  .attr("fill","#B8B8B8");

var i = 1;
function myLoop () {
   setTimeout(function () {
      // console.log("i",i);
      plot_multiuser_data(i);
      update_mark(i);

      readTextFile("data/emotion_output.txt",i,"emo");
      readTextFile("data/facial_output.txt",i,"face");
      readTextFile("data/volumn_output.txt",i,"vol");
      readTextFile("data/gaze_output.txt",i,"gaze");
      readTextFile("data/game_output.txt",i,"game");
      i++;
      if (i < stopTime) {
         myLoop();
      }
   }, readInterval)
}

create_multiuser_div();

myLoop();
var emotion_all = [];
//while (true) {
  function readTextFile(file,i,type){
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText.split("\n");

                  if (type=="emo"){
                    plot_emotion(allText,i);
                  } else if (type=="vol"){
                    plot_volumn(allText,i);
                  } else if (type=="gaze"){
                    plot_gaze(allText,i);
                  } else if (type=="face"){
                    plot_face(allText,i);
                  } else if (type=="game"){
                    plot_game(allText,i);
                  }
              }
          }
      }
      rawFile.send();
  }
//}

//return the color code of corrosponding emotion
function emotion_mapping(emo) {
  let map = {"neutral":"#A8A8A8",
            "angry":"#FD625E",
            "sad":"#01B8AA",
            "happy":"#F2C80F"};
  return map[emo];
}

function face_mapping(face_emo) {
  let map = {"neutral":"#909090",
              "angry":"#b74643",
              "sad":"#00877b",
              "happy":"#d6b10c"}
  return map[face_emo];
}

emotionLegSvg = d3.select('#emotionLeg').append('div').html('Emotion Analysis Color Legends:')
var emotionLegSvg = d3.select('#emotionLeg').append('svg').attr("width","100%").attr("height","65px");
var blockHeight = '40px'
emotionLegSvg.selectAll('.emotionColorBlock1')
    .data(["neutral","angry","sad","happy"])
    .enter()
    .append('rect')
    .attr('class','emotionColorBlock1')
    .attr('height',blockHeight)
    .attr('width','25px')
    .attr('x',function(d,i){return i*55 + 25 + 'px';})
    .attr('y','5px')
    .attr('fill',function(d,i){return face_mapping(d)});
emotionLegSvg.selectAll('.emotionColorBlock2')
    .data(["neutral","angry","sad","happy"])
    .enter()
    .append('rect')
    .attr('class','emotionColorBlock2')
    .attr('height',blockHeight)
    .attr('width','25px')
    .attr('x',function(d,i){return i*55 + 'px';})
    .attr('y','5px')
    .attr('fill',function(d,i){return emotion_mapping(d)});
emotionLegSvg.selectAll('.emotionLegLabels')
    .data(["neutral","angry","sad","happy"])
    .enter()
    .append('text')
    .attr('class','emotionLegLabels')
    .text(function(d){return d;})
    .attr('x',function(d,i){return i*55 + 'px';})
    .attr('y','60px');

var timeFormat = d3.timeFormat("%S");

function plot_emotion(emotion_list,i) {
  console.log("emotion",emotion_list);
  emotion_list.forEach(function(emo){
    if (!(emo=="")){
      emotionAll.push(emo);

      var targetDiv = d3.select('#emotionSvgP1')
          .style('background-color',emotion_mapping(emo));

      var label = timerDiv
          .attr("class","timeLabel")
          .html(function(){
            var seconds = Math.round(i/2);
            var minutes = Math.floor(seconds/60);
            if (minutes<10) {minutes = '0' + minutes.toString();}
            var rem = seconds % 60;
            if (rem<10) {rem = '0' + rem.toString();}
            return minutes + ':' + rem;
          });
    }
  });
}

volumnYScale = d3.scaleLinear().domain([0,100]).range([0,barHeight]);

function plot_volumn(volumn_list,i) {
  console.log('volumn',volumn_list);
  volumn_list.forEach(function(vol){
    if (!(vol=="")){
      // console.log(vol);
      //console.log(emotion_mapping(emo));
      d3.select("#volSvgP1").attr("width",(i+1)*(barGap+barWidth));
      d3.selectAll(".commVolBar").attr("fill","#5F6B6D");
      d3.selectAll(".warningBar").attr("fill","#b74643");

      var bar = volSvgContainer1.append("rect")
          .attr("class","commVolBar")
          .attr("id","commVolBar"+i)
          .attr("x",i*(barGap+barWidth))
          .attr("y",barHeight-volumnYScale(vol))
          .attr("width",barWidth)
          .attr("height",volumnYScale(vol))
          .attr("fill","black")
          .classed("warningBar",function(){if(vol>=80){return true;}});

      // volMark.attr("x",i*(barGap+barWidth)).attr("fill","#ffc5c4");
      document.getElementById("commVolBar"+i).scrollIntoView({block: "end"});

      var label = d3.select("#volLabelP1").text(function(d){
          return 'Communication Volumn: ' + Math.round(vol)
      });
    }
  });
}

function create_multiuser_div(){
  // console.log("create div");
  let defaultEmo = "neutral";
  let defaultFace = "neutral";
  for (var p = 2; p <= 6; p = p + 1){
    d3.select("#emotionDivP"+p).append("svg").attr("class","emotionSvg").attr("id","emotionSvgP"+p).style('background-color',emotion_mapping(defaultEmo));
    d3.select("#emotionDivP"+p).append("svg").attr("class","faceSvg").attr("id","faceSvgP"+p).style('background-color',face_mapping(defaultFace));
    var volSvg = d3.select("#volumnDivP"+p).append("svg").attr("class","volSvg").attr("id","volSvgP"+p);
    var gameSvg = d3.select("#gameVolumnP"+p).append("svg").attr("class","gameSvg").attr("id","gameSvgP"+p);
    var gazeSvg = d3.select("#gazeSpeedP"+p).append("svg").attr("class","gazeSvg").attr("id","gazeSvgP"+p);
    volSvg.append("rect")
      .attr("class","stopmark").attr("id","volMarkP"+p)
      .attr("height",barHeight).attr("y",0).attr("width",barWidth)
      .attr("fill","#B8B8B8");
    gameSvg.append("rect")
      .attr("class","stopmark").attr("id","gameMarkP"+p)
      .attr("height",barHeight).attr("y",0).attr("width",barWidth)
      .attr("fill","#B8B8B8");
    gazeSvg.append("rect")
      .attr("class","stopmark").attr("id","gazeMarkP"+p)
      .attr("height",barHeight).attr("y",0).attr("width",barWidth)
      .attr("fill","#B8B8B8");
  }
}

function plot_multiuser_data(i){
  // console.log("plotting volumns for other users");
  let defaultVol = 10;
  let defaultGaze = 100;
  let defaultGame = 10;
  for (var p = 2; p <= 6; p = p + 1){
    // d3.select("#emotionSvgP"+p).style('background-color',emotion_mapping(defaultEmo));
    // d3.select("#faceSvgP"+p).style('background-color',face_mapping(defaultFace));
    d3.selectAll(".volSvg").attr("width",(i+1)*(barGap+barWidth));
    d3.selectAll(".gazeSvg").attr("width",(i+1)*(barGap+barWidth));
    d3.selectAll(".gameSvg").attr("width",(i+1)*(barGap+barWidth));

    d3.select("#volSvgP"+p).append("rect")
        .attr("class","commVolBar")
        .attr("id","commVolBarP"+p+'-'+i)
        .attr("x",i*(barGap+barWidth))
        .attr("y",barHeight-volumnYScale(defaultVol))
        .attr("width",barWidth)
        .attr("height",volumnYScale(defaultVol))
        .attr("fill","black");
    d3.select("#gazeSvgP"+p).append("line")
        .attr('class','gazePlot')
        .attr('id','gazePlotP'+p+'-'+i)
        .attr("x1",i*(barGap+barWidth))
        .attr("x2",(i+1)*(barGap+barWidth))
        .attr("y1",barHeight - gazeScaleY(defaultGaze))
        .attr("y2",barHeight - gazeScaleY(defaultGaze))
        .style("stroke","black");
    d3.select("#gameSvgP"+p).append("rect")
        .attr("x",i*(barGap+barWidth))
        .attr("y",barHeight-gameYScale(defaultGame))
        .attr("width",barWidth)
        .attr("height",gameYScale(defaultGame))
        .attr("class","gameVolBar")
        .attr("id","gameVolBar"+p+"-"+i)
        .attr("fill","black");
    document.getElementById("commVolBarP"+p+'-'+i).scrollIntoView({block: "end"});
    document.getElementById('gazePlotP'+p+'-'+i).scrollIntoView({block: "end"});
    document.getElementById("gameVolBar"+p+"-"+i).scrollIntoView({block: "end"});
  }
}

function update_mark(i){
  d3.selectAll(".stopmark").attr("x",i*(barGap+barWidth));
}

var gazeSpeedAll = [];
var gazeScaleY = d3.scaleLinear().range([0,barHeight]).domain([0,1100]);

function plot_gaze(gaze_list,i){
  // console.log(gaze_list.length);
  // console.log("gaze_list",gaze_list.slice(Math.max(gaze_list.length - 20, 1)));
  gaze_list = gaze_list.slice(Math.max(gaze_list.length - 5, 1));
  // console.log(gaze_list);
  var total = 0;
  var length = 0;
  gaze_list.forEach(function(gaze){
    if (!(gaze=="")){
      coord = gaze.split(' ');
      dis = Math.sqrt(Math.pow(parseFloat(coord[0])-960,2),Math.pow(parseFloat(coord[1])-540,2));
      // console.log("?",dis);
      total = total + dis;
      length = length + 1;
    }
  });

  avg_dis = total/length;
  console.log("avg gaze distance",avg_dis);
  gazeSpeedAll.push(avg_dis);
  // console.log("gazeAll",gazeSpeedAll);
  if (i > 1) {

    d3.selectAll(".gazePlot").style("stroke","#5F6B6D");
    d3.selectAll(".warningLine").style("stroke","#b74643");
    var line = gazeSvgP1.append("line")
      .attr('class','gazePlot')
      .attr('id','gazePlot'+i)
      .attr("x1",i*(barGap+barWidth))
      .attr("x2",(i+1)*(barGap+barWidth))
      .attr("y1",barHeight - gazeScaleY(gazeSpeedAll[i-2]))
      .attr("y2",barHeight - gazeScaleY(avg_dis))
      .style("stroke","black")
      .classed("warningLine",function(){if(avg_dis>=900){return true;}});

    // gazeMark.attr("x",i*(barGap+barWidth));
    document.getElementById("gazePlot"+i).scrollIntoView({block: "end"});

    var label = d3.select("#gazeLabelP1").text(function(d){
        return 'Gaze Average Offset: \n' + Math.round(avg_dis)
    });
  }
}

function plot_face(face_list,i){
  face_list.forEach(function(face){
    if (!(face=="")){
      console.log("face emotion",face);
      var targetDiv = d3.select('#faceSvgP1')
          .style('background-color',face_mapping(face));
    }
  });
}

gameYScale = d3.scaleLinear().range([0,barHeight]).domain([0,100]);

function plot_game(game,i){
  game.forEach(function(vol){
    if (!(vol=="")){
      console.log("volumn",vol);
      //console.log(emotion_mapping(emo));
      d3.select("#gameSvgP1").attr("width",(i+1)*(barGap+barWidth));
      d3.selectAll(".gameVolBar").attr("fill","#5F6B6D");
      d3.selectAll(".warningBar2").style("fill","#b74643");

      var bar = gameSvgP1.append("rect")
          .attr("x",i*(barGap+barWidth))
          .attr("y",barHeight-gameYScale(vol))
          .attr("width",barWidth)
          .attr("height",gameYScale(vol))
          .attr("class","gameVolBar")
          .attr("id","gameVolBar"+i)
          .attr("fill","black")
          .classed("warningBar2",function(){if(vol>=80){return true;}});
      document.getElementById("gameVolBar"+i).scrollIntoView({block: "end"});

      // gameVolMark.attr("x",i*(barGap+barWidth));

      var label = d3.select("#gameLabelP1").text(function(){
          return 'Game Sound Volumn: \n' + Math.round(vol)
      });
    }
  });
}
