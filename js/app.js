'use strict';

var voteOptions = [];
var resultsChart;
var resultsChartDOM = document.getElementById('results-chart');
// var optionOne = document.getElementById('option-one');
// var optionTwo = document.getElementById('option-two');
// var optionThree = document.getElementById('option-three');
var disallowedNumbers = [];
var images = document.getElementsByTagName('img');
var totalVotes = 0;
var voteOptionNames = [];

function VoteItem(image, name) {
  this.name = name;
  this.image = image;
  this.votes = 0;
  this.timesAppeared = 0;
  voteOptions.push(this);
  voteOptionNames.push(this.name);
}

VoteItem.prototype.render = function(imgLoc) {
  // this.timesAppeared++;
  imgLoc.src = this.image;
  imgLoc.nextElementSibling.textContent = this.name;
  imgLoc.nextElementSibling.id = this.name;
}

function voteHandler(event) {
  for(var i=0; i<images.length; i++)
  {
    voteOptions[voteOptionNames.indexOf(images[i].nextElementSibling.id)].timesAppeared++;
  }

  var votedItem = voteOptions[voteOptionNames.indexOf(event.target.id)];
  votedItem.votes++;
  totalVotes++;
  // if(totalVotes > 24) {
  //   document.getElementById('show-results').disabled = false;
  // }

  if(totalVotes > 24) {
    renderChart();
    return;
  }
  updateVoteOptions();
}

VoteItem.prototype.winPercent = function() {
  return (this.votes / this.timesAppeared * 100).toString() + '%';
}

// generates three -unique- numbers from 0 to the number of vote options -1
function generateVoteOptions() {
  while(disallowedNumbers.length < (images.length * 2)) {
    var test = Math.floor(Math.random() * voteOptions.length);
    if(!disallowedNumbers.includes(test)) {
      disallowedNumbers.push(test);
    }
  }
  for(var i=0; i<images.length; i++) {
    disallowedNumbers.shift();
  }

  return disallowedNumbers;
}

function updateVoteOptions() {
  var newOptions = generateVoteOptions();

  // voteOptions[newOptions[0]].render(optionOne);
  // voteOptions[newOptions[1]].render(optionTwo);
  // voteOptions[newOptions[2]].render(optionThree);

  for(var i=0; i<images.length; i++) {
    voteOptions[newOptions[i]].render(images[i]);
  }
}

function renderChart() {
  document.getElementsByTagName('section')[0].textContent = '';

  var data = buildChartData();
  var ctx = resultsChartDOM.getContext('2d');

  resultsChart = new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 4000,
        easing: 'easeInOutBounce'
      }
    },
    scales: {
      yAxes: [{
        tick: {

        }
      }]
    }
  }
  )
  document.getElementById('closing').textContent = 'Thank you for participating!';
}

function buildChartData() {
  return {
    labels: voteOptionNames,
    datasets: [{
      data: tallyVotes(),

      // Color gradients courtesy of http://respekt.us/index.html
      backgroundColor: [
        '#9809f2',
        '#900dec',
        '#8911e7',
        '#8215e2',
        '#7a19dd',
        '#731dd8',
        '#6c21d3',
        '#6425ce',
        '#5d29c9',
        '#562dc4',
        '#4e31bf',
        '#4735ba',
        '#4039b5',
        '#393db0',
        '#3141ab',
        '#2a45a6',
        '#2349a1',
        '#1b4d9c',
        '#145197',
        '#065a8d'
      ],

      borderColor: [
        '#3c0360',
        '#39045e',
        '#36065c',
        '#33075a',
        '#300958',
        '#2d0b56',
        '#2a0c54',
        '#270e52',
        '#241050',
        '#21114e',
        '#1f134c',
        '#1c154a',
        '#191648',
        '#161846',
        '#131a44',
        '#101b42',
        '#0d1d40',
        '#0a1f3e',
        '#07203c',
        '#022438'
      ]
    }]
  }
}

function tallyVotes() {
  var output = [];
  for(var i=0; i<voteOptions.length; i++) {
    output.push(voteOptions[i].votes);
  }
  return output;
}

new VoteItem('img/bag.jpg', 'Roller Bag');
new VoteItem('img/banana.jpg', 'Banana Slicer');
new VoteItem('img/bathroom.jpg', 'Tablet Stand');
new VoteItem('img/boots.jpg', 'Toeless Rain Boots');
new VoteItem('img/breakfast.jpg', 'Breakfast Staion');
new VoteItem('img/bubblegum.jpg', 'Bubble Gum');
new VoteItem('img/chair.jpg', 'Chair');
new VoteItem('img/cthulhu.jpg', 'Elder God');
new VoteItem('img/dog-duck.jpg', 'Dog Mask');
new VoteItem('img/dragon.jpg', 'Dragon Meat');
new VoteItem('img/pen.jpg', 'Pen');
new VoteItem('img/pet-sweep.jpg', 'Pet Sweeper');
new VoteItem('img/scissors.jpg', 'Pizza Scissors');
new VoteItem('img/shark.jpg', 'Shark Sleeping Bag');
new VoteItem('img/sweep.png', 'Mommy\s Little Sweeper');
new VoteItem('img/tauntaun.jpg', 'Fantasy Sleeping Bag');
new VoteItem('img/unicorn.jpg', 'Unicorn Meat');
new VoteItem('img/usb.gif', 'Tentacle USB Drive');
new VoteItem('img/water-can.jpg', 'Novelty Watering Can');
new VoteItem('img/wine-glass.jpg', 'Novelty Jumbo Wine Glass');

// optionOne.nextElementSibling.addEventListener('click', voteHandler);
// optionTwo.nextElementSibling.addEventListener('click', voteHandler);
// optionThree.nextElementSibling.addEventListener('click', voteHandler);

for(var i=0; i<images.length; i++) {
  images[i].nextElementSibling.addEventListener('click', voteHandler);
}

// document.getElementById('show-results').addEventListener('click', renderTable);

updateVoteOptions();