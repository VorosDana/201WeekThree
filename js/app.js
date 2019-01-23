'use strict';

var voteOptions = [];
var resultsChart;
var resultsChartDOM = document.getElementById('results-chart');
var disallowedNumbers = [];
var images = document.getElementsByTagName('img');
var totalVotes = 0;
var voteOptionNames = [];

function VoteItem(image, name, votes, timesAppeared) {
  this.name = name;
  this.image = image;
  this.votes = votes;
  this.timesAppeared = timesAppeared;
  voteOptions.push(this);
  voteOptionNames.push(this.name);
}

VoteItem.prototype.render = function(imgLoc) {
  imgLoc.src = this.image;
  imgLoc.nextElementSibling.textContent = this.name;
  imgLoc.nextElementSibling.id = this.name;
}

function buildVoteItems() {
  new VoteItem('img/bag.jpg', 'Roller Bag', 0, 0);
  new VoteItem('img/banana.jpg', 'Banana Slicer', 0, 0);
  new VoteItem('img/bathroom.jpg', 'Tablet Stand', 0, 0);
  new VoteItem('img/boots.jpg', 'Toeless Rain Boots', 0, 0);
  new VoteItem('img/breakfast.jpg', 'Breakfast Staion', 0, 0);
  new VoteItem('img/bubblegum.jpg', 'Bubble Gum', 0, 0);
  new VoteItem('img/chair.jpg', 'Chair', 0, 0);
  new VoteItem('img/cthulhu.jpg', 'Elder God', 0, 0);
  new VoteItem('img/dog-duck.jpg', 'Dog Mask', 0, 0);
  new VoteItem('img/dragon.jpg', 'Dragon Meat', 0, 0);
  new VoteItem('img/pen.jpg', 'Pen', 0, 0);
  new VoteItem('img/pet-sweep.jpg', 'Pet Sweeper', 0, 0);
  new VoteItem('img/scissors.jpg', 'Pizza Scissors', 0, 0);
  new VoteItem('img/shark.jpg', 'Shark Sleeping Bag', 0, 0);
  new VoteItem('img/sweep.png', 'Mommy\'s Little Sweeper', 0, 0);
  new VoteItem('img/tauntaun.jpg', 'Fantasy Sleeping Bag', 0, 0);
  new VoteItem('img/unicorn.jpg', 'Unicorn Meat', 0, 0);
  new VoteItem('img/usb.gif', 'Tentacle USB Drive', 0, 0);
  new VoteItem('img/water-can.jpg', 'Novelty Watering Can', 0, 0);
  new VoteItem('img/wine-glass.jpg', 'Novelty Jumbo Wine Glass', 0, 0);
}

function getStoredVoteData() {
  var storedData = JSON.parse(localStorage.getItem('vote-data'));

  if(storedData) {
    console.log(storedData);

    for(var i=0; i<storedData.length; i++) {
      new VoteItem(storedData[i].image, storedData[i].name, storedData[i].votes, storedData[i].timesAppeared);
    }

  } else {
    buildVoteItems();
  }
}

function storeVoteData() {
  localStorage.setItem('vote-data', JSON.stringify(voteOptions));
}

function voteHandler(event) {
  for(var i=0; i<images.length; i++)
  {
    voteOptions[voteOptionNames.indexOf(images[i].nextElementSibling.id)].timesAppeared++;
  }

  var votedItem = voteOptions[voteOptionNames.indexOf(event.target.id)];
  votedItem.votes++;
  totalVotes++;

  if(totalVotes > 24) {
    storeVoteData();
    renderChart();
    return;
  }
  updateVoteOptions();
}

function attachClickHandlers() {
  for(var i=0; i<images.length; i++) {
    images[i].nextElementSibling.addEventListener('click', voteHandler);
  }
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

  for(var i=0; i<images.length; i++) {
    voteOptions[newOptions[i]].render(images[i]);
  }
}

function renderChart() {
  document.getElementsByTagName('section')[0].textContent = '';

  var data = buildChartData();
  var ctx = resultsChartDOM.getContext('2d');

  resultsChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 4000,
        easing: 'easeInOutBounce'
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            stepSize: 1,
            min: 20,
            max: 20
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      },
      legend: {
        display: false
      }
    },

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


attachClickHandlers();

getStoredVoteData();

updateVoteOptions();